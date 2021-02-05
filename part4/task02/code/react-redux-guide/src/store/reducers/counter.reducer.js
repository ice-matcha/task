// import { INC, DEC } from "../const/counter.const.js";

import { INC, DEC } from "../const/counter.const"

const initState = {
  count: 0
}

export default (state = initState, action) => {
  switch(action.type) {
    case INC: 
      return {
        count: state.count + action.payload
      }
    case DEC:
      return {
        count: state.count - action.payload
      }
    default:
      return state
  }
}