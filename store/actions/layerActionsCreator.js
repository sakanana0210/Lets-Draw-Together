export const ADD_LAYER = 'ADD_LAYER';
export const DELETE_LAYER = 'DELETE_LAYER';
export const SELECT_LAYER = 'SELECT_LAYER';

export const selectLayer = (id) => ({
    type: SELECT_LAYER,
    payload: id
});

export const addLayer = () => ({
    type: ADD_LAYER
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