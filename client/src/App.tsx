import React from 'react';
import AppContainer from "./components/AppContainer/AppContainer";
import Header from "./components/Header/Header";
import Files from "./pages/Files/Files";

function App() {
    return (
        <AppContainer>
            <Header>
                Сохраненные файлы
            </Header>
            <Files/>
        </AppContainer>
    );
}

export default App;
