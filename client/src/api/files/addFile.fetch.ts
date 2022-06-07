import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";
import axios from "axios";

interface responseInterface {
    success: boolean
}

const addFileFetch = createAsyncThunk<responseInterface, File>(
    'files/add',
    async (file, thunkApi) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios({
                method: "post",
                url: "http://localhost:30/files",
                data: formData,
            });

            // const formData = new FormData();
            // formData.append("selectedFile", file);
            //
            // let res = await client.post('files', formData, {
            //     headers: { "Content-Type": "multipart/form-data" },
            // })
            return response.data
        } catch (e) {
            console.log(e)
            // return thunkApi.rejectWithValue(e)
        }
    }
)

export default addFileFetch