const canvas = document.getElementById('roadmapCanvas');
const ctx = canvas.getContext('2d');

let scale = 1;
let originX = 0;
let originY = 0;
let startX;
let startY;
let isDragging = false;

// Configuration
const lineColor = '#007bff';
const textColor = '#333';
const lineWidth = 2;
const fontSize = 14;
const nodeRadius = 20;
const verticalSpacing = 80; // Vertical distance between nodes

// Roadmap Data
const nodes = [
    { id: 'a', label: 'Python Fundamentals' },
    { id: 'b', label: 'Understanding Data Types and Variables' },
    { id: 'c', label: 'Control Structures (if-else, loops)' },
    { id: 'd', label: 'Functions and Modules' },
    { id: 'e', label: 'Working with Collections' },
    { id: 'f', label: 'Exception Handling' },
    { id: 'g', label: 'File Handling and I/O Operations' },
    { id: 'h', label: 'OOP Concepts' },
    { id: 'i', label: 'Classes and Objects' },
    { id: 'j', label: 'Inheritance and Polymorphism' },
    { id: 'k', label: 'Web Development Basics' },
    { id: 'l', label: 'HTTP and the Web' },
    { id: 'm', label: 'HTML, CSS, and JavaScript Basics' },
    { id: 'n', label: 'Understanding Web Servers and Clients' },
    { id: 'o', label: 'Basics of Frontend Frameworks' },
    { id: 'p', label: 'Version Control with Git' },
    { id: 'q', label: 'Django Core Concepts' },
    { id: 'r', label: 'Setting Up a Django Project' },
    { id: 's', label: 'Django Models' },
    { id: 't', label: 'Django Views' },
    { id: 'u', label: 'Django Templates' },
    { id: 'v', label: 'Working with Django Admin' },
    { id: 'w', label: 'Django Authentication' },
    { id: 'x', label: 'Advanced Django Features' },
    { id: 'y', label: 'Django REST Framework' },
    { id: 'z', label: 'Testing in Django' },
    { id: 'aa', label: 'Django Deployment' },
    { id: 'bb', label: 'Django Ecosystem' }
];

// Draw nodes
const drawNode = (x, y, label) => {
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = textColor;
    ctx.font = `${fontSize * scale}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
};

// Draw connections
const drawLine = (startX, startY, endX, endY) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
};

// Layout nodes vertically with connections
const renderRoadmap = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    let x = 100;
    let y = 50;
    nodes.forEach((node, index) => {
        drawNode(x, y, node.label);
        if (index > 0) {
            drawLine(x, y - verticalSpacing, x, y);
        }
        y += verticalSpacing;
    });

    // Draw vertical lines between nodes
    for (let i = 1; i < nodes.length; i++) {
        drawLine(100, 50 + (i - 1) * verticalSpacing, 100, 50 + i * verticalSpacing);
    }
};

// Zoom and Pan handling
const handleZoom = (event) => {
    event.preventDefault();
    const zoomAmount = event.deltaY * -0.01;
    scale = Math.min(Math.max(.125, scale + zoomAmount), 4);
    renderRoadmap();
};

const handlePanStart = (event) => {
    isDragging = true;
    startX = event.clientX - originX;
    startY = event.clientY - originY;
    canvas.style.cursor = 'grabbing';
};

const handlePanMove = (event) => {
    if (isDragging) {
        originX = event.clientX - startX;
        originY = event.clientY - startY;
        renderRoadmap();
    }
};

const handlePanEnd = () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
};

canvas.addEventListener('wheel', handleZoom);
canvas.addEventListener('mousedown', handlePanStart);
canvas.addEventListener('mousemove', handlePanMove);
canvas.addEventListener('mouseup', handlePanEnd);
canvas.addEventListener('mouseleave', handlePanEnd); // Stop dragging when leaving canvas

// Initial render
renderRoadmap();
