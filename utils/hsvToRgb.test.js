const { hsvToRgb } = require('./hsvToRgb.js');

test('hsv[0, 0, 0] to rgb[0, 0, 0]', () => {
    expect(hsvToRgb([0, 0, 0])).toEqual([0, 0, 0]);
});

test('hsv[23, 24, 25] to rgb[64, 54, 48]', () => {
    expect(hsvToRgb([23, 24, 25])).toEqual([64, 54, 48]);
});

test('hsv[100, 100, 100] to rgb[85, 255, 0]', () => {
    expect(hsvToRgb([100, 100, 100])).toEqual([85, 255, 0]);
});
