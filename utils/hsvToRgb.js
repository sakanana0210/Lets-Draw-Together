function hsvToRgb(hsv) {
    let h = hsv[0];
    let s = hsv[1];
    let v = hsv[2];
    if(h > 359){
        h -=360;
    }
    s /= 100;
    v /= 100;
    let r, g, b;
    let x = parseInt(h / 60);
    let f = h / 60 - x; 
    let p = v * (1 - s); 
    let q = v * (1 - f * s); 
    let t = v*(1 - (1 - f) * s); 
    if (x === 0) {
            r = v;
            g = t;
            b = p;
        } else if (x === 1) {
            r = q;
            g = v;
            b = p;
        } else if (x === 2) {
            r = p;
            g = v;
            b = t;
        } else if (x === 3) {
            r = p;
            g = q;
            b = v;
        } else if (x === 4) {
            r = t;
            g = p;
            b = v;
        } else if (x === 5) {
            r = v;
            g = p;
            b = q;
        }
    let rgb = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    return rgb;
}

module.exports = {
    hsvToRgb: hsvToRgb
};