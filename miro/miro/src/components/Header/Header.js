import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtil';

const Positioner = styled.div`
    width: 100%;
    display: flex;
    position: fixed;
    flex-direction: column;
    top: 0;
    ${shadow(1)}
`;
const Background = styled.div`
    display: flex;
    justify-content: center;
    background-color: white;
    height: auto;
`
const HeaderContents = styled.div`
    width: 1200px;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0 1rem;
    ${media.wide`
        width: 992px;
    `}

    ${media.tablet`
        width: 100%;
    `}
`;
const Logo = styled.div`
    font-size: 1.4rem;
    letter-spacing: 2px;
    font-family: 'Eczar';
    color: ${oc.lime[7]};

`
const Border = styled.div`
    height: 3px;
    background: ${oc.lime[4]};
`
const Header = ({children}) => {
    return (
        <Positioner>
            <Background>
                <HeaderContents>
                    <Logo>Maze</Logo>
                    {children}
                </HeaderContents>
            </Background>
            <Border />
        </Positioner>
    )
};

export default Header;