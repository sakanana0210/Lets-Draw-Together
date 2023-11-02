const initialState = {
    isAuthenticated: false,
    errorMessage: null,
    loginUserUid: null,
    loginUserName: null,
    loginFrom: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                errorMessage: null,
                loginUserUid: action.payload.loginUserUid,
                loginUserName: null,
                loginFrom: action.payload.loginFrom
            };

        case 'LOGIN_ERROR':
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: action.payload
            };

        case 'LOGIN_GOOGLE_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                loginFrom: action.payload.loginFrom,
                loginUserUid: action.payload.loginUserUid,
                loginUserName: action.payload.loginUserName
            };
    
        case 'LOGIN_GOOGLE_ERROR':
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: action.payload
            };

        case 'REGISTER_SUCCESS':
            return {
                isAuthenticated: true,
                errorMessage: null,
                loginUserUid: action.payload.loginUserUid,
                loginUserName: action.payload.loginUserName
            };

        case 'REGISTER_ERROR':
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: action.payload
            };

        case 'LOGOUT_SUCCESS':
            return {
                isAuthenticated: false,
                errorMessage: null,
                loginUserUid: null,
                loginUserName: null,
                loginFrom: null
            };

        case 'LOGOUT_ERROR':
            return {
                ...state,
                errorMessage: action.payload
            };

        default:
            return state;
    }
};