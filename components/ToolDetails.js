import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBrushSize, setBrushOpacity, setEraserSize, setEraserOpacity, setPencilSize, setPencilOpacity } from '../store/actions/actionCreators';
import styles  from '../styles/toolDetails.module.scss' 

function ToolDetails() {
    const dispatch = useDispatch();
    const selectedTool = useSelector((state) => state.tool.selectedTool);
    const selectedBrushSize = useSelector((state) => state.brush.brushSize);
    const selectedBrushOpacity = useSelector((state) => state.brush.brushOpacity);
    const selectedEraserSize = useSelector((state) => state.brush.eraserSize);
    const selectedEraserhOpacity = useSelector((state) => state.brush.eraserOpacity);
    const selectedPencilSize = useSelector((state) => state.brush.pencilSize);
    const selectedPencilOpacity = useSelector((state) => state.brush.pencilOpacity);
    const [localBrushSize, setLocalBrushSize] = useState(selectedBrushSize); // 本地狀態
    const [localBrushOpacity , setLocalBrushOpacity] = useState(selectedBrushOpacity);
    const [localEraserSize, setLocalEraserSize] = useState(selectedEraserSize);
    const [localEraserOpacity , setLocalEraserOpacity] = useState(selectedEraserhOpacity);
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
            <div className={styles['tooldetails-container']}>
                <span className={styles['tool-title']}>◆ size</span>
                <div className={`${styles['brush-size-controller']} ${styles['size-controller']}`}>
                    <input value={localBrushSize} onChange={changeBrushSize} type="range" id="brushSizeSlider" min="1" max="100" 
                        style={{ background: `linear-gradient(to right, #949494 0%, #949494 ${localBrushSize}%, white ${localBrushSize}%, white 100%)` }}
                    />
                    <span className={styles['tool-title']}>{localBrushSize}</span>
                </div>

                <span className={styles['tool-title']}>◆ opacity</span>
                <div className={`${styles['opacity-controller']} ${styles['size-controller']}`}>
                    <input value={localBrushOpacity} onChange={changeBrushhOpacity} type="range" id="brushOpacitySlider" min="1" max="100" 
                        style={{ background: `linear-gradient(to right, #949494 0%, #949494 ${localBrushOpacity}%, white ${localBrushOpacity}%, white 100%)` }}
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
            <div className={styles['tooldetails-container']}>
                <span className={styles['tool-title']}>◆ size</span>
                <div className={`${styles['pencil-size-controller']} ${styles['size-controller']}`}>
                    <input value={localPencilSize} onChange={changePencilSize} type="range" id="pencilSizeSlider" min="1" max="100" 
                        style={{ background: `linear-gradient(to right, #949494 0%, #949494 ${localPencilSize}%, white ${localPencilSize}%, white 100%)` }}
                    />
                    <span className={styles['tool-title']}>{localPencilSize}</span>
                </div>
                <span className={styles['tool-title']}>◆ opacity</span>
                <div className={`${styles['opacity-controller']} ${styles['size-controller']}`}>
                    <input value={localPencilOpacity} onChange={changePencilOpacity} type="range" id="pencilOpacitySlider" min="1" max="100" 
                        style={{ background: `linear-gradient(to right, #949494 0%, #949494 ${localPencilOpacity}%, white ${localPencilOpacity}%, white 100%)` }}
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
        const changeEraserOpacity= (e) => {
            const opacity = parseFloat(e.target.value);
            setLocalEraserOpacity(opacity);
            dispatch(setEraserOpacity(opacity));
        };
        return (
            <div className={styles['tooldetails-container']}>
                <span className={styles['tool-title']}>◆ size</span>
                <div className={`${styles['eraser-size-controller']} ${styles['size-controller']}`}>
                    <input value={localEraserSize} onChange={changeEraserSize} type="range" id="eraserSizeSlider" min="1" max="100" 
                        style={{ background: `linear-gradient(to right, #949494 0%, #949494 ${localEraserSize}%, white ${localEraserSize}%, white 100%)` }}
                    />
                    <span className={styles['tool-title']}>{localEraserSize}</span>
                </div>
                <span className={styles['tool-title']}>◆ opacity</span>
                <div className={`${styles['opacity-controller']} ${styles['size-controller']}`}>
                    <input value={localEraserOpacity} onChange={changeEraserOpacity} type="range" id="eraserOpacitySlider" min="1" max="100" 
                        style={{ background: `linear-gradient(to right, #949494 0%, #949494 ${localEraserOpacity}%, white ${localEraserOpacity}%, white 100%)` }}
                    />
                    <span className={styles['tool-title']}>{localEraserOpacity}%</span>
                </div>
            </div>
        );
    }
    return (
        <div className={styles['tooldetails-container']}>
        </div>
    );
}

export default ToolDetails;