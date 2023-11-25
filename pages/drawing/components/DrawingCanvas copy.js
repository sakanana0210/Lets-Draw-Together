import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setRGB, setroomId, startPainting, stopPainting, doneNewText, doneNewImage, setSelectedTool, setBrushSize, setBrushOpacity } from '../../../store/actions/actionCreators.js';
import styles  from '../styles/drawingCanvas.module.scss' 
import {rgbToHsv} from '../../../utils/rgbToHsv.js'
import {addRoomIdToPlayCanvas, addRoomIdToOwnCanvas} from '../../../utils/addRoomIdToDbUser.js'
import { fabric } from 'fabric-with-erasing';
import { FaAngleDoubleDown, FaAngleDoubleUp} from 'react-icons/fa';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiFillEye, AiFillEyeInvisible, AiFillDelete, AiFillFileAdd, AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { selectLayer, addLayer, deleteLayer, setLayerVisibility, setExistedLayer, setLayerIndex } from '../../../store/actions/layerActionsCreator.js';
import { doc, query, limit, collection, addDoc, setDoc, serverTimestamp, getDoc, getDocs, updateDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage} from '../../../firebase.js';
import isEqual from 'lodash/isEqual';
import { compact, set } from 'lodash';

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
    const [newCanvas1Group, setNewCanvas1Group] = useState(false);
    const [loadCanvasDone, setLoadCanvasDone] = useState(false);
    const [layerEdit, setLayerEdit] = useState(false);
    const [imageGroup, setImageGroup] = useState(false);
    const [updateCanvasToDB, setUpdateCanvasToDB] = useState(false);
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
            dispatch(setroomId(roomId));
            const setRoomDoc = async() => {
                const roomsCollection = collection(db, 'rooms');
                const roomDocumentRef = doc(roomsCollection, roomId);
                const canvasInfoCollection = collection(roomDocumentRef, 'canvasInfo');
                const querySnapshot = await getDocs(canvasInfoCollection);
                if (querySnapshot.docs.length > 0) {
                    let jsonData = '';
                    querySnapshot.docs.forEach(docSnapshot => {
                        const docData = docSnapshot.data();
                        if (docData.canvasJson) {
                            jsonData += docData.canvasJson;
                        }
                    });

                    const loadCanvasFromJson = async (jsonString) => {
                        try {
                        const canvas  = new fabric.Canvas(canvasRef.current, {
                            width: 800,
                            height: 400,
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
                    addRoomIdToPlayCanvas(roomId, userUid);

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
                        const partDocumentRef = doc(canvasInfoCollection, 'part1');
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

                        console.log('Document written part 1');
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
        }
    }, [newCanvas1Group]);

    // select tool first
    useEffect(() => {

        dispatch(selectLayer(1));
        // const layer = layers.find(layer => layer.id === 1);
        // const layerOwner = layer.owner;
        // if(layerOwner === userUid){
        //     setLayerEdit(true);
        // }
        dispatch(setSelectedTool('brush'));
        dispatch(setRGB([0,0,0], [0,0,0]));
        dispatch(setBrushSize(2));
        dispatch(setBrushOpacity(100));

        const updateCanvasToDB = async () => {
            setUpdateCanvasToDB(true);
        };
        //interval記得改
        const interval = setInterval(() => {
            updateCanvasToDB();
        }, 180000);
    
        return () => {
            clearInterval(interval);
        };
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
                            const canvasJsonObj = canvas.toJSON(['groupId', 'zIndex', 'owner']);
                            const canvasJson = JSON.stringify(canvasJsonObj);
                            const MAX_DOCUMENT_SIZE = 1048576;
                            // const canvasJson = '12345abc123abcd1234';
                            // const MAX_DOCUMENT_SIZE = 2;
                            if (canvasJson.length > MAX_DOCUMENT_SIZE) {
                                const chunks = [];
                                let index = 1;
                                while (canvasJson.length > 0) {
                                    const chunk = canvasJson.substring(0, MAX_DOCUMENT_SIZE);
                                    chunks.push(chunk);
                                    canvasJson = canvasJson.substring(MAX_DOCUMENT_SIZE);
                                    index++;
                                }
                                chunks.forEach(async (chunk, idx) => {
                                    const data = {
                                        canvasJson: chunk,
                                        userUid: userUid,
                                        timestamp: serverTimestamp()
                                    };
                                    const partDocumentRef = doc(canvasInfoCollection, `part${idx + 1}`);
                                    await setDoc(partDocumentRef, data);
                                    console.log(`Part ${idx + 1} stored successfully`);
                                });
                            } else {
                                const data = { canvasJson, userUid };
                                await updateDoc(doc(canvasInfoCollection, 'part1'), data);
                                console.log('Data stored successfully');
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
        if (canvas && loadCanvasDone === true) {
            const loadCanvasFromJson = async (jsonString) => {
                const newCanvas  = new fabric.Canvas(canvasRef.current, {
                    width: 800,
                    height: 400,
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
            
            // const unsubscribe = onSnapshot(canvasInfoCollection, async (snapshot) => {
            //         // let jsonData = '';
            //         // querySnapshot.docs.forEach(docSnapshot => {
            //         //     const docData = docSnapshot.data();
            //         //     if (docData.canvasJson) {
            //         //         jsonData += docData.canvasJson;
            //         //     }
            //         // });
            //         // console.log(jsonData); 
            //     let conbinedJsonData = '';
            //     snapshot.docChanges().forEach(async (change) => {
            const unsubscribe = onSnapshot(query(canvasInfoCollection, limit(1)), async (snapshot) => {
                if (!snapshot.empty) {
                    const change = snapshot.docChanges()[0];
                    if (change.type === 'modified') {
                        const modifiedDocumentData = change.doc.data();
                        if (modifiedDocumentData['userUid'] !== userUid) {
                            console.log('different');
                            let conbinedJsonData = '';
                            const docs = await getDocs(canvasInfoCollection);
                            docs.docs.forEach(docSnapshot => {
                                const docData = docSnapshot.data();
                                if (docData.canvasJson) {
                                    conbinedJsonData += docData.canvasJson;
                                }
                            });
                            console.log(conbinedJsonData);
                            let [sharedCanvas, sharedLayerList] = await loadCanvasFromJson(conbinedJsonData);
                            const oldObjs = canvas.getObjects();
                            const newObjs = sharedCanvas['_objects'];

                            for (const oldObj of oldObjs) {
                                if (oldObj.type === 'group' && oldObj.groupId) {
                                    canvas.remove(oldObj);
                                }
                            }

                            for (const newObj of newObjs) {
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
                    }
                }
            })


    
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

    // // handle add image tool
    // useEffect(() => {
    //     if (canvas) {
    //         const handleAddImage = () => {
    //             document.getElementById('upload').addEventListener('change', async (e) => {
    //                 const files = e.target.files;
    //                 const file = files[0];
    //                 const maxSize = 1024 * 1024;
    //                 if (file.size > maxSize) {
    //                     alert('File size should be less than 1 MB.');
    //                     return;
    //                 }
    //                 const generateRandomFileName = () => {
    //                     const timestamp = new Date().getTime();
    //                     const randomString = Math.random().toString(36).substring(2, 8);
    //                     return `${timestamp}_${randomString}`; 
    //                 }
    //                 const randomFileName = generateRandomFileName();
    //                 const storageRef = ref(storage, 'images/' + randomFileName);
    //                 try {
    //                     const snapshot = await uploadBytes(storageRef, file);
    //                     const downloadURL = await getDownloadURL(snapshot.ref);
    //                     const imgObj = new Image();
    //                     imgObj.src = downloadURL;
    //                     imgObj.crossOrigin = "anonymous";
    //                     imgObj.onload = async() => {
    //                         const fabricImg = new fabric.Image(imgObj);
    //                         await canvas.add(fabricImg);
    //                         setImageGroup(true);
    //                     };
    //                 } catch (error) {
    //                     console.error('上傳檔案時發生錯誤:', error);
    //                 }
    //             });
    //                 // const reader = new FileReader();
    //                 // reader.onload = async (e) => {
    //                 //     const imgObj = new Image();
    //                 //     imgObj.src = e.target.result;
    //                 //     imgObj.onload = async() => {
    //                 //         const fabricImg = new fabric.Image(imgObj);
    //                 //         await canvas.add(fabricImg);
    //                 //         setImageGroup(true);
    //                 //     };
    //                 // };
    //                 // reader.readAsDataURL(file);
    //         }
    //         handleAddImage();
    //     } 
    // }, [canvas]);
    
    // const addImageToGroup = async() => {
    //     const tempCanvas = new fabric.StaticCanvas("", {
    //             width: canvas.width,
    //             height: canvas.height
    //         }
    //     );
    //     const groups = await canvas.getObjects();
    //     const imageObj = await groups.find(group => group.type === 'image');
    //     groups.forEach(async (v) => {
    //         if (v.groupId === selectedLayerId && v.type === 'group' && imageObj) {
    //             try{
    //                 await v.addWithUpdate(imageObj);
    //                 canvas.remove(imageObj);
    //                 await tempCanvas.add(v);
    //                 tempCanvas.renderAll();
    //                 console.log('add to group ', v);
    //                 const previewDataURL = await tempCanvas.toDataURL({
    //                     format: 'jpg',
    //                     quality: 0.1,
    //                 });
    //                 const selectedLayer = await layers.find(layer => layer.id === selectedLayerId);
    //                 selectedLayer.data = previewDataURL;
    //                 const string = "layerImg" + selectedLayerId;
    //                 const layerImg = document.getElementById(string);
    //                 layerImg.src= previewDataURL;
    //                 console.log('image ', previewDataURL);
    //                 setImageGroup(false);
    //             } catch (e) {
    //                 console.error(e);
    //             }

    //         }
    //     });
    // }

    // useEffect(() => {
    //     const addLayerAndImage = async () => {
    //         await handleAddLayer();
    //         const input = document.getElementById('upload');
    //         input.click();
    //         setObjEventsFalse();
    //     }
        
    //     if (newImage === true && canvas && selectedTool === 'image') {
    //         addLayerAndImage();
    //         setGroupToCanvas(true);
    //         dispatch(doneNewImage());
    //     }
    // }, [newImage]);

    // const setObjEventsFalse = () => {
    //     const objects = canvas.getObjects();
    //     objects.forEach((obj) => {
    //             obj.evented = false;
    //     });
    // }   

    // useEffect(() => {

    //     const addImageToGroupAndSetGroupToCanvas = async() => {
    //         await addImageToGroup();
    //         setObjEventsFalse();
    //         setGroupToCanvas(true);
    //     }

    //     if(imageGroup === true){
    //         addImageToGroupAndSetGroupToCanvas();
    //     } 
    // }, [imageGroup]);


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
            owner: userUid,
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
        if(layerEdit === true){
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
    }

    const handleLayerMoveDown = (selectedLayerId) => {
        if(layerEdit === true){
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
    }

    const handleLayerMoveUp = (selectedLayerId) => {
        if(layerEdit === true){
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
                            {selectedLayerId !== 1 && layerEdit && <button className={styles.btn} onClick={() => handleLayerMoveUp(selectedLayerId)}>
                                <FaAngleDoubleUp size={20} />
                            </button>}
                            {selectedLayerId !== 1 && layerEdit &&  <button className={styles.btn} onClick={() => handleLayerMoveDown(selectedLayerId)}>
                                <FaAngleDoubleDown size={20} className={styles.btnImage}/>
                            </button>}
                            {selectedLayerId !== 1 && layerEdit && <button className={styles.btn} onClick={() => handleDeleteLayer(selectedLayerId)}>
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
                                <div className={styles.layerOwnerContainer}>
                                    {layer.owner === userUid &&<div className={styles.layerOwner}></div>}
                                </div>
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