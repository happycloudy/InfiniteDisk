import {createSlice} from "@reduxjs/toolkit";
import getInfoFetch from "../../api/info/getInfo.fetch";

export interface MailInfoInterface {
    mail: string,
    totalFiles: number,
    currentSpace: number,
    totalSpace: number,
}

export interface InfoInterface {
    totalSpace: number,
    currentSpace: number,
    totalFiles: number,
    mails: MailInfoInterface[],
    loading: boolean
}

const initialState: InfoInterface = {
    currentSpace: 0,
    mails: [],
    totalFiles: 0,
    totalSpace: 0,
    loading: false,
}


const InfoSlice = createSlice({
    name: 'info',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getInfoFetch.fulfilled, (state, {payload}) => {
            state.loading = false
            state.totalSpace = payload.totalSpace
            state.currentSpace = payload.currentSpace
            state.totalFiles = payload.totalFiles
            state.mails = payload.mails
        })
        builder.addCase(getInfoFetch.pending, (state, {payload}) => {
            state.loading = true
        })
        builder.addCase(getInfoFetch.rejected, (state, {payload}) => {
            state.loading = false
        })
    }
})

// export const {} = InfoSlice.actions

export default InfoSlice.reducer