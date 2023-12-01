const initialState = {
    layers: [],
    selectedLayerId: 0
};

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

export const layerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LAYER':
            const ownerId = action.payload;
            const newLayer = {
                id: calculateNewLayerId(state.layers),
                name: `Layer ${calculateNewLayerId(state.layers)}`,
                visible: true,
                zIndex: (calculateZindex(state.layers)),
                owner: ownerId
            };
            
            if (!Array.isArray(state.layers)) {
                return { ...state, layers: [newLayer]};
            }

            return { ...state, layers: [...state.layers, newLayer]};

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

        case 'SET_EXISTED_LAYER':
            const existedLayer = action.payload;
            return { ...state, layers: existedLayer };

        case 'SET_LAYER_ZINDEX_CHANGE':
            const { zIndex, changeZindex } = action.payload;
            const updatedZIndexUpLayers = state.layers.map(layer => {
                if (layer.zIndex === zIndex) {
                    const newZIndex = changeZindex ;
                    return { ...layer, zIndex: newZIndex };
                } else if (layer.zIndex === changeZindex) {
                    const newZIndex = zIndex;
                    return { ...layer, zIndex: zIndex };
                }
                return layer;
            });
            return { ...state, layers: updatedZIndexUpLayers };

        case 'SET_NEW_INDEX_FOR_DELETE':
            const { upperZindex, newUpperZindex } = action.payload;
            const updatedZIndexForDeleteLayers = state.layers.map(layer => {
                if (layer.zIndex === upperZindex) {
                    return { ...layer, zIndex: newUpperZindex };
                }
                return layer;
            });
            return { ...state, layers: updatedZIndexForDeleteLayers };

        default:
        return state;
    }
    };