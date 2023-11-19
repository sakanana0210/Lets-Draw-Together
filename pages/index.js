import { useRouter } from 'next/router';
import styles from '../styles/home.module.scss';
import Navbar from '../components/Navbar';

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
            </div>
            <div className={styles.mainSection}>
                <div className={styles.features}>
                    <div className={styles.feature}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;