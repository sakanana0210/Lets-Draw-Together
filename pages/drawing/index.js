import React, { useState }  from 'react';
import CanvasApp from './components/DrawingCanvas';
import ColorPicker from './components/ColorPicker';
import ToolsBar from './components/ToolsBar';
import ToolDetails from './components/ToolDetails';
import styles from './styles/drawing.module.scss';
import Navbar from '../../components/Navbar';
import ChatRoom from './components/ChatRoom';
import { AiOutlineCaretRight, AiOutlineCaretLeft } from 'react-icons/ai';

function Drawing() {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className={styles['App']}>
            <Navbar />
            <div className={styles['body']}>
                <div className={styles['tools-bar']}>
                            <ToolsBar />
                </div>
                {isOpen && (
                    <div className={styles['left-div']}>
                        <ColorPicker />
                        <ToolDetails />
                    </div>
                )}
                <div className={styles['left-arrow']} onClick={handleToggle}>
                    {isOpen ? 
                    (<AiOutlineCaretLeft className={styles.btnImage} size={24}/>) :
                    (<AiOutlineCaretRight className={styles.btnImage} size={24}/>)
                    }  
                </div>
                <div className={styles['right-div']} style={{ width: isOpen ? 'calc(100vw - 280px)' : 'calc(100vw - 80px)' }}>
                    <CanvasApp/>
                </div>
                <ChatRoom />
            </div>
        </div>
    );
}

export default Drawing;