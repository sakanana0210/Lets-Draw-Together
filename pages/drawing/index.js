import React, { useState, useEffect }  from 'react';
import { setWindowHeight } from '../../store/actions/actionCreators.js';
import { useDispatch, useSelector } from 'react-redux';
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
    const windowHeight = useSelector((state) => state.brush.windowHeight);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            if(windowHeight !== window.innerHeight){
                dispatch(setWindowHeight(window.innerHeight));
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleToggle = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className={styles['App']}>
            <Navbar />
            <div className={styles['body']} style={{ height: 'calc(100vh - 62px)' }}>
                <div className={styles['tools-bar']}>
                            <ToolsBar />
                </div>
                {isOpen && (
                    <div className={styles['left-div']}>
                        <ColorPicker />
                        <ToolDetails />
                    </div>
                )}
                <div className={styles['left-arrow']} onClick={handleToggle} style={{ height: 'calc(100vh - 72px)' }}>
                    {isOpen ? 
                    (<AiOutlineCaretLeft className={styles.btnImage} size={24}/>) :
                    (<AiOutlineCaretRight className={styles.btnImage} size={24}/>)
                    }  
                </div>
                <div className={styles['right-div']} style={{ width: isOpen ? 'calc(100% - 275px)' : 'calc(100% - 75px)', height: 'calc(100vh - 62px)'}}>
                    <CanvasApp/>
                    <div className={styles['right-bottom-div']} style={{ height: 'calc(100vh - 62px)' }}>
                        <ChatRoom />
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Drawing;