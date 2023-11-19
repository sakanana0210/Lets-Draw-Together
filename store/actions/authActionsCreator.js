import { REGISTER_SUCCESS, REGISTER_ERROR, LOGOUT_SUCCESS, LOGOUT_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_GOOGLE_SUCCESS, LOGIN_GOOGLE_ERROR, LOGIN_GOOGLE_GET_SUCCESS, LOGIN_GOOGLE_GET_ERROR} from './actionTypes';
import { signOut, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider} from 'firebase/auth';
import { db, auth, setLocalPersistence} from '../../firebase.js';
import { doc, collection, addDoc, setDoc, getDoc} from "firebase/firestore";

const getUserName = async (userUid) => {
    try {
        const userDocRef = doc(db, 'users', userUid);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
            return docSnapshot.data().name;
        } else {
            return "訪客";
        }
    } catch (error) {
        console.error(error);
        return "訪客";
    }
};

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            await setLocalPersistence();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const uid = await user.uid;
            const name = await getUserName(uid);
            console.log(uid, name);
            
            dispatch({ type: LOGIN_SUCCESS ,  payload: {
                loginUserUid: uid,
                loginFrom: "email",
                loginUserName: name
                }
            });
            
        } catch (error) {
            console.error('登入失敗', error.code, error.message);
            dispatch({ type: LOGIN_ERROR, payload: error.message });
        }
    }
};

export const loginWithGoogle = () => {
    return async (dispatch) => {
        try {
            auth.onAuthStateChanged(async (user) => {
                const uid = user.uid;
                const displayName = user.displayName;
                const setGoogleDoc = async() => {
                    const usersCollection = collection(db, 'users');
                    const userDocRef = doc(usersCollection, uid);
                    const docSnapshot = await getDoc(userDocRef);
                    if (docSnapshot.exists()) {
                    } else {
                        await setDoc(userDocRef, {
                            uid: uid,
                            name: user.displayName,
                            email: user.email
                        });
                    }
                }
                await setGoogleDoc();
                dispatch({ type: LOGIN_GOOGLE_SUCCESS ,payload: {
                    loginFrom: "google",
                    loginUserUid: uid,
                    loginUserName: displayName
                }});
            });

        }
        catch (error) {
            console.error('登入失敗', error.code, error.message);
            dispatch({ type: LOGIN_GOOGLE_ERROR, payload: error.message });
        }
    }
};

export const register = (email, password, userName) => {
    return async (dispatch) => {
        try {
            await setLocalPersistence();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const uid = user.uid;
            const usersCollection = collection(db, 'users');
            await setDoc(doc(usersCollection, uid), {
                uid: uid,
                name: userName,
                email: email
            });
            console.log("set doc");
            dispatch({ type: REGISTER_SUCCESS,  payload: {
                    loginUserUid: uid,
                    loginUserName: userName
                }
            });
        } catch (error) {
            console.error('註冊失敗', error.code, error.message);
            dispatch({ type: REGISTER_ERROR, payload: error.message });
    }};
};

export const logout = () => {
    return async (dispatch) => {
        try {
            await signOut(auth);
            dispatch({ type: LOGOUT_SUCCESS,  payload: {
                isAuthenticated: false,
                errorMessage: null,
                loginUserUid: null,
                loginUserName: null
            }
        });
        } catch (error) {
            console.error('登出失敗', error.code, error.message);
            dispatch({ type: LOGOUT_ERROR, payload: error.message });
    }};
};