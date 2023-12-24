function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s;
    let v = max;
    let d = max - min;
    s = (max === 0 ? 0 : d / max);
    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = 60 * (g - b) / d + (g < b ? 360 : 0);
                break;
            case g:
                h = 60 * (b - r) / d + 120;
                break;
            case b:
                h = 60 * (r - g) / d + 240;
                break;
        }
    }
    h = Math.round(h);
    s = Math.round(s * 100);
    v = Math.round(v * 100); 
    return [h, s, v];
}

module.exports = {
    rgbToHsv: rgbToHsv
};