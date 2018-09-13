import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: scroll;
`;

const Maze = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
     );
}
 
export default Maze;
