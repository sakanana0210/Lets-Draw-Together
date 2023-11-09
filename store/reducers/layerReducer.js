const initialState = {
    layers: [],
    selectedLayerId: 0
};

const calculateNewLayerId = (layers) => {
    const existingIds = layers.map(layer => layer.id);
    const unusedIds = Array.from({ length: existingIds.length + 1 }, (_, index) => index + 1);
    const availableIds = unusedIds.filter(id => !existingIds.includes(id));

    return availableIds[0];
};

export const layerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LAYER':
            const newLayer = {
                id: calculateNewLayerId(state.layers),
                name: `Layer ${calculateNewLayerId(state.layers)}`,
                visible: true,
            };
            return { ...state, layers: [...state.layers, newLayer], selectedLayerId: newLayer.id };

        case 'DELETE_LAYER':
            const deletedLayerId = action.payload;
            const updatedLayers = state.layers.filter(layer => layer.id !== deletedLayerId);
            return { ...state, layers: updatedLayers };

        case 'SELECT_LAYER':
            const selectedLayerId = action.payload;
            return { ...state, selectedLayerId };

        case "SET_LAYER_VISIBILITY":
            const { layerId, isVisible } = action.payload;
            const updatedVisibilityLayers = state.layers.map(layer => {
                if (layer.id === layerId) {
                    return { ...layer, visible: isVisible };
                }
                return layer;
            });
            return { ...state, layers: updatedVisibilityLayers };

        default:
        return state;
    }
    };