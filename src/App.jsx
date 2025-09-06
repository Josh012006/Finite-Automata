import { useState } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ModificationBar from './ModificationBar';
import Node from './Node';
import TextNode from './TextNode';

function App() {

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const nodesTypes = {
        state: Node,
        text: TextNode
    }

    return (
        <div style={{ display: 'flex', }}>
            <div style={{ width: '30vw', height: '100vh' }}>
                <ModificationBar />
            </div>
            <div style={{ width: '70vw', height: '100vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodesTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                />
            </div>
        </div>
    )
}

export default App;
