import { UserDataArray } from '../action/axiosAction';
import { SET_DATA } from '../types/types';

export default function dataReducer(
    state: UserDataArray | null = null,
    action: any
) {
    const { type, payload } = action;

    switch (type) {
        case SET_DATA:
            return payload;
        default:
            return state;
    }
}
