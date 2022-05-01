import styled from "styled-components";
import React from 'react';

const Main = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`

const MainWrapper = styled.div`
  max-width: 1400px;
  padding: 20px 30px;
  width: 80%;
  background: rgba(255, 255, 255, 0.51);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
`

const MainComponent = ({children}: any) => {
    return (
        <Main>
            <MainWrapper>
                {children}
            </MainWrapper>
        </Main>
    );
};

export default MainComponent;