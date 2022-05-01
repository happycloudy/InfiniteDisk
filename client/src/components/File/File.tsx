import React from 'react';
import styled from "styled-components";
import FileInterface from "./File.interface";
import axios from "axios";

const FileWrapper = styled.div`
  position: relative;
  height: 243px;
  width: 243px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  height: auto;
  width: 40%;
`

const Footer = styled.div`
  background: rgba(171, 171, 171, 0.51);
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 15px 25px;
  border-radius: 0 0 20px 20px;
  display: flex;
  align-items: center;
  font-family: 'Open Sans', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`

const Size = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`


const File = ({size = '', name = '', img = '', connectionNumber, path}: FileInterface) => {

    const handleClick = () => {
        axios.post('http://localhost:30/files/download',
            { path: path, connectionNumber: connectionNumber },
        ).then(res => {
            const downloadUrl = window.URL.createObjectURL(res.data)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = res.data.result.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        })
    }

    return (
        <FileWrapper onClick={handleClick}>
            <Img src={'http://s1.iconbird.com/ico/2013/2/634/w42h50139292027210.png'}/>
            <Size>{size}</Size>
            <Footer>
                {name}
            </Footer>
        </FileWrapper>
    );
};

export default File