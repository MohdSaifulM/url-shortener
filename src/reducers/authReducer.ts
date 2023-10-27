export const authReducer = (state: any, action: { type: any, payload: any }) => {
    switch (action.type) {
        case 'LOGIN':
            return { 
                user: action.payload
            }
        case 'LOGOUT':
            return { 
                user: null
            }
        default:
            return state
    }
}