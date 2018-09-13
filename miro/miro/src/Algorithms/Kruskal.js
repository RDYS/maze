import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mazeActions from 'redux/modules/maze';
import interval from 'interval-promise';

class Kruskal extends Component {
    par = []
    walls = []
    state = {
        currentWall: 0
    }
    stoppedExternally = false
    stopInterval = () => this.stoppedExternally = true
    randInt = (n) => Math.floor(Math.random()*n)
    find = (p) => (this.par[p] === p)?p:this.par[p]=this.find(this.par[p])
    uni = (p, q) => {
        p = this.find(p); q = this.find(q);
        if(p!==q) this.par[p] = this.par[q];
    }
    initialize(){
        const {width, height} = this.props.size.toJS();
        const { MazeActions } = this.props;
        this.par = [];
        this.walls = [];
        for(let i=0;i<height;i++){
            for(let j=0;j<width;j++){
                MazeActions.setBlock({x:i,y:j,block:'usual'});
                MazeActions.setMazeWall({type: 0,x:i,y:j,wall: 1});
                MazeActions.setMazeWall({type: 1,x:i,y:j,wall: 1});
                this.par.push(i*height+j);
                if(i>=0&&i+1<width) this.walls.push({type:1,x:i,y:j});
                if(j>=0&&j+1<height) this.walls.push({type:0,x:i,y:j});
            }
        }
        for (let i = this.walls.length - 1; i > 0; i--) {
            let j = this.randInt(i + 1);
            [this.walls[i], this.walls[j]] = [this.walls[j], this.walls[i]];
        }
        MazeActions.setMazeCompleted(false);
        this.setState({currentWall: 0});
    }
    onStop(){
        this.onPause();
        this.initialize();
    }
    onPause(){
        this.stopInterval();
    }
    onRestart(){
        this.stoppedExternally = false;
        const { MazeActions, size } = this.props;
        const { width, height } = size.toJS();
        interval(async (iter, stop)=>{
            if(this.stoppedExternally) stop();
            if(this.state.currentWall >= this.walls.length){
                MazeActions.setMazeWall({
                    type: 0,
                    x: width-1, y: height-1,
                    wall: 0
                });
                MazeActions.setMazeCompleted(true);
                this.onPause();
                return;
            }
            let{type,x,y} = this.walls[this.state.currentWall];
            let activated = [[x,y],[x+type,y+1-type]];
            let node = await activated.map(xy => xy[0]*height+xy[1]);
            activated.forEach((xy) => {
                MazeActions.setBlock({x:xy[0],y:xy[1],block:'activated'});
            })
            const uni = function(self){if(self.find(node[0]) !== self.find(node[1])){
                MazeActions.setMazeWall({
                    type,
                    x, y,
                    wall: 0
                });
                self.uni(node[0],node[1]);
            }};
            await uni(this);
            this.setState({currentWall: this.state.currentWall+1 });
            setTimeout(() => {
                activated.forEach((xy) => {
                    MazeActions.setBlock({x:xy[0],y:xy[1],block:'usual'});
                })
            }, 5);
        },  5);
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
        wall: state.maze.get('wall')
    }),
    (dispatch) => ({
        MazeActions: bindActionCreators(mazeActions, dispatch)
    })
)(Kruskal);