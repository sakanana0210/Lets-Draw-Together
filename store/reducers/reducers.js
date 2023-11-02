const initialState = {
    painting: false,
    pickColor: false,
    selectedRGB: [0, 0, 0],
    selectedHSV: [0, 0, 0],
    selectedTool: "brush",
    brushSize: 2,
    brushOpacity: 100,
    eraserSize: 2,
    eraserOpacity: 100,
    pencilSize: 2,
    pencilOpacity: 100,
};

export const canvasReducer = (state = initialState, action) => {
switch (action.type) {
    case "START_PAINTING":
    return { ...state, painting: true };
    case "STOP_PAINTING":
    return { ...state, painting: false };
    case "SET_RGB":
    return {
        ...state,
        selectedRGB: action.payload.rgb,
        selectedHSV: action.payload.hsv,
    };
    case "START_PICK_COLOR":
    return { ...state, pickColor: true };
    case "STOP_PICK_COLOR":
    return { ...state, pickColor: true };
    default:
    return state;
}
};

export const toolReducer = (state = initialState, action) => {
switch (action.type) {
    case "SET_SELECTED_TOOL":
    return { ...state, selectedTool: action.payload.selectedTool };
    default:
    return state;
}
};

export const brushReducer = (state = initialState, action) => {
switch (action.type) {
    case "SET_BRUSH_SIZE":
    return { ...state, brushSize: action.payload.brushSize };
    case "SET_BRUSH_OPACITY":
    return { ...state, brushOpacity: action.payload.brushOpacity };
    case "SET_ERASER_SIZE":
    return { ...state, eraserSize: action.payload.eraserSize };
    case "SET_ERASER_OPACITY":
    return { ...state, eraserOpacity: action.payload.eraserOpacity };
    case "SET_PENCIL_SIZE":
    return { ...state, pencilSize: action.payload.pencilSize };
    case "SET_PENCIL_OPACITY":
    return { ...state, pencilOpacity: action.payload.pencilOpacity };
    default:
    return state;
}
};
