
const initialState = {
    isAuthenticated: false 
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'ON_LOGIN': 
            return {
                ...state, 
                isAuthenticated: action.payload !=null ? true : false 
            }
        default: 
            return state
    }
}

export default reducer