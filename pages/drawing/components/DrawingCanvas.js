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
import { BarLoader } from "react-spinners";

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
    const [timerFlag, setTimerFlag] = useState(true);
    const [layerTimeFlag, setLayerTimeFlag] = useState(true);
    const [immediateFlag, setImmediate ] = useState(false);

    useEffect(() => {
        if (authenticated === false) {
            router.push('/signin');
        }

        const interval = setInterval(() => {
            setTimerFlag(true);
        }, 1000);
        const layerInterval = setInterval(() => {
            setLayerTimeFlag(true);
        }, 1000);

        const initialWidth = window.innerWidth;
        const initialZoom = initialWidth / 1200 * 0.75;
        const minZoom = 0.5;
        const maxZoom = 10;
        const clampedZoom = Math.min(maxZoom, Math.max(minZoom, initialZoom));
        setZoom(clampedZoom);
        return () => {
            clearInterval(interval);
            clearInterval(layerInterval);
        };
    }, []);

    // enter room load json canvas or create json
    useEffect(() => {
        if(roomId && authenticated === true){
            dispatch(setroomId(roomId));
            const setRoomDoc = async() => {
                const roomsCollection = collection(db, 'rooms');
                const roomDocumentRef = doc(roomsCollection, roomId);
                const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
                const infoDocumentRef = doc(canvasInfoCollection, 'info');
                const objectsCollection = collection(infoDocumentRef, 'objects');
                const infoDocSnapshot = await getDoc(infoDocumentRef);
                const layersDocRef = doc(objectsCollection, 'layers');
                if(infoDocSnapshot.exists()){
                    try {
                        const data = infoDocSnapshot.data();
                        const canvasOwner = data['userUid'];
                        const jsonString = data['canvasJson'];
                        const jsonData = JSON.parse(jsonString);
                        const objectsDocSnapshot = await getDocs(objectsCollection);
                        const objectsData = [];
                        let newLayers;
                        
                        async function loadForTheCorrectZinde() {
                            objectsDocSnapshot.forEach(async (doc) => {
                                if (doc.id !== 'layers') {
                                    const data = doc.data();
                                    const objectData = data['canvasJson'];
                                    const objectJsonData = JSON.parse(objectData);
                                    objectsData.push(objectJsonData);
                                } else if (doc.id === 'layers') {
                                    const data = doc.data();
                                    newLayers = JSON.parse(data['layerJson']);
                                }
                            });
                        
                            for (const obj of objectsData) {
                                const theSameLayer = newLayers.find((layer) => layer.id === obj.groupId);
                                if (theSameLayer) {
                                    obj.zIndex = theSameLayer.zIndex;
                                }
                            }
                        
                            const sortedObjs = objectsData.sort((a, b) => {
                                const zIndexA = a.zIndex || 0;
                                const zIndexB = b.zIndex || 0;
                                return zIndexA - zIndexB;
                            });
                        
                            jsonData.objects = sortedObjs;
                            return jsonData;
                        }

                        const loadCanvasFromJson = async (jsonString) => {
                            const layersJsonData = newLayers;
                            dispatch(setExistedLayer(layersJsonData));
                            try {
                            const canvas  = new fabric.Canvas(canvasRef.current, {
                                width: 1200,
                                height: 600,
                                isDrawingMode: true,
                                selection: false,
                            });
                            const idSet = new Set();
                            await canvas.loadFromJSON(jsonString, function() {
                            canvas.renderAll();
                            }, function(object) {
                                if (object.type === 'image' && object.getSrc) {
                                    object.setSrc(object.getSrc(), function() {
                                    canvas.renderAll();
                                    });
                                } else if (object.type === 'group' && object.groupId){
                                    object.visible = true;
                                    if(!idSet.has(object.groupId)){
                                        idSet.add(object.groupId);
                                    }
                                }
                            });
                            setCanvas(canvas);
                            setLoadCanvasDone(true);
                            
                            return [canvas, layersJsonData];
                        } catch (error) {
                            console.error('Error loading canvas from JSON:', error);
                            return null;
                        }
                        };
                        const loadData = await loadForTheCorrectZinde();
                        let [canvas, layerList] = await loadCanvasFromJson(loadData);
    
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
                                            const selectedLayer = await layerList.find(layer => layer.id === i);
                                            selectedLayer.data = previewDataURL;
                                            const string = "layerImg" + i;
                                            const layerImg = document.getElementById(string);
                                            layerImg.src= previewDataURL;
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }
                                });
                                dispatch(setExistedLayer(layerList));
                            }
    
                        }
                        setLayerImg();
                        if(canvasOwner !== userUid){
                            addRoomIdToPlayCanvas(roomId, userUid);
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
                            owner: userUid,
                            data: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                        }
                        layerList.push(NewLayer);
                        dispatch(setExistedLayer(layerList));
                        setNewCanvas1Group(true);
                        setLoadCanvasDone(true);
                        addRoomIdToOwnCanvas(roomId, userUid);
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
    // useEffect(() => {
    //     if(canvas){
    //         console.log(layers);
    //     }
    // }, [layers]);

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
            setGroupToCanvasForLayer(true);
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
        //interval現在是3分鐘
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

    // handle canvasJSON to firebase db (ok)
    useEffect(() => {
        const updateCanvasInfo = async () => {
            if (canvas && groupToCanvas === true) {
                if( (timerFlag === true || immediateFlag === true)){
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
                            const selectedObjectJSON =  selectedobject.toJSON(['groupId', 'owner']);
                            const data = {
                                timestamp: serverTimestamp(),
                                canvasJson: JSON.stringify(selectedObjectJSON),
                                userUid: userUid
                            }
                            const objectsDocRef = doc(objectsCollection, 'object' + selectedLayerId);
                            await setDoc(objectsDocRef, data);
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

    // handle layer change up and down and add(ok)
    useEffect(() => {
        const updateCanvasInfo = async () => {
            if (canvas && groupToCanvasForLayer === true) {
                const roomsCollection = collection(db, 'rooms');
                const roomDocumentRef = doc(roomsCollection, roomId);
                const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
                const infoDocumentRef = doc(canvasInfoCollection, 'info');
                const objectsCollection = collection(infoDocumentRef, 'objects');
                const layersDocRef = doc(objectsCollection, 'layers');
                try {
                    const visibleLayers = layers.map(layer => {
                        return {
                            ...layer,
                            visible: true
                        };
                    });
                    const layerData = {
                        timestamp: serverTimestamp(),
                        layerJson: JSON.stringify(visibleLayers),
                        userUid: userUid
                    }
                    
                    await setDoc(layersDocRef, layerData);
                    console.log('layers, set to db.');
                    setGroupToCanvasForLayer(false);
                } catch (error) {
                    console.error('Error updating canvas info:', error);
                }
            }
        };
        updateCanvasInfo();
    }, [groupToCanvasForLayer, layers])

    // handle canvasJson delete (ok)
    useEffect(() => {
        const updateCanvasInfo = async () => {
            if (canvas && deleteToDb === true) {
                const roomsCollection = collection(db, 'rooms');
                const roomDocumentRef = doc(roomsCollection, roomId);
                const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
                const infoDocumentRef = doc(canvasInfoCollection, 'info');
                const objectsCollection = collection(infoDocumentRef, 'objects');
                const layersDocRef = doc(objectsCollection, 'layers');
                try {
                    console.log(selectedLayerId);
                    const updatedLayers = layers.filter(layer => layer.id !== selectedLayerId);
                    const updatedSelectedLayer = updatedLayers[0];
                    const objectDocumentRef = doc(objectsCollection, 'object' + selectedLayerId);
                    dispatch(selectLayer(updatedSelectedLayer.id));
                    await deleteDoc(objectDocumentRef);
                    console.log(selectedLayerId, 'delete objects JSON saved to Firestore.');
                    const visibleLayers = updatedLayers.map(layer => {
                        return {
                            ...layer,
                            visible: true
                        };
                    });
                    const layerData = {
                        timestamp: serverTimestamp(),
                        layerJson: JSON.stringify(visibleLayers),
                        userUid: userUid
                    }
                    await setDoc(layersDocRef, layerData);
                    console.log('layers, set to db.');
                    setDeleteToDb(false);
                } catch (error) {
                    console.error('Error updating canvas info:', error);
                }
            }
        };
        updateCanvasInfo();
    }, [deleteToDb])

    // handle shared canvas (ok)
    useEffect(()=>{
        if ((canvas && loadCanvasDone === true)) {

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
                    const selectedLayer = await layers.find(layer => layer.id === i);
                    selectedLayer.data = previewDataURL;
                    dispatch(setExistedLayer(layers));
                }
            };

            const roomsCollection = collection(db, 'rooms');
            const roomDocumentRef = doc(roomsCollection, roomId);
            const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
            const infoDocumentRef = doc(canvasInfoCollection, 'info');
            const objectsCollection = collection(infoDocumentRef, 'objects'); 
            const layersDocRef = doc(objectsCollection, 'layers');

            const unsubscribe = onSnapshot((objectsCollection), async (snapshot) => {

                if(initialLoad === true){
                    initialLoad = false;
                    return;
                }

                snapshot.docChanges().forEach(async(change) => {
                    const doc = change.doc.data();
                    const docId = change.doc.id;
                    if (doc['userUid'] !== userUid && docId !== 'layers') {
                        const jsonString = doc['canvasJson'];
                        const jsonData = JSON.parse(jsonString);
                        const jsonGroupId = jsonData['groupId'];
                        console.log('jsonGroupId', jsonGroupId);
                        if (change.type === 'modified') {
                            console.log('修改文檔:', docId);
                            const addObjectsToGroup = async (jsonGroupId, jsonData) => {
                                fabric.util.enlivenObjects(jsonData.objects, async function(objects) {
                                    const oldObjs = await canvas.getObjects();
                                    const matchingOldObj = oldObjs.find(oldObj => oldObj.type === 'group' && oldObj.groupId === jsonGroupId);
                                    if (matchingOldObj) {
                                        const groupLeft = jsonData.left;
                                        const groupTop = jsonData.top;
                                        matchingOldObj.getObjects().forEach(obj => matchingOldObj.remove(obj));
                                        objects.forEach(obj => {
                                            matchingOldObj.addWithUpdate(obj);
                                        });
                                        matchingOldObj.set({
                                            left: groupLeft,
                                            top: groupTop
                                        });

                                        const oldEraser = matchingOldObj.eraser;
                                        if(jsonData.eraser){

                                            const enlivenedEraser = await new Promise(resolve => {
                                                fabric.util.enlivenObjects([jsonData.eraser], function([enlivenedObject]) {
                                                    resolve(enlivenedObject);
                                                });
                                            });

                                            matchingOldObj.set('eraser', enlivenedEraser);
                                            console.log('new eraser');
                                            console.log(matchingOldObj);
                                            
                                        } else if (!jsonData.eraser && oldEraser) {
                                            matchingOldObj.remove(oldEraser);
                                        }
                                        setLayerImg(matchingOldObj.groupId, matchingOldObj);
                                        canvas.requestRenderAll();
                                        console.log(`成功更新群組 ${jsonGroupId} 的內容`);
                                    } else {
                                        console.error('無法找到指定的群組');
                                    }
                                });
                            };
                            addObjectsToGroup(jsonGroupId, jsonData);
                        }
                        else if (change.type === 'removed') {
                            console.log('刪除文檔:', docId);
                            const removeAndAddForRemoved = async(jsonGroupId) => {
                                const updatedLayers = layers.filter((layer) => layer.id !== jsonGroupId);
                                const deletedLayer = layers.find(layer => layer.id === jsonGroupId);
                                const zIndex = deletedLayer.zIndex;
                                await updatedLayers.map((layer) => {
                                    if(layer.zIndex > zIndex) {
                                        const newZindex = layer.zIndex - 1;
                                        layer.zIndex = newZindex;
                                    }
                                })
                                console.log(updatedLayers);
                                const oldObjs = await canvas.getObjects();
                                const matchingoldObj = oldObjs.find(oldObj => oldObj.type === 'group' && oldObj.groupId === jsonGroupId);
                                if(matchingoldObj){
                                    dispatch(setExistedLayer(updatedLayers));
                                    canvas.remove(matchingoldObj);
                                    canvas.renderAll();
                                    console.log('已刪除！');
                                }
                            }
                            removeAndAddForRemoved(jsonGroupId);
                            // removeAndadd();
                        }else if (change.type === 'added' && !layers.find((layer)=> layer.id === jsonGroupId)) {
                            console.log('添加文檔:', docId);
                            const removeAndAddForAdded= async(jsonGroupId) => {
                                const newId = jsonGroupId;
                                const calculateZindex = () => {
                                    let sortedLayers = layers.sort((a, b) => a.zIndex - b.zIndex);
                                    let zIndex = 0;
                                    console.log(sortedLayers);
                                    for (let i = 0; i < sortedLayers.length; i++) {
                                        if (sortedLayers[i].zIndex === zIndex) {
                                            zIndex++;
                                        } else {
                                            break;
                                        }
                                    }
                                    return zIndex;
                                };
                                const newZindex = calculateZindex();
                                console.log(newZindex);
                                
                                const newGroup = new fabric.Group([], {
                                    width:canvas.width,
                                    height:canvas.height,
                                    fill: 'transparent',
                                    groupId: newId,
                                    zIndex: newZindex,
                                    owner: userUid,
                                    visible: true,
                                    erasable: false
                                });
                                const newLayer = {
                                    id: jsonGroupId,
                                    name: `Layer ${jsonGroupId}`,
                                    visible: true,
                                    zIndex: newZindex,
                                    owner: doc['userUid']
                                };
                                const newlayersList = [...layers, newLayer];
                                dispatch(setExistedLayer(newlayersList));
                                await canvas.add(newGroup);
                                await canvas.bringToFront(newGroup);
                                console.log('成功添加圖層');
                            }
                            removeAndAddForAdded(jsonGroupId);
                            // removeAndadd();
                        }

                    } else if (doc['userUid'] !== userUid  && docId === 'layers'){
                        const jsonString = doc['layerJson'];
                        const newLayersList = JSON.parse(jsonString);
                        console.log(newLayersList);
                        let changelayer;
                        let beChangedlayer;
                        if (change.type === 'modified' && newLayersList.length === layers.length) {
                            try{
                                console.log('圖層zindex互換');
                                newLayersList.map((newlayer) =>{
                                    const findOldlayer = layers.find((layer) => layer.id === newlayer.id);
                                    const oldZindex = findOldlayer.zIndex;
                                    if(oldZindex !== newlayer.zIndex){
                                        beChangedlayer = layers.find((layer) => layer.zIndex === newlayer.zIndex);
                                        changelayer = findOldlayer;
                                    }
                                })
    
                                const objs = canvas.getObjects();
                                if(changelayer.zIndex > beChangedlayer.zIndex){
                                    console.log(changelayer.id, 'should sendbak');
                                    objs.forEach((obj) => {
                                        if(obj.type === 'group' && obj.groupId === changelayer.id ){
                                            canvas.sendBackwards(obj);
                                            obj.zIndex = beChangedlayer.zIndex;
                                        } 
                                        else if (obj.type === 'group' && obj.groupId === beChangedlayer.id ){
                                            obj.zIndex = changelayer.zIndex;
                                        }
                                    })
                                } else if (changelayer.zIndex < beChangedlayer.zIndex){
                                    console.log(changelayer.id, 'should forward');
                                    objs.forEach((obj) => {
                                        if(obj.type === 'group' && obj.groupId === changelayer.id ){
                                            canvas.bringForward(obj);
                                            obj.zIndex = beChangedlayer.zIndex;
                                        } 
                                        else if (obj.type === 'group' && obj.groupId === beChangedlayer.id ){
                                            obj.zIndex = changelayer.zIndex;
                                        }
                                    })
                                }
    
                                canvas.renderAll();
                                dispatch(setExistedLayer(newLayersList));
                            }  catch (error) {
                                console.error('Error changed layer', error);
                            }

                            // removeAndadd();
                        }
                    }
                });
            });

    
            return () => {
                unsubscribe();
            };
        }
    }, [loadCanvasDone, layers]);

    // set user rooms
    useEffect(() => {
        const updateCanvasInfo = async () => {
            if (canvas && roomId && updateCanvasToDB === true) {
                try{
                    const canvasDataURL = canvas.toDataURL({ format: 'jpeg', quality: 0.1 });
                    const today = new Date();
                    const dateOnly = today.toISOString().split('T')[0];
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
                                // console.log('Canvas dataURL set successfully.');
                            }
                        }

                        const docOwnSnapshot = await getDoc(ownCanvasDocRef);
                        if (docOwnSnapshot.exists()) {
                            const oldImg = docOwnSnapshot.data().img;
                            if(oldImg !== canvasDataURL){
                                await updateDoc(ownCanvasDocRef, { img: canvasDataURL, date: dateOnly, timestamp: serverTimestamp() });
                                // console.log('Canvas dataURL set successfully.');
                            }
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
                    dispatch(setExistedLayer(layers));
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
        if (newText === true && canvas && selectedTool === 'text' && layerTimeFlag === true) {
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
        } else {
            dispatch(doneNewText());
        }
    }, [newText]);

    useEffect(() => {
        if (textEditing === true){
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

    // useEffect(()=>{
    //     if(canvas){
    //         if (layerEdit === false) {
    //             canvas.isDrawingMode = false;
    //             canvas.selection = false; 
    //             canvas.forEachObject(obj => {
    //                 obj.set({
    //                     selectable: false,
    //                     evented: false
    //                 });
    //             });
    //         }
    //     }
    // }, [layerEdit])

    // select tool effect
    useEffect(() => {
        if (canvas) {
            if (layerEdit === false){
                canvas.getObjects().forEach((obj) => {
                    obj.evented = false;
                });
                canvas.isDrawingMode = false;
                canvas.selection = false;
                if(canvas.freeDrawingBrush){
                    canvas.freeDrawingBrush.width = 0;
                    canvas.freeDrawingBrush.color = 'rgba(0,0,0,0)';
                } 
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
            }else if (selectedTool === 'layermove'  && layerEdit === true){
                canvas.isDrawingMode = false;
                canvas.selection = false;
                const objects = canvas.getObjects();
                objects.forEach((obj) => {
                    if (obj.type === 'group' && obj.groupId === selectedLayerId && obj.owner === userUid) {
                        obj.evented = true;
                    } else if(obj.type === 'group' && obj.groupId !== selectedLayerId){
                        obj.evented = false;
                    } else if (obj.type === 'group' && obj.groupId === selectedLayerId && obj.owner !== userUid){
                        obj.evented = false;
                    } else {
                        obj.evented = false;
                    }
                });
                canvas.requestRenderAll();
            };

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
            
            const handleSelectionClear = () => {
                if (selectedTool === 'layermove') {
                    setGroupToCanvas(true);
                    console.log('layer move');
                };
            }
            canvas.on('mouse:down', handleMouseDown);
            canvas.on('selection:cleared', handleSelectionClear);

            return () => {
                canvas.off('mouse:down', handleMouseDown);
                canvas.off('selection:cleared', handleSelectionClear);
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
                            dispatch(setExistedLayer(layers));
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
                }else if (layer.id === selectedLayerId && layerEdit === true && layer.visible === true && (selectedTool === 'layermove')){
                    canvas.isDrawingMode = false;
                    canvas.selection = false;
                    const objects = canvas.getObjects();
                    objects.forEach((obj) => {
                        if (obj.type === 'group' && obj.groupId === selectedLayerId && obj.owner === userUid) {
                            obj.evented = true;
                        } else if(obj.type === 'group' && obj.groupId !== selectedLayerId){
                            obj.evented = false;
                        } else if (obj.type === 'group' && obj.groupId === selectedLayerId && obj.owner !== userUid){
                            obj.evented = false;
                        } else {
                            obj.evented = false;
                        }
                    });
                    canvas.requestRenderAll();
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
        if(layerTimeFlag === true) {
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
                let sortedLayers = layers.sort((a, b) => a.zIndex - b.zIndex) ;
                let zIndex = 0;
                for (let i = 0; i < sortedLayers.length; i++) {
                    if (sortedLayers[i].zIndex === zIndex) {
                        zIndex++;
                    } else {
                        break;
                    }
                }    
                return zIndex;
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
            await canvas.bringToFront(newGroup);
            handleSelectLayer(newId);
            setGroupToCanvas(true);
            setGroupToCanvasForLayer(true);
            setImmediate(true);
            setLayerTimeFlag(false);
            return newId;
        } else {
            console.log('too often changed layer');
        }
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
        if(layerEdit === true && layers.length > 1 && layerTimeFlag === true){
            if(textEditing === true){
                addToGroup();
            }
            const updatedLayers = layers.filter(layer => layer.id !== selectedLayerId);
            const updatedSelectedLayer = updatedLayers[0];
            const groups = canvas.getObjects();
            const deletedLayer = layers.find(layer => layer.id === selectedLayerId);
            const zIndex = deletedLayer.zIndex;

            await updatedLayers.map((layer) => {
                if(layer.zIndex > zIndex) {
                    const newZindex = layer.zIndex - 1;
                    layer.zIndex = newZindex;
                }
            })
            console.log(updatedLayers);
            dispatch(setExistedLayer(updatedLayers));

            await groups.forEach(v => {
                if (v.groupId === id && v.type === 'group') {
                    canvas.remove(v);
                    canvas.renderAll();
                }
                if (v.groupId === updatedSelectedLayer.id && v.type === 'group'){
                    setGroup(v);
                }
            })

            // dispatch(deleteLayer(id));
            setDeleteToDb(true);
            setLayerTimeFlag(false);
        } else {
            console.log('too often changed layer');
        }
    }

    const handleLayerMoveDown = (selectedLayerId) => {
        if(layerEdit === true && layerTimeFlag === true){
            if(textEditing === true){
                addToGroup();
            }
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
                setLayerTimeFlag(false);
            }
        } else {
            console.log('too often changed layer');
        }
    }

    const handleLayerMoveUp = (selectedLayerId) => {
        if(layerEdit === true && layerTimeFlag === true){
            if(textEditing === true){
                addToGroup();
            }
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
                    } 
                    else if (obj.type === 'group' && obj.zIndex === changeLayerZindex){
                        obj.zIndex = layerZindex;
                    }
                })
                setGroupToCanvasForLayer(true);
                setLayerTimeFlag(false);
            }

        } else {
            console.log('too often changed layer');
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

                        <div className={styles.layersContainer}>
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
                        </div>

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
                <div className={styles.canvasAndLoadingContainer} style={{ transform: `scale(${zoom}) translate(${dragPosition.x}px, ${dragPosition.y}px)`, transformOrigin: `${zoomPositon}` }}>
                    {!loadCanvasDone && <div className={styles.canvasLoading}>
                        <BarLoader color="#358be0" loading={true} height={8} width={400} />
                    </div>}
                    <canvas className={styles.canvas} ref={canvasRef} />
                    <div className={styles.canvasBackground} style={{ backgroundColor: '#fff'}}></div>
                </div>
                <div className={styles.zoomPercent}>
                    <button className={styles.zoomPercentBtn} onClick={handleZoomDown}><AiOutlineMinusCircle className={styles.btnImage} size={22}/></button>
                    <div className={styles.zoomPercentDisplay}>{parseInt(zoom * 100, 10)}%</div>
                    <button className={styles.zoomPercentBtn} onClick={handleZoomUp}><AiOutlinePlusCircle className={styles.btnImage} size={22} /></button>
                </div>
            </div>
}
export default CanvasApp;