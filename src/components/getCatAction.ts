import axios from 'axios';
import {Action, GET_CAT_REQUEST, GET_CAT_SUCCESS, GET_CAT_FAILURE} from './action';

const getCatRequest = (): Action => {
  return {
    type: GET_CAT_REQUEST,
    payload: null
  }
}

const getCatSuccess = (json: unknown): Action => {  //Objectだとunknownが渡されてうまく動かなかった
  return {
    type: GET_CAT_SUCCESS,
    payload: json
  }
}

const getCatFailure = (error: Object): Action => {
  return{
    type: GET_CAT_FAILURE,
    payload: error
  }
}

const getCatAction = () => {
  return (dispatch: any) => {
    dispatch(getCatRequest())
    return axios.get(`https://api.thecatapi.com/v1/images/search`)
      .then(res =>
        dispatch(getCatSuccess(res.data))
      ).catch(err =>
        dispatch(getCatFailure(err))
      )
  }
}

export default getCatAction;
