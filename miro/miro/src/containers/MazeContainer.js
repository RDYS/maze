import React, { Component } from 'react';
import Maze, {Block, Row} from 'components/Maze';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as mazeActions from 'redux/modules/maze';

class MazeContainer extends Component {
    shouldComponentUpdate(nextProps, nextState){
        if(this.props.wall !== nextProps.wall) return true;
        if(this.props.sidebar === 'search' && this.props.block !== nextProps.block) return true;
        return false;
    }
    render() {
        const {width, height} = this.props.size.toJS();
        const wall = this.props.wall.toJS();
        const block = this.props.block.toJS();
        const dir=[[1,-1,0],[0,0,0],[1,0,0],[0,0,-1]];
        const notInMap = (type,x,y) => (type===1&&(x<0||x+1>=height))||(type===0&&(y<0||y+1>=width));
        let maze = [];
        for(let i=0;i<height;i++){
            let row = [];
            for(let j=0;j<width;j++){
                let bordered = [];
                for(let k=0;k<4;k++){
                    const type = dir[k][0], X = dir[k][1] + i, Y = dir[k][2] + j;
                    bordered[k]=(notInMap(type,X,Y)&&(X<0||Y<0||wall[type][X][Y]!==0))?3:(wall[type][X][Y]*1.5);
                }
                row.push(<Block bordered={bordered} type={block[i][j]} key={j}/>);
            }
            maze.push(<Row width={width} key={i}>{row}</Row>);
        } 
        return (
            <Maze>
                {
                    maze
                }
            </Maze>
         );
    }
}
 
export default connect(
    (state) => ({
        size: state.maze.get('size'),
        wall: state.maze.get('wall'),
        block: state.maze.get('block'),
        sidebar: state.base.get('sidebar')
    }),
    (dispatch) => ({
        MazeActions: bindActionCreators(mazeActions, dispatch)
    })
)(MazeContainer);