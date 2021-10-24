import React from "react";
import { Link } from "react-router-dom";
import './css/MainPage.css';
import WorkerInfoCharts from "../organisms/WorkerInfoCharts"
import RecommendProducts from "../organisms/RecommendProducts"

const MainPage: React.FC = () => {
  return (
    <div>
      <header>
        <h4>LoginID: XXXX</h4>
      </header>
      <WorkerInfoCharts />
      <RecommendProducts />
      <br/>
      <br/>
      <Link to="/">Loginページに戻る</Link>
    </div>
  );
};

export default MainPage;
