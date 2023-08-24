let data = [
    {"工番":"AAAAA", "型名": "SAMPLE_1", "着手計画日":new Date(2023/8/23)},
    {"工番":"BBBBB", "型名": "SAMPLE_2", "着手計画日":new Date(2023/8/23)},
    {"工番":"CCCCC", "型名": "SAMPLE_3", "着手計画日":new Date(2023/8/24)},
    {"工番":"DDDDD", "型名": "SAMPLE_4", "着手計画日":new Date(2023/8/25)},
    {"工番":"EEEEE", "型名": "SAMPLE_5", "着手計画日":new Date(2023/8/27)},
]
var weeks = ["月","火","水","木","金"]
window.onload = OnLoad()

function OnLoad(){
    //document.writeln('a');
    var grid = document.getElementById('grid');
    var today = new Date();
    var startDayOfWeek = new Date(today.year, today.month - 1, 1).getDay();
    var countDay = 0;
    var monthOfEndDay = new Date(today.year, today.month, 0).getDate();
    document.writeln(startDayOfWeek);
    for(var i =0;i < 100;i++){
        document.writeln(i);
        var tr_day = document.createElement('tr');
        for(var day = 0;day<weeks.length;day++){
            document.writeln(day);
            var td_day = document.createElement('td');
            var today_day = startDayOfWeek.setDate(startDayOfWeek.getDate() + day);
            document.writeln(today_day);
            td_day.textContent = today_day.month + '/' + today_day.day + '(' + weeks[day] +')';
            tr_day.appendChild(td_day);
        }
        grid.appendChild(tr_day);
        // var tr_subtable = document.createElement('tr');
        // for(var day = 0;day<weeks.length;day++){
        //     // １行目で開始曜日と同じ場合
        //     if (i == 0 && j == startDayOfWeek) {
        //         // 日付+1
        //         countDay++;
        //         var td = document.createElement('td');
        //         td.className = 'with_date';
        //         td.innerHTML = countDay;    
        //     }
        //     else if (countDay != 0 && countDay < monthOfEndDay) {
        //         // 日付が0以外で、日付が末日より小さい場合
        //         // 日付+1
        //         countDay++;
        //         // tdタグ（日付有りが分かるようにクラス属性に"with_date"を設定）
        //         _html += '<td class="with_date">' + countDay + '</td>';
        //     }
        //     else {
        //         // tdタグ（日付無しが分かるようにクラス属性に"no_date"を設定）
        //         _html += '<td class="no_date"></td>';
        //     }
        // }
    }

    
}

function createSubTable(){
    var subtable = document.createElement('table');

}