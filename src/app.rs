use lazy_static::lazy_static;
use leptos::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize)]
struct SongData {
    name: String,
    difficulty: String,
    image_url: String,
    level: usize,
    total_note: usize,
}

lazy_static! {
    static ref SONG_DATAS: Vec<[SongData; 4]> =
        serde_json::from_str(include_str!("./song_datas.json")).unwrap();
}

const LEVEL_NAME: [&str; 5] = ["皆傳", "中傳", "十段", "九段", "八段"];
const LIFE_WEIGHT: [[f32; 4]; 5] = [
    [0.0, 1.0, 2.0, 47.5],
    [0.0, 2.0, 3.0, 47.5],
    [0.5, 2.0, 4.0, 22.5],
    [1.0, 2.0, 4.0, 20.0],
    [1.0, 2.0, 4.0, 20.0],
];

#[component]
pub fn App(cx: Scope) -> impl IntoView {
    let (counter, set_counter) = create_signal(cx, 0);
    let (life, set_life) = create_signal(cx, 100.0);
    let (level, set_level) = create_signal(cx, None);
    let (success, set_success) = create_signal(cx, false);

    view! { cx,
        {
            move || if life.get() <= 0.0 && level.get().is_some() {
                view! { cx, <FailedState counter=counter level=level/> }.into_view(cx)
            } else if success.get() {
                view! { cx, <SuccessState level=level/> }.into_view(cx)
            }else {
                view! { cx, <NormalState
                             counter=counter
                             set_counter=set_counter
                             life=life
                             set_life=set_life
                             level=level
                             set_level=set_level
                             set_success=set_success/> }.into_view(cx)
            }
        }
    }
}

#[component]
fn FailedState(
    cx: Scope,
    counter: ReadSignal<usize>,
    level: ReadSignal<Option<usize>>,
) -> impl IntoView {
    view! { cx,
        <header class="p-4 text-center bg-red-300 mb-4">
            <h1 class="text-4xl font-bold">"Phigros Ability Test"</h1>
        </header>
        <main class="w-5/6 mx-auto mt-8">
            <h2 class="font-bold text-3xl text-center md:text-3xl">"Failed ("{LEVEL_NAME[level.get().unwrap()]}")"</h2>
            <p class="text-center">"life is less than zero..."</p>
            <p class="text-center">"You failed at the "{match counter.get() {
                0 => "1st",
                1 => "2nd",
                2 => "3rd",
                _ => "last",
            }}" song."</p>
        </main>
    }
}

#[component]
fn SuccessState(cx: Scope, level: ReadSignal<Option<usize>>) -> impl IntoView {
    view! { cx,
        <header class="p-4 text-center bg-green-300 mb-4">
            <h1 class="text-4xl font-bold">"Phigros Ability Test"</h1>
        </header>
        <main class="w-5/6 mx-auto mt-8">
            <h2 class="font-bold text-3xl text-center md:text-3xl">"Passed ("{LEVEL_NAME[level.get().unwrap()]}")"</h2>
            <p class="text-center">"You passed the following ability!"</p>
        </main>
    }
}

#[component]
fn NormalState(
    cx: Scope,
    counter: ReadSignal<usize>,
    set_counter: WriteSignal<usize>,
    life: ReadSignal<f32>,
    set_life: WriteSignal<f32>,
    level: ReadSignal<Option<usize>>,
    set_level: WriteSignal<Option<usize>>,
    set_success: WriteSignal<bool>,
) -> impl IntoView {
    let (great, set_great) = create_signal(cx, 0);
    let (bad, set_bad) = create_signal(cx, 0);
    let (miss, set_miss) = create_signal(cx, 0);

    view! { cx,
        <header class="p-4 text-center bg-blue-300 mb-4">
            <h1 class="text-4xl font-bold">"Phigros Ability Test"</h1>
        </header>
        <main class="w-5/6 mx-auto mt-8">
            <form>
                <div class="flex justify-between items-center">
                    <h2 class="font-bold text-base md:text-3xl">"Select Difficulty"</h2>
                    <ChooseLevel level=set_level counter=set_counter/>
                </div>

                <Show when=move || level.get().is_some() fallback=|cx| view! { cx, <p></p> }>
                    <SongCard song={ &SONG_DATAS[level.get().unwrap()][counter.get()] } life=life/>
                    <div class="rounded overflow-hidden shadow-lg p-4">
                        <ServeData great=set_great bad=set_bad miss=set_miss/>
                        <button
                            class="btn hover:bg-blue-400 transition ease-out duration-300"
                            on:click=move |_| {
                                set_life.update(|life| {
                                    let (great, bad, miss) = (great.get(), bad.get(), miss.get());
                                    let total = SONG_DATAS[level.get().unwrap()][counter.get()].total_note;
                                    let perfect = total - great - bad - miss;
                                    let change_life =
                                        *life +
                                        (LIFE_WEIGHT[level.get().unwrap()][3] * perfect as f32) / total as f32 -
                                         LIFE_WEIGHT[level.get().unwrap()][0] * great as f32 -
                                         LIFE_WEIGHT[level.get().unwrap()][1] * bad as f32 -
                                         LIFE_WEIGHT[level.get().unwrap()][2] * miss as f32;
                                    *life = if change_life < 0.0 {
                                        0.0
                                    } else if change_life >= 100.0 {
                                        100.0
                                    } else { change_life };
                                });
                                if life.get() > 0.0 {
                                    if counter.get() >= 3 {
                                        set_success(true);
                                    } else {
                                        set_counter.update(|n| *n += 1 );
                                    }
                                }
                            }
                        >"Submit"</button>
                    </div>
                </Show>
            </form>
        </main>
    }
}

