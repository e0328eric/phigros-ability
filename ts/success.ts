import { levelName } from "./SongData.js";
let levelNum: number = parseInt(localStorage.getItem("cur-diff") ?? "-1") + 1;
let curDiff = document.querySelector(
    "#current-diff-in-success"
) as HTMLHeadElement;
curDiff.textContent = levelName[levelNum];

let remainLife = document.querySelector("#current-life") as HTMLHeadElement;
remainLife.textContent = `${localStorage.getItem("remaining-life")}%`;
