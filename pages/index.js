import { useRouter } from 'next/router';
import styles from '../styles/home.module.scss';
import Navbar from '../components/Navbar';
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from 'react-icons/io';
import {BsChatDotsFill } from 'react-icons/bs';
import { PiFilesFill } from "react-icons/pi";

const Home = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/rooms');
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.welcome}>
                <div className={styles.welcomeTextContainer}>
                    <div className={styles.textContainer}>
                        <h1 className={styles.title}>Let's Draw <br /> Together!</h1>
                        <h1 className={styles.mediumTitle}>Let's Draw Together!</h1>
                        <h2 className={styles.subtitle}>Drawing with friends!</h2>
                        <div className={styles.btnContainer}>
                            <button className={styles.btnStart} onClick={handleClick}>Click to Start</button>
                        </div>
                    </div>
                </div>
                <div className={styles.welcomeImageContainer}>
                    <div className={styles.girlImage}></div>
                    <div className={styles.catImage}></div>
                    <div className={styles.creativityImage}></div>
                    <div className={styles.drawingImage}></div>
                    <div className={styles.magicImage}></div>
                    <div className={styles.lineImage}></div>
                </div>
                <div className={styles.welcomeImageContainerMedium}>
                    <div className={styles.girlImage}></div>
                    <div className={styles.catImage}></div>
                    <div className={styles.creativityImage}></div>
                    <div className={styles.drawingImage}></div>
                    <div className={styles.magicImage}></div>
                    <div className={styles.lineImage}></div>
                </div>
                <div className={styles.medium}>
                    <div className={styles.btnContainer}>
                                <button className={styles.btnStart} onClick={handleClick}>Click to Start</button>
                    </div>
                </div>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.mainSection}>
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <div className={styles.infoTextMedium}>
                            <div  className={styles.icon}><BsChatDotsFill className={styles.leftArrow} size={70} /></div>
                            <h2>Drawing And Chatting With Friends.</h2>
                        </div>
                        <div className={styles.smallInfoText}>
                            <div  className={styles.icon}><BsChatDotsFill className={styles.leftArrow} size={50} /></div>
                            <h2>Drawing And Chatting With Friends.</h2>
                        </div>
                        <div className={styles.imgContainer}><div className={styles.canvasImage}></div></div>
                        <div className={styles.infoText}>
                            <div  className={styles.icon}><BsChatDotsFill className={styles.leftArrow} size={70} /></div>
                            <h2>Drawing And Chatting With Friends.</h2>
                        </div>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles.feature}>
                        <div className={styles.infoTextMedium}>
                            <div  className={styles.icon}><PiFilesFill className={styles.leftArrow} size={70} /></div>
                            <h2> Find Your History Rooms.</h2>
                        </div>
                        <div className={styles.infoText2}>
                            <div  className={styles.icon}><PiFilesFill className={styles.leftArrow} size={70} /></div>
                            <h2>Find Your History Rooms.</h2>
                        </div>
                        <div className={styles.smallInfoText}>
                            <div  className={styles.icon}><PiFilesFill className={styles.leftArrow} size={50} /></div>
                            <h2>Find Your History Rooms.</h2>
                        </div>
                        <div className={styles.imgContainer}><div className={styles.roomsImage}></div></div>
                    </div>
                    <div className={styles.bottom}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;