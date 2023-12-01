export const ADD_LAYER = 'ADD_LAYER';
export const DELETE_LAYER = 'DELETE_LAYER';
export const SELECT_LAYER = 'SELECT_LAYER';

export const selectLayer = (id) => ({
    type: SELECT_LAYER,
    payload: id
});

export const addLayer = (ownerId) => ({
    type: ADD_LAYER,
    payload: ownerId
});

export const deleteLayer = (id) => ({
    type: DELETE_LAYER,
    payload: id
});

export const setLayerVisibility = (layerId, isVisible) => {
    return {
        type: "SET_LAYER_VISIBILITY",
        payload: {
            layerId,
            isVisible
        }
    };
};

export const setExistedLayer = (layers) => {
    return {
        type: "SET_EXISTED_LAYER",
        payload: layers
    };
};

export const setLayerIndex = (zIndex, changeZindex) => {
    return {
        type: "SET_LAYER_ZINDEX_CHANGE",
        payload: {
            zIndex,
            changeZindex
        }
    };
};

export const setNewIndexForDelete = (upperZindex, newUpperZindex) => {
    return {
        type: "SET_NEW_INDEX_FOR_DELETE",
        payload: {
            upperZindex,
            newUpperZindex
        }
    };
};