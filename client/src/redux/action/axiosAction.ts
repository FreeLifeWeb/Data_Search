import axios from 'axios';
import { SET_ERROR, SET_DATA } from '../types/types';
import { Dispatch } from 'redux';

interface UserData {
    email: string;
    number: string;
}

export interface UserDataArray extends Array<UserData> {}

export const setData = (payload: UserDataArray) => ({ type: SET_DATA, payload });
export const setErr = (payload: string) => ({ type: SET_ERROR, payload });

export const serverReq =
    (e: React.FormEvent<HTMLFormElement>) => (dispatch: Dispatch) => {
        e.preventDefault();
        const input = Object.fromEntries(new FormData(e.currentTarget));
        console.log(input, 'redux');
        axios
            .post('/user/data', input)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.message) {
                        dispatch(setData(res.data));
                    } else {
                        dispatch(setData(res.data));
                    }
                } else {
                    // Здесь можно обработать другие ошибки сервера, если они есть
                    console.error(
                        'Ошибка на сервере:',
                        res.status,
                        res.statusText
                    );
                }
            })
            .catch((err) => dispatch(setErr(err.response.data)));
    };
