import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styles  from '../styles/chatRoom.module.scss' 
import { doc, collection, query, orderBy, addDoc, setDoc, serverTimestamp, getDoc, getDocs, updateDoc, onSnapshot, ref } from "firebase/firestore";
import {db} from '../../../firebase.js';
import {AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

function ChatRoom() {
    const dispatch = useDispatch();
    const roomId = useSelector((state) => state.brush.roomId);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const authenticated = useSelector((state) => state.auth.isAuthenticated);
    const userUid = useSelector((state) => state.auth.loginUserUid);
    const userName = useSelector((state) => state.auth.loginUserName);
    const [loadRoomDone, setLoadRoomDone] = useState(false);
    const [chatRoomView, setChatRoomView] = useState(false);

    //first load
    useEffect(() => {
        if (roomId) {
            // const findChatMessages = async () => {
            //     const roomsCollection = collection(db, 'rooms');
            //     const roomDocumentRef = doc(roomsCollection, roomId);
            //     const messages = collection(roomDocumentRef, 'chatMessages');
            //     const querySnapshot = await getDocs(messages);
            //     const messagesList = querySnapshot.docs.map((doc) => ({
            //         id: doc.id,
            //         ...doc.data(),
            //     }));
            //     messagesList.sort((a, b) => a.timestamp - b.timestamp);
            //     setMessages(messagesList);
            // };
            // findChatMessages();
            setLoadRoomDone(true);
        }
    }, [roomId]);

    // handle shared chatting
    useEffect(()=>{
        if (loadRoomDone === true) {
            const roomsCollection = collection(db, 'rooms');
            const roomDocumentRef = doc(roomsCollection, roomId);
            const messageCollection = collection(roomDocumentRef, 'chatMessages');
            const unsubscribe = onSnapshot(messageCollection, async (snapshot) => {
                    snapshot.docChanges().forEach(async (change) => {
                        if (change.type === 'added'){
                            const messageDoc = change.doc;
                            const newMessage = {
                                id: messageDoc.id,
                                ...messageDoc.data(),
                            };
                            setMessages(prevMessages => [...prevMessages, newMessage]);
                        }
                    });
                
            });
    
            return () => {
                unsubscribe();
            };
        }
    }, [loadRoomDone]);

    const sendMessage = () => {
        const roomsCollection = collection(db, 'rooms');
        const roomDocumentRef = doc(roomsCollection, roomId);
        const messagesRef = collection(roomDocumentRef, 'chatMessages');

        if (newMessage.trim() !== '') {
            const messageData = {
                text: newMessage,
                userId: userUid,
                userName: userName,
                timestamp: serverTimestamp()
            };
    
            addDoc(messagesRef, messageData);
            setNewMessage('');
        }
    };

    return (
        
        <div className={styles.chatRoomContainer}>
            <div className={styles.ChatRoomViewContainer} >
                <button className={styles.ChatRoomViewBtn} onClick={() => setChatRoomView(!chatRoomView)} 
                    style={{ borderBottom: '1px solid ##358be0'}}
                >
                    {chatRoomView ? < AiOutlineCaretDown size={24} /> : (<><span>Chat Room</span><AiOutlineCaretUp  className={styles.buttomImg} size={24} /></>)}
                </button>
            </div>
            <div className={styles.messagesListContainer} style={{ display: chatRoomView ? 'block' : 'none' }}>
                <div  className={styles.messagesList}>
                    {messages.map((message) => (
                    <div key={message.id} className={styles.textContainer}>
                        <span style={{ fontWeight: 700 }}>{message.userName}: </span>
                        <span>{message.text}</span>
                    </div>
                    ))}
                </div>
                <div  className={styles.messagesInputContainer}>
                    <input
                        className={styles.messagesInput}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}
export default ChatRoom;