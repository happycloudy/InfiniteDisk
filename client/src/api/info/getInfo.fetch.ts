import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";
import {InfoInterface} from "../../store/info/info.slice";

const getInfoFetch = createAsyncThunk<InfoInterface>(
    'info/fetchAll',
    async (_, thunkApi) => {
        try {
            const res = await client.get('mega/info')
            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue('Неизвестная ошибка')
        }
    }
)

export default getInfoFetch