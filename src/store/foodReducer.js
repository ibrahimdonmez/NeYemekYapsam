import { object } from "prop-types";

    const FOOD_INIT = 'FOOD_INIT';


    // ACTİON CREATOR
    export function foodInit(food = {}){
        // ACTİON
        return {
            type : FOOD_INIT,
            payload : food
        }
    }

    // REDUCER : reducerin görevi bir önceki state i alıp yeni state e çevirir.

    export default function foodReducer(state = {}, action){
        switch(action.type){
            case FOOD_INIT:
                return Object.assign({}, action.payload);
            default :
                return state;
        }
    }

    