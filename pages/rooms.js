import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/signup.module.scss'; 

const Rooms = () => {
    const [roomId, setRoomId] = useState('');
    return (
        <div className={styles.container}>
            <Navbar />
            <h2 className={styles.title}>Rooms</h2>
            <hr className={styles.hr}/>
            <div className={styles.btnContainer}>
                <button className={`${styles.btn} ${styles.btnContinue}`}>Create New Room</button>
            </div> 
            <br />
            <hr className={styles.hr}/>
            <input className={styles.input} type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <div className={styles.btnContainer}>
                <button className={`${styles.btn} ${styles.btnContinue}`}>Enter Existed Room</button>
            </div> 
        </div>
        
    );
};

export default Rooms;