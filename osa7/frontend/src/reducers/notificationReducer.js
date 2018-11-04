const noNotification = { text: '', type: '' }

const notificationReducer = (store = noNotification, action) => {
  if (action.type === 'NOTIFY') {
    return action.data
  }
  else if( action.type === 'CLEAR') {
    return noNotification
  } else {
    return store
  }
}


export const notify = (text, type) => {
  return async (dispatch) => {
    setTimeout( () =>  dispatch({ type: 'CLEAR' }) , 5000)
    dispatch({
      type: 'NOTIFY',
      data: { text: text, type: type }
    })
  }
}





export default notificationReducer