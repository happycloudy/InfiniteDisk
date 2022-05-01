import React, {useEffect, useState} from 'react';
import File from "../../components/File/File";
import styled from "styled-components";
import axios from "axios";
import FileInterface from "./File.interface";
import getStringSize from "./utilities/getStringSize";

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 22px;
`

const List = () => {
    const [files, setFiles] = useState<FileInterface[]>([])

    useEffect(() => {
        axios.get('http://localhost:30/files').then(res => {
            let parsedFiles = res.data.map((file: FileInterface) => {
                file.size = getStringSize(typeof file.size === 'string' ? parseInt(file.size): file.size)
                return file
            })
            setFiles(parsedFiles)
            // console.log(parsedFiles)
        })
    }, [])

    return (
        <Wrap>
            {
                files.map(file => <File key={file.id} name={file.path_display} path={file.path_lower} connectionNumber={file.connectionNumber} size={file.size.toString()}/>)
            }
        </Wrap>
    );
};

export default List;