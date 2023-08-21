#![allow(non_snake_case, unused)]

mod app;

use dioxus::prelude::*;
use log::LevelFilter;

use crate::app::*;

fn main() {
    // Init debug
    dioxus_logger::init(LevelFilter::Info).expect("failed to init logger");

    log::info!("starting app");
    //log::info!("song datas: {:?}", SONG_DATAS.get());
    dioxus_web::launch(app::App);
}
