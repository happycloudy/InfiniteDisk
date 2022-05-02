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
  margin-top: 100px;
`

const List = () => {
    const [files, setFiles] = useState<FileInterface[]>([])

    useEffect(() => {
        axios.get('http://localhost:30/files').then(res => {
            let parsedFiles = res.data.map((file: FileInterface) => {
                file.size = getStringSize(typeof file.size === 'string' ? parseInt(file.size) : file.size)
                return file
            })
            setFiles(parsedFiles)
        })
    }, [])

    return (
        <Wrap>
            {
                files.map(file => <File key={file.nodeId}
                                        name={file.name}
                                        nodeId={file.nodeId}
                                        connectionNumber={file.connectionNumber} size={file.size.toString()}
                                        originName={file.name}/>
                )
            }
        </Wrap>
    );
};

export default List;