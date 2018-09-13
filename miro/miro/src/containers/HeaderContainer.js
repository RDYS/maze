import React, { Component } from 'react';
import Header, { PlayButton } from 'components/Header';
import Kruskal from 'Algorithms/Kruskal';
import Dijkstra from 'Algorithms/Dijkstra';
import { connect } from 'react-redux';

class HeaderContainer extends Component {
    state = { played: false, paused: false, loaded: false }
    
    handlePlay = () => {
        if(typeof this.solving === 'undefined' || this.solving === null) return;
        if(!this.state.played) this.setState({played: true});
        this.setState({paused: false, played: true});
        this.solving.onRestart();
    }
    handlePause = () => {
        if(typeof this.solving === 'undefined' || this.solving === null) return;
        this.setState({paused: true});
        if(this.state.played) this.solving.onPause();
    }
    handleStop = () => {
        if(typeof this.solving === 'undefined' || this.solving === null) return;
        this.setState({played: false});
        this.solving.onStop();
    }
    render() {
        const { sidebar } = this.props;
        const { handlePlay, handlePause, handleStop } = this;
        const algorithm = {
            'generate': <Kruskal onRef={ref => {this.solving = ref}}/>,
            'search': <Dijkstra onRef={ref => {this.solving = ref}}/>
        };
        return ( 
            <Header>
               <PlayButton
                    handleStop={handleStop}
                    handlePause={handlePause}
                    handlePlay={handlePlay}/>
                {algorithm[sidebar]}
            </Header>
        );
    }
}
 
export default connect(
    (state) => ({
        sidebar: state.base.get('sidebar')
    }),
    (dispatch) => ({})
)(HeaderContainer);