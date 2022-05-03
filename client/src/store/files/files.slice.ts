import {createSlice} from "@reduxjs/toolkit";

export interface FileInterface {

}

export interface FilesStateInterface {
    files: FileInterface[],
    loading: boolean,
}

const initialState: FilesStateInterface = {
    files: [],
    loading: false,
}

const filesSlice = createSlice({
    name: 'files',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {

    }
})

export default filesSlice.reducer