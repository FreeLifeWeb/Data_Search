import { SET_ERROR } from '../types/types';

export default function errReducer(state = '', action: any) {
    const { type, payload } = action;

    switch (type) {
        case SET_ERROR:
            return payload;
        default:
            return state;
    }
}
