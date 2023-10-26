export function blendColors(color1, color2) {
    const hexToRgb = (hex) =>
        hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const blendedColor = [
        Math.round((rgb1[0] + rgb2[0]) / 2),
        Math.round((rgb1[1] + rgb2[1]) / 2),
        Math.round((rgb1[2] + rgb2[2]) / 2),
    ];

    const blendedHexColor = `#${blendedColor
        .map((component) => component.toString(16).padStart(2, '0'))
        .join('')}`;

    return blendedHexColor;
}