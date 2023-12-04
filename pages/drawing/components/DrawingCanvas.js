import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setRGB, setroomId, startPainting, stopPainting, doneNewText, doneNewImage, setSelectedTool, setBrushSize, setBrushOpacity } from '../../../store/actions/actionCreators.js';
import styles  from '../styles/drawingCanvas.module.scss' 
import {rgbToHsv} from '../../../utils/rgbToHsv.js'
import {addRoomIdToPlayCanvas, addRoomIdToOwnCanvas} from '../../../utils/addRoomIdToDbUser.js'
import { fabric } from 'fabric-with-erasing';
import { IoIosSave } from "react-icons/io";
import { FaAngleDoubleDown, FaAngleDoubleUp} from 'react-icons/fa';
import { IoLayers } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiFillEye, AiFillEyeInvisible, AiFillDelete, AiFillFileAdd, AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { selectLayer, addLayer, deleteLayer, setLayerVisibility, setExistedLayer, setLayerIndex, setNewIndexForDelete } from '../../../store/actions/layerActionsCreator.js';
import { doc, query, limit, collection, addDoc, setDoc, serverTimestamp, getDoc, getDocs, updateDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage} from '../../../firebase.js';
import isEqual from 'lodash/isEqual';
import { compact, initial, set, stubString } from 'lodash';

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
    const [groupToCanvas, setGroupToCanvas] = useState(false);
    const [deleteToDb, setDeleteToDb] = useState(false);
    const [newCanvas1Group, setNewCanvas1Group] = useState(false);
    const [loadCanvasDone, setLoadCanvasDone] = useState(false);
    const [layerEdit, setLayerEdit] = useState(false);
    const [imageGroup, setImageGroup] = useState(false);
    const [updateCanvasToDB, setUpdateCanvasToDB] = useState(false);
    const [groupToCanvasForLayer, setGroupToCanvasForLayer] = useState(false);
    const [changeLayer, setChangeLayer] = useState(null);
    const [isUpperEditListOpen, setIsUpperEditListOpen] = useState(false);
    let initialLoad = true;
    let layers = useSelector((state) => state.layer.layers);
    layers = layers.sort((a, b) => b.zIndex - a.zIndex);
    const router = useRouter();
    const { roomId } = router.query;
    const authenticated = useSelector((state) => state.auth.isAuthenticated);
    const userUid = useSelector((state) => state.auth.loginUserUid);
    const userName = useSelector((state) => state.auth.loginUserName);
    const [timerFlag, setTimerFlag] = useState(false);
    const [immediateFlag, setImmediate ] = useState(false);
    const [flip, setFlip ] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimerFlag(true);
        }, 5000);
        const initialWidth = window.innerWidth;
        const initialZoom = initialWidth / 1200 * 0.75;
        const minZoom = 0.5;
        const maxZoom = 10;
        const clampedZoom = Math.min(maxZoom, Math.max(minZoom, initialZoom));
        setZoom(clampedZoom);
        return () => {
            clearInterval(interval);
        };
    }, []);

    // enter room load json canvas or create json
    useEffect(() => {
        if(roomId){
            dispatch(setroomId(roomId));
            const setRoomDoc = async() => {
                const roomsCollection = collection(db, 'rooms');
                const roomDocumentRef = doc(roomsCollection, roomId);
                const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
                const infoDocumentRef = doc(canvasInfoCollection, 'info');
                const objectsCollection = collection(infoDocumentRef, 'objects');
                const infoDocSnapshot = await getDoc(infoDocumentRef);

                if(infoDocSnapshot.exists()){
                    try {
                        const data = infoDocSnapshot.data();
                        const canvasOwner = data['userUid'];
                        const jsonString = data['canvasJson'];
                        const jsonData = JSON.parse(jsonString);
                        const objectsDocSnapshot = await getDocs(objectsCollection);
                        const objectsData = [];
                        objectsDocSnapshot.forEach(async (doc) => {
                            const data = doc.data();
                            const objectData = data['canvasJson'];
                            const objectJsonData = JSON.parse(objectData);
                            objectsData.push(objectJsonData);
                        });
                        const sortedObjs = objectsData.sort((a, b) => {
                            const zIndexA = a.zIndex || 0;
                            const zIndexB = b.zIndex || 0;
                            return zIndexA - zIndexB;
                        });
                        jsonData.objects = sortedObjs;

                        const loadCanvasFromJson = async (jsonString) => {
                            try {
                            const canvas  = new fabric.Canvas(canvasRef.current, {
                                width: 1200,
                                height: 600,
                                isDrawingMode: true,
                                selection: false,
                            });
                            let layerList = [];
                            const idSet = new Set();
                            await canvas.loadFromJSON(jsonString, function() {
                            canvas.renderAll();
                            console.log('Canvas loaded from JSON successfully');
                            console.log('user ID: ', userUid);
                            }, function(object) {
                                if (object.type === 'image' && object.getSrc) {
                                    object.setSrc(object.getSrc(), function() {
                                    canvas.renderAll();
                                    });
                                } else if (object.type === 'group' && object.groupId){
                                    const NewLayer = {
                                        id: object.groupId,
                                        name: `Layer ${object.groupId}`,
                                        visible: true,
                                        zIndex: object.zIndex,
                                        owner: object.owner
                                    }
                                    object.visible = true;
                                    if(!idSet.has(object.groupId)){
                                        idSet.add(object.groupId);
                                        layerList.push(NewLayer);
                                    }
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
                                    zIndex: 0,
                                    owner: userUid
                                }
                                layerList.push(NewLayer);
                                setNewCanvas1Group(true);
                            }
                            dispatch(setExistedLayer(layerList));
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
                        if(canvasOwner !== userUid){
                            addRoomIdToPlayCanvas(roomId, userUid);
                        }else {
                            console.log('my room');
                        }
                        
                    }
                    catch (error) {
                        console.error('Error updating canvas info:', error);
                    }
                } else {
                    try {
                        const newCanvas  = new fabric.Canvas(canvasRef.current, {
                            backgroundColor: 'white',
                            width: 1200,
                            height: 600,
                            isDrawingMode: true,
                            selection: false,
                        });
                        await setCanvas(newCanvas);
                        const canvasJson = JSON.stringify(newCanvas.toJSON());
                        const partDocumentRef = doc(canvasInfoCollection, 'info');
                        await setDoc(partDocumentRef, {
                            timestamp: serverTimestamp(),
                            canvasJson: canvasJson,
                            userUid: userUid
                        });

                        let layerList = [];
                        const NewLayer = {
                            id: 1,
                            name: `Layer 1`,
                            visible: true,
                            zIndex: 0,
                            owner: userUid
                        }
                        layerList.push(NewLayer);
                        dispatch(setExistedLayer(layerList));
                        setNewCanvas1Group(true);
                        setLoadCanvasDone(true);
                        addRoomIdToOwnCanvas(roomId, userUid);

                        console.log('Document written info');
                        console.log('user ID: ', userUid);
                    } catch (e) {
                        console.error('Error writing document: ', e);
                    }
                }
            }

            setRoomDoc();
            setLayerEdit(true);
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
                owner: userUid,
                visible: true,
                erasable: true
            });
            canvas.add(newGroup);
            handleSelectLayer(1);
            setGroupToCanvas(true);
        }
    }, [newCanvas1Group]);

    // select tool first
    useEffect(() => {
        dispatch(setSelectedTool('brush'));
        dispatch(setRGB([0,0,0], [0,0,0]));
        dispatch(setBrushSize(2));
        dispatch(setBrushOpacity(100));

        const updateCanvasToDB = async () => {
            setUpdateCanvasToDB(true);
        };
        //interval記得改 現在是3分鐘
        const interval = setInterval(() => {
            updateCanvasToDB();
        }, 180000);
    
        return () => {
            clearInterval(interval);
        };
    }, []);

    // 選擇圖層
    useEffect(() => {
        if(loadCanvasDone === true){
            const ownLayers = layers.filter(layer => layer.owner === userUid);
            const ownlayer = ownLayers[0];
            if(ownlayer){
                dispatch(selectLayer(ownlayer.id));
            } else {
                handleAddLayer();
            }
        }
    }, [loadCanvasDone]);
    

    // handle canvasJSON to firebase db
    useEffect(() => {
        const updateCanvasInfo = async () => {
            if (canvas && groupToCanvas === true && layerEdit === true) {
                if( (timerFlag === true || immediateFlag === true)){
                    console.log('timerFlag', timerFlag);
                    console.log('immediateFlag', immediateFlag);
                    const roomsCollection = collection(db, 'rooms');
                    const roomDocumentRef = doc(roomsCollection, roomId);
                    const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
                    const infoDocumentRef = doc(canvasInfoCollection, 'info');
                    const objectsCollection = collection(infoDocumentRef, 'objects');
                    try {
                        const infoDocSnapshot = await getDoc(infoDocumentRef);
                        if(infoDocSnapshot.exists()){
                            const objects = canvas.getObjects();
                            const selectedobject = objects.find((obj) => obj.groupId === selectedLayerId);
                            const selectedObjectJSON =  selectedobject.toJSON(['groupId', 'zIndex', 'owner']);
                            const data = {
                                timestamp: serverTimestamp(),
                                canvasJson: JSON.stringify(selectedObjectJSON),
                                userUid: userUid
                            }
                            const objectsDocRef = doc(objectsCollection, 'object' + selectedLayerId);
                            await setDoc(objectsDocRef, data);
                            console.log(selectedLayerId, 'Selected objects JSON saved to Firestore.');
                        }
                        setGroupToCanvas(false);
                        setTimerFlag(false);
                        setImmediate(false);
                    } catch (error) {
                        console.error('Error updating canvas info:', error);
                    }
                }
            
            }
        };
        updateCanvasInfo();
    }, [groupToCanvas, selectedLayerId, timerFlag, immediateFlag])

    // handle layer change 
    useEffect(() => {
        const updateCanvasInfo = async () => {
            if (canvas && groupToCanvasForLayer === true && layerEdit === true) {
                const roomsCollection = collection(db, 'rooms');
                const roomDocumentRef = doc(roomsCollection, roomId);
                const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
                const infoDocumentRef = doc(canvasInfoCollection, 'info');
                const objectsCollection = collection(infoDocumentRef, 'objects');
                try {
                    const infoDocSnapshot = await getDoc(infoDocumentRef);
                    if(infoDocSnapshot.exists()){
                        const objects = canvas.getObjects();
                        const selectedobject = objects.find((obj) => obj.groupId === selectedLayerId);
                        const selectedObjectJSON =  selectedobject.toJSON(['groupId', 'zIndex', 'owner']);
                        const data = {
                            timestamp: serverTimestamp(),
                            canvasJson: JSON.stringify(selectedObjectJSON),
                            userUid: userUid
                        }
                        const objectsDocRef = doc(objectsCollection, 'object' + selectedLayerId);
                        await setDoc(objectsDocRef, data);

                        const selectedobject2 = objects.find((obj) => obj.groupId === changeLayer);
                        const selectedObjectJSON2 =  selectedobject2.toJSON(['groupId', 'zIndex', 'owner']);
                        const data2 = {
                            timestamp: serverTimestamp(),
                            canvasJson: JSON.stringify(selectedObjectJSON2),
                            userUid: userUid
                        }
                        const objectsDocRef2 = doc(objectsCollection, 'object' + changeLayer);
                        await setDoc(objectsDocRef2, data2);
                        console.log(selectedLayerId, 'Selected objects JSON saved to Firestore.');
                    }
                    setGroupToCanvasForLayer(false);
                } catch (error) {
                    console.error('Error updating canvas info:', error);
                }
            }
        };
        updateCanvasInfo();
    }, [groupToCanvasForLayer, selectedLayerId, changeLayer])

    // handle canvasJson delete
    useEffect(() => {
        const updateCanvasInfo = async () => {
            if (canvas && deleteToDb === true) {
                const roomsCollection = collection(db, 'rooms');
                const roomDocumentRef = doc(roomsCollection, roomId);
                const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
                const infoDocumentRef = doc(canvasInfoCollection, 'info');
                const objectsCollection = collection(infoDocumentRef, 'objects');
                const objectDocumentRef = doc(objectsCollection, 'object' + selectedLayerId);
                try {
                    console.log(selectedLayerId);
                    const updatedLayers = layers.filter(layer => layer.id !== selectedLayerId);
                    const updatedSelectedLayer = updatedLayers[0];
                    dispatch(selectLayer(updatedSelectedLayer.id));
                    await deleteDoc(objectDocumentRef);
                    console.log(selectedLayerId, 'delete objects JSON saved to Firestore.');
                    setDeleteToDb(false);
                } catch (error) {
                    console.error('Error updating canvas info:', error);
                }
            }
        };
        updateCanvasInfo();
    }, [deleteToDb])

    // set user rooms
    useEffect(() => {
        const updateCanvasInfo = async () => {
            if (canvas && roomId && updateCanvasToDB === true) {
                try{
                    const canvasDataURL = canvas.toDataURL({ format: 'jpeg', quality: 0.1 });
                    const today = new Date();
                    const dateOnly = today.toISOString().split('T')[0];

                    // const docOwnSnapshot = await getDoc(ownCanvasDocRef);
                    // if (docOwnSnapshot.exists()) {
                    //     await updateDoc(ownCanvasDocRef, { img: canvasDataURL });
                    //     console.log('canvasDataURL set');
                    // }
                    const ownCanvasCollectionRef = collection(db, 'users', userUid, 'ownCanvas');
                    const ownCanvasDocRef = doc(ownCanvasCollectionRef, roomId);
                    const playCanvasCollectionRef = collection(db, 'users', userUid, 'playCanvas');
                    const playCanvasDocRef = doc(playCanvasCollectionRef, roomId);
                    try {
                        const docPlaySnapshot = await getDoc(playCanvasDocRef);
                        if (docPlaySnapshot.exists()) {
                            const oldImg = docPlaySnapshot.data().img;
                            if(oldImg !== canvasDataURL){
                                await updateDoc(playCanvasDocRef, { img: canvasDataURL, date: dateOnly, timestamp: serverTimestamp()});
                                console.log('Canvas dataURL set successfully.');
                            }
                        } else {
                            console.log('Document does not exist in playCanvas collection.');
                        }

                        const docOwnSnapshot = await getDoc(ownCanvasDocRef);
                        if (docOwnSnapshot.exists()) {
                            const oldImg = docOwnSnapshot.data().img;
                            if(oldImg !== canvasDataURL){
                                await updateDoc(ownCanvasDocRef, { img: canvasDataURL, date: dateOnly, timestamp: serverTimestamp() });
                                console.log('Canvas dataURL set successfully.');
                            }
                        } else {
                            console.log('Document does not exist in playCanvas collection.');
                        }

                    } catch (error) {
                        console.error('Error updating canvas info:', error);
                    }
                    
                    setUpdateCanvasToDB(false);
                }
                catch (error) {
                    console.error('Error updating canvas info:', error);
                }
            }
        };
        updateCanvasInfo();
    }, [updateCanvasToDB])
    
    // handle shared canvas
    useEffect(()=>{
        if ((canvas && loadCanvasDone === true && timerFlag === true )|| (canvas && loadCanvasDone === true && immediateFlag === true) ) {
            const loadCanvasFromJson = async (jsonString) => {
                const newCanvas  = new fabric.Canvas(canvasRef.current, {
                    width: 1200,
                    height: 600,
                    isDrawingMode: true,
                    selection: false,
                });
                let layerList = [];
                const idSet = new Set();
                const oldLayers = layers;
                await newCanvas.loadFromJSON(jsonString, function() {
                    newCanvas.renderAll();
                }, (object) => {
                    if (object.type === 'group' && object.groupId){
                        const foundLayer = oldLayers.find(layer => layer.id === object.groupId);
                        const NewLayer = {
                            id: object.groupId,
                            name: `Layer ${object.groupId}`,
                            visible: foundLayer ? foundLayer.visible : true,
                            zIndex: object.zIndex,
                            owner: object.owner
                        }
                        if(!idSet.has(object.groupId)){
                            idSet.add(object.groupId);
                            layerList.push(NewLayer);
                        }
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
            const infoDocumentRef = doc(canvasInfoCollection, 'info');
            const objectsCollection = collection(infoDocumentRef, 'objects'); 
            
            const unsubscribe = onSnapshot((objectsCollection), async (snapshot) => {

                if(initialLoad === true){
                    initialLoad = false;
                    return;
                }

                const jsonGroupIdList = [];

                const setNewLayers = async() => {
                    let layerList = [];
                    const idSet = new Set();
                    const oldLayers = layers;
                    
                    const querySnapshot = await getDocs(objectsCollection);
                    if (querySnapshot) {
                        querySnapshot.docs.forEach(docSnapshot => {
                            const docData = docSnapshot.data();
                            if (docData.canvasJson) {
                                const object = JSON.parse(docData.canvasJson);
                                const foundLayer = oldLayers.find(layer => layer.id === object.groupId);
                                const NewLayer = {
                                    id: object.groupId,
                                    name: `Layer ${object.groupId}`,
                                    visible: foundLayer ? foundLayer.visible : true,
                                    zIndex: object.zIndex,
                                    owner: object.owner
                                }
                                if(!idSet.has(object.groupId)){
                                    idSet.add(object.groupId);
                                    layerList.push(NewLayer);
                                }
                            }
                        });
                    }
                    console.log(layerList);
                    dispatch(setExistedLayer(layerList));
                }

                //check if correct
                const removeAndadd = async() => {
                    let conbinedJsonData;
                    const infoDocSnapshot = await getDoc(infoDocumentRef);
                    if(infoDocSnapshot.exists()){
                        const data = infoDocSnapshot.data();
                        const jsonString = data['canvasJson'];
                        const jsonData = JSON.parse(jsonString);
                        const objectsDocSnapshot = await getDocs(objectsCollection);
                        objectsDocSnapshot.forEach(async (doc) => {
                            const data = doc.data();
                            const objectData = data['canvasJson'];
                            const objectJsonData = JSON.parse(objectData);
                            jsonData['objects'].push(objectJsonData);
                        });
                        conbinedJsonData = JSON.stringify(jsonData);
                    }
                    const oldObjs = canvas.getObjects();
                    let [sharedCanvas, sharedLayerList] = await loadCanvasFromJson(conbinedJsonData);
                    const newObjs = sharedCanvas['_objects'];
                    
                    const sortedObjs = newObjs.sort((a, b) => {
                        const zIndexA = a.zIndex || 0;
                        const zIndexB = b.zIndex || 0;
                        return zIndexA - zIndexB;
                    });

                    for (const oldObj of oldObjs) {
                        if (oldObj.type === 'group' && oldObj.groupId) {
                            canvas.remove(oldObj);
                        }
                    }

                    for (const newObj of sortedObjs) {
                        if (newObj.type === 'image' && newObj.getSrc) {
                            newObj.setSrc(object.getSrc(), function() {
                                canvas.renderAll();
                            });
                        } else if (newObj.type === 'group' && newObj.groupId) {
                            console.log(newObj.groupId);
                            const matchingoldObj = oldObjs.find(oldObj => oldObj.type === 'group' && oldObj.groupId === newObj.groupId);
                            const matchingLayer = sharedLayerList.find(layer => layer.id === newObj.groupId);
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

                snapshot.docChanges().forEach(async(change) => {
                    const doc = change.doc.data();
                    const docId = change.doc.id;
                    
                    if (doc['userUid'] !== userUid) {
                        const jsonString = doc['canvasJson'];
                        const jsonData = JSON.parse(jsonString);
                        const jsonGroupId = jsonData['groupId'];
                        console.log('jsonGroupId', jsonGroupId);

                        if (change.type === 'modified') {
                            console.log('修改文檔:', docId);
                            removeAndadd();
                        }
                        else if (change.type === 'removed') {
                            console.log('刪除文檔:', docId);
                            removeAndadd();
                        }else if (change.type === 'added') {
                            console.log('添加文檔:', docId);
                            removeAndadd();
                        }





                    }
                });
            });

    
            return () => {
                unsubscribe();
            };
        }
    }, [loadCanvasDone, layers, timerFlag, immediateFlag]);

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
        canvas.getObjects().forEach((obj) => {
            if(obj.type === 'i-text'){
                obj.evented = true;
            } else if (obj.type === 'group'){
                obj.evented = false;
            }
        });
    };

    const addToGroup = () => {
        console.log('add to group');
        console.log(textLayer);
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
        setGroupToCanvas(true);
    }

    useEffect(() => {
        if (newText === true && canvas && selectedTool === 'text') {
            async function handleAsyncOperation() {
                try {

                    const resultID = await handleAddLayer();
                    settextLayer(resultID);
                    setGroupToCanvas(true);
                    const objects = canvas.getObjects();
                    objects.forEach((obj) => {
                        if(obj.type === 'group'){
                            obj.evented = false;
                        }
                    });
                    console.log('Promise resolved with result:', resultID);
                } catch (error) {
                    console.error('Promise rejected with error:', error);
                }
            }
            canvas.isDrawingMode = false;
            handleAsyncOperation();
            addText();
            setTextEditing(true);
        }
    }, [newText]);

    useEffect(() => {
        if (textEditing === true){
            console.log('textEditing');
            const newColorString = `rgb(${selectedRGB[0]}, ${selectedRGB[1]}, ${selectedRGB[2]})`;
            const objects = canvas.getObjects();
            objects.forEach((obj) => {
                if (obj.type === 'i-text') {
                    obj.set({ fill: newColorString });
                } else {
                    obj.evented = false;
                }
            });
            canvas.renderAll();
            canvas.on('selection:cleared', addToGroup);

            return () => { 
                if(canvas){
                    canvas.off('selection:cleared', addToGroup);
                }
            };
        }


    }, [textEditing, selectedRGB]);

    useEffect(() => {
        if (textLayer !== selectedLayerId && textEditing === true) {
            addToGroup();
        }
    }, [textLayer, selectedLayerId]);

    // select tool effect
    useEffect(() => {
        if (canvas) {
            if (layerEdit === false){
                canvas.isDrawingMode = false;
                canvas.selection = false;
                canvas.getObjects().forEach((obj) => {
                    obj.evented = false;
                });
            }else if (selectedTool === 'brush' && layerEdit === true) {
                canvas.isDrawingMode = true;
                const colorString = `rgba(${selectedRGB[0]}, ${selectedRGB[1]}, ${selectedRGB[2]}, ${selectedBrushOpacity / 100})`;
                const PencilBrush = new fabric.PencilBrush(canvas);
                canvas.freeDrawingBrush = PencilBrush;
                PencilBrush.color = colorString;;
                PencilBrush.width = selectedBrushSize;
            } else if (selectedTool === 'pencil' && layerEdit === true){
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
            } else if (selectedTool === 'eraser' && layerEdit === true){
                canvas.isDrawingMode = true;
                const EraserBrush = new fabric.EraserBrush(canvas)
                canvas.freeDrawingBrush = EraserBrush;
                EraserBrush.width = selectedEraserSize;
            } else if (selectedTool === 'move' && layerEdit === true){
                canvas.isDrawingMode = false;
                // canvasContainerRef.current.style.cursor = "grab";
                canvas.getObjects().forEach((obj, index) => {
                    obj.evented = false;
                });
            } else if (selectedTool === 'text'){
                canvas.isDrawingMode = false;
                canvas.getObjects().forEach((obj) => {
                    obj.evented = false;
                });
            } else if (selectedTool === 'image'){
                canvas.isDrawingMode = false;
                canvas.getObjects().forEach((obj) => {
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
    }, [layerEdit, selectedTool,selectedPencilOpacity, selectedPencilSize, selectedBrushSize, selectedBrushOpacity, selectedRGB, selectedEraserSize]);

    // layers
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
                if (options.target.type === 'image'){
                    return;
                }
                const objects = canvas.getObjects();
                objects.forEach(async (object) => {
                    if (object.groupId === selectedLayerId && object.type === 'group' && object.owner === userUid) {
                        await object.addWithUpdate(options.target);
                        canvas.remove(options.target);
                        object.evented = false;
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

    // only layer owner can edit
    useEffect(()=>{
        if(canvas){
            const layer = layers.find(layer => layer.id === selectedLayerId);
            const layerOwner = layer.owner;
            if(layerOwner === userUid){
                setLayerEdit(true);
            } else {
                setLayerEdit(false);
            }
        }
    }, [selectedLayerId])

    useEffect(()=>{
        if(canvas){
            if (layerEdit === false) {
                canvas.isDrawingMode = false;
                canvas.selection = false; 
                canvas.forEachObject(obj => {
                    obj.set({
                        selectable: false,
                        evented: false
                    });
                });
            } else {
                canvas.forEachObject(obj => {
                    obj.set({
                        evented: true
                    });
                });
            }
        }
    }, [layerEdit])

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
        dispatch(addLayer(userUid));
        let newId;
        let newZindex;
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
        const calculateZindex = (layers) => {
            const ifZindex0 =  layers.find((layer) => layer.zIndex === 0);
            if(!ifZindex0){
                return 0;
            } else {
                return layers.length;
            }
        };
        newId = calculateNewLayerId(layers);
        newZindex = calculateZindex(layers);
        const newGroup = new fabric.Group([], {
            width:canvas.width,
            height:canvas.height,
            fill: 'transparent',
            groupId: newId,
            zIndex: newZindex,
            owner: userUid,
            visible: true,
            erasable: true
        });
        await canvas.add(newGroup);
        await newGroup.moveTo(newId - 1);
        handleSelectLayer(newId);
        setGroupToCanvas(true);
        setImmediate(true);
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
        if(layerEdit === true && layers.length > 1){
            dispatch(deleteLayer(id));
            const updatedLayers = layers.filter(layer => layer.id !== selectedLayerId);
            const updatedSelectedLayer = updatedLayers[0];
            const groups = canvas.getObjects();
            const deletedLayer = layers.find(layer => layer.id === selectedLayerId);
            const zIndex = deletedLayer.zIndex;
            // 3 2 1 0 刪除1 indezx
            await groups.forEach(v => {
                if (v.groupId === id && v.type === 'group') {
                    canvas.remove(v);
                    canvas.renderAll();
                }else if(v.zIndex > zIndex && v.type === 'group'){
                    const newZindex = v.zIndex - 1;
                    dispatch(setNewIndexForDelete(v.zIndex, newZindex));
                    v.zIndex = newZindex;
                }

                if (v.groupId === updatedSelectedLayer.id && v.type === 'group'){
                    setGroup(v);
                }
            })
            console.log('setGroupToCanvas');
            setDeleteToDb(true);
            setImmediate(true);
        }
    }

    const handleLayerMoveDown = (selectedLayerId) => {
        if(layerEdit === true){
            const layer = layers.find((layer) => layer.id === selectedLayerId);
            const layerZindex = layer.zIndex;
            const objs = canvas.getObjects();
            const changeLayerZindex = layerZindex - 1; 
            const changeLayer = objs.find((obj) => obj.zIndex === changeLayerZindex);
            if(changeLayer){
                setChangeLayer(changeLayer.groupId);
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
                setGroupToCanvasForLayer(true);
                setImmediate(true);
            }

        }
    }

    const handleLayerMoveUp = (selectedLayerId) => {
        if(layerEdit === true){
            const layer = layers.find((layer) => layer.id === selectedLayerId);
            const layerZindex = layer.zIndex;
            const objs = canvas.getObjects();
            const changeLayerZindex = layerZindex + 1; 
            const changeLayer = objs.find((obj) => obj.zIndex === changeLayerZindex);
            if(changeLayer){
                setChangeLayer(changeLayer.groupId);
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
                setGroupToCanvasForLayer(true);
                setImmediate(true);
            }

        }
    }

    // download canvas
    const downloadCanvas = () => {
        const dataURL = canvas.toDataURL({ format: 'png', quality: 0.8 });
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'canvas_image.png';
        downloadLink.click();
    }

    const handleCopyRoomId = () => {
        navigator.clipboard.writeText(roomId)
        .then(() => {
            alert('Successfully copied Room ID!');
        })
        .catch((error) => {
            console.error('Failed to copy Room ID to clipboard:', error);
        });
    }



    const handleToggleUpperEditList = () => {
        setIsUpperEditListOpen(!isUpperEditListOpen);
    };

    return <div className={styles.canvasContainer} onWheel={handleWheel} ref={canvasContainerRef}
                onMouseDown={handleMouseDownForDrag}onMouseMove={handleMouseMoveForDrag} onMouseUp={handleMouseUpForDrag}>
                    <div className={styles.upperEditList}>
                        <div className={styles.saveBtnContainer}>
                            <div className={styles.btnDownload} onClick={handleCopyRoomId}>Room ID {roomId}</div>
                            <div className={styles.btnDownload} onClick={downloadCanvas}>Download Image</div>
                        </div>
                    </div>
                    <div className={styles.upperEditListSmall} onClick={handleToggleUpperEditList}>
                        <IoIosSave  size={30}/>
                    </div>
                        {isUpperEditListOpen && (
                            <div className={styles.upperEditListSmallDropdown}>
                                <div className={styles.btnDownload} onClick={handleCopyRoomId}>Room ID {roomId}</div>
                                <div className={styles.btnDownload} onClick={downloadCanvas}>Download Image</div>
                            </div>
                        )}
                    <div className={styles.layerLists}>
                        <div className={styles.btnContainer} style={{ display: layerView ? 'flex' : 'none' }}>
                            <button className={styles.btn} onClick={handleAddLayer}>
                                <AiFillFileAdd className={styles.btnImage}/>
                            </button>
                            {layerEdit && <button className={styles.btn} onClick={() => handleLayerMoveUp(selectedLayerId)}>
                                <FaAngleDoubleUp className={styles.btnImage} size={20} />
                            </button>}
                            {layerEdit &&  <button className={styles.btn} onClick={() => handleLayerMoveDown(selectedLayerId)}>
                                <FaAngleDoubleDown size={20} className={styles.btnImage}/>
                            </button>}
                            {layers.length > 1 && layerEdit && <button className={styles.btn} onClick={() => handleDeleteLayer(selectedLayerId)}>
                                <AiFillDelete className={styles.btnImage}/>
                            </button>}
                        </div>

                        {layers.length > 0 && layers.map(layer => (
                            <div
                                key={layer.id}
                                className={styles.layer}
                                style={{ backgroundColor: selectedLayerId === layer.id ? '#d1dced' : '' , display: layerView ? 'flex' : 'none' }}
                            >
                                <button className={styles.btn} onClick={() => handleSetLayerVisibility(layer.id, !layer.visible)}>
                                    {layer.visible ? <AiFillEye className={styles.btnImage}/> : <AiFillEyeInvisible className={styles.btnImage}/>}
                                </button>
                                <img className={styles.layerImg} src={layer.data} id={'layerImg' + layer.id}/>
                                <span  className={styles.layerSelector} onClick={() => handleSelectLayer(layer.id)}>{layer.name}</span>
                                <div className={styles.layerOwnerContainer}>
                                    {layer.owner === userUid &&<div className={styles.layerOwner}></div>}
                                </div>
                            </div>
                        ))}

                        <div className={styles.layerViewContainer} >
                            <button className={styles.layerViewBtn} onClick={() => setLayerView(!layerView)} 
                                style={{ borderTop: layerView ? '1px solid #358be0' : 'none'}}
                            >
                                {layerView ? <AiOutlineCaretUp className={styles.btnImage} size={24} /> : (<><span>Layer</span><AiOutlineCaretDown className={styles.btnImage} size={24} /></>)}
                            </button>
                        </div>

                        <div className={styles.layerViewContainerSmall} >
                            <button className={styles.layerViewBtn} onClick={() => setLayerView(!layerView)} 
                                style={{ borderTop: layerView ? '1px solid #358be0' : 'none'}}
                            >
                                {layerView ? <AiOutlineCaretUp className={styles.btnImage} size={24} /> 
                                : (<div className={styles.btnSmall}>
                                    <IoLayers  size={30}/></div>)}
                            </button>
                        </div>

                    </div>


                <input style={{display: 'none'}} type="file" id="upload" accept="image/*" />
                <div style={{ transform: `scale(${zoom}) translate(${dragPosition.x}px, ${dragPosition.y}px)`, transformOrigin: `${zoomPositon}` }}>
                    <canvas className={styles.canvas} ref={canvasRef}  />
                </div>
                <div className={styles.zoomPercent}>
                    <button className={styles.zoomPercentBtn} onClick={handleZoomDown}><AiOutlineMinusCircle className={styles.btnImage} size={22}/></button>
                    <div className={styles.zoomPercentDisplay}>{parseInt(zoom * 100, 10)}%</div>
                    <button className={styles.zoomPercentBtn} onClick={handleZoomUp}><AiOutlinePlusCircle className={styles.btnImage} size={22} /></button>
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