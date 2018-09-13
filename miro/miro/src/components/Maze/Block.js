import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

const type2color = {
    'usual': oc.gray[0],
    'activated': oc.red[1],
    'checked': oc.violet[2],
    'checking': oc.grape[2],
    'start': oc.green[4],
    'end': oc.red[4],
    'routed': oc.yellow[2]
}
const Cell = styled.div`
    width: 42px;
    height: 42px;
    border-top: ${props => props.top}px solid ${oc.lime[5]};
    border-right: ${props => props.right}px solid ${oc.lime[5]};
    border-bottom: ${props => props.bottom}px solid ${oc.lime[5]};
    border-left: ${props => props.left}px solid ${oc.lime[5]};
    background: ${props => type2color[props.type]};
`;
const Block = ({bordered,type}) => {
    return ( <Cell
                type={type}
                left={bordered[3]}
                right={bordered[1]}
                top={bordered[0]}
                bottom={bordered[2]} /> );
}
 
export default Block;