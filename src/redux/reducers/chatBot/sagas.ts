import api from '../../../utils/axios';
import { all, call, put, takeLatest, fork, take, delay } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {
    FETCH_BOT_REQUEST,
    POST_BOT_REQUEST,
    UPDATE_BOT_REQUEST,
    DELETE_BOT_REQUEST,
    FETCH_REYAL_TIME_BOT,
} from './actionTypes';

import {
    fetchBotSuccess,
    fetchBotFailure,
    postBotSuccess,
    postBotFailure,
    updateBotSuccess,
    updateBotFailure,
    deleteBotSuccess,
    deleteBotFailure,
    webSocketConnected,
    webSocketDisconnected,
    webSocketError,
} from './actions';

const createChatBot = (body: any) => api.post<any[]>(`/createbot/`, body);
const fetchChatBot = (id: any) => api.get<any[]>(`/createbot/${id}`);
const updateChatBot = (body: any, id: any) => api.put<any[]>(`/createbot/${id}`, body);
const deleteBot = (id: any) => api.delete<any[]>(`/createbot/${id}`);

function createWebSocketChannel(socketUrl: string) {
    return eventChannel<any>((emit) => {
        const socket = new WebSocket(socketUrl);
        socket.onopen = () => emit({ connected: true });
        socket.onmessage = (event) => emit({...event.data});
        socket.onerror = (error) => emit({ error });
        socket.onclose = () => emit({ closed: true });

        return () => socket.close();
    });
}

function* watchWebSocket() {
    const socketUrl: string = 'ws://localhost:5000';
    const channel = yield call(createWebSocketChannel, socketUrl);
    while (true) {
        const message = yield take(channel);
        if (message.connected) {
            yield put(webSocketConnected());
        } else if (message.closed) {
            yield put(webSocketDisconnected());
        } else if (message.error) {
            yield put(webSocketError({ error: message.error }));
        } else if (message.data) {
            yield put(fetchBotSuccess({ bot: message.data }));
        }
    }
}

// Fetch reyal time data
function* fetchReyalTimedataSaga(data: any): any {
    const { payload } = data;
    try {
        yield put(fetchBotSuccess({ bot: payload }));
    } catch (e: any) {
        yield put(fetchBotFailure({ error: e.message }));
    }
}

//Fetch ChatBot
function* fetchBotSaga(data:any): any {
    const {payload} = data
    try {
        const response: any = yield call(fetchChatBot,payload);
        yield put (fetchBotSuccess({bot: response.data }));
    } catch (e: any) 
        {yield put(fetchBotFailure({error: e.message}));
    }
}

// Post ChatBot
function* postBotSaga(data: any): any {
    const { payload } = data;
    try {
        const response: any = yield call(createChatBot, payload);
        yield put(postBotSuccess({ bot: response.data }));
        yield call(fetchReyalTimedataSaga, { payload: response.data });
    } catch (e: any) {
        yield put(postBotFailure({ error: e.message }));
    }
}

// Update ChatBot
function* updateChatBotSaga(data: any): any {
    const { id, payload } = data.payload;
    console.log(data.payload,'data.payloaddata.payloaddata.payload')
    try {
        const response: any = yield call(updateChatBot, payload, id);
        yield put(updateBotSuccess({ bot: response.data }));
        yield call(fetchReyalTimedataSaga, { payload });
    } catch (e: any) {
        yield put(updateBotFailure({ error: e.message }));
    }
}

// Delete ChatBot
function* deleteChatBot(data: any): any {
    const { payload } = data;
    try {
        const response: any = yield call(deleteBot, payload);
        yield put(deleteBotSuccess({ bot: response.data }));
    } catch (e: any) {
        yield put(deleteBotFailure({ error: e.message }));
        console.error(e);
    }
}

function* BotSaga() {
    yield fork(watchWebSocket);
    yield all([
        takeLatest(FETCH_BOT_REQUEST, fetchBotSaga),
        takeLatest(POST_BOT_REQUEST, postBotSaga),
        takeLatest(UPDATE_BOT_REQUEST, updateChatBotSaga),
        takeLatest(DELETE_BOT_REQUEST, deleteChatBot),
        takeLatest(FETCH_REYAL_TIME_BOT, fetchReyalTimedataSaga),
    ]);
}

export default BotSaga;







