import React, { useRef, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRGB, startPickColor, stopPickColor } from '../../../store/actions/actionCreators';
import styles  from '../styles/colorPicker.module.scss' 
const { hsvToRgb } = require('../../../utils/hsvToRgb');

function ColorPicker() {
    const dispatch = useDispatch();
    const selectedHSV = useSelector((state) => state.canvas.selectedHSV);
    const selectedRGB = useSelector((state) => state.canvas.selectedRGB);
    const saturationSlider = useRef(null);
    const valueSlider = useRef(null);
    const saturationValueSlider =  useRef(null);
    const colorPickerDot =  useRef(null);
    const colorDisplay =  useRef(null);
    const hueSlider = useRef(null);

    const handleHueChange = (e) => {
        const newH = parseFloat(e.target.value);
        const nowHSV = [newH, saturationSlider.current.value, valueSlider.current.value]
        const newRGB = hsvToRgb(nowHSV);

        const saturationStartColor = hsvToRgb([newH, 0, valueSlider.current.value]);
        const saturationEndColor = hsvToRgb([newH, 100, valueSlider.current.value]);
        const saturationStartRGB = `rgb(${saturationStartColor[0]}, ${saturationStartColor[1]}, ${saturationStartColor[2]})`
        const saturationEndRGB = `rgb(${saturationEndColor[0]}, ${saturationEndColor[1]}, ${saturationEndColor[2]})`
        const saturationBackground = `linear-gradient(to right,${saturationStartRGB} 0%,${saturationEndRGB} 100%)`;
        saturationSlider.current.style.background = saturationBackground;

        const valueStartColor = hsvToRgb([newH, saturationSlider.current.value, 0]);
        const valueEndColor = hsvToRgb([newH, saturationSlider.current.value, 100]);
        const valueStartRGB = `rgb(${valueStartColor[0]}, ${valueStartColor[1]}, ${valueStartColor[2]})`
        const valueEndRGB = `rgb(${valueEndColor[0]}, ${valueEndColor[1]}, ${valueEndColor[2]})`
        const valueBackground = `linear-gradient(to right,${valueStartRGB} 0%,${valueEndRGB} 100%)`;
        valueSlider.current.style.background = valueBackground;
        dispatch(setRGB(newRGB, nowHSV));
    };

    const handleSaturationChange = (e) => {
        const newS = parseFloat(e.target.value);
        const nowHSV = [hueSlider.current.value, newS, valueSlider.current.value];
        const newRGB = hsvToRgb(nowHSV);
        dispatch(setRGB(newRGB, nowHSV));
    };

    const handleValueChange = (e) => {
        const newV = parseFloat(e.target.value);
        const nowHSV = [hueSlider.current.value, saturationSlider.current.value, newV];
        const newRGB = hsvToRgb(nowHSV);
        dispatch(setRGB(newRGB, nowHSV));
    };

    const handleSaturationValueMousedown = (e) => {
        const rect = saturationValueSlider.current.getBoundingClientRect();
        const saturation = Math.max(0, Math.min(100, (e.clientX - rect.left).toFixed(0)));
        const value = Math.max(0, Math.min(100, (rect.bottom - e.clientY).toFixed(0)));
        const nowHSV = [hueSlider.current.value, saturation, value];
        const newRGB = hsvToRgb(nowHSV);
        dispatch(startPickColor());
        dispatch(setRGB(newRGB, nowHSV));

        function handleSaturationValueMousemove(e) {
            const saturation = Math.max(0, Math.min(100, (e.clientX - rect.left).toFixed(0)));
            const value = Math.max(0, Math.min(100, (rect.bottom - e.clientY).toFixed(0)));
            const nowHSV = [hueSlider.current.value, saturation, value];
            const newRGB = hsvToRgb(nowHSV);
            dispatch(setRGB(newRGB, nowHSV));
        }

        function handleSaturationValueMouseup() {
            dispatch(stopPickColor());
            document.removeEventListener("mousemove", handleSaturationValueMousemove);
            document.removeEventListener("mouseup", handleSaturationValueMouseup);
        }
    
        document.addEventListener("mousemove", handleSaturationValueMousemove);
        document.addEventListener("mouseup", handleSaturationValueMouseup);
    };
    
    useEffect(() => {
        const slider = saturationValueSlider.current;
        if (slider) {
            slider.addEventListener("mousedown", handleSaturationValueMousedown);
    
            return () => {
                slider.removeEventListener("mousedown", handleSaturationValueMousedown);
            };
        }
    }, []);

    useEffect(() => {
        const saturationValueEndColor = hsvToRgb([selectedHSV[0], 100, 100]);
        const saturationValueEndRGB = `rgb(${saturationValueEndColor[0]}, ${saturationValueEndColor[1]}, ${saturationValueEndColor[2]})`;
        const saturationValueBackground = `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0)), linear-gradient(to right, rgb(255,255,255), ${saturationValueEndRGB})`;
        saturationValueSlider.current.style.background = saturationValueBackground;

        const valueStartColor = hsvToRgb([hueSlider.current.value, selectedHSV[1], 0]);
        const valueEndColor = hsvToRgb([hueSlider.current.value, selectedHSV[1], 100]);
        const valueStartRGB = `rgb(${valueStartColor[0]}, ${valueStartColor[1]}, ${valueStartColor[2]})`
        const valueEndRGB = `rgb(${valueEndColor[0]}, ${valueEndColor[1]}, ${valueEndColor[2]})`
        const valueBackground = `linear-gradient(to right,${valueStartRGB} 0%,${valueEndRGB} 100%)`;
        valueSlider.current.style.background = valueBackground;

        const saturationStartColor = hsvToRgb([hueSlider.current.value, 0, selectedHSV[2]]);
        const saturationEndColor = hsvToRgb([hueSlider.current.value, 100, selectedHSV[2]]);
        const saturationStartRGB = `rgb(${saturationStartColor[0]}, ${saturationStartColor[1]}, ${saturationStartColor[2]})`
        const saturationEndRGB = `rgb(${saturationEndColor[0]}, ${saturationEndColor[1]}, ${saturationEndColor[2]})`
        const saturationBackground = `linear-gradient(to right,${saturationStartRGB} 0%,${saturationEndRGB} 100%)`;
        saturationSlider.current.style.background = saturationBackground;
    }, [selectedHSV]);


    return (
        <div className={styles['color-picker-container']}>
            <div className={styles['color-picker']}>
                <div className={styles['color-picker-container-top']}>
                    <div className={styles['hue_saturation_container']}>
                        <div className={styles['picker_dot']} ref={colorPickerDot} style={{marginLeft: `calc(${selectedHSV[1]}px - 3px)`, marginTop: `calc(-${selectedHSV[2]}px + 97px)`, backgroundColor: `rgb(${selectedRGB[0]}, ${selectedRGB[1]}, ${selectedRGB[2]})`}}></div>
                        <div className={styles['hue_saturation_Slider']} ref={saturationValueSlider}></div>
                    </div>
                    <div className={styles['color-display']} style={{ backgroundColor: `rgb(${selectedRGB[0]}, ${selectedRGB[1]}, ${selectedRGB[2]})`}}></div>
                </div>
                <div className={styles['hsv-container']}> 
                    <span className={styles['hsv-title']}>H</span>
                    <input className={styles['hueSlider']} value={selectedHSV[0]} onChange={handleHueChange} ref={hueSlider} type="range" id="hueSlider" min="0" max="360"/>
                    <span className={styles['hsv-title']}>{selectedHSV[0]}</span>
                </div>
                <div className={styles['hsv-container']}>
                    <span className={styles['hsv-title']}>S</span>
                    <input className={styles['saturationSlider']} value={selectedHSV[1]} onChange={handleSaturationChange} ref={saturationSlider} type="range" id="saturationSlider" min="0" max="100"/>
                    <span className={styles['hsv-title']}>{selectedHSV[1]}</span>
                </div>
                <div className={styles['hsv-container']}>
                    <span className={styles['hsv-title']}>V</span>
                    <input className={styles['valueSlider']} value={selectedHSV[2]} onChange={handleValueChange} ref={valueSlider} type="range" id="valueSlider" min="0" max="100"/>
                    <span className={styles['hsv-title']}>{selectedHSV[2]}</span>
                </div>
            </div>
        </div>
        );
}

export default ColorPicker;