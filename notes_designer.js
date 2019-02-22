// 難易度
const BASIC = 1;
const ADVANCED = 2;
const EXPERT = 3;
const MASTER = 4;

// 難易度文字列を数値に変換
const difficulty_to_nat = function(str){
    switch (str){
    case "M":
        return MASTER;
        break;
    case "E":
        return EXPERT;
        break;
    case "A":
        return ADVANCED;
        break;
    default:
        return BASIC;
    }
}

const MUSICTITLE = 0;
const DIFFICULTY = 1;

// table要素を全て取得
let table_list = document.getElementsByTagName("table");

// 譜面製作者情報(目的の値)
let data = [];

for (let i = 0; i < 7; i += 1){
    let table = table_list[i];
    
    // 譜面制作した曲データ取得
    let music_data = [];

    // 1行前の曲情報
    // 複数難易度を担当してる場合に対応
    let before_music_title = "";
    
    // 譜面制作した曲データ取得
    for (let j = 0; j < table.rows.length; j += 1){
        let first_elem = table.rows[j].cells[MUSICTITLE].textContent;
        if (first_elem == "M" || first_elem == "E"){
            // 曲のタイトルが潰れてる
            music_data.push({title: before_music_title, diff: difficulty_to_nat(first_elem)});
        } else {
            before_music_title = first_elem;
            let music_diff = difficulty_to_nat(table.rows[j].cells[DIFFICULTY].textContent);
            music_data.push({title: first_elem, diff: music_diff});            
        }
    }

    data.push({designerID: i, musics: music_data});
}
