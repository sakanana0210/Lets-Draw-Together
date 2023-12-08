import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTool } from '../../../store/actions/actionCreators';
import styles  from '../styles/toolsBar.module.scss' 
import { FaRegHandPaper } from 'react-icons/fa';
import { BsArrowsMove, BsFillEraserFill } from 'react-icons/bs';
import { PiTextTBold} from 'react-icons/pi';
import { AiFillFileImage} from 'react-icons/ai'; 
import { FiMove} from 'react-icons/fi';
import { HiMiniPaintBrush, HiPencil, HiEyeDropper} from 'react-icons/hi2';


function ToolsBar() {
    const dispatch = useDispatch();
    const selectedTool = useSelector((state) => state.tool.selectedTool);
    const windowHeight = useSelector((state) => state.brush.windowHeight);
    const moveRef = useRef(null);
    const brushRef = useRef(null);
    const pencilRef = useRef(null);
    const eyedropperRef = useRef(null);
    const eraserRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const layerMoveRef = useRef(null);

    const handleToolClick = (tool) => {
        dispatch(setSelectedTool(tool));
    };

    useEffect(() => {
        const toolRefs = {
            move: moveRef,
            brush: brushRef,
            pencil: pencilRef,
            eyedropper: eyedropperRef,
            eraser: eraserRef,
            text: textRef,
            layermove: layerMoveRef
            // image: imageRef,
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
            <button className={styles.tool} ref={moveRef} onClick={() => handleToolClick('move')}>
                <div className={`${styles['tool-img']}`}><FaRegHandPaper size={22} /></div>
            </button>
            <button className={styles.tool} ref={layerMoveRef} onClick={() => handleToolClick('layermove')}>
                <div className={`${styles['tool-img']}`}><FiMove size={24} /></div>
            </button>
            <button className={styles.tool} ref={brushRef} onClick={() => handleToolClick('brush')}>
                <div className={`${styles['tool-img']}`}><HiMiniPaintBrush size={24} /></div> 
            </button>
            <button className={styles.tool} ref={pencilRef} onClick={() => handleToolClick('pencil')}>
                <div className={`${styles['tool-img']}`}><HiPencil size={24} /></div>
            </button>
            <button className={styles.tool} ref={eyedropperRef} onClick={() => handleToolClick('eyedropper')}>
                <div className={`${styles['tool-img']}`}><HiEyeDropper size={24} /></div>
            </button>
            <button className={styles.tool} ref={eraserRef} onClick={() => handleToolClick('eraser')}>
                <div className={`${styles['tool-img']}`}><BsFillEraserFill size={24} /></div>
            </button>
            <button className={styles.tool} ref={textRef} onClick={() => handleToolClick('text')}>
                <div className={`${styles['tool-img']}`}><PiTextTBold size={24} /></div>
            </button>
            {/* <button className={styles.tool} ref={imageRef} onClick={() => handleToolClick('image')}>
                <div className={`${styles['tool-img']}`}><AiFillFileImage size={24} /></div>
            </button> */}

        </div>
    );
}

export default ToolsBar;