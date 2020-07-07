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
        case ActionTypes.UPDATE_NOTE :
            return {
                ...state , notes : actions.payload
            }
        case ActionTypes.DELETE_NOTE:
            return{
                ...state , notes : actions.payload
            }
        case ActionTypes.LOGOUT_USER:
            return {
                ...state , notes : []
            }
        default : 
        return state;
    }
}