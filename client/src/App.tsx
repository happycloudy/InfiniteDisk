import React from 'react';
import AppContainer from "./components/AppContainer/AppContainer";
import Files from "./pages/Files/Files";
import Info from "./components/Info/Info";
import {Provider} from "react-redux";
import {store} from "./store";

function App() {


    return (
        <Provider store={store}>
            <AppContainer>
                <Info/>
                <Files/>
            </AppContainer>
        </Provider>
    );
}

export default App;
