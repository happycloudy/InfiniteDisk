import {createAsyncThunk} from "@reduxjs/toolkit";

const getFilesFetch = createAsyncThunk(
    'files/getAll',
    (_,thunkApi) => {

    }
)

export default getFilesFetch