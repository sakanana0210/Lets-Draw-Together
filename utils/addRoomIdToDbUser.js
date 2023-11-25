import { db, storage} from '../firebase.js';
import { doc, query, limit, collection, addDoc, setDoc, serverTimestamp, getDoc, getDocs, updateDoc, onSnapshot } from "firebase/firestore";
const today = new Date();
const dateOnly = today.toISOString().split('T')[0];

export const addRoomIdToOwnCanvas = async (roomId, userUid) => {
    try {
        const setCanvasDoc = async(roomId, userUid) => {
            const ownCanvasCollectionRef = collection(db, 'users', userUid, 'ownCanvas');
            const canvascRef = doc(ownCanvasCollectionRef, roomId);
            const docSnapshot = await getDoc(canvascRef);
            if (docSnapshot.exists()) {
            } else {
                await setDoc(canvascRef, {
                    roomId: roomId,
                    date: dateOnly,
                    timestamp: serverTimestamp()
                });
            }
        }
        setCanvasDoc(roomId, userUid);
        console.log('RoomId added to ownCanvas collection successfully!');
    } catch (error) {
        console.error('Error adding roomId to ownCanvas collection:', error);
    }
};

export const addRoomIdToPlayCanvas = async (roomId, userUid) => {
    try {
        const setCanvasDoc = async(roomId, userUid) => {
            const playCanvasCollectionRef = collection(db, 'users', userUid, 'playCanvas');
            const canvascRef = doc(playCanvasCollectionRef, roomId);
            const docSnapshot = await getDoc(canvascRef);
            if (docSnapshot.exists()) {
            } else {
                await setDoc(canvascRef, {
                    roomId: roomId,
                    date: dateOnly,
                    timestamp: serverTimestamp()
                });
            }
        }
        setCanvasDoc(roomId, userUid);
    } catch (error) {
        console.error('Error adding roomId to playCanvas collection:', error);
    }
};