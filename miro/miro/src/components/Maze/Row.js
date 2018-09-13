import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 42px;
    display: flex;
    flex-direction: row;
    width: ${props => props.width*42}px;
`;

const Row = ({children, width}) => {
    return (
        <Wrapper width={width}>
            {children}
        </Wrapper>
     );
}
 
export default Row;
