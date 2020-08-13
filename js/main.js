// Import song datas
import * as SD from "./SongData.js";
import { PhigrosAbility } from "./ability.js";
// Start the phigros ability
var mainShow = document.querySelector("#main-show");
var takeLevel = document.querySelector("#level-select");
window.onbeforeunload = () => {
    takeLevel.value = "Choose here";
};
takeLevel.addEventListener("change", startPhigrosAbility);
function startPhigrosAbility(e) {
    e.preventDefault();
    mainShow.style.display = "block";
    // Collect the level of the ability test
    var submitBtn = document.querySelector("input[type='submit']");
    // Collect datas
    var greatVal = document.querySelector("#great-val");
    var badVal = document.querySelector("#bad-val");
    var missVal = document.querySelector("#miss-val");
    var songName = document.querySelector("#song-name");
    var songImage = document.querySelector("#song-img");
    // Initial variables
    var nextSongData = 0;
    var ability = new PhigrosAbility(takeLevel.value);
    // console.log(ability.difficulty);
    // Change a name and a picture of a given song
    songName.textContent = SD.testLevels[ability.difficulty][nextSongData].name;
    songImage.src = SD.testLevels[ability.difficulty][nextSongData].picture;
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        ability.changeLife(SD.testLevels[ability.difficulty][nextSongData].totalNote, greatVal.value, badVal.value, missVal.value);
        if (ability.life > 0) {
            console.log(ability.life);
            nextSongData++;
            if (nextSongData < 4) {
                songName.textContent =
                    SD.testLevels[ability.difficulty][nextSongData].name;
                songImage.src =
                    SD.testLevels[ability.difficulty][nextSongData].picture;
            }
        }
        else {
            console.log(ability.life);
        }
    });
}
