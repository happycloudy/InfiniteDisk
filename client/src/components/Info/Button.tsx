import React from 'react';
import styled from "styled-components";

const ButtonIcon = styled.div`
  .menu-icon {
    position: absolute;
    width: 50px;
    height: 50px;
    cursor: pointer;
    right: 0;
    top: 0;

    .menu-icon__checkbox {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      cursor: pointer;
      z-index: 2;
      -webkit-touch-callout: none;
      position: absolute;
      opacity: 0;
    }

    div {
      margin: auto;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      width: 22px;
      height: 12px;
    }

    span {
      position: absolute;
      display: block;
      width: 100%;
      height: 2px;
      background-color: #212529;
      border-radius: 1px;
      transition: all 0.2s cubic-bezier(0.1, 0.82, 0.76, 0.965);

      &:first-of-type {
        top: 0;
      }

      &:last-of-type {
        bottom: 0;
      }
    }

    &.active,
    .menu-icon__checkbox:checked + div {
      span {
        &:first-of-type {
          transform: rotate(45deg);
          top: 5px;
        }

        &:last-of-type {
          transform: rotate(-45deg);
          bottom: 5px;
        }
      }
    }

    &.active:hover span:first-of-type,
    &.active:hover span:last-of-type,
    &:hover .menu-icon__checkbox:checked + div span:first-of-type,
    &:hover .menu-icon__checkbox:checked + div span:last-of-type {
      width: 22px;
    }

    &:hover {
      @media (min-width: 1024px) {
        span:first-of-type {
          width: 26px;
        }

        span:last-of-type {
          width: 12px;
        }
      }
    }
  }
`

interface ButtonInterface {
    active: boolean,
    toggleActive: () => void
}

const Button = ({active, toggleActive}: ButtonInterface) => {
    return (
        <ButtonIcon>
            <div className="demo">
                <div className="menu-icon">
                    <input checked={active} onChange={toggleActive} className="menu-icon__checkbox" type="checkbox"/>
                    <div>
                        <span/>
                        <span/>
                    </div>
                </div>
            </div>
        </ButtonIcon>
    );
};

export default Button;