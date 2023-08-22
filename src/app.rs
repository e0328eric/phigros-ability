use std::sync::OnceLock;

use dioxus::prelude::*;
use serde::Deserialize;

const LEVEL_NAME: [&str; 4] = ["皆傳", "中傳", "十段", "九段"];
const LIFE_WEIGHT: [[f32; 4]; 4] = [
    [1.0, 2.0, 4.0, 20.0],
    [1.0, 2.0, 4.0, 25.0],
    [0.5, 2.0, 4.0, 35.5],
    [0.0, 1.0, 2.0, 47.5],
];
const INVALID_LEVEL: usize = 999; // default state of level
const INVALID_LEVEL_STR: &str = "999"; // default state of level

static SONG_DATAS: OnceLock<Vec<[SongData; 4]>> = OnceLock::new();

#[derive(Debug, Clone, Deserialize)]
pub struct SongData {
    pub name: String,
    pub difficulty: String,
    pub image_url: String,
    pub level: usize,
    pub total_note: usize,
}

pub fn App(cx: Scope) -> Element {
    SONG_DATAS.get_or_init(|| serde_json::from_str(include_str!("./song_datas.json")).unwrap());

    let mut success = use_state(cx, || false);
    let mut counter = use_state(cx, || 0);
    let mut level = use_state(cx, || INVALID_LEVEL);
    let mut life = use_state(cx, || 100.0);

    render! {
        if *life.get() <= 0.0 && *level.get() < INVALID_LEVEL {
            rsx! {
                FailureNavBar {}
                Failure { success: success, level: level, counter: counter, life: life }
            }
        } else if *success.get() {
            rsx! {
                SuccessNavBar {}
                Success { success: success, level: level, counter: counter, life: life }
            }
        } else {
            rsx! {
                NormalNavBar {}
                NormalState { success: success, level: level, counter: counter, life: life }
            }
        }
    }
}

#[inline_props]
fn SuccessNavBar(cx: Scope) -> Element {
    render! {
        nav { class: "p-4 text-center bg-green-300 mb-4",
            h1 { class: "text-4xl font-bold", "Phigros Ability Test" }
        }
    }
}

#[inline_props]
fn Success<'a>(
    cx: Scope<'a>,
    success: &'a UseState<bool>,
    level: &'a UseState<usize>,
    counter: &'a UseState<usize>,
    life: &'a UseState<f32>,
) -> Element<'a> {
    render! {
        main { class: "w-5/6 mx-auto mt-8",
            div { class: "mt-4 flex flex-col place-content-center text-center",
                span { style: "margin-bottom: 12px;",
                    p { class: "font-bold text-center text-3xl flex-auto basis-2",
                        "Passed! ({LEVEL_NAME[*level.get()]})"
                    }
                }
                p { class: "flex-none basis-1", "You passed the following ability!" }
                p { class: "flex-none basis-1", "Renaming life is {life}." }
                span { style: "margin-top: 8px;",
                    button {
                        class: r#"font-bold text-center px-2 bg-cyan-500 text-white rounded-full
                               hover:bg-cyan-300"#,
                        r#type: "button",
                        onclick: move |_| {
                            success.set(false);
                            level.set(INVALID_LEVEL);
                            counter.set(0);
                            life.set(100.0);
                        },
                        "Home"
                    }
                }
            }
        }
    }
}

#[inline_props]
fn FailureNavBar(cx: Scope) -> Element {
    render! {
        nav { class: "p-4 text-center bg-red-300 mb-4",
            h1 { class: "text-4xl font-bold", "Phigros Ability Test" }
        }
    }
}

#[inline_props]
fn Failure<'a>(
    cx: Scope<'a>,
    success: &'a UseState<bool>,
    level: &'a UseState<usize>,
    counter: &'a UseState<usize>,
    life: &'a UseState<f32>,
) -> Element<'a> {
    let failed_location = match counter.get() {
        0 => "1st",
        1 => "2nd",
        2 => "3rd",
        _ => "last",
    };
    let song_data = &SONG_DATAS.get().unwrap()[*level.get()][*counter.get()];

    render! {
        main { class: "w-5/6 mx-auto mt-8",
            div { class: "mt-4 flex flex-col place-content-center text-center",
                span { style: "margin-bottom: 12px;",
                    p { class: "font-bold text-center text-3xl flex-auto basis-2",
                        "Failed... ({LEVEL_NAME[*level.get()]})"
                    }
                }
                p { "Your life is less than zero." }
                p { "You failed at {failed_location} song." }
                p { "Song name: {song_data.name}, Level: {song_data.level} ({song_data.difficulty})" }
                span { style: "margin-top: 8px;",
                    button {
                        class: r#"font-bold text-center px-2 bg-red-500 text-white rounded-full
                               hover:bg-red-300"#,
                        r#type: "button",
                        onclick: move |_| {
                            success.set(false);
                            level.set(INVALID_LEVEL);
                            counter.set(0);
                            life.set(100.0);
                        },
                        "Home"
                    }
                }
            }
        }
    }
}

#[inline_props]
fn NormalNavBar(cx: Scope) -> Element {
    render! {
        nav { class: "p-4 text-center bg-blue-300 mb-4",
            h1 { class: "text-4xl font-bold", "Phigros Ability Test" }
        }
    }
}

