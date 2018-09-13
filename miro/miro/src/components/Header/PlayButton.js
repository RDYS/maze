import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import './playButton.css';
import { FaPlayCircle, FaPauseCircle, FaStopCircle } from 'react-icons/fa'

const Positioner = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    color: ${oc.lime[5]};
    font-size: 1.4rem;
`
const Button = styled.div`
    cursor: pointer;
    &:hover{
        color: ${oc.lime[6]};
    }
`
const PlayButton = ({handlePlay, handlePause, handleStop }) => {
    return (
        <Positioner>
            <Button onClick={handlePlay}><FaPlayCircle /></Button>
            <Button onClick={handlePause}><FaPauseCircle /></Button>
            <Button onClick={handleStop}><FaStopCircle /></Button>
        </Positioner>
    )
};
export default PlayButton;