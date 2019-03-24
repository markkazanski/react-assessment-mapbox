import * as actions from "../actions";

const initialState = {
    minTemp: 0,
    maxTemp: 1000
}
//state = initialState
export default (state = initialState, action) => {
    switch(action.type) {
        case actions.MIN_TEMP_CHANGE:
            if(action.minTemp < state.maxTemp) //check that less than max           
                return {...state, minTemp: action.minTemp};
            else    
                return {...state, minTemp: state.maxTemp - 1};
        case actions.MAX_TEMP_CHANGE:
            if(action.maxTemp > state.minTemp)           
                return {...state, maxTemp: action.maxTemp};
            else
                return {...state, maxTemp: state.minTemp + 1};
        default:
            return state;
    }
}