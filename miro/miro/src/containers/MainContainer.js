import React, { Component } from 'react';
import MainContent, {Sidebar} from 'components/MainContent';
import MazeContainer from './MazeContainer';
import styled, {css} from 'styled-components';
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import oc from 'open-color';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'redux/modules/base';

const Button = styled.div`
    width: 56px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${oc.lime[3]};
    cursor: pointer;
    &:hover{
        color: ${oc.lime[5]};
        background: ${oc.gray[1]};
    }
    ${
        props => props.selected && css`
            color: ${oc.lime[6]};
        `
    }
`;
class MainContainer extends Component {
    handleChange = (e) => {
        const {BaseActions, sidebar} = this.props;
        const node = e.target;
        console.log(node.id);
        let id = node.id===''?node.parentNode.id : node.id;
        const option = sidebar === id ? null : id;
        BaseActions.setSidebarOption(option);
    }
    render() { 
        const {sidebar} = this.props;
        const { handleChange } = this;
        const buttons = ['generate','search'];
        const icons = {
            'generate': <FaPencilAlt />,
            'search': <FaSearch/>
        }
        return (
            <MainContent>
                <Sidebar>
                    {buttons.map(function(option){
                        return (
                            <Button selected={sidebar===option} key={option} id={option} onClick={handleChange}>
                                { icons[option]}
                            </Button>
                        );
                    })}
                </Sidebar>
                <MazeContainer />
            </MainContent>
         );
    }
}
 
export default connect(
    (state) => ({
        sidebar: state.base.get('sidebar')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(MainContainer);