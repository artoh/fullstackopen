const reducerAtStart = "Notification is coming soon"

const notificationReducer = (store = reducerAtStart, action) => {
    if (action.type === 'NOTIFY') {
        return action.data
    }
    else if( action.type === 'CLEAR') {
        return ''
    } else {
        return store
    }
}


export const notify = (text, seconds) => {
    return async (dispatch) => {
        setTimeout( () =>  dispatch({ type: 'CLEAR'}) , seconds * 1000)
        dispatch({
            type: 'NOTIFY',
            data: text
        })
    }
}



export const clear = () => {
    return {
        type: 'CLEAR'
    }
}


export default notificationReducer