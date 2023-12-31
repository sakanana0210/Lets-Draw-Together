import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import styles from '../styles/mypage.module.scss'; 
import { doc, collection, addDoc, setDoc, getDocs, query, orderBy} from "firebase/firestore";
import {db} from '../firebase.js';
import { BarLoader } from "react-spinners";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from 'react-icons/io'; 
import { useAuth } from '../hooks/useAuth.js';

const Joinpage = () => {
    const { authenticated, userUid, userName } = useAuth();
    const [playCanvasID, setPlayCanvasID] = useState([]);
    const [loadDown, setLoddDown] =  useState(false);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    let indexOfLastItem = currentPage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const maxPage = Math.ceil(playCanvasID.length / itemsPerPage);
    const currentItems = playCanvasID.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        if (authenticated === false) {
            router.push('/signin');
        } else {
            const getCanvasId = async () => {
                try{
                    const playCanvasCollectionRef = collection(db, 'users', userUid, 'playCanvas');
                    try {
                        const sortedPlayCanvasCollectionRef = query(playCanvasCollectionRef, orderBy('timestamp', 'desc'));
                        const docPlaySnapshots = await getDocs(sortedPlayCanvasCollectionRef);
                        const newdatas = [];
                        docPlaySnapshots.forEach((snapshot) => {
                            const data = snapshot.data();
                            newdatas.push(data);
                        });
                        await setPlayCanvasID(newdatas);
                        setLoddDown(true);
                    } catch (error) {
                        console.error('Error updating canvas info:', error);
                    }

                }
                catch (error) {
                    console.error('Error updating canvas info:', error);
                }
            };
            getCanvasId();
        }
    }, [authenticated]);

    const setPageDown = () => {
        const newPage = currentPage - 1;
        if (newPage > 0) {
            setCurrentPage(newPage);
        }
    }

    const setPageUp = () => {
        const newPage = currentPage + 1;
        if (newPage <= maxPage) {
            setCurrentPage(newPage);
        }
    }

    const handleClick = () => {
        router.push('/mypage');
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.mainSection}>
                <h2 className={styles.title}>Joined Rooms</h2>
                <hr className={styles.hr} />
                <div>
                    {loadDown === true ? (
                        <>
                            {playCanvasID.length > 0 && (
                                <div className={styles.subtitleContainer}>
                                    <div className={styles.btnContainer}>
                                        <IoIosArrowDropleftCircle onClick={setPageDown} className={styles.btn} size={34}/>
                                    </div>
                                    <div className={styles.pageTextContainer}>
                                        {currentPage} / {maxPage} (Current Page / Total Pages)
                                    </div>
                                    <div className={styles.btnContainer}>
                                        <IoIosArrowDroprightCircle onClick={setPageUp} className={styles.btn} size={34}/>
                                    </div>
                                    
                                </div>
                            )}
                            
                                {currentItems.length > 0 ? (
                                    <>
                                        <div className={styles.roomsContainer}>
                                        {currentItems.map((canvas) => (
                                            <div key={canvas.roomId} className={styles.roomContainer}>
                                                <a href={`/drawing?roomId=${canvas.roomId}`}>
                                                    <div className={styles.imgContainer}>
                                                        {canvas.img && (
                                                            <img src={canvas.img} alt="Room Image" />
                                                        )}
                                                    </div>
                                                    <div className={styles.infoContainer}>
                                                        <div className={styles.textContainer}>
                                                            <div>
                                                                <span>ID: {canvas.roomId}</span>
                                                            </div>
                                                        </div>
                                                        <div className={styles.dateContainer}>
                                                            <div>
                                                                <span>DATE: </span>
                                                                {canvas.date && (
                                                                    <span>{canvas.date}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className={styles.notFindContainer}>
                                        <div>Unable to find rooms. Please join a room.</div>
                                    </div>
                                )}
                        
                    </>
                    ) : (
                        <div className={styles.loaderContainer}>
                            <BarLoader color="#358be0" loading={true} height={4} width={200} />
                        </div>
                    )}
                    <div className={styles.change}>
                        <div onClick={handleClick}>Find rooms you created? → Created Room History</div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Joinpage;