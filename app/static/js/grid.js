let data = {
    "工番":["AAAAA","BBBBB","CCCCC","DDDDD", "EEEEE"],
    "型名":["SAMPLE_A","SAMPLE_B","SAMPLE_C","SAMPLE_D", "SAMPLE_E"],
    "着手計画日":[new Date(2023/8/23),new Date(2023/8/23),new Date(2023/8/23),new Date(2023/8/23), new Date(2023/8/23)],
}
let new_data = [
    {"工番":"AAAAA", "型名": "SAMPLE_1", "着手計画日":"2023/8/23"},
    {"工番":"BBBBB", "型名": "SAMPLE_2", "着手計画日":"2023/8/23"},
    {"工番":"CCCCC", "型名": "SAMPLE_3", "着手計画日":"2023/8/24"},
    {"工番":"DDDDD", "型名": "SAMPLE_4", "着手計画日":"2023/8/25"},
    {"工番":"EEEEE", "型名": "SAMPLE_5", "着手計画日":"2023/8/27"},
]
const weeks = ["月","火","水","木","金"]
window.onload = OnLoad()

function OnLoad(){
    var grid = document.getElementById('grid');
    var _date = new Date(new_data[0]["着手計画日"]);
    _date.setDate(_date.getDate() - _date.getDay());

    function toString(date, day){
        return (date.getMonth()+1) + '/' + date.getDate() + '(' + weeks[day] +')';
    }
    for(var i =0;i < 10;i++){
        var main_tr = document.createElement('tr');
        var sub_tr = document.createElement('tr');
        for(var day = 0;day<weeks.length;day++){
            // 日付行
            let th = document.createElement('th');
            th.textContent = toString(_date, day);
            main_tr.appendChild(th);

            // データ行
            let td = document.createElement('td');
            td.appendChild(createSubTable(_date));
            sub_tr.appendChild(td);

            _date.setDate(_date.getDate() + 1);
        }
        grid.appendChild(main_tr);
        grid.appendChild(sub_tr);
        _date.setDate(_date.getDate() + 2);
    }

    reflect();
}

function reflect(){
    for(var i =0;i<new_data.length;i++){
        let d = new Date(new_data[i]["着手計画日"])
        let grid = document.getElementById(toStringDate(d));
        let tr = document.createElement('tr');
        let keys = Object.keys(new_data[0])
        for(var j=0;j<keys.length;j++){
            let td = document.createElement('td');
            td.textContent = new_data[i][keys[j]];
            tr.appendChild(td);    
        }
        grid.appendChild(tr);
    }
}

function createSubTable(date){
    let subtable = document.createElement('table');
    subtable.id = toStringDate(date);
    subtable.className = "sub_grid";
    let tr = document.createElement('tr');
    var cols = Object.keys(new_data[0]);
    for(var i =0;i<cols.length;i++){
        let th = document.createElement('th');
        th.textContent = cols[i];
        tr.appendChild(th);
    }
    subtable.appendChild(tr);
    return subtable;
}

function toStringDate(date){
    return date.getFullYear() + "_" + (date.getMonth()+1) + "_" + date.getDate();
}