#[inline_props]
fn NormalState<'a>(
    cx: Scope<'a>,
    success: &'a UseState<bool>,
    level: &'a UseState<usize>,
    counter: &'a UseState<usize>,
    life: &'a UseState<f32>,
) -> Element<'a> {
    let mut great = use_state(cx, || 0);
    let mut bad = use_state(cx, || 0);
    let mut miss = use_state(cx, || 0);

    render! {
        main { class: "w-5/6 mx-auto mt-8",
            div { class: "flex justify-between items-center",
                h2 { class: "font-bold text-base md:text-3xl", "Select the difficulty" }
                ChooseLevel { level: level, counter: counter, life: life }
            }

            if *level.get() < INVALID_LEVEL {
                let song_data = &SONG_DATAS.get().unwrap()[*level.get()][*counter.get()];
                rsx!{
                    SongCard { song: song_data, life: life }
                    div { class: "rounded overflow-hidden shadow-lg p-4",
                        ServeData { great: great, bad: bad, miss: miss }
                        button {
                            class: r#"btn bg-blue-400 transition ease-out duration-300 rounded-full
                                hover:bg-blue-100 px-2"#,
                            onclick: move |_| {
                                let (great, bad, miss) = (*great.get(),*bad.get(), *miss.get());
                                let total = song_data.total_note;
                                let perfect = total - great - bad - miss;
                                let change_life = *life+(LIFE_WEIGHT[*level.get()][3] * perfect
                                                         as f32) / total as f32 -
                                    LIFE_WEIGHT[*level.get()][0] * great as f32 -
                                    LIFE_WEIGHT[*level.get()][1] * bad as f32 -
                                    LIFE_WEIGHT[*level.get()][2] * miss as f32;
                                life.set(if change_life < 0.0 {
                                    0.0
                                } else if change_life >= 100.0 {
                                    100.0
                                } else {
                                    change_life
                                });

                                if *life.get() > 0.0 {
                                    if *counter.get() >= 3 {
                                        success.set(true);
                                    } else {
                                        counter.modify(|n| *n + 1 );
                                    }
                                }
                            },
                            "Submit"
                        }
                    }
                }
            }
        }
    }
}

#[inline_props]
fn ChooseLevel<'a>(
    cx: Scope<'a>,
    level: &'a UseState<usize>,
    counter: &'a UseState<usize>,
    life: &'a UseState<f32>,
) -> Element<'a> {
    render! {
        div { class: "relative",
            select { class: r#"block appearance-none bg-gray-200 border border-gray-200
                text-gray-700 py-3 px-4 rounded leading-tight cursor-pointer focus:outline-none
                    focus:bg-gray-100 focus:border-gray-500 transition ease-out duration-300"#,
                id: "select-difficulty",
                name: "difficulty",
                onchange: move |ev: FormEvent| {
                    let Ok(level_data) = ev.data.value.parse::<usize>() else { return; };
                    if level_data == INVALID_LEVEL {
                        return;
                    }
                    level.set(level_data);
                    life.set(100.0);
                    counter.set(0);
                },
                option { value: INVALID_LEVEL_STR, label: "難度" }
                option { value: "0", label: "皆傳" }
                option { value: "1", label: "中傳" }
                option { value: "2", label: "十段" }
                option { value: "3", label: "九段" }
            }
        }
    }
}

#[inline_props]
fn SongCard<'a>(cx: Scope<'a>, song: &'a SongData, life: &'a UseState<f32>) -> Element<'a> {
    log::info!("{song:?}");
    render! {
        div { class: "bg-gray-100 mt-5 p-4 flex-col",
            div { class: "rounded overflow-hidden shadow-lg mb-8",
                img { class: "w-full", src: song.image_url.as_str(), alt: "Not yet implemented" }
            }
            div { class: "flex justify-between items-center",
                h2 { class: "font-bold md:text-2xl pl-2", "Name:" }
                h2 { class: "font-bold md:text-2xl pl-2 relative", "{song.name}" }
            }
            div { class: "flex justify-between items-center",
                h2 { class: "font-bold md:text-2xl pl-2", "Level: " }
                h2 { class: "font-bold md:text-2xl pl-2 relative", "{song.level}
                    ({song.difficulty})" }
            }
            div { class: "flex justify-between items-center",
                h2 { class: "font-bold md:text-2xl pl-2", "Remaining Life:" }
                h2 { class: "font-bold md:text-2xl pl-2", "{life}" }
            }
        }
    }
}

#[inline_props]
fn ServeData<'a>(
    cx: Scope<'a>,
    great: &'a UseState<usize>,
    bad: &'a UseState<usize>,
    miss: &'a UseState<usize>,
) -> Element<'a> {
    render! {
        h3 { class: "mt-4 mb-3 font-bold text-2xl", "Input Datas" }
        div { class: "mb-3 lg:flex lg:items-center lg:justify-between",
            h4 { class: "pr-5 font-bold", "Great:" }
            input {
                class: "input-num", r#type: "number", placeholder: "Great notes",
                oninput: move |ev| {
                    great.set(ev.data.value.parse::<usize>().unwrap_or(0));
                },
            }
        }
        div { class: "mb-3 lg:flex lg:items-center lg:justify-between",
            h4 { class: "pr-5 font-bold", "Bad:" }
            input {
                class: "input-num", r#type: "number", placeholder: "Bad notes",
                oninput: move |ev| {
                    bad.set(ev.data.value.parse::<usize>().unwrap_or(0));
                },
            }
        }
        div { class: "mb-3 lg:flex lg:items-center lg:justify-between",
            h4 { class: "pr-5 font-bold", "Miss:" }
            input {
                class: "input-num", r#type: "number", placeholder: "Miss notes",
                oninput: move |ev| {
                    miss.set(ev.data.value.parse::<usize>().unwrap_or(0));
                },
            }
        }
    }
}
