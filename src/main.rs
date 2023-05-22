mod app;

use leptos::*;

use app::*;

fn main() {
    mount_to_body(|cx| view! { cx, <App/> });
}
