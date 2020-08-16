var _a;
import { levelName } from "./SongData.js";
let levelNum = parseInt((_a = localStorage.getItem("cur-diff")) !== null && _a !== void 0 ? _a : "-1") + 1;
let curDiff = document.querySelector("#current-diff-in-success");
curDiff.textContent = levelName[levelNum];
let remainLife = document.querySelector("#current-life");
remainLife.textContent = `${localStorage.getItem("remaining-life")}%`;
