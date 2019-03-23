import { takeEvery, put, call, cancel, all } from "redux-saga/effects";
import { delay } from "redux-saga";
import API from "../api";
import * as actions from "../actions";

function* fetchDronesAsync(){
    while(1){
        const { error, data } = yield call(API.fetchDrones);
        
        if (error) {
            yield put({ type: actions.API_ERROR, code: error.code });
            yield cancel();
            return;
        }
        yield put({type: actions.DRONE_DATA_RECIEVED, drones: data.data})
        yield call(delay, 3000);
    }
}

/*
function* watchDroneFetch(){
    yield takeEvery(actions.FETCH_DRONES, fetchDronesAsync);
}
*/

function* watchAppLoad() {
    yield all([
      takeEvery(actions.FETCH_DRONES, fetchDronesAsync),
    ]);
  }
  
  export default [watchAppLoad];