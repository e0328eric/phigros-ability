// Import song datas
import * as SD from "./SongData.js";
import { PhigrosAbility } from "./ability.js";

// Start the phigros ability
var nextSongData = 0;
var ability: PhigrosAbility;
var mainShow = document.querySelector("#main-show") as HTMLDivElement;
var takeLevel = document.querySelector(
    "#select-difficulty"
) as HTMLSelectElement;
window.onbeforeunload = () => {
    takeLevel.value = "Choose here";
};
takeLevel.addEventListener("change", startPhigrosAbility);

// Main part of the phigros test
function startPhigrosAbility(e: Event) {
    // Collect datas
    var greatVal = document.querySelector("#great-val") as HTMLInputElement;
    var badVal = document.querySelector("#bad-val") as HTMLInputElement;
    var missVal = document.querySelector("#miss-val") as HTMLInputElement;
    var songName = document.querySelector("#song-name") as HTMLHeadElement;
    var songImage = document.querySelector("#song-img") as HTMLImageElement;
    var remainLife = document.querySelector("#current-life") as HTMLHeadElement;

    // Collect the level of the ability test
    var submitBtn = document.querySelector("input[type='submit']")!;

    e.preventDefault();
    mainShow.style.display = "block";

    // Initial variables
    nextSongData = 0;
    ability = new PhigrosAbility(takeLevel.value);

    // Change a name and a picture of a given song
    remainLife.textContent = `${ability.life}%`;
    songName.textContent = SD.testLevels[ability.difficulty][nextSongData].name;
    songImage.src = SD.testLevels[ability.difficulty][nextSongData].picture;

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        var great = parseInt(greatVal.value);
        var bad = parseInt(badVal.value);
        var miss = parseInt(missVal.value);
        if (Number.isNaN(great) || Number.isNaN(bad) || Number.isNaN(miss)) {
        } else {
            ability.changeLife(
                SD.testLevels[ability.difficulty][nextSongData].totalNote,
                great,
                bad,
                miss
            );
            if (ability.life > 0) {
                nextSongData++;
                if (nextSongData < 4) {
                    remainLife.textContent = `${ability.life.toFixed(2)}%`;
                    songName.textContent =
                        SD.testLevels[ability.difficulty][nextSongData].name;
                    songImage.src =
                        SD.testLevels[ability.difficulty][nextSongData].picture;
                    greatVal.value = "";
                    badVal.value = "";
                    missVal.value = "";
                } else {
                    alert("Cleared!!");
                    window.location.reload();
                }
            } else {
                alert("Game Over: Life is zero");
                window.location.reload();
            }
        }
    });
}
