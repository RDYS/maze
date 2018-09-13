import React from 'react';
import styled from 'styled-components';
import { shadow } from 'lib/styleUtil';

const Bar = styled.div`
    display: flex;
    flex-direction: column;
    width: 56px;
    height: 100%;
    background: white;
    ${shadow(1)}
`


const Sidebar = ({children}) => {
    return (
        <Bar>
            {children}
        </Bar>
    );
};
export default Sidebar;