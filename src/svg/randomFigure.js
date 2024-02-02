export default (req, res) => {
    const x = Math.floor(Math.random() * 200);
    const y = Math.floor(Math.random() * 200);
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const shapeType = Math.random() < 0.5 ? 'rect' : 'circle';
    const radius = 25;

    let svgContent = `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">`;

    if (shapeType === 'rect') {
        svgContent += `<rect x="${x}" y="${y}" width="50" height="50" fill="${randomColor}"/>`;
    } else {
        svgContent += `<circle cx="${x + radius}" cy="${y + radius}" r="${radius}" fill="${randomColor}"/>`;
    }

    svgContent += `</svg>`;

    return svgContent;
}
