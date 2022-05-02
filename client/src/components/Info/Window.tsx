import React from 'react';
import styled from "styled-components";

const WindowWrapper = styled.div`
  margin-top: 50px;
`

const Window = () => {
    return (
        <WindowWrapper>
            Количество места: 10гб
        </WindowWrapper>
    );
};

export default Window;