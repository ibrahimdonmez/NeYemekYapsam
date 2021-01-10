import { object } from "prop-types";

    const USER_INIT = 'USER_INIT';


    // ACTİON CREATOR
    export function userInit(user = {}){
        // ACTİON
        return {
            type : USER_INIT,
            payload : user
        }
    }

    // REDUCER : reducerin görevi bir önceki state i alıp yeni state e çevirir.

    export default function userReducer(state = {}, action){
        switch(action.type){
            case USER_INIT:
                return Object.assign({}, action.payload);
            default :
                return state;
        }
    }

    