import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRGB, startPainting, stopPainting } from '../../../store/actions/actionCreators';
import styles  from '../styles/drawingCanvas.module.scss' 
import {rgbToHsv} from '../../../utils/rgbToHsv'
import { fabric } from 'fabric';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
// import _ from 'lodash';

function CanvasApp() {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const canvasContainerRef = useRef(null);
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
    const [relationshipX, setRelationshipX] = useState(0);
    const [relationshipY, setRelationshipY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [zoomPositon, setZoomPositon] = useState("center");

    useEffect(() => {
        const newCanvas  = new fabric.Canvas(canvasRef.current, {
            backgroundColor: 'white',
            width: 800,
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
            } else if(selectedTool === 'move'){
                canvas.isDrawingMode = false;
                canvas.getObjects().forEach((obj, index) => {
                    obj.evented = false;
                });
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

    const handleWheel = (e) => {
        const currentZoom = zoom;
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = Math.round((e.clientX - rect.left) / currentZoom);
        const mouseY = Math.round((e.clientY - rect.top) / currentZoom);
        const delta = e.deltaY;
        const zoomSpeed = 1.1;
        const newZoom = zoom * (delta > 0 ? 1 / zoomSpeed : zoomSpeed);
        const minZoom = 0.5;
        const maxZoom = 10;
        const clampedZoom = Math.min(maxZoom, Math.max(minZoom, newZoom));
        setZoom(clampedZoom);
        setZoomPositon(`${mouseX}px ${mouseY}px`);
    };

    const handleMouseDownForDrag = (e) => {
        if(selectedTool === 'move'){
            setIsDragging(true);
            setDragOffset({
                x: e.clientX - dragPosition.x,
                y: e.clientY - dragPosition.y
            });
        }
    };

    const handleMouseMoveForDrag = (e) => {
        if(selectedTool === 'move'){
            if (isDragging) {
                setDragPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
                });
            }
        }
    };

    const handleMouseUpForDrag = () => {
        if(selectedTool === 'move'){
            setIsDragging(false);
        }
    };

    const handleZoomUp = () =>{
        const zoomSpeed = 0.25;
        const newZoom = zoom + zoomSpeed;
        const minZoom = 0.5;
        const maxZoom = 10;
        const clampedZoom = Math.min(maxZoom, Math.max(minZoom, newZoom));
        setZoom(clampedZoom);
        setZoomPositon("center");
    }

    const handleZoomDown = () =>{
        const zoomSpeed = 0.25;
        const newZoom = zoom - zoomSpeed;
        const minZoom = 0.5;
        const maxZoom = 10;
        const clampedZoom = Math.min(maxZoom, Math.max(minZoom, newZoom));
        setZoom(clampedZoom);
        setZoomPositon("center");
    }

    return <div className={styles.canvasContainer} onWheel={handleWheel} ref={canvasContainerRef} 
                onMouseDown={handleMouseDownForDrag}onMouseMove={handleMouseMoveForDrag} onMouseUp={handleMouseUpForDrag}>
                <div style={{ transform: `scale(${zoom}) translate(${dragPosition.x}px, ${dragPosition.y}px)`, transformOrigin: `${zoomPositon}` }}>
                    <canvas className={styles.canvas} ref={canvasRef}  />
                </div>
                <div className={styles.zoomPercent}>
                    <button className={styles.zoomPercentBtn} onClick={handleZoomDown}><AiOutlineMinusCircle size={22}/></button>
                    <div className={styles.zoomPercentDisplay}>{parseInt(zoom * 100, 10)}%</div>
                    <button className={styles.zoomPercentBtn} onClick={handleZoomUp}><AiOutlinePlusCircle size={22} /></button>
                </div>
            </div>
}
export default CanvasApp;