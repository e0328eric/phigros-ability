class SongData {
    name: string;
    picture: string;
    totalNote: number;

    constructor(name: string, picture: string, totalNote: number) {
        this.name = name;
        this.picture = picture;
        this.totalNote = totalNote;
    }
}

export let levelName: string[] = ["???", "皆傳", "中傳", "十段", "九段"];

export let testLevels: SongData[][] = [];
// Data of 皆傳
testLevels.push([
    new SongData(
        "Aleph-0 (IN: lv15)",
        "https://vignette.wikia.nocookie.net/phigros/images/c/c7/Aleph-0_jacket.png/revision/latest/scale-to-width-down/690?cb=20200329131335",
        684
    ),
    new SongData(
        "Chronostasis (IN: lv15)",
        "https://vignette.wikia.nocookie.net/phigros/images/9/97/Chronostasis_jacket.png/revision/latest/scale-to-width-down/690?cb=20200320103915",
        1156
    ),
    new SongData(
        "Palescreen (IN: lv15)",
        "https://vignette.wikia.nocookie.net/phigros/images/1/1d/Palescreen_jacket.png/revision/latest/scale-to-width-down/690?cb=20200619093557",
        1059
    ),
    new SongData(
        "狂喜蘭舞 (AT: lv16)",
        "https://vignette.wikia.nocookie.net/phigros/images/6/6e/%E7%8B%82%E5%96%9C%E8%98%AD%E8%88%9E_jacket.png/revision/latest/scale-to-width-down/690?cb=20200329130845",
        1209
    ),
]);

// Data of 中傳
testLevels.push([
    new SongData(
        "GOODFORTUNE (IN: lv15)",
        "https://vignette.wikia.nocookie.net/phigros/images/a/a6/GOODFORTUNE_jacket.png/revision/latest/scale-to-width-down/690?cb=20200717162111",
        1011
    ),
    new SongData(
        "CROSS†SOUL (IN: lv15)",
        "https://vignette.wikia.nocookie.net/phigros/images/1/13/CROSS%E2%80%A0SOUL_jacket.png/revision/latest/scale-to-width-down/690?cb=20200501090954",
        1305
    ),
    new SongData(
        "RIPPER (IN: lv15)",
        "https://vignette.wikia.nocookie.net/phigros/images/0/0f/RIPPER_%28new%29_jacket.png/revision/latest/scale-to-width-down/690?cb=20200321001617",
        1093
    ),
    new SongData(
        "Spasmodic (AT: lv16)",
        "https://vignette.wikia.nocookie.net/phigros/images/1/1d/Spasmodic_jacket.png/revision/latest/scale-to-width-down/690?cb=20200329125334",
        1671
    ),
]);

// Data of 十段
testLevels.push([
    new SongData(
        "Khronostasis Katharsis (IN: lv14)",
        "https://vignette.wikia.nocookie.net/phigros/images/1/11/Khronostasis_Katharsis_jacket.png/revision/latest/scale-to-width-down/690?cb=20200329131015",
        883
    ),
    new SongData(
        "Cereris (IN: lv14)",
        "https://vignette.wikia.nocookie.net/phigros/images/a/a4/Cereris_jacket.png/revision/latest/scale-to-width-down/690?cb=20200319104857",
        894
    ),
    new SongData(
        "Reimei (IN: lv15)",
        "https://vignette.wikia.nocookie.net/phigros/images/5/55/Reimei_jacket.png/revision/latest/scale-to-width-down/690?cb=20200329125155",
        983
    ),
    new SongData(
        "GOODRAGE (IN: lv15)",
        "https://vignette.wikia.nocookie.net/phigros/images/1/11/GOODRAGE_jacket.png/revision/latest/scale-to-width-down/690?cb=20200717162227",
        1034
    ),
]);

// Data of 九段
testLevels.push([
    new SongData(
        "Disorder (IN: lv14)",
        "https://vignette.wikia.nocookie.net/phigros/images/7/7d/Disorder_jacket.png/revision/latest/scale-to-width-down/690?cb=20200501091012",
        918
    ),
    new SongData(
        "ENERGY SYNERGY MATRIX (IN: lv14)",
        "https://vignette.wikia.nocookie.net/phigros/images/3/3d/ESMBG.png/revision/latest/scale-to-width-down/690?cb=20190929145619",
        615
    ),
    new SongData(
        "もぺもぺ (AT: lv14)",
        "https://vignette.wikia.nocookie.net/phigros/images/b/be/MopemopeBG.png/revision/latest/scale-to-width-down/690?cb=20190929013049",
        720
    ),
    new SongData(
        "Cipher : /2&//<|0 (IN: lv14)",
        "https://vignette.wikia.nocookie.net/phigros/images/0/0d/Cipher_jacket.png/revision/latest/scale-to-width-down/690?cb=20200319054758",
        969
    ),
]);
