export const authReducer = (state: any, action: { type: any, payload: any }) => {
    console.log("🚀 ~ file: authReducer.ts:2 ~ authReducer ~ state, action", state, action)
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}