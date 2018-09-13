import {combineReducers} from 'redux';
import base from './base';
import maze from './maze';

export default combineReducers({
    base,
    maze
});