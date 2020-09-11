class SongData {
    name: string;
    songLevel: { difficulty: string; level: number };
    picture: string;
    totalNote: number;

    constructor(
        name: string,
        songLevel: { difficulty: string; level: number },
        picture: string,
        totalNote: number
    ) {
        this.name = name;
        this.songLevel = songLevel;
        this.picture = picture;
        this.totalNote = totalNote;
    }
}

export let levelName: string[] = ["???", "皆傳", "中傳", "十段", "九段"];

export let testLevels: SongData[][] = [];
// Data of 皆傳
testLevels.push([
    new SongData(
        "Palescreen",
        { difficulty: "Insane", level: 15 },
        "https://vignette.wikia.nocookie.net/phigros/images/1/1d/Palescreen_jacket.png/revision/latest/scale-to-width-down/690?cb=20200619093557",
        1059
    ),
    new SongData(
        "狂喜蘭舞",
        { difficulty: "Another", level: 16 },
        "https://vignette.wikia.nocookie.net/phigros/images/6/6e/%E7%8B%82%E5%96%9C%E8%98%AD%E8%88%9E_jacket.png/revision/latest/scale-to-width-down/690?cb=20200329130845",
        1209
    ),
    new SongData(
        "望影の方舟Six",
        { difficulty: "Insane", level: 15 },
        "https://vignette.wikia.nocookie.net/phigros/images/6/62/%E6%9C%9B%E5%BD%B1%E3%81%AE%E6%96%B9%E8%88%9FSix_jacket.png/revision/latest?cb=20200901051750",
        1066
    ),
    new SongData(
        "Igallta",
        { difficulty: "Another", level: 16 },
        "https://vignette.wikia.nocookie.net/phigros/images/5/5d/Igallta_jacket.png/revision/latest/scale-to-width-down/690?cb=20200901051311",
        1114
    ),
]);

// Data of 中傳
testLevels.push([
    new SongData(
        "GOODFORTUNE",
        { difficulty: "Insane", level: 15 },
        "https://vignette.wikia.nocookie.net/phigros/images/a/a6/GOODFORTUNE_jacket.png/revision/latest/scale-to-width-down/690?cb=20200717162111",
        1011
    ),
    new SongData(
        "CROSS†SOUL",
        { difficulty: "Insane", level: 15 },
        "https://vignette.wikia.nocookie.net/phigros/images/1/13/CROSS%E2%80%A0SOUL_jacket.png/revision/latest/scale-to-width-down/690?cb=20200501090954",
        1305
    ),
    new SongData(
        "RIPPER",
        { difficulty: "Insane", level: 15 },
        "https://vignette.wikia.nocookie.net/phigros/images/0/0f/RIPPER_%28new%29_jacket.png/revision/latest/scale-to-width-down/690?cb=20200321001617",
        1093
    ),
    new SongData(
        "Spasmodic",
        { difficulty: "Another", level: 16 },
        "https://vignette.wikia.nocookie.net/phigros/images/1/1d/Spasmodic_jacket.png/revision/latest/scale-to-width-down/690?cb=20200329125334",
        1671
    ),
]);

// Data of 十段
testLevels.push([
    new SongData(
        "Khronostasis Katharsis",
        { difficulty: "Insane", level: 14 },
        "https://vignette.wikia.nocookie.net/phigros/images/1/11/Khronostasis_Katharsis_jacket.png/revision/latest/scale-to-width-down/690?cb=20200329131015",
        883
    ),
    new SongData(
        "Cereris",
        { difficulty: "Insane", level: 14 },
        "https://vignette.wikia.nocookie.net/phigros/images/a/a4/Cereris_jacket.png/revision/latest/scale-to-width-down/690?cb=20200319104857",
        894
    ),
    new SongData(
        "Reimei",
        { difficulty: "Insane", level: 15 },
        "https://vignette.wikia.nocookie.net/phigros/images/5/55/Reimei_jacket.png/revision/latest/scale-to-width-down/690?cb=20200329125155",
        983
    ),
    new SongData(
        "GOODRAGE",
        { difficulty: "Insane", level: 15 },
        "https://vignette.wikia.nocookie.net/phigros/images/1/11/GOODRAGE_jacket.png/revision/latest/scale-to-width-down/690?cb=20200717162227",
        1034
    ),
]);

// Data of 九段
testLevels.push([
    new SongData(
        "Disorder",
        { difficulty: "Insane", level: 14 },
        "https://vignette.wikia.nocookie.net/phigros/images/7/7d/Disorder_jacket.png/revision/latest/scale-to-width-down/690?cb=20200501091012",
        918
    ),
    new SongData(
        "ENERGY SYNERGY MATRIX",
        { difficulty: "Insane", level: 14 },
        "https://vignette.wikia.nocookie.net/phigros/images/3/3d/ESMBG.png/revision/latest/scale-to-width-down/690?cb=20190929145619",
        615
    ),
    new SongData(
        "もぺもぺ",
        { difficulty: "Another", level: 14 },
        "https://vignette.wikia.nocookie.net/phigros/images/b/be/MopemopeBG.png/revision/latest/scale-to-width-down/690?cb=20190929013049",
        720
    ),
    new SongData(
        "Cipher : /2&//<|0",
        { difficulty: "Insane", level: 14 },
        "https://vignette.wikia.nocookie.net/phigros/images/0/0d/Cipher_jacket.png/revision/latest/scale-to-width-down/690?cb=20200319054758",
        969
    ),
]);
