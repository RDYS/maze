import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mazeActions from 'redux/modules/maze';
import interval from 'interval-promise';
import priorityQueue from 'priorityqueuejs';

class Dijkstra extends Component {
    dist = []
    maze = []
    stoppedExternally = false;
    stopInterval = () => this.stoppedExternally = true;
    initialize(){
        const {width, height} = this.props.size.toJS();
        const { MazeActions } = this.props;
        const wall = this.props.wall.toJS();
        const dir=[[1,-1,0],[0,0,0],[1,0,0],[0,0,-1]];
        const notInMap = (type,x,y) => (type===1&&(x<0||x+1>=height))||(type===0&&(y<0||y+1>=width));
        this.dist = new Array(height);
        this.maze = new Array(height);
        for(let i=0;i<height;i++){
            this.dist[i] = new Array(width);
            this.maze[i] = new Array(width);
            for(let j=0;j<width;j++){
                MazeActions.setBlock({x:i,y:j,block:'usual'});
                this.maze[i][j] = [false,false,false,false];
                for(let k=0;k<4;k++){
                    const type = dir[k][0], X = dir[k][1] + i, Y = dir[k][2] + j;
                    if(notInMap(type,X,Y)&&(X<0||Y<0||wall[type][X][Y]!==0))
                        this.maze[i][j][k] = false;
                    else
                        this.maze[i][j][k] = wall[type][X][Y] === 0;
                }
                this.dist[i][j] = -1;
            }
        }
        MazeActions.setBlock({x:0,y:0,block:'start'});
        MazeActions.setBlock({x:height-1,y:width-1,block:'end'});
        this.pq = new priorityQueue((a,b)=>b.f+b.g-a.f-a.g);
        this.pq.enq({x: 0,y: 0,f: 0,g: 0});
    }
    onStop(){
        this.onPause();
        this.initialize();
    }
    onPause(){
        this.stopInterval();
    }
    findPath (x,y){
        const {width, height} = this.props.size.toJS();
        const { MazeActions } = this.props;
        const dx = [-1,0,1,0];
        const dy = [0,1,0,-1];
        const checkPoint = (x,y) => {
            return (x===0&&y===0) || (x+1===height&&y+1===width);
        }
        if(!checkPoint(x,y)) MazeActions.setBlock({x,y,block:'routed'})
        let nx=x,ny=y;
        for(let i=0;i<4;i++){
            const X = x+dx[i],Y=y+dy[i];
            if(X<0||Y<0||X>=height||Y>=width) continue;
            if(!this.maze[x][y][i]) continue;
            console.log(this.dist[x][y]+" -> "+this.dist[X][Y]);
            if(this.dist[x][y]===this.dist[X][Y]+1) [nx, ny] = [X, Y];
        }
        if(x!==0||y!==0) setTimeout(() => {
            this.findPath(nx,ny);
        }, 10);
    }
    onRestart(){
        this.stoppedExternally = false;
        const { MazeActions, size } = this.props;
        const { width, height } = size.toJS();
        const dx = [-1,0,1,0];
        const dy = [0,1,0,-1];
        const checkPoint = (x,y) => {
            return (x===0&&y===0) || (x+1===height&&y+1===width);
        }
        interval(async (iter, stop) => {
            if(this.stoppedExternally) stop();
            if(this.pq.isEmpty()){
                this.onPause();
                return;
            }
            let {x,y,f} = await this.pq.deq();
            if(this.dist[x][y] >= 0) return;
            this.dist[x][y] = f;
            if(y+1===width&&x+1===height){
                this.onPause();
                this.findPath(x,y);
                return;
            }
            if(!checkPoint(x,y)) MazeActions.setBlock({
                x,y,block:'checked'
            });
            for(let i=0;i<4;i++){
                const X = x+dx[i], Y = y+dy[i];
                if(X<0||Y<0||X>=height||Y>=width) continue;
                if(!this.maze[x][y][i]) continue;
                if(this.dist[X][Y] === -1){
                    if(!checkPoint(X,Y)) MazeActions.setBlock({
                        x:X,y:Y,block:'checking'
                    });
                    await this.pq.enq({x:X,y:Y,f:f+1,g:-X-Y});
                }
            }
        }, 5)
    }
    componentDidMount(){
        this.props.onRef(this);
        this.initialize();
    }
    componentWillUnmount(){
        this.props.onRef(null);
        this.stopInterval();
    }
    render() { 
        return ( <div></div> );
    }
}
 
export default connect(
    (state) => ({
        size: state.maze.get('size'),
        completed: state.maze.get('completed'),
        wall: state.maze.get('wall')
    }),
    (dispatch) => ({
        MazeActions: bindActionCreators(mazeActions, dispatch)
    })
)(Dijkstra);