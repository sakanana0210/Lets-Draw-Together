import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTool } from '../store/actions/actionCreators';
import styles  from '../styles/toolsBar.module.scss' 

function ToolsBar() {
    const dispatch = useDispatch();
    const selectedTool = useSelector((state) => state.tool.selectedTool);
    const squareRef = useRef(null);
    const brushRef = useRef(null);
    const pencilRef = useRef(null);
    const eyedropperRef = useRef(null);
    const eraserRef = useRef(null);
    const scissorsRef = useRef(null);

    const handleToolClick = (tool) => {
        dispatch(setSelectedTool(tool));
    };

    useEffect(() => {
        const toolRefs = {
            square: squareRef,
            brush: brushRef,
            pencil: pencilRef,
            eyedropper: eyedropperRef,
            eraser: eraserRef,
            scissors: scissorsRef
        };
        Object.values(toolRefs).forEach((ref) => {
            ref.current.classList.remove(styles.selected);
        });
        if (selectedTool) {
            toolRefs[selectedTool].current.classList.add(styles.selected);
        }
    }, [selectedTool]);
        
    return (
        <div className={styles['toolsbar-container']}>
            <button className={`${styles.tool} ${styles['tool-square']}`} ref={squareRef} onClick={() => handleToolClick('square')}>
                <div className={`${styles['tool-img']} ${styles['tool-img-square']}`}></div>
            </button>
            <button className={`${styles.tool} ${styles['tool-brush']}`} ref={brushRef} onClick={() => handleToolClick('brush')}>
                <div className={`${styles['tool-img']} ${styles['tool-img-brush']}`}></div> 
            </button>
            <button className={`${styles.tool} ${styles['tool-pencil']}`} ref={pencilRef} onClick={() => handleToolClick('pencil')}>
                <div className={`${styles['tool-img']} ${styles['tool-img-pencil']}`}></div>
            </button>
            <button className={`${styles.tool} ${styles['tool-eyedropper']}`} ref={eyedropperRef} onClick={() => handleToolClick('eyedropper')}>
                <div className={`${styles['tool-img']} ${styles['tool-img-eyedropper']}`}></div>
            </button>
            <button className={`${styles.tool} ${styles['tool-eraser']}`} ref={eraserRef} onClick={() => handleToolClick('eraser')}>
                <div className={`${styles['tool-img']} ${styles['tool-img-eraser']}`}></div>
            </button>
            <button className={`${styles.tool} ${styles['tool-scissors']}`} ref={scissorsRef} onClick={() => handleToolClick('scissors')}>
                <div className={`${styles['tool-img']} ${styles['tool-img-scissors']}`}></div>
            </button>
        </div>
    );
}

export default ToolsBar;