#[component]
fn ChooseLevel(
    cx: Scope,
    level: WriteSignal<Option<usize>>,
    counter: WriteSignal<usize>,
) -> impl IntoView {
    view! { cx,
    <div class="relative">
        <select
            class=r#"block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4
            rounded leading-tight cursor-pointer focus:outline-none focus:bg-gray-100
            focus:border-gray-500 transition ease-out duration-300"#
            id="select-difficulty" name="difficulty" on:change=move |ev| {
                level(event_target_value(&ev).parse::<usize>().ok());
                counter(0);
            }>
            <option selected hidden>"Choose here"</option>
            <option value="0">"皆傳"</option>
            <option value="1">"中傳"</option>
            <option value="2">"十段"</option>
            <option value="3">"九段"</option>
            <option value="4">"八段"</option>
        </select>
    </div>
    }
}

#[component]
fn SongCard(cx: Scope, song: &'static SongData, life: ReadSignal<f32>) -> impl IntoView {
    view! { cx,
        <div class="bg-gray-100 mt-5 p-4 flex-col">
            <div class="rounded overflow-hidden shadow-lg mb-8">
                <img class="w-full"
                src={&song.image_url}
                alt="Not yet implemented"/>
            </div>
            <div class="flex justify-between items-center">
                <h2 class="font-bold md:text-2xl pl-2">"Name:"</h2>
                <h2 class="font-bold md:text-2xl pl-2 relative">{&song.name}</h2>
            </div>
            <div class="flex justify-between items-center">
                <h2 class="font-bold md:text-2xl pl-2">"Level: "</h2>
                <h2 class="font-bold md:text-2xl pl-2 relative">{song.level}"("{&song.difficulty}")"</h2>
            </div>
            <div class="flex justify-between items-center">
                <h2 class="font-bold text-base md:text-2xl pl-2">"Remaining Life :"</h2>
                <h3 class="font-bold text-base md:text-2xl pl-2">{life}</h3>
            </div>
        </div>
    }
}

#[component]
fn ServeData(
    cx: Scope,
    great: WriteSignal<usize>,
    bad: WriteSignal<usize>,
    miss: WriteSignal<usize>,
) -> impl IntoView {
    view! { cx,
        <h3 class="mt-4 mb-3 font-bold text-2xl">"Input Datas"</h3>
        <div class="mb-3 lg:flex lg:items-center lg:justify-between">
            <h4 class="pr-5 font-bold">"Great:"</h4>
            <input
                class="input-num" type="number" placeholder="Great notes"
                on:input=move |ev| {
                    great(event_target_value(&ev).parse::<usize>().unwrap());
                }
            />
        </div>
        <div class="mb-3 lg:flex lg:items-center lg:justify-between">
            <h4 class="pr-5">"Bad:"</h4>
            <input
                class="input-num" type="number" placeholder="Bad notes"
                on:input=move |ev| {
                    bad(event_target_value(&ev).parse::<usize>().unwrap());
                }
            />
        </div>
        <div class="mb-3 lg:flex lg:items-center lg:justify-between">
            <h4 class="pr-5">"Miss:"</h4>
            <input
                class="input-num" type="number" placeholder="Misss notes"
                on:input=move |ev| {
                    miss(event_target_value(&ev).parse::<usize>().unwrap());
                }
            />
        </div>
    }
}
