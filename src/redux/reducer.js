export interface SystemAction { type: string; payload: any}

//Action to define the information that is going to be stored in the redux store
//in our case it is the pusher friend channel to update location on the map
export const setFriendChannel = (payload) => {
  return {
    type: 'SET_FRIEND_CHANNEL',
    payload: payload
  }
};

//Initial value of the state (of systemReducer)
const initSystemState = {
  friendChannel: {}
};

//reducer to store information in redux store
export const systemReducer = (state = initSystemState, action: SystemAction) => {
  switch (action.type) {
    case 'SET_FRIEND_CHANNEL': {
      return {...state, friendChannel: action.payload};
    }
    default:
      return state;
  }
};
