import { levelName } from "./SongData.js";
let levelNum: number = parseInt(localStorage.getItem("cur-diff") ?? "-1") + 1;
let curDiff = document.querySelector(
    "#current-diff-in-failed"
) as HTMLHeadElement;
curDiff.textContent = levelName[levelNum];
