import React, {useState} from 'react';
import AppContainer from "./components/AppContainer/AppContainer";
import Files from "./pages/Files/Files";
import Info from "./components/Info/Info";
import {Provider} from "react-redux";
import {store} from "./store";
import DndArea from "./components/DndArea/DndArea";

function App() {
    const [fileUploadActive, setFileUploadActive] = useState(false)

    const handleDragOver = (e: any) => {
        e.preventDefault()
        setFileUploadActive(true)
    }

    const handleDrop = () => {
        setFileUploadActive(false)
    }

    return (
        <Provider store={store}>
            <AppContainer onDragOver={handleDragOver}>
                <Info/>
                <Files/>
                <DndArea handleDrop={handleDrop} active={fileUploadActive}/>
            </AppContainer>
        </Provider>
    );
}

export default App;
