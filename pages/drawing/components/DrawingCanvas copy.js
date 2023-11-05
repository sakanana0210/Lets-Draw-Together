import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRGB, startPainting, stopPainting } from '../../../store/actions/actionCreators';
import styles  from '../styles/drawingCanvas.module.scss' 
import {rgbToHsv} from '../../../utils/rgbToHsv'
import { fabric } from 'fabric';

function CanvasApp() {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const selectedTool = useSelector((state) => state.tool.selectedTool);
    const selectedRGB = useSelector((state) => state.canvas.selectedRGB);
    const painting = useSelector((state) => state.canvas.painting);
    const selectedBrushSize = useSelector((state) => state.brush.brushSize);
    const selectedBrushOpacity = useSelector((state) => state.brush.brushOpacity);
    const selectedEraserSize  = useSelector((state) => state.brush.eraserSize);
    const selectedPencilSize = useSelector((state) => state.brush.pencilSize);
    const selectedPencilOpacity = useSelector((state) => state.brush.pencilOpacity);
    const [canvas, setCanvas] = useState(null);
    const [zoom, setZoom] = useState(1);
    const canvasContainerRef = useRef(null);

    useEffect(() => {
        const newCanvas  = new fabric.Canvas(canvasRef.current, {
            width: 400,
            height: 400,
            isDrawingMode: true,
            selection: false,
        });
        setCanvas(newCanvas);
        
        return () => {
            newCanvas.dispose();
        };
    }, []);

    useEffect(() => {
        if (canvas) {
            if (selectedTool === 'brush') {
                canvas.isDrawingMode = true;
                const colorString = `rgba(${selectedRGB[0]}, ${selectedRGB[1]}, ${selectedRGB[2]}, ${selectedBrushOpacity / 100})`;
                const PencilBrush = new fabric.PencilBrush(canvas);
                canvas.freeDrawingBrush = PencilBrush;
                PencilBrush.color = colorString;;
                PencilBrush.width = selectedBrushSize;
            } else if(selectedTool === 'pencil'){
                canvas.isDrawingMode = true;
                const colorString = `rgba(${selectedRGB[0]}, ${selectedRGB[1]}, ${selectedRGB[2]}, ${selectedPencilOpacity / 100})`;
                const PencilBrush = new fabric.PencilBrush(canvas);
                canvas.freeDrawingBrush = PencilBrush;
                PencilBrush.color = colorString;
                PencilBrush.width = selectedPencilSize;
                PencilBrush.strokeLineCap = 'square';
            } else if (selectedTool === 'eyedropper') {
                canvas.isDrawingMode = false;
                canvas.getObjects().forEach((obj, index) => {
                    obj.evented = false;
                });
            } else if(selectedTool === 'eraser'){
                canvas.isDrawingMode = true;
                const EraserBrush = new fabric.EraserBrush(canvas)
                canvas.freeDrawingBrush = EraserBrush;
                EraserBrush.width = selectedEraserSize;
            }

            const handleMouseDown = (e) => {
                if (selectedTool === 'eyedropper') {
                    const scaleX = window.devicePixelRatio;
                    const scaleY = window.devicePixelRatio;
                    const x = Math.floor((e.pointer.x) * scaleX);
                    const y = Math.floor((e.pointer.y) * scaleY);
                    const ctx = canvas.getContext('2d');
                    const imageData = ctx.getImageData(x, y, 1, 1).data;
                    const pixelColor = Array.from(imageData);
                    const newHSV = rgbToHsv(pixelColor[0], pixelColor[1], pixelColor[2]);
                    dispatch(setRGB(pixelColor, newHSV));
                };
            };

            canvas.on('mouse:down', handleMouseDown);
            return () => {
                canvas.off('mouse:down', handleMouseDown);
            };

        }   
    }, [selectedTool,selectedPencilOpacity, selectedPencilSize, selectedBrushSize, selectedBrushOpacity, selectedRGB, selectedEraserSize]);

    // const handleWheel = (e) => {
    //     const delta = e.deltaY;
    //     const zoomSpeed = 1.1;
    //     const newZoom = zoom * (delta > 0 ? 1 / zoomSpeed : zoomSpeed);
    //     const minZoom = 0.01;
    //     const maxZoom = 20;
    //     const clampedZoom = Math.min(maxZoom, Math.max(minZoom, newZoom));
    //     setZoom(clampedZoom);
    // };

    return <div 
                className={styles.canvasContainer}
                ref={canvasContainerRef}

            >
            <canvas  
                className={styles.canvas}  
                // style={{ transform: `scale(${zoom})` }}
            />
        </div>
}

export default CanvasApp;