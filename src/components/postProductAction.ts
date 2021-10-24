import axios from 'axios';
import { Action, POST_PRODUCT_REQUEST, POST_PRODUCT_SUCCESS, POST_PRODUCT_FAILURE } from './action';

const postProductRequest = (): Action => {
  return {
    type: POST_PRODUCT_REQUEST,
    payload: null
  }
}

const postProductSuccess = (json: any): Action => {  //Objectだとunknownが渡されてうまく動かなかった
  return {
    type: POST_PRODUCT_SUCCESS,
    payload: json
  }
}

const postProductFailure = (error: Object): Action => {
  return {
    type: POST_PRODUCT_FAILURE,
    payload: error
  }
}

// const data = {
//   "sympton": "睡眠不足"
// }

const postProductAction = (postData: any) => {
  return async (dispatch: any) => {
    dispatch(postProductRequest())
    return await axios.post('http://localhost:3100/product/', postData)
      .then(res => {
        console.log(res.data)
        console.log("dispatch start")
        dispatch(postProductSuccess(res.data))
        console.log("dispatch end")
      }
      ).catch(err => {
        console.log(err)
        dispatch(postProductFailure(err))
      })
  }
}


export default postProductAction;
