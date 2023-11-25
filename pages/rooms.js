import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import styles from '../styles/signup.module.scss'; 
import { doc, collection, addDoc, setDoc, getDocs} from "firebase/firestore";
import {db} from '../firebase.js';

const Rooms = () => {
    const authenticated = useSelector((state) => state.auth.isAuthenticated);
    const userUid = useSelector((state) => state.auth.loginUserUid);
    const userName = useSelector((state) => state.auth.loginUserName);
    const [roomId, setRoomId] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (authenticated === false) {
            router.push('/signin');
        }
    }, [authenticated]);

    const  generateRoomId = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let roomId = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            roomId += characters.charAt(randomIndex);
        }
        
        return roomId;
    }
    
    const handleCreateRoom = async () => {
        try {
            const randomRoomId = await generateRoomId(10);
            const roomsCollection = collection(db, 'rooms');
            const roomDocumentRef = doc(roomsCollection, randomRoomId);
            await setDoc(roomDocumentRef, {
                roomId: randomRoomId,
                owner: userUid
            });
            
            const playersCollection = collection(roomDocumentRef, 'players');
            const playerDocumentRef = doc(playersCollection, userUid);
            await setDoc(playerDocumentRef, {
                playerId: userUid,
                playerName: userName
            });
            router.push(`/drawing/?roomId=${randomRoomId}`);
            // const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
            // const newCanvasInfoDocRef = await setDoc(canvasInfoCollection, {
            //     canvasId: 'canvas1',
            //     canvasData: 'initial data',
            // });
        } catch (error) {
            console.error('創建失敗', error.code, error.message);
        }
    };
    
    const handleEnterRoom = async () => {
        try {
            const roomsCollection = collection(db, 'rooms');
            const roomDocumentRef = doc(roomsCollection, roomId);
            const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
            const querySnapshot = await getDocs(canvasInfoCollection);

            if (querySnapshot.empty) {
                alert('This room didn\'t existed, please check again with correct Room ID.');
            } else {
                const playersCollection = collection(roomDocumentRef, 'players');
                const playerDocumentRef = doc(playersCollection, userUid);
                await setDoc(playerDocumentRef, {
                    playerId: userUid,
                    playerName: userName
                });
                router.push(`/drawing/?roomId=${roomId}`);
            }

        } catch (error) {
            console.error('失敗', error.code, error.message);
        }
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <h2 className={styles.title}>Create / Join Room</h2>
            <hr className={styles.hr}/>
            <div className={styles.btnContainer}>
                <button className={`${styles.btn} ${styles.btnContinue}`} onClick={handleCreateRoom}>Create New Room</button>
            </div> 
            <br />
            <hr className={styles.hr}/>
            <input className={styles.input} type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <div className={styles.btnContainer}>
                <button className={`${styles.btn} ${styles.btnContinue}`} onClick={handleEnterRoom}>Join Existed Room</button>
            </div> 
        </div>
        
    );
};

export default Rooms;