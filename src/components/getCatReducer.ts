import {CatState} from './store';
import {Action, GET_CAT_REQUEST, GET_CAT_SUCCESS, GET_CAT_FAILURE} from './action';

const initalState:CatState = {
  status: "",
  url: "",
  lastUpdated: Date.now()
}

const getCatReducer = (state:CatState = initalState, action:Action):CatState => {
  switch (action.type) {
    case GET_CAT_REQUEST:
      return ({
        status: "Fetching",
        url: "",
        lastUpdated: Date.now()
      })
    case GET_CAT_SUCCESS:
      return ({
        status: "Success",
        url: action.payload[0].url,
        lastUpdated: Date.now()
      })
    case GET_CAT_FAILURE:
      return ({
        status: "Failure",
        url: "",
        lastUpdated: Date.now()
      })
    default:
      return state
  }
}

export default getCatReducer;
