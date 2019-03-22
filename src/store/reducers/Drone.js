import * as actions from "../actions";

const initialState = {
    counter: 0,
    drones: [1,2,3]
}
//state = initialState
export default (state = initialState, action) => {
    switch(action.type) {
        case actions.NEXT_DRONE:           
            if(state.counter < state.drones.length)
                return {...state, counter: state.counter + 1}
            else    
                return state

        case actions.PREV_DRONE:
                if(state.counter > 0)
                    return {...state, counter: state.counter - 1}
                else
                    return state
        
        case actions.DRONE_DATA_RECIEVED:
            return {...state, drones: action.drones}
        default:
            return state;
    }
}