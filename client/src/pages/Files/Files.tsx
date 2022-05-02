import React from 'react';
import Main from "../../components/Main/Main";
import List from "./List";
import Header from "../../components/Header/Header";

const Files = () => {
    return (
        <Main>
            <Header>
                Сохраненные файлы
            </Header>
            <List/>
        </Main>
    );
};

export default Files;