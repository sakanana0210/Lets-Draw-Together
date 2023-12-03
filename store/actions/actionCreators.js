import * as actionTypes from './actionTypes';

export const startPainting = () => ({
    type: actionTypes.START_PAINTING,
});

export const stopPainting = () => ({
    type: actionTypes.STOP_PAINTING,
});

export const setRGB = (rgb, hsv) => ({
    type: actionTypes.SET_RGB,
    payload: { rgb, hsv },
});

export const startPickColor = () => ({
    type: actionTypes.START_PICK_COLOR,
});

export const stopPickColor = () => ({
    type: actionTypes.STOP_PICK_COLOR,
});

export const setSelectedTool = (tool) => ({
    type: actionTypes.SET_SELECTED_TOOL,
    payload: {
        selectedTool: tool,
    },
});

export const setBrushSize = (size) => ({
    type: actionTypes.SET_BRUSH_SIZE,
    payload: {
        brushSize: size,
    },
});

export const setBrushOpacity = (opacity) => ({
    type: actionTypes.SET_BRUSH_OPACITY,
    payload: {
        brushOpacity: opacity,
    },
});

export const setEraserSize = (size) => ({
    type: actionTypes.SET_ERASER_SIZE,
    payload: {
        eraserSize: size,
    },
});

export const setEraserOpacity = (opacity) => ({
    type: actionTypes.SET_ERASER_OPACITY,
    payload: {
        eraserOpacity: opacity,
    },
});

export const setPencilSize = (size) => ({
    type: actionTypes.SET_PENCIL_SIZE,
    payload: {
        pencilSize: size,
    },
});

export const setPencilOpacity = (opacity) => ({
    type: actionTypes.SET_PENCIL_OPACITY,
    payload: {
        pencilOpacity: opacity,
    },
});

export const setNewText = () => ({
    type: actionTypes.SET_NEW_TEXT,
    payload: {
        newText: true,
    },
});

export const doneNewText = () => ({
    type: actionTypes.DONE_NEW_TEXT,
    payload: {
        newText: false,
    },
});

export const setNewImage = () => ({
    type: actionTypes.SET_NEW_IMAGE,
    payload: {
        newImage: true,
    },
});

export const doneNewImage = () => ({
    type: actionTypes.DONE_NEW_IMAGE,
    payload: {
        newImage: false,
    },
});


export const setroomId =  (roomId) => ({
    type: actionTypes.SET_ROOM_ID,
    payload: roomId
});

export const setWindowHeight =  (windowHeight) => ({
    type: actionTypes.SET_HEIGHT_REDUCER,
    payload: windowHeight
});