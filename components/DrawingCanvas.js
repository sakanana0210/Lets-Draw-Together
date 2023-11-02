import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRGB, startPainting, stopPainting } from '../store/actions/actionCreators';
import styles  from '../styles/drawingCanvas.module.css' 
import {rgbToHsv} from '../utils/rgbToHsv'

function CanvasApp() {
    const painting = useSelector((state) => state.canvas.painting);
    const selectedRGB = useSelector((state) => state.canvas.selectedRGB);
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const selectedTool = useSelector((state) => state.tool.selectedTool);
    const selectedBrushSize = useSelector((state) => state.brush.brushSize);
    const selectedBrushOpacity = useSelector((state) => state.brush.brushOpacity);
    const selectedEraserSize  = useSelector((state) => state.brush.eraserSize);
    const selectedEraserOpacity = useSelector((state) => state.brush.eraserOpacity);
    const selectedPencilSize = useSelector((state) => state.brush.pencilSize);
    const selectedPencilOpacity = useSelector((state) => state.brush.pencilOpacity);

    const handleMouseDown = (e) => {
        const ctx = canvasRef.current.getContext('2d');
        if (selectedTool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = selectedEraserSize;
            ctx.lineCap = 'round';
            ctx.globalAlpha = selectedEraserOpacity/100;
            dispatch(startPainting());
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop);
        } else if(selectedTool === 'pencil'){
            const colorString = `rgb(${selectedRGB[0]}, ${selectedRGB[1]}, ${selectedRGB[2]})`;
            ctx.strokeStyle = colorString;
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = selectedPencilSize;
            ctx.globalAlpha = selectedPencilOpacity/100;
            ctx.lineCap = 'square';
            dispatch(startPainting());
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop);
        } else if(selectedTool === 'brush'){
            const colorString = `rgb(${selectedRGB[0]}, ${selectedRGB[1]}, ${selectedRGB[2]})`;
            ctx.strokeStyle = colorString;
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = selectedBrushSize;
            ctx.lineCap = 'round';
            ctx.globalAlpha = selectedBrushOpacity/100;
            dispatch(startPainting());
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop);
        } else if(selectedTool === 'eyedropper'){
            const x = e.clientX - canvasRef.current.offsetLeft;
            const y = e.clientY - canvasRef.current.offsetTop;
            const imageData = ctx.getImageData(x, y, 1, 1);
            const pixelColor = imageData.data;
            const newRGB = `rgb(${pixelColor[0]}, ${pixelColor[1]}, ${pixelColor[2]})`;
            ctx.strokeStyle = newRGB;
            const newHSV = rgbToHsv(pixelColor[0], pixelColor[1], pixelColor[2]);
            dispatch(setRGB(pixelColor, newHSV));
        }

    };

    const handleMouseover = (e) => {
        if (!painting) return;
        const ctx = canvasRef.current.getContext('2d');
        ctx.lineTo(e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop);
        ctx.stroke();
    };

    const handleMouseUp = () => {
        dispatch(stopPainting());
    };

    return (
        <div>
            <canvas
                className={styles['canvas']}
                ref={canvasRef}
                width={400}
                height={400}
                style={{ border: '1px solid #000' }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseover}
            />
        </div>
    );
}

export default CanvasApp;