// Import song datas
import { testLevels } from "./SongData.js";
import { PhigrosAbility } from "./PhigrosAbility.js";

// Start the phigros ability
let nextSongData = 0;
let ability: PhigrosAbility;
let mainShow = document.querySelector("#main-show") as HTMLDivElement;
let takeLevel = document.querySelector(
    "#select-difficulty"
) as HTMLSelectElement;
window.onbeforeunload = () => {
    takeLevel.value = "Choose here";
};
takeLevel.addEventListener("change", startPhigrosAbility);

// Main part of the phigros test
function startPhigrosAbility(e: Event) {
    // Collect datas
    let greatVal = document.querySelector("#great-val") as HTMLInputElement;
    let badVal = document.querySelector("#bad-val") as HTMLInputElement;
    let missVal = document.querySelector("#miss-val") as HTMLInputElement;
    let songName = document.querySelector("#song-name") as HTMLHeadElement;
    let songImage = document.querySelector("#song-img") as HTMLImageElement;
    let remainLife = document.querySelector("#current-life") as HTMLHeadElement;

    // Collect the level of the ability test
    var submitBtn = document.querySelector("input[type='submit']")!;

    e.preventDefault();
    mainShow.classList.remove("hidden");
    mainShow.classList.add("grid");
    mainShow.classList.add("md:grid-cols-2");
    mainShow.classList.add("xl:grid-cols-4");

    // Initial variables
    nextSongData = 0;
    ability = new PhigrosAbility(takeLevel.value);
    localStorage.setItem("cur-diff", takeLevel.value);

    // Change a name and a picture of a given song
    remainLife.textContent = `${ability.life}%`;
    songName.textContent = testLevels[ability.difficulty][nextSongData].name;
    songImage.src = testLevels[ability.difficulty][nextSongData].picture;

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        var great = parseInt(greatVal.value);
        var bad = parseInt(badVal.value);
        var miss = parseInt(missVal.value);
        if (Number.isNaN(great) || Number.isNaN(bad) || Number.isNaN(miss)) {
        } else {
            ability.changeLife(
                testLevels[ability.difficulty][nextSongData].totalNote,
                great,
                bad,
                miss
            );
            if (ability.life > 0) {
                nextSongData++;
                if (nextSongData < 4) {
                    remainLife.textContent = `${ability.life.toFixed(2)}%`;
                    songName.textContent =
                        testLevels[ability.difficulty][nextSongData].name;
                    songImage.src =
                        testLevels[ability.difficulty][nextSongData].picture;
                    greatVal.value = "";
                    badVal.value = "";
                    missVal.value = "";
                } else {
                    alert("Cleared!!");
                    localStorage.setItem(
                        "remaining-life",
                        ability.life.toFixed(2).toString()
                    );
                    window.document.location.pathname = "./success.html";
                }
            } else {
                alert("Game Over: Life is zero");
                window.document.location.pathname = "./failed.html";
            }
        }
    });
}
