const { rgbToHsv } = require('./rgbToHsv.js');

test('rgb[0, 0, 0] to hsv[0, 0, 0]', () => {
    expect(rgbToHsv(0, 0, 0)).toEqual([0, 0, 0]);
});

test('rgb[23, 24, 25] to hsv[210, 8, 10]', () => {
    expect(rgbToHsv(23, 24, 25)).toEqual([210, 8, 10]);
});

test('rgb[100, 100, 100] to hsv[0, 0, 39]', () => {
    expect(rgbToHsv(100, 100, 100)).toEqual([0, 0, 39]);
});
