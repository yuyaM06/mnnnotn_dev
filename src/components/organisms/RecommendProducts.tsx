import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import postProductAction from '../postProductAction';
import { Link } from "react-router-dom";

// UI
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// Loading Icon
import Loader from 'react-loader-spinner'

// テスト用のjsonファイル
import ProductSample from '../json/products.json';
// DB サーバに投げる症状を分析するやつ
import {getSympton} from '../getSympton'


const prodStyle = {
  figure: {
    width: '100%'
  },
  prodName: {
    fontSize: '15px',
  },
  prodDesc: {
    fontSize: '12px',
  },
  prodPrice: {
    fontSize: '12px',
    'font-weight': 'bold',
  },
  prodRelease: {
    fontSize: '10px',
  },
  prodRegion: {
    fontSize: '10px',
  },
  prodNutrition: {
    fontSize: '10px',
  },
  prodAllergy: {
    fontSize: '10px',
  }
};

const reasonStyle = {
  head: {
    fontSize: '20px',
  },
  item: {
    fontSize: '10px',
  }
};

const linkStyle = {
  fontSize: '15px',
  color: '#00f'
};

const buttonStyle = {
  fontSize: '10px',
  margin: '0 auto'
};

// Loading-Icon を表示させるフラグ
let loadingFlag = false
// Loadingしている風の時間 [msec]
const loadTime = 2000

// DBサーバ（APIサーバ）に投げる用のdata（post req.body）
const postData = {
  "sympton": "睡眠不足"
}




const RecommendProducts = (): JSX.Element => {
  const dispatch = useDispatch()

  const buttonAlert = async () => {
    loadingFlag = true
    await new Promise(resolve => setTimeout(resolve, loadTime)) //loadTimeだけ待つ
    dispatch(postProductAction(postData))

  }

  const state = useSelector((state: RootState) => state.postProductReducer)

  return (
    <div>

      <Grid container alignItems="center" justify="center">
        <Grid item xs>
        <Button onClick={buttonAlert} style={buttonStyle} variant="contained" color="primary">
          あなたのワークスタイルを分析
        </Button>
        </Grid>
      </Grid>

      <Grid container alignItems="center" justify="center">
        <Grid item xs={1} style={{ display: state.productShowFlag ? '' : 'none' }}>
          <Loader
             type="Audio"
             color="#191970"
             height={180}
             width={180}
             timeout={loadTime} //loadTimeだけ画面表示
          />
          {loadingFlag=true}
        </Grid>
      </Grid>


      <p style={{fontSize: '25px', display: state.productShowFlag ? '' : 'none' }}>あなたにオススメの商品は...</p>

      <Box>
            <Grid container spacing={1}
              style={{border: '2px solid #000000', display: state.productShowFlag ? '' : 'none' }}>
              <Grid item xs style={{ display: state.productShowFlag ? '' : 'none' }}>
                <img src={state.figURL} style={prodStyle.figure} />
              </Grid>

              <Grid item xs style={{ display: state.productShowFlag ? '' : 'none' }}>
                <p style={prodStyle.prodName}>{state.prodName}</p>
                <p style={prodStyle.prodDesc}>{state.description}</p>
                <p style={prodStyle.prodPrice}>{state.price} 円（税抜）</p>
                <p style={prodStyle.prodRelease}>発売日 {state.date}</p>
                <p style={prodStyle.prodRegion}>販売地域 {state.region}</p>
                <p style={prodStyle.prodNutrition}>熱量：{state.calory} kcal  タンパク質：{state.protein} g</p>
                <p style={prodStyle.prodNutrition}>脂質：{state.lipid} g  炭水化物：{state.carbonhydrates} g</p>
                <p style={prodStyle.prodNutrition}>糖質：{state.sugar} g  食物繊維：{state.fiber} g</p>
                <p style={prodStyle.prodNutrition}>食塩相当量：{state.scequiv} g</p>
                <p style={prodStyle.prodAllergy}>本製品に含まれるアレルギー物質：{state.allergy}</p>
              </Grid>
            </Grid>

            <Grid item xs style={{ display: state.productShowFlag ? '' : 'none' }}>
              <p style={reasonStyle.head}>こんなあなたにオススメ！</p>
              <p style={reasonStyle.item}>・オススメ理由①</p>
              <p style={reasonStyle.item}>・オススメ理由②</p>
              <Link to="/HealthColumnPage">詳しく見る</Link>
            </Grid>
      </Box>

      <br />
      <br />
      <br />
      
      <hr />
      <h4>デバッグ用だよ</h4>
      <label>{state.status}</label>
      <br />
      <label>{state.prodID}</label>
      <br />
      <label>{state.prodName}</label>
      <br />
      <label>{state.description}</label>
      <br />
      <label>{state.price}</label>
      <br />
      <label>{state.date}</label>
      <br />
      <label>{state.calory}</label>
      <br />
      <label>{state.protein}</label>
      <br />
      <label>{state.lipid}</label>
      <br />
      <label>{state.carbonhydrates}</label>
      <br />
      <label>{state.sugar}</label>
      <br />
      <label>{state.fiber}</label>
      <br />
      <label>{state.scequiv}</label>
      <br />
      <label>{state.region}</label>
      <br />
      <label>{state.allergy}</label>
      <br />
      <img src={state.figURL} />
    </div>
  );
}

export default RecommendProducts;
