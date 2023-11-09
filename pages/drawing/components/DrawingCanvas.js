import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRGB, startPainting, stopPainting, doneNewText } from '../../../store/actions/actionCreators';
import styles  from '../styles/drawingCanvas.module.scss' 
import {rgbToHsv} from '../../../utils/rgbToHsv'
import { fabric } from 'fabric-with-erasing';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiFillEye, AiFillEyeInvisible, AiFillDelete, AiFillFileAdd, AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { selectLayer, addLayer, deleteLayer, setLayerVisibility } from '../../../store/actions/layerActionsCreator';
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
    const selectedLayerId = useSelector((state) => state.layer.selectedLayerId);
    let layers = useSelector((state) => state.layer.layers);
    layers = layers.sort((a, b) => b.id - a.id);
    const newText = useSelector((state) => state.brush.newText);
    const [canvas, setCanvas] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [zoomPositon, setZoomPositon] = useState("center");
    const [layerView, setLayerView] = useState(true);
    const [group, setGroup] = useState(null);

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
            handleAddLayer();
        }
    }, [canvas]);

    useEffect(() => {
        if (newText === true && canvas && selectedTool === 'text') {
            let text = new fabric.IText('text', {
                left: 50,
                top: 50,
                fontSize: 16,
                fill: 'black'
            });
            canvas.add(text);
            dispatch(doneNewText());
        }
    }, [newText]);

    useEffect(() => {
        if (canvas) {
            if (selectedTool === 'brush') {
                canvas.isDrawingMode = true;
                const colorString = `rgba(${selectedRGB[0]}, ${selectedRGB[1]}, ${selectedRGB[2]}, ${selectedBrushOpacity / 100})`;
                const PencilBrush = new fabric.PencilBrush(canvas);
                canvas.freeDrawingBrush = PencilBrush;
                PencilBrush.color = colorString;;
                PencilBrush.width = selectedBrushSize;
            } else if (selectedTool === 'pencil'){
                canvas.isDrawingMode = true;
                const colorString = `rgba(${selectedRGB[0]}, ${selectedRGB[1]}, ${selectedRGB[2]}, ${selectedPencilOpacity / 100})`;
                const PencilBrush = new fabric.PencilBrush(canvas);
                canvas.freeDrawingBrush = PencilBrush;
                PencilBrush.color = colorString;
                PencilBrush.width = selectedPencilSize;
                PencilBrush.strokeLineCap = 'square';
            } else if (selectedTool === 'eyedropper') {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                canvas.getObjects().forEach((obj, index) => {
                    obj.evented = false;
                });
            } else if (selectedTool === 'eraser'){
                canvas.isDrawingMode = true;
                const EraserBrush = new fabric.EraserBrush(canvas)
                canvas.freeDrawingBrush = EraserBrush;
                EraserBrush.width = selectedEraserSize;
            } else if (selectedTool === 'move'){
                canvas.isDrawingMode = false;
                // canvasContainerRef.current.style.cursor = "grab";
                canvas.getObjects().forEach((obj, index) => {
                    obj.evented = false;
                });
            } else if (selectedTool === 'text'){
                canvas.isDrawingMode = false;
                canvas.selection = true;
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

    useEffect(() => {
        if(canvas){

            const handleObjectAdded = (options) => {
                const tempCanvas = new fabric.StaticCanvas("", {
                        width: canvas.width,
                        height: canvas.height
                    }
                );
                if (options.target.type === 'group') return;
                const groups = canvas.getObjects();
                groups.forEach(async (v) => {
                    if (v.groupId === selectedLayerId && v.type === 'group') {
                        await v.addWithUpdate(options.target);
                        canvas.remove(options.target);
                        await tempCanvas.add(v);
                        tempCanvas.renderAll();
                        const previewDataURL = await tempCanvas.toDataURL({
                            format: 'jpg',
                            quality: 0.1,
                        });
                        const selectedLayer = await layers.find(layer => layer.id === selectedLayerId);
                        selectedLayer.data = previewDataURL;
                        const string = "layerImg" + selectedLayerId;
                        const layerImg = document.getElementById(string);
                        layerImg.src= previewDataURL;
                    }
                });
            };
            
            const handleEraserUp = (options) => {
                if (selectedTool === 'eraser'){
                    const tempCanvas = new fabric.StaticCanvas(null, {
                        width: canvas.width,
                        height: canvas.height
                    });

                    const string = "layerImg" + selectedLayerId;
                    const layerImg = document.getElementById(string);
                    const src = layerImg.getAttribute('src');
                    fabric.Image.fromURL(src, function(img) {
                        const groups = canvas.getObjects();
                        groups.forEach(async (v) => {
                            if (v.groupId === selectedLayerId && v.type === 'group') {
                                await tempCanvas.add(v);
                                if(tempCanvas){
                                    const previewDataURL = tempCanvas.toDataURL({
                                        format: 'jpg',
                                        quality: 0.1,
                                    });
                                    const selectedLayer = layers.find(layer => layer.id === selectedLayerId);
                                    selectedLayer.data = previewDataURL;
                                    layerImg.src = previewDataURL;
                                }
                            }
                        })
                    })
                } else {
                    return;
                }
            };

            canvas.on('object:added', handleObjectAdded);
            canvas.on('mouse:up', handleEraserUp);

            canvas.getObjects().forEach((obj) => {
                if (obj.type === 'group' && obj.groupId === selectedLayerId) {
                    setGroup(obj);
                    obj.erasable = true;
                } else if (obj.type === 'group' && obj.groupId !== selectedLayerId){
                    obj.erasable = false;
                }
            });
        }

        return () => {
            if (canvas) {
                canvas.off('object:added', handleObjectAdded);
                canvas.off('mouse:up', handleEraserUp);
            }
        };
    }, [selectedLayerId, selectedTool]);

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

    // Layers
    const handleAddLayer = () => {
        dispatch(addLayer());
        let newId;
        const calculateNewLayerId = (layers) => {
            const existingIds = layers.map(layer => layer.id);
            const unusedIds = Array.from({ length: existingIds.length + 1 }, (_, index) => index + 1);
            const availableIds = unusedIds.filter(id => !existingIds.includes(id));
        
            return availableIds[0];
        };
        newId = calculateNewLayerId(layers);

        const newGroup = new fabric.Group([], {
            width:canvas.width,
            height:canvas.height,
            fill: 'transparent',
            groupId: newId,
            visible: true,
            erasable: true
        });
        canvas.add(newGroup);
        handleSelectLayer(newId);
    }
    
    const handleSelectLayer = (id) => {
        dispatch(selectLayer(id));
        const groups = canvas.getObjects();
        groups.forEach(v => {
            if (v.groupId === id && v.type === 'group'){
                setGroup(v);
            }
        })
    }

    const handleSetLayerVisibility = (id, visible) => {
        dispatch(setLayerVisibility(id, visible));
        const groups = canvas.getObjects();
        groups.forEach(v => {
            if (v.groupId === id && v.type === 'group') {
                v.visible = visible;
                canvas.renderAll();
            }
        })
    }
    
    const handleDeleteLayer = async (id) => {
        const updatedLayers = layers.filter(layer => layer.id !== id);
        const updatedSelectedLayer = updatedLayers[0];
        dispatch(deleteLayer(id));
        dispatch(selectLayer(updatedSelectedLayer.id));

        const groups = canvas.getObjects();
        groups.forEach(v => {
            if (v.groupId === id && v.type === 'group') {
                canvas.remove(v);
                canvas.renderAll();
            }
            if (v.groupId === updatedSelectedLayer.id && v.type === 'group'){
                setGroup(v);
            }
        })
    }

    return <div className={styles.canvasContainer} onWheel={handleWheel} ref={canvasContainerRef} 
                onMouseDown={handleMouseDownForDrag}onMouseMove={handleMouseMoveForDrag} onMouseUp={handleMouseUpForDrag}>
                    <div className={styles.layerLists}>
                        <div className={styles.btnContainer} style={{ display: layerView ? 'flex' : 'none' }}>
                            <button className={styles.btn} onClick={handleAddLayer}>
                                <AiFillFileAdd className={styles.btnImage}/>
                            </button>
                            {selectedLayerId !== 1 && <button className={styles.btn} onClick={() => handleDeleteLayer(selectedLayerId)}>
                                <AiFillDelete className={styles.btnImage}/>
                            </button>}
                        </div>
                        {layers.map(layer => (
                            <div
                                key={layer.id}
                                className={styles.layer}
                                style={{ backgroundColor: selectedLayerId === layer.id ? '#949494' : '' , display: layerView ? 'flex' : 'none' }}
                            >
                                <button className={styles.btn} onClick={() => handleSetLayerVisibility(layer.id, !layer.visible)}>
                                    {layer.visible ? <AiFillEye className={styles.btnImage}/> : <AiFillEyeInvisible className={styles.btnImage}/>}
                                </button>
                                <img className={styles.layerImg} src={layer.data} id={'layerImg' + layer.id}/>
                                <span onClick={() => handleSelectLayer(layer.id)}>{layer.name}</span>
                            </div>
                        ))}
                        <div className={styles.layerViewContainer} >
                            <button className={styles.layerViewBtn} onClick={() => setLayerView(!layerView)} 
                                style={{ borderTop: layerView ? '1px solid #fff' : 'none'}}
                            >
                                {layerView ? <AiOutlineCaretUp size={24} /> : (<><span>Layer</span><AiOutlineCaretDown size={24} /></>)}
                            </button>
                        </div>
                    </div>

                <div style={{ transform: `scale(${zoom}) translate(${dragPosition.x}px, ${dragPosition.y}px)`, transformOrigin: `${zoomPositon}` }}>
                    <canvas className={styles.canvas} ref={canvasRef}  />
                </div>
                <div className={styles.zoomPercent}>
                    <button className={styles.zoomPercentBtn} onClick={handleZoomDown}><AiOutlineMinusCircle size={22}/></button>
                    <div className={styles.zoomPercentDisplay}>{parseInt(zoom * 100, 10)}%</div>
                    <button className={styles.zoomPercentBtn} onClick={handleZoomUp}><AiOutlinePlusCircle size={22} /></button>
                </div>
                {/* <div className={styles.preview}>
                    <button>整個畫布預覽:</button>
                    <img src="preview" />
                </div> */}
            </div>
}
export default CanvasApp;