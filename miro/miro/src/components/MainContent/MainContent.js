import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 51px;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`
const MainContent = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}
 
export default MainContent;