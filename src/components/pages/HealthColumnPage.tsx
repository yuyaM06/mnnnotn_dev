import React from 'react';
import { Link } from "react-router-dom";
import './css/HealthColumnPage.css';

const HealthColumnPage: React.FC = () => {
  return (
    <div>
      <h5>健康コラムページだよ </h5>
      <Link to="/MainPage">メインページに戻る</Link>
    </div>
  );
}

export default HealthColumnPage;
