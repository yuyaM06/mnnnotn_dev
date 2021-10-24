import React from "react";
import {
  Bar, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

// 外部データとしてjsonファイルを定義
// 最終的にはapiを叩く
// import pwInfoJson from "../json/personal_worktime_info_Regular_pre.json";
// import pwInfoJson from "../json/personal_worktime_info_Regular.json";
// import pwInfoJson from "../json/personal_worktime_info_SeniorProfession.json";
import pwInfoJson from "../json/personal_worktime_info_DeputyChief.json";

// jsonファイルの配列をchartに渡すための変数
const pwInfo = pwInfoJson.personalinfo;

// カラーを用意する。
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const WorkTimeBarChart = (): JSX.Element => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        >
        <h2>あなたのワークスタイル</h2>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart width={800} height={200} data={pwInfo}>
          <XAxis dataKey="date" padding={{ right: 50, left: 50 }} />
          <YAxis
            yAxisId={1}
            label={{ value: "合計時間 [h]", angle: -90, dx: -20 }}
          />
          <YAxis
            yAxisId={2}
            orientation="right"
            domain={[0, 5]}
            tickCount={6}
            label={{ value: "全社平均 [h]", angle: 90, dx: 10 }}
          />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar yAxisId={1} dataKey="meetingHours" name="会議"stackId="a" barSize={50} fill="#FF8042"
          />
          <Bar yAxisId={1} dataKey="devHours" name="開発" stackId="a" fill="#FFBB28" />
          <Bar yAxisId={1} dataKey="clericalWorkHours" name="事務作業" stackId="a" fill="#00C49F" />
          <Bar yAxisId={1} dataKey="seminarHours" name="セミナー" stackId="a" fill="#0088FE" />
          <Bar yAxisId={1} dataKey="trainingHours" name="研修" stackId="a" fill="#191970" />
          <Bar yAxisId={1} dataKey="breakTime" name="休憩" stackId="a" fill="#8a2be2" />
          <Line yAxisId={2} dataKey="あなたと同じ職種平均" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export default WorkTimeBarChart;
