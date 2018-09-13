import { Map, fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_MAZE_SIZE = "maze/SET_MAZE_SIZE";
const SET_MAZE_WALL = "maze/SET_MAZE_WALL";
const SET_BLOCK = "maze/SET_BLOCK";
const SET_MAZE_COMPLETED = "maze/SET_MAZE_COMPLETED";

export const setMazeSize = createAction(SET_MAZE_SIZE);
export const setMazeWall = createAction(SET_MAZE_WALL);
export const setBlock = createAction(SET_BLOCK);
export const setMazeCompleted = createAction(SET_MAZE_COMPLETED);

const to2dArray = (arr,width,height) => arr.slice(0,height).map((arr2,idx) => arr2.slice(0,width));
const MAX_SIZE = 500;
let initialMaze = new Array(MAX_SIZE);
for(let i=0;i<MAX_SIZE;i++){
    initialMaze[i] = new Array(MAX_SIZE);
    for(let j=0;j<MAX_SIZE;j++)
        initialMaze[i][j] = true;
}
const initMaze = to2dArray(initialMaze,15,15);
const initialState = Map({
    size: Map({
        width: 15,
        height: 15,
    }), 
    wall: fromJS([initMaze,initMaze]),
    block: fromJS(initMaze.map(arr2 => arr2.map(item => 'usual'))),
    completed: false,
});

export default handleActions({
    [SET_MAZE_SIZE]: (state, action) => {
        const { width, height } = action.payload;
        const initMaze = to2dArray(initialMaze, width, height);
        return state.set('size',Map(action.payload)).set('wall',fromJS([initMaze,initMaze]))
            .set('block',fromJS(initMaze.map(arr2 => arr2.map(item => 'usual'))));
    },
    [SET_MAZE_WALL]: (state, action) => {
        const {x, y, type, wall} = action.payload;
        return state.setIn(['wall',type, x, y], wall);
    },
    [SET_BLOCK]: (state, action) => {
        const {x, y, block} = action.payload;
        return state.setIn(['block',x,y],block);
    },
    [SET_MAZE_COMPLETED]: (state, action) => state.set('completed', action.payload)
}, initialState);