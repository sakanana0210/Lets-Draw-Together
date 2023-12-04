import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBrushSize, setBrushOpacity, setEraserSize, setPencilSize, setPencilOpacity, setNewText, setNewImage } from '../../../store/actions/actionCreators';
import styles  from '../styles/toolDetails.module.scss' 

function ToolDetails() {
    const dispatch = useDispatch();
    const selectedTool = useSelector((state) => state.tool.selectedTool);
    const selectedBrushSize = useSelector((state) => state.brush.brushSize);
    const windowHeight = useSelector((state) => state.brush.windowHeight);
    const selectedBrushOpacity = useSelector((state) => state.brush.brushOpacity);
    const selectedEraserSize = useSelector((state) => state.brush.eraserSize);
    const selectedPencilSize = useSelector((state) => state.brush.pencilSize);
    const selectedPencilOpacity = useSelector((state) => state.brush.pencilOpacity);
    const [localBrushSize, setLocalBrushSize] = useState(selectedBrushSize);
    const [localBrushOpacity , setLocalBrushOpacity] = useState(selectedBrushOpacity);
    const [localEraserSize, setLocalEraserSize] = useState(selectedEraserSize);
    const [localPencilSize, setLocalPencilSize] = useState(selectedPencilSize);
    const [localPencilOpacity , setLocalPencilOpacity] = useState(selectedPencilOpacity);

    if(selectedTool === 'brush'){
        const changeBrushSize = (e) => {
            const size = parseFloat(e.target.value);
            setLocalBrushSize(size);
            dispatch(setBrushSize(size));
        };
        const changeBrushhOpacity= (e) => {
            const opacity = parseFloat(e.target.value);
            setLocalBrushOpacity(opacity);
            dispatch(setBrushOpacity(opacity));
        };
        return (
            <div className={styles['tooldetails-container']} style={{ height: `${windowHeight - 272 }px` }}>
                <span className={styles['tool-title']}>◆ Size</span>
                <div className={`${styles['brush-size-controller']} ${styles['size-controller']}`}>
                    <input value={localBrushSize} onChange={changeBrushSize} type="range" id="brushSizeSlider" min="1" max="100" 
                        style={{ background: `linear-gradient(to right, #d1dced  0%, #d1dced  ${localBrushSize}%, white ${localBrushSize}%, white 100%)` }}
                    />
                    <span className={styles['tool-title']}>{localBrushSize}</span>
                </div>

                <span className={styles['tool-title']}>◆ Opacity</span>
                <div className={`${styles['opacity-controller']} ${styles['size-controller']}`}>
                    <input value={localBrushOpacity} onChange={changeBrushhOpacity} type="range" id="brushOpacitySlider" min="1" max="100" 
                        style={{ background: `linear-gradient(to right, #d1dced  0%, #d1dced  ${localBrushOpacity}%, white ${localBrushOpacity}%, white 100%)` }}
                    />
                    <span className={styles['tool-title']}>{localBrushOpacity}%</span>
                </div>
            </div>
        );
    }else if(selectedTool === 'pencil'){
        const changePencilSize = (e) => {
            const size = parseFloat(e.target.value);
            setLocalPencilSize(size);
            dispatch(setPencilSize(size));
        };
        const changePencilOpacity= (e) => {
            const opacity = parseFloat(e.target.value);
            setLocalPencilOpacity(opacity);
            dispatch(setPencilOpacity(opacity));
        };
        return (
            <div className={styles['tooldetails-container']} style={{ height: `${windowHeight - 272 }px` }}>
                <span className={styles['tool-title']}>◆ Size</span>
                <div className={`${styles['pencil-size-controller']} ${styles['size-controller']}`}>
                    <input value={localPencilSize} onChange={changePencilSize} type="range" id="pencilSizeSlider" min="1" max="100" 
                        style={{ background: `linear-gradient(to right, #d1dced 0%, #d1dced ${localPencilSize}%, white ${localPencilSize}%, white 100%)` }}
                    />
                    <span className={styles['tool-title']}>{localPencilSize}</span>
                </div>
                <span className={styles['tool-title']}>◆ Opacity</span>
                <div className={`${styles['opacity-controller']} ${styles['size-controller']}`}>
                    <input value={localPencilOpacity} onChange={changePencilOpacity} type="range" id="pencilOpacitySlider" min="1" max="100" 
                        style={{ background: `linear-gradient(to right, #d1dced 0%, #d1dced ${localPencilOpacity}%, white ${localPencilOpacity}%, white 100%)` }}
                    />
                    <span className={styles['tool-title']}>{localPencilOpacity}%</span>
                </div>
            </div>
        );
    }else if(selectedTool === 'eraser'){
        const changeEraserSize = (e) => {
            const size = parseFloat(e.target.value);
            setLocalEraserSize(size);
            dispatch(setEraserSize(size));
        };
        return (
            <div className={styles['tooldetails-container']} style={{ height: `${windowHeight - 272 }px` }}>
                <span className={styles['tool-title']}>◆ Size</span>
                <div className={`${styles['eraser-size-controller']} ${styles['size-controller']}`}>
                    <input value={localEraserSize} onChange={changeEraserSize} type="range" id="eraserSizeSlider" min="1" max="100" 
                        style={{ background: `linear-gradient(to right, #d1dced  0%, #d1dced  ${localEraserSize}%, white ${localEraserSize}%, white 100%)` }}
                    />
                    <span className={styles['tool-title']}>{localEraserSize}</span>
                </div>
            </div>
        );
    }else if(selectedTool === 'text'){
        const addText = () => {
            dispatch(setNewText());
        };
        return (
            <div className={styles['tooldetails-container']} style={{ height: `${windowHeight - 272 }px` }}>
                <span className={styles['tool-title']}>◆ Add</span>
                <div className={`${styles['size-controller']}`}>
                    <button onClick={addText}  className={styles['addNewBtn']}>New Text</button>
                </div>
            </div>
        );
    }else if(selectedTool === 'image'){
        const addImage = () => {
            dispatch(setNewImage());
        };
        return (
            <div className={styles['tooldetails-container']} style={{ height: `${windowHeight - 272 }px` }}>
                <span className={styles['tool-title']}>◆ add</span>
                <div className={`${styles['size-controller']}`}>
                    <button onClick={addImage}>New Image</button>
                </div>
            </div>
        );
    }
    return (
        <div className={styles['tooldetails-container']} style={{ height: `${windowHeight - 272 }px` }}>
        </div>
    );
}

export default ToolDetails;