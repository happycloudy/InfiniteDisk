import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {FileUploader} from "react-drag-drop-files";
import {useAppDispatch} from "../../hooks/store.hooks";
import addFileFetch from "../../api/files/addFile.fetch";

interface DndAreaProps {
    handleDrop: () => void,
    active: boolean
}

const DndAreaWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: rgba(50, 50, 50, 0.5);
  display: flex;
  color: white;
  font-size: 50px;
`

const DndArea = ({handleDrop, active}: DndAreaProps) => {
    const [file, setFile] = useState(null);
    const dispatch = useAppDispatch()

    const handleChange = (fileUpload: any) => {
        setFile(fileUpload);
        handleDrop()
    };

    useEffect(() => {
        if(file){
            dispatch(addFileFetch(file))
        }
    }, [file])

    return (
        active ?
            <FileUploader name="file" handleChange={handleChange}>
                <DndAreaWrap>
                    Загрузить файл
                </DndAreaWrap>
            </FileUploader> :
            <></>
    );
};

export default DndArea;