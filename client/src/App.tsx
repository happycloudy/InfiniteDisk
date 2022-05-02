import React from 'react';
import AppContainer from "./components/AppContainer/AppContainer";
import Files from "./pages/Files/Files";
import Info from "./components/Info/Info";

function App() {
    return (
        <AppContainer>
            <Info/>
            <Files/>
        </AppContainer>
    );
}

export default App;
