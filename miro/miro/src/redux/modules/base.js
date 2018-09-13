import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_SIDEBAR_OPTION = 'base/SET_SIDEBAR_OPTION'; // 헤더 렌더링 여부 설정

export const setSidebarOption = createAction(SET_SIDEBAR_OPTION); // visible

const initialState = Map({
    sidebar: 'generate'
});

export default handleActions({
    [SET_SIDEBAR_OPTION]: (state, action) => state.set('sidebar', action.payload)
}, initialState);