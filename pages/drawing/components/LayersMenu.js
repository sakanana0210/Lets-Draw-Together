import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLayer, addLayer, deleteLayer, setLayerVisibility  } from '../../../store/actions/layerActionsCreator';
// import styles  from '../styles/toolsBar.module.scss' 

function LayersMenu() {
    const dispatch = useDispatch();
    const layers = useSelector((state) => state.layer.layers);
    const selectedLayerId = useSelector((state) => state.layer.selectedLayerId);
    return (
        <div className="layer-list">
            <button onClick={() => dispatch(addLayer())}>+</button>
            {layers.map(layer => (
                <div
                    key={layer.id}
                    className="layer"
                    style={{ backgroundColor: selectedLayerId === layer.id ? 'rgba(0,0,0, 0.1)' : '' }}
                    onClick={() => dispatch(selectLayer(layer.id))}
                >
                    <button onClick={() => dispatch(setLayerVisibility(layer.id, !layer.visible))}>{layer.visible ? '顯示' : '隱藏'}</button>
                    <img src={layer.data} />
                    <span>{layer.name}</span>
                    {layer.id !== 1 && <button onClick={() => dispatch(deleteLayer(layer.id))}>删除</button>}
                </div>
            ))}
        </div>
    );
}

export default LayersMenu;