import { takeEvery, put, call, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function* fetchDronesAsync(){
    const { error, data } = yield call(API.fetchDrones);
    
    if (error) {
        yield put({ type: actions.API_ERROR, code: error.code });
        yield cancel();
        return;
    }

    yield put({type: actions.DRONE_DATA_RECIEVED, drones: data.data})
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