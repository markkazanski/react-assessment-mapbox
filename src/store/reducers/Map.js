import * as actions from "../actions";

const initialState = {
    bottomTemp: {min: 200, max: 400, value: 200},
    topTemp: {min: 200, max: 400, value: 400},
}
//state = initialState
export default (state = initialState, action) => {
    switch(action.type) {
        case actions.TOP_TEMP_CHANGE:           
            return {...state, topTemp: {min: state.topTemp.min, max: state.topTemp.max, value: state.topTemp.value} }
        default:
            return state;
    }
}