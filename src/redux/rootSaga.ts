import { all, fork } from 'redux-saga/effects';
import AboutSaga from './reducers/about/sagas';

export function* rootSaga() {
    yield all([fork(AboutSaga)]);
}