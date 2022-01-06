const initialState = { favPersonnesID: [] }

function FavorisReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_PERSONNE':
      nextState = {
        ...state,
        favPersonnesID: [...state.favPersonnesID, action.value]
      };
      return nextState || state
    case 'UNSAVE_PERSONNE':
      nextState = state;
      let index = nextState.favPersonnesID.indexOf(action.value);
      if (index > -1)
        nextState.favPersonnesID.splice(index, 1);
      return nextState || state
    default:
      return state
  };
}

export default FavorisReducer;