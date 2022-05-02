import styled from "styled-components";
import Button from "./Button";
import {useState} from "react";
import Window from "./Window";

interface InfoWrapperInterface {
    active: boolean
}

const InfoWrapper = styled.div<InfoWrapperInterface>`
  position: fixed;
  right: 10px;
  top: 10px;
  padding: 20px 40px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  border: ${props => props.active ? '2px solid #E7717D' : 'none'};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Info = () => {
    const [active, setActive] = useState(false)

    const toggleActive = () => {
        setActive(!active)
    }

    return (
        <InfoWrapper active={active}>
            <Button active={active} toggleActive={toggleActive}/>
            {
                active &&
                <Window/>
            }
        </InfoWrapper>
    );
};

export default Info;

