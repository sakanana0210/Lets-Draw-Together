import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setRGB, startPainting, stopPainting, doneNewText, doneNewImage, setSelectedTool, setBrushSize, setBrushOpacity } from '../../../store/actions/actionCreators';
import styles  from '../styles/drawingCanvas.module.scss' 
import {rgbToHsv} from '../../../utils/rgbToHsv'
import { fabric } from 'fabric-with-erasing';
import { FaAngleDoubleDown, FaAngleDoubleUp} from 'react-icons/fa';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiFillEye, AiFillEyeInvisible, AiFillDelete, AiFillFileAdd, AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { selectLayer, addLayer, deleteLayer, setLayerVisibility, setExistedLayer, setLayerIndex } from '../../../store/actions/layerActionsCreator';
import { doc, collection, addDoc, setDoc, serverTimestamp, getDoc, getDocs, updateDoc, onSnapshot, ref } from "firebase/firestore";
import {db} from '../../../firebase.js';
import isEqual from 'lodash/isEqual';

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
    const newText = useSelector((state) => state.brush.newText);
    const newImage = useSelector((state) => state.brush.newImage);
    const [canvas, setCanvas] = useState(null);
    const [sharedCanvas, setSharedCanvas] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [zoomPositon, setZoomPositon] = useState("center");
    const [layerView, setLayerView] = useState(true);
    const [group, setGroup] = useState(null);
    const [textEditing, setTextEditing] = useState(null);
    const [textLayer, settextLayer] = useState(null);
    const [isUpdatingCanvas, setIsUpdatingCanvas] = useState(false);
    const [groupToCanvas, setGroupToCanvas] = useState(false);
    const [newCanvas1Group, setNewCanvas1Group] = useState(false);
    const [loadCanvasDone, setLoadCanvasDone] = useState(false);
    let layers = useSelector((state) => state.layer.layers);
    layers = layers.sort((a, b) => b.zIndex - a.zIndex);
    const router = useRouter();
    const { roomId } = router.query;
    const authenticated = useSelector((state) => state.auth.isAuthenticated);
    const userUid = useSelector((state) => state.auth.loginUserUid);
    const userName = useSelector((state) => state.auth.loginUserName);

    // enter room load json canvas or create json
    useEffect(() => {
        if(roomId){
            const setRoomDoc = async() => {
                const roomsCollection = collection(db, 'rooms');
                const roomDocumentRef = doc(roomsCollection, roomId);
                const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
                const querySnapshot = await getDocs(canvasInfoCollection);
                if (querySnapshot.docs.length > 0) {
                    const firstDocumentSnapshot = querySnapshot.docs[0];
                    const jsonData =  firstDocumentSnapshot.data().canvasJson;
                    const loadCanvasFromJson = async (jsonString) => {
                        try {
                        const canvas  = new fabric.Canvas(canvasRef.current, {
                            width: 800,
                            height: 400,
                            isDrawingMode: true,
                            selection: false,
                        });
                        let layerList = [];
                        await canvas.loadFromJSON(jsonString, function() {
                        canvas.renderAll();
                        console.log('Canvas loaded from JSON successfully');
                        console.log('user ID: ', userUid);
                        }, function(o, object) {
                            if (object.type === 'image' && object.getSrc) {
                                object.setSrc(object.getSrc(), function() {
                                canvas.renderAll();
                                });
                            } else if (object.type === 'group' && object.groupId){
                                const NewLayer = {
                                    id: object.groupId,
                                    name: `Layer ${object.groupId}`,
                                    visible: true,
                                    zIndex: object.zIndex
                                }
                                object.visible = true;
                                layerList.push(NewLayer);
                            }
                        });
                        setCanvas(canvas);
                        setLoadCanvasDone(true);

                        if(layerList.length !== 0){
                            console.log('load layer');
                        } else {
                            const NewLayer = {
                                id: 1,
                                name: `Layer 1`,
                                visible: true,
                                zIndex: 0
                            }
                            layerList.push(NewLayer);
                            setNewCanvas1Group(true);
                        }
                        dispatch(setExistedLayer(layerList));
                        console.log(layerList);
                        return [canvas, layerList];
                    } catch (error) {
                        console.error('Error loading canvas from JSON:', error);
                        return null;
                    }
                    };
                    let [canvas, layerList] = await loadCanvasFromJson(jsonData);
                    const setLayerImg = () => {
                        for (let i = 1 ; i <= layerList.length ; i++) {
                            const tempCanvas = new fabric.StaticCanvas("", {
                                width: canvas.width,
                                height: canvas.height
                            });                      
                            const groups = canvas.getObjects();
                            groups.forEach(async (v) => {
                                if (v.groupId === i && v.type === 'group') {
                                    try{
                                        await tempCanvas.add(v);
                                        tempCanvas.renderAll();
                                        const previewDataURL = await tempCanvas.toDataURL({
                                            format: 'jpg',
                                            quality: 0.1,
                                        });
                                        // const selectedLayer = await layers.find(layer => layer.id === i);
                                        // selectedLayer.data = previewDataURL;
                                        const string = "layerImg" + i;
                                        const layerImg = document.getElementById(string);
                                        layerImg.src= previewDataURL;
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }
                            });
                            
                        }

                    }
                    setLayerImg();
                    
                    

                } else {
                    try {
                        const newCanvas  = new fabric.Canvas(canvasRef.current, {
                            backgroundColor: 'white',
                            width: 800,
                            height: 400,
                            isDrawingMode: true,
                            selection: false,
                        });
                        await setCanvas(newCanvas);

                        const canvasJson = JSON.stringify(newCanvas.toJSON());
                        
                        const newDocRef = await addDoc(canvasInfoCollection, {
                                timestamp: serverTimestamp(),
                                canvasJson: canvasJson
                            });
                            
                        let layerList = [];
                        const NewLayer = {
                            id: 1,
                            name: `Layer 1`,
                            visible: true,
                            zIndex: 0
                        }
                        layerList.push(NewLayer);
                        dispatch(setExistedLayer(layerList));
                        setNewCanvas1Group(true);
                        setLoadCanvasDone(true);
                        console.log('Document written with ID: ', newDocRef.id);
                        console.log('user ID: ', userUid);
                    } catch (e) {
                        console.error('Error writing document: ', e);
                    }
                }
            }

            setRoomDoc();
        }
    }, [roomId]);

    //test
    useEffect(() => {
        if(canvas){
            console.log(layers);
        }
    }, [layers]);

    // create new room's 1st layer
    useEffect(() => {
        if (canvas && newCanvas1Group === true){
            const newGroup = new fabric.Group([], {
                width:canvas.width,
                height:canvas.height,
                fill: 'transparent',
                groupId: 1,
                zIndex: 0,
                visible: true,
                erasable: true
            });
            canvas.add(newGroup);
            handleSelectLayer(1);
        }
    }, [newCanvas1Group]);

    // select tool first
    useEffect(() => {

        dispatch(selectLayer(1));
        dispatch(setSelectedTool('brush'));
        dispatch(setRGB([0,0,0], [0,0,0]));
        dispatch(setBrushSize(2));
        dispatch(setBrushOpacity(100));

    }, []);
    
    // handle canvasJSON to firebase db
    useEffect(() => {
        const updateCanvasInfo = async () => {
            if (canvas && groupToCanvas === true) {
                const roomsCollection = collection(db, 'rooms');
                const roomDocumentRef = doc(roomsCollection, roomId);
                const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
                try {
                    const querySnapshot = await getDocs(canvasInfoCollection);
                    if (querySnapshot.docs[0]) {
                            const firstDocumentRef = querySnapshot.docs[0].ref;
                            const canvasJsonObj = canvas.toJSON(['groupId', 'zIndex']);
                            const canvasJson = JSON.stringify(canvasJsonObj);
                        if (firstDocumentRef) {
                            updateDoc(firstDocumentRef, { canvasJson, userUid });
                        }
                    }
                    setGroupToCanvas(false);
                } catch (error) {
                    console.error('Error updating canvas info:', error);
                }
            }
        };
        
        updateCanvasInfo();
    }, [groupToCanvas])

    // handle add image tool
    useEffect(() => {
        if (canvas) {
            const handleAddImage = () => {
                document.getElementById('upload').addEventListener('change', (e) =>{
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const imgObj = new Image();
                        imgObj.src = event.target.result;
                        imgObj.onload = function() {
                            const fabricImg = new fabric.Image(imgObj);
                            canvas.add(fabricImg);
                        };
                    };
                    try{
                        reader.readAsDataURL(file);
                    }catch {
                        console.error("error");
                    }
                    
                });
            }
            handleAddImage();
            //
        } 
    }, [canvas]);

    // handle shared canvas
    useEffect(()=>{
        if (canvas && loadCanvasDone === true) {
            const loadCanvasFromJson = async (jsonString) => {
                const newCanvas  = new fabric.Canvas(canvasRef.current, {
                    width: 800,
                    height: 400,
                    isDrawingMode: true,
                    selection: false,
                });
                let layerList = [];
                const oldLayers = layers;
                await newCanvas.loadFromJSON(jsonString, function() {
                    newCanvas.renderAll();
                }, function(o, object) {
                    if (object.type === 'image' && object.getSrc) {
                        object.setSrc(object.getSrc(), function() {
                            newCanvas.renderAll();
                        });
                    } else if (object.type === 'group' && object.groupId){
                        const foundLayer = oldLayers.find(layer => layer.id === object.groupId);
                        const NewLayer = {
                            id: object.groupId,
                            name: `Layer ${object.groupId}`,
                            visible: foundLayer ? foundLayer.visible : true,
                            zIndex: object.zIndex
                        }
                        layerList.push(NewLayer);
                    }
                });
                dispatch(setExistedLayer(layerList));
                setSharedCanvas(newCanvas);
                return [newCanvas, layerList];
            }

            const setLayerImg = async (i, newObj) => {
                const tempCanvas = new fabric.StaticCanvas("", {
                    width: canvas.width,
                    height: canvas.height
                });
                await tempCanvas.add(newObj);
                tempCanvas.renderAll();
                const previewDataURL = await tempCanvas.toDataURL({
                format: 'jpg',
                quality: 0.1,
                });
                const string = "layerImg" + i;
                const layerImg = document.getElementById(string);
                if(layerImg){
                    layerImg.src = previewDataURL;
                }
            };

            const roomsCollection = collection(db, 'rooms');
            const roomDocumentRef = doc(roomsCollection, roomId);
            const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
            const unsubscribe = onSnapshot(canvasInfoCollection, async (snapshot) => {
                snapshot.docChanges().forEach(async (change) => {
                    if (change.type === 'modified') {
                        const modifiedDocumentData = change.doc.data();
                        if (modifiedDocumentData['userUid'] !== userUid) {
                            console.log('different');
                            const jsonData = modifiedDocumentData['canvasJson'];
                            let [sharedCanvas, sharedLayerList] = await loadCanvasFromJson(jsonData);
                            const oldObjs = canvas.getObjects();
                            const newObjs = sharedCanvas.getObjects();

                            for (const oldObj of oldObjs) {
                                if (oldObj.type === 'group' && oldObj.groupId) {
                                    canvas.remove(oldObj);
                                }

                            }
    
                            for (const newObj of newObjs) {
                                if (newObj.type === 'group' && newObj.groupId) {

                                    const matchingoldObj = oldObjs.find(oldObj => oldObj.type === 'group' && oldObj.groupId === newObj.groupId);
                                    const matchingLayer = layers.find(layer => layer.id === newObj.groupId);
                                    if(matchingLayer) {
                                        const matchingLayerVisible = matchingLayer.visible;
                                        canvas.add(newObj);
                                        if(matchingoldObj) {
                                            newObj.visible = true;
                                        }
                                        await setLayerImg(newObj.groupId, newObj);
    
                                        if (matchingoldObj && matchingLayerVisible === false) {
                                            newObj.visible = false;
                                        } else if (matchingoldObj && matchingLayerVisible === true) {
                                            newObj.visible = true;
                                        }
                                    }

                                    
                                }
                            }
                        }
                    }
                });
            });
    
            return () => {
                unsubscribe();
            };
        }
    }, [loadCanvasDone, layers]);

    // handle text tool
    const addText = async () => {
        const colorString = `rgb(${selectedRGB[0]}, ${selectedRGB[1]}, ${selectedRGB[2]})`;
        let text = new fabric.IText('text', {
            left: 50,
            top: 50,
            fontSize: 50,
            fill: colorString,
            editable: true
        });
        await canvas.add(text);
        canvas.setActiveObject(text);
        canvas.requestRenderAll();
        canvas.getObjects().forEach((obj, index) => {
            if(obj.type === 'i-text'){
                obj.evented = true;
            } else if (obj.type === 'group'){
                obj.evented = false;
            }
        });
    };
    const addToGroup = () => {
        const tempCanvas = new fabric.StaticCanvas("", {
                width: canvas.width,
                height: canvas.height
            }
        );
        const groups = canvas.getObjects();
        const textObj = groups.find(group => group.type === 'i-text');
        groups.forEach(async (v) => {
            if (v.groupId === selectedLayerId && v.type === 'group') {
                try{
                    await v.addWithUpdate(textObj);
                    canvas.remove(textObj);
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
                } catch (e) {
                    console.error(e);
                }

            }
        });
        dispatch(doneNewText());
        setTextEditing(false);
        setGroupToCanvas(true);
        console.log('setGroupToCanvas');
    }
    useEffect(() => {
        if (newText === true && canvas && selectedTool === 'text') {
            canvas.isDrawingMode = false;
            const newId = handleAddLayer();
            settextLayer(newId);
        } else if((newText === true && canvas && selectedTool !== 'text') ){
            addToGroup();
        }
    }, [newText, selectedTool]);
    useEffect(() => {
        if (newText === true && canvas && selectedTool === 'text' && textEditing !== true) {
            addText();
            setTextEditing(true);
            canvas.on('selection:cleared',addToGroup);
        } else if (newText === true && canvas && selectedTool === 'text' && textEditing === true){
            const newColorString = `rgb(${selectedRGB[0]}, ${selectedRGB[1]}, ${selectedRGB[2]})`;
            const objects = canvas.getObjects();
            objects.forEach((obj) => {
                if (obj.type === 'i-text') {
                    obj.set({ fill: newColorString });
                }
            });
            canvas.renderAll();
            canvas.on('selection:cleared',addToGroup);
        }
        return () => { if(canvas){
            canvas.off('selection:cleared',addToGroup );
        }
        };
    }, [selectedLayerId, selectedRGB]);
    useEffect(() => {
        if (newText === true && canvas && selectedTool === 'text' && textEditing === true && selectedLayerId !== textLayer){
            const addToGroup = () => {
                const tempCanvas = new fabric.StaticCanvas("", {
                        width: canvas.width,
                        height: canvas.height
                    }
                );
                const groups = canvas.getObjects();
                const textObj = groups.find(group => group.type === 'i-text');
                groups.forEach(async (v) => {
                    if (v.groupId === textLayer && v.type === 'group') {
                        try{
                            await v.addWithUpdate(textObj);
                            canvas.remove(textObj);
                            await tempCanvas.add(v);
                            tempCanvas.renderAll();
                            const previewDataURL = await tempCanvas.toDataURL({
                                format: 'jpg',
                                quality: 0.1,
                            });
                            const selectedLayer = await layers.find(layer => layer.id === textLayer);
                            selectedLayer.data = previewDataURL;
                            const string = "layerImg" + textLayer;
                            const layerImg = document.getElementById(string);
                            layerImg.src= previewDataURL;
                        } catch (e) {
                            console.error(e);
                        }
        
                    }
                });
                dispatch(doneNewText());
                setTextEditing(false);
                
            }
            addToGroup();
        }
    }, [textEditing, selectedLayerId]);
    // 

    // handle image tool
    useEffect(() => {
        const addLayerAndImage = async () => {
            if (newImage === true && canvas && selectedTool === 'image') {
                await handleAddLayer();
                const input = document.getElementById('upload');
                input.click();
                dispatch(doneNewImage());
                setGroupToCanvas(true);
                canvas.selection = false;
                canvas.getObjects().forEach((obj, index) => {
                    obj.evented = false;
                });
            }
        }

        addLayerAndImage();
    }, [newImage]);

    // select tool effect
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
                canvas.getObjects().forEach((obj, index) => {
                    obj.evented = false;
                });
            } else if (selectedTool === 'image'){
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

    //！！！layers
    useEffect(() => {
        if(canvas){
            const handleObjectAdded = (options) => {
                const tempCanvas = new fabric.StaticCanvas("", {
                        width: canvas.width,
                        height: canvas.height
                    }
                );
                if (options.target.type === 'group'){
                    return;
                }
                if (options.target.type === 'i-text'){
                    return;
                }
                const objects = canvas.getObjects();
                objects.forEach(async (object) => {
                    if (object.groupId === selectedLayerId && object.type === 'group') {
                        await object.addWithUpdate(options.target);
                        canvas.remove(options.target);
                        try{
                            await tempCanvas.add(object);
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
                            console.log('setGroupToCanvas');
                            setGroupToCanvas(true);
                        } catch (e) {
                            console.error('error:', e);
                        }
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
                    if (layerImg) {
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
                    console.log('setGroupToCanvas');
                    setGroupToCanvas(true);
                }

                } else {
                    return;
                }
            };

            canvas.on('object:added', handleObjectAdded);
            canvas.on('mouse:up', handleEraserUp);
        }

        return () => {
            if (canvas) {
                canvas.off('object:added', handleObjectAdded);
                canvas.off('mouse:up', handleEraserUp);
            }
        };
    }, [selectedLayerId, selectedTool, layers]);

    // layer erasable
    useEffect(() => {
        if(canvas){
            canvas.getObjects().forEach((obj) => {
                if (obj.type === 'group' && obj.groupId === selectedLayerId) {
                    setGroup(obj);
                    obj.erasable = true;
                } else if (obj.type === 'group' && obj.groupId !== selectedLayerId){
                    obj.erasable = false;
                }
            });
        }
    }, [selectedLayerId]);

    // layer visible isDrawingMode selection
    useEffect(() => {
        if (canvas) {
            layers.forEach((layer) => {
                if(layer.id === selectedLayerId && layer.visible === false){
                    canvas.isDrawingMode = false;
                    canvas.selection = false;
                    canvas.getObjects().forEach((obj, index) => {
                        obj.evented = false;
                    });
                }else if (layer.id === selectedLayerId && layer.visible === true && (selectedTool === 'brush' || selectedTool === 'pencil' || selectedTool === 'eraser')){
                    canvas.isDrawingMode = true;
                }else if (layer.id === selectedLayerId && layer.visible === true && (selectedTool === 'layermove')){
                    canvas.isDrawingMode = false;
                    canvas.selection = false;
                    const objects = canvas.getObjects();
                    objects.forEach((obj) => {
                        if (obj.type === 'group' && obj.groupId === selectedLayerId) {
                            obj.evented = true;
                        } else {
                            obj.evented = false;
                        }
                    });
                    canvas.renderAll();
                }
            });

            const handleSelectionClear = () => {
                if (selectedTool === 'layermove'){
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
            }
            canvas.on('selection:cleared', handleSelectionClear);
        } 
        
        return () => {
            if (canvas) {
                canvas.off('selection:cleared', handleSelectionClear);
            }
        };

    }, [layers, selectedLayerId, selectedTool]);

    // whole canvas zoom up down
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
    const handleAddLayer = async() => {
        dispatch(addLayer());
        let newId;
        const calculateNewLayerId = (layers) => {
            if (!Array.isArray(layers) || layers.length === 0) {
                return 1;
            } else {
                const existingIds = layers.map(layer => layer.id);
                const unusedIds = Array.from({ length: existingIds.length + 1 }, (_, index) => index + 1);
                const availableIds = unusedIds.filter(id => !existingIds.includes(id));
                return availableIds[0];
            }
        };
        newId = calculateNewLayerId(layers);
        const newGroup = new fabric.Group([], {
            width:canvas.width,
            height:canvas.height,
            fill: 'transparent',
            groupId: newId,
            zIndex: (newId - 1),
            visible: true,
            erasable: true
        });
        await canvas.add(newGroup);
        await newGroup.moveTo(newId - 1);
        handleSelectLayer(newId);
        setGroupToCanvas(true);
        return newId;
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
        console.log('setGroupToCanvas');
        setGroupToCanvas(true);
    }

    const handleLayerMoveDown = (selectedLayerId) => {
        const layer = layers.find((layer) => layer.id === selectedLayerId);
        const layerZindex = layer.zIndex;
        const objs = canvas.getObjects();
        const changeLayerZindex = layerZindex - 1; 
        const changeLayer = objs.find((obj) => obj.zIndex === changeLayerZindex);
        if(changeLayer && changeLayer.zIndex !== 0){
            dispatch(setLayerIndex(layerZindex, changeLayerZindex));
            objs.forEach((obj) => {
                if(obj.type === 'group' && obj.zIndex === layerZindex && obj.groupId === selectedLayerId){
                    canvas.sendBackwards(obj);
                    obj.zIndex = changeLayerZindex;
                } 
                else if (obj.type === 'group' && obj.zIndex === changeLayerZindex){
                    obj.zIndex = layerZindex;
                }
            })
        }
        setGroupToCanvas(true);
    }

    const handleLayerMoveUp = (selectedLayerId) => {
        const layer = layers.find((layer) => layer.id === selectedLayerId);
        const layerZindex = layer.zIndex;
        const objs = canvas.getObjects();
        const changeLayerZindex = layerZindex + 1; 
        const changeLayer = objs.find((obj) => obj.zIndex === changeLayerZindex);
        if(changeLayer){
            dispatch(setLayerIndex(layerZindex, changeLayerZindex));
            objs.forEach((obj) => {
                if(obj.type === 'group' && obj.groupId === selectedLayerId){
                    canvas.bringForward(obj);
                    obj.zIndex = changeLayerZindex;
                    console.log( obj.groupId , ' move to ', changeLayerZindex );
                } 
                else if (obj.type === 'group' && obj.zIndex === changeLayerZindex){
                    obj.zIndex = layerZindex;
                    console.log( obj.groupId , ' move to ', layerZindex );
                }
            })
        }
        setGroupToCanvas(true);
    
    }

    // download canvas
    const downloadCanvas = () => {
        const dataURL = canvas.toDataURL({ format: 'png', quality: 0.8 });
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'canvas_image.png';
        downloadLink.click();
    }

    return <div className={styles.canvasContainer} onWheel={handleWheel} ref={canvasContainerRef} 
                onMouseDown={handleMouseDownForDrag}onMouseMove={handleMouseMoveForDrag} onMouseUp={handleMouseUpForDrag}>
                    <div className={styles.upperEditList}>
                        <div className={styles.saveBtnContainer}>
                            <button className={styles.btnDownload} onClick={downloadCanvas}>Download Image</button>
                        </div>
                    </div>
                    <div className={styles.layerLists}>
                        <div className={styles.btnContainer} style={{ display: layerView ? 'flex' : 'none' }}>
                            <button className={styles.btn} onClick={handleAddLayer}>
                                <AiFillFileAdd className={styles.btnImage}/>
                            </button>
                            {selectedLayerId !== 1 && <button className={styles.btn} onClick={() => handleLayerMoveUp(selectedLayerId)}>
                                <FaAngleDoubleUp size={20} className={styles.btnImage}/>
                            </button>}
                            {selectedLayerId !== 1 && <button className={styles.btn} onClick={() => handleLayerMoveDown(selectedLayerId)}>
                                <FaAngleDoubleDown size={20} className={styles.btnImage}/>
                            </button>}
                            {selectedLayerId !== 1 && <button className={styles.btn} onClick={() => handleDeleteLayer(selectedLayerId)}>
                                <AiFillDelete className={styles.btnImage}/>
                            </button>}
                        </div>

                        {layers.length > 0 && layers.map(layer => (
                            <div
                                key={layer.id}
                                className={styles.layer}
                                style={{ backgroundColor: selectedLayerId === layer.id ? '#949494' : '' , display: layerView ? 'flex' : 'none' }}
                            >
                                <button className={styles.btn} onClick={() => handleSetLayerVisibility(layer.id, !layer.visible)}>
                                    {layer.visible ? <AiFillEye className={styles.btnImage}/> : <AiFillEyeInvisible className={styles.btnImage}/>}
                                </button>
                                <img className={styles.layerImg} src={layer.data} id={'layerImg' + layer.id}/>
                                <span  className={styles.layerSelector} onClick={() => handleSelectLayer(layer.id)}>{layer.name}</span>
                            </div>
                        ))}

                        <div className={styles.layerViewContainer} >
                            <button className={styles.layerViewBtn} onClick={() => setLayerView(!layerView)} 
                                style={{ borderTop: layerView ? '1px solid #000' : 'none'}}
                            >
                                {layerView ? <AiOutlineCaretUp size={24} /> : (<><span>Layer</span><AiOutlineCaretDown size={24} /></>)}
                            </button>
                        </div>
                    </div>
                <input style={{display: 'none'}} type="file" id="upload" accept="image/*" />
                
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
                {/**/}
                {/**/}
            </div>
}
export default CanvasApp;