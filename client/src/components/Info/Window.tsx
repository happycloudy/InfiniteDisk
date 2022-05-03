import React from 'react';
import styled from "styled-components";
import {useAppSelector} from "../../hooks/store.hooks";

const WindowWrapper = styled.ul`
  list-style: none;
  margin-top: 50px;
  padding: 0;
`

const Window = () => {
    const info = useAppSelector(state => state.info)

    return (
        <WindowWrapper>
            <li>
                Всего места: {info.totalSpace / 1024} Гб
            </li>
            <li>
                Занято места: {info.currentSpace.toFixed(2)} Мб
            </li>
            <li>
                Всего файлов: {info.totalFiles}
            </li>
            {
                info.mails.map(mail => (
                    <div key={mail.mail}>
                        <br/>
                        Почта: {mail.mail}

                        <ul>

                            <li>
                                Всего места {mail.totalSpace} Мб
                            </li>
                            <li>
                                Занято места {mail.currentSpace.toFixed(2)} Мб
                            </li>
                            <li>
                                Всего файлов: {mail.totalFiles}
                            </li>
                        </ul>

                    </div>
                ))
            }
        </WindowWrapper>
    );
};

export default Window;