import React, { useRef }  from 'react';
import { Provider } from 'react-redux';
import CanvasApp from './components/DrawingCanvas';
import ColorPicker from './components/ColorPicker';
import ToolsBar from './components/ToolsBar';
import ToolDetails from './components/ToolDetails';
import styles from './styles/drawing.module.scss';
import Navbar from '../../components/Navbar';

function Drawing() {
    return (
        <div className={styles['App']}>
            <Navbar />
            <div className={styles['body']}>
                <div className={styles['tools-bar']}>
                    <ToolsBar />
                </div>
                <div className={styles['left-div']}>
                    <ColorPicker />
                    <ToolDetails />
                </div>
                <div className={styles['right-div']}>
                    <CanvasApp/>
                </div>
            </div>
        </div>
    );
}

export default Drawing;