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
    let lastdate = new Date(new_data[new_data.length-1]["着手計画日"])
    let s = lastdate.getDate() - _date.getDate();
    let rowNum = s/7 +1;
    function toString(date, day){
        return (date.getMonth()+1) + '/' + date.getDate() + '(' + weeks[day] +')';
    }
    for(var i =0;i < rowNum;i++){
        var main_tr = document.createElement('tr');
        var sub_tr = document.createElement('tr');
        for(var day = 0;day<weeks.length;day++){
            console.log("main: " +_date)
            _date.setDate(_date.getDate() + 1);
            // 日付行
            let th = document.createElement('th');
            th.textContent = toString(_date, day);
            main_tr.appendChild(th);

            // データ行
            let td = document.createElement('td');
            td.appendChild(createSubTable(_date));

            sub_tr.appendChild(td);
        }
        grid.appendChild(main_tr);
        grid.appendChild(sub_tr);
        _date.setDate(_date.getDate() + 1);
    }
    function createSubTable(date){
        let subtable = document.createElement('table');
        subtable.id = toStringDate(date);
        subtable.className = "sub_grid";
        return subtable;
    }
    reflect();

}

function toStringDate(date){
    return date.getFullYear() + "_" + (date.getMonth()+1) + "_" + date.getDate();
}

function post(url){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', "/grid", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    //xhr.onreadystatechange = function() {
    //  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //    console.log('xhr');
    //    console.log(xhr.responseText);
    //  }
    //}

    xhr.onload = function () { //受信成功時
        if (xhr.status === 200) {
            console.log(xhr.responseText); //JSON
            var data = JSON.parse(xhr.responseText);
            console.log(data); //js Object
        } else {
            console.log("Error1: " + xhr.statusText);
        }
    };
    xhr.onerror = function () { //受信失敗時
        console.log("Error2");
    };
}