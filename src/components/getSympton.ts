import personalInfo from './personal_worktime_info_regular.json';
// import personalInfo from './personal_worktime_info_DeputyChief.json';
// import personalInfo from './personal_worktime_info_SeniorProfession.json';

export function getSympton(): string {
    // 曜日day（0:Mon, 1:Tue, 2:Wed, 3:Thu, 4:Fri）
    const day = 4;
    let thedaybeforeyesterday = day -1;
    if (thedaybeforeyesterday < 0) {
        thedaybeforeyesterday = 4;
    }

    const sympton : string[] = ["睡眠不足", "運動不足", "慢性的疲労", "眼精疲労", "集中力低下，頭痛", "腰痛，肩こり", "免疫低下", "過度なストレス状態", "該当なし"];

    const severity : number[] = [0, 0, 0, 0, 0, 0, 0, 0];
    //パーソナル情報と症状の関連度
    const matrix : number[][] = [
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 1, 1, 0, 0, 0.5],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [1, 0, 1, 0, 1, 0, 0, 0.5],
        [0, 1, 0, 0, 0.5, 0, 0, 0],
        [1, 0, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 1, 1, 0]
    ]

    //前日の出勤時刻を取得
    let startyesterdaystr = personalInfo.personalinfo[day].startTime;
    let startyesterday = new Date(startyesterdaystr);
    let starthour_yesterday = startyesterday.getHours();
    //前々日tdby（the day before yesterday）の出勤時刻を取得
    let starttdbystr = personalInfo.personalinfo[thedaybeforeyesterday].startTime;
    let starttdby = new Date(starttdbystr);
    let starthour_tdby = starttdby.getHours();

    // 前日の退勤時刻を取得
    let endyesterdaystr = personalInfo.personalinfo[day].endTime;
    let endyesterday = new Date(endyesterdaystr);
    let endhour_yesterday = endyesterday.getHours();
    // 前々日の退勤時刻を取得
    let endtdbystr = personalInfo.personalinfo[thedaybeforeyesterday].endTime;
    let endtdby = new Date(endtdbystr);
    let endhour_tdby = endtdby.getHours();

    // 出勤時刻が8時以前
    if (starthour_yesterday < 8) {
        for (let i = 0; i < 8; i++) {
            severity[i] += matrix[0][i];
        }
    }
    // 退勤時刻が21時以降
    if (endhour_yesterday >= 21 || endhour_yesterday < 5) {
        for (let i = 0; i < 8; i++) {
            severity[i] += matrix[1][i];
        }
    }
    // 会議参加時間が1日4時間以上
    if (personalInfo.personalinfo[day].meetingHours >= 4) {
        for (let i = 0; i < 8; i++) {
            severity[i] += matrix[2][i];
        }
    }
    // 開発時間が1日4時間以上
    if (personalInfo.personalinfo[day].devHours >= 4) {
        for (let i = 0; i < 8; i++) {
            severity[i] += matrix[3][i];
        }
    }
    //出勤時刻の差あるいは退勤時刻の差が2時間以上
    if (Math.abs(starthour_yesterday - starthour_tdby) >= 2 || Math.abs(endhour_yesterday - endhour_tdby) >= 2) {
        for (let i = 0; i < 8; i++) {
            severity[i] += matrix[4][i];
        }
    }
    // 在宅勤務が週3日以上
    if (personalInfo.personalinfo[day].teleworkDaysCount >= 3) {
        for (let i = 0; i < 8; i++) {
            severity[i] += matrix[5][i];
        }
    }
    // 業務時間が週50時間以上
    if (personalInfo.personalinfo[0].dailyWorkHours + personalInfo.personalinfo[1].dailyWorkHours
        + personalInfo.personalinfo[2].dailyWorkHours + personalInfo.personalinfo[3].dailyWorkHours
        + personalInfo.personalinfo[4].dailyWorkHours >= 50) {
        for (let i = 0; i < 8; i++) {
            severity[i] += matrix[6][i];
        }
    }
    // 運動時間が1日に0.5時間以下、あるいは歩数が1日に3000歩以下
    if (personalInfo.personalinfo[day].exerciseHours <= 0.5
        || personalInfo.personalinfo[day].steps < 3000) {
        for (let i = 0; i < 8; i++) {
            severity[i] += matrix[7][i];
        }
    }

    console.log(severity);
    //severity[i]の総和を計算
    let total_severity = severity.reduce(function(sum, element){return sum + element;}, 0);
    console.log(total_severity);

    // 1つ以上の症状に該当する場合の処理
    if (total_severity > 0) {
        //severity[i]を降順にランキング付け
        let sorted = severity.slice().sort(function(a, b){return b - a});
        var ranks = severity.slice().map(function(x){return sorted.indexOf(x) + 1});
        console.log(ranks);

        //severity[i]が最大値のときのインデックスiを取得
        let max = Math.max(...severity);
        var index_array = new Array();
        var index = severity.indexOf(max);
        while(index !== -1) {
            index_array.push(index);
            index = severity.indexOf(max, index+1);
        }
        console.log(index_array);
        // console.log(index);
        // 同率1位の場合はランダムに選択
        if (index_array.length > 1) {
            index = index_array[Math.floor(Math.random() * index_array.length)];
        } else if (index_array.length = 1) {
            index = index_array[0];
        }
        console.log(index);
        console.log(sympton[index]);
        return sympton[index];
    } else {
        console.log(sympton[8]);
        return sympton[8];
    }
}
