import * as ActionTypes from './ActionTypes';

export const Notes = (state = {
    notes : []
} , actions) =>{
    switch(actions.type){
        case ActionTypes.ADD_NOTE:
            return {
                ...state , notes : state.notes.concat(actions.payload)
            }
        case ActionTypes.DISPLAY_NOTES:
            return{
                ...state , notes : actions.payload
            }
        default : 
        return state;
    }
}