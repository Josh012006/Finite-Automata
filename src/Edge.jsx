import { useState } from 'react';

function DraggableBezierEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
}) {
    
    const offset = 50; // distance du point de contrôle

    function getControlPoint(x, y, position, isSource = true) {
    switch (position) {
        case 'Right':
        return { x: x + (isSource ? offset : -offset), y };
        case 'Left':
        return { x: x - (isSource ? offset : -offset), y };
        case 'Top':
        return { x, y: y - (isSource ? offset : -offset) };
        case 'Bottom':
        return { x, y: y + (isSource ? offset : -offset) };
        default:
        return { x, y };
    }
    }

    const [control1, setControl1] = useState(
        getControlPoint(sourceX, sourceY, sourcePosition, true)
    );
    const [control2, setControl2] = useState(
        getControlPoint(targetX, targetY, targetPosition, false)
    );

    // Courbe Bézier cubic
    const edgePath = `
        M ${sourceX},${sourceY}
        C ${control1.x},${control1.y} ${control2.x},${control2.y} ${targetX},${targetY}
    `;

    const handleDrag = (setControl) => (event) => {
        const bounds = event.target.ownerSVGElement.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        setControl({ x, y });
    };

    return (
        <>
            {/* Définitions de la flèche */}
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                    markerUnits="strokeWidth"
                >
                    <path d="M0,0 L0,7 L10,3.5 z" fill="black" />
                </marker>
            </defs>

            {/* La courbe Bézier */}
            <path
                id={id}
                d={edgePath}
                style={{ ...style, stroke: "black", strokeWidth: 2, fill: "none" }}
                markerEnd="url(#arrowhead)" // 👈 ajoute la flèche
            />

            {/* Points de contrôle (draggables) */}
            <circle
                cx={control1.x}
                cy={control1.y}
                r={6}
                fill="red"
                style={{ cursor: 'move' }}
                onMouseDown={(e) => {
                    e.preventDefault();
                    const move = (ev) => handleDrag(setControl1)(ev);
                    const up = () => {
                        window.removeEventListener('mousemove', move);
                        window.removeEventListener('mouseup', up);
                    };
                    window.addEventListener('mousemove', move);
                    window.addEventListener('mouseup', up);
                }}
            />

            <circle
                cx={control2.x}
                cy={control2.y}
                r={6}
                fill="blue"
                style={{ cursor: 'move' }}
                onMouseDown={(e) => {
                    e.preventDefault();
                    const move = (ev) => handleDrag(setControl2)(ev);
                    const up = () => {
                        window.removeEventListener('mousemove', move);
                        window.removeEventListener('mouseup', up);
                    };
                    window.addEventListener('mousemove', move);
                    window.addEventListener('mouseup', up);
                }}
            />
        </>
    );
}

export default DraggableBezierEdge;
