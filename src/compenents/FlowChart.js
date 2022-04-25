import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls } from 'react-flow-renderer';

const hide = (hidden) => (nodeOrEdge) => {
    nodeOrEdge.hidden = hidden;
    return nodeOrEdge;
};

const HiddenFlow = (props) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(props.initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.initialEdges);
    const [hidden, setHidden] = useState(false);

    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

    useEffect(() => {
        setNodes((nds) => nds.map(hide(hidden)));
        setEdges((eds) => eds.map(hide(hidden)));
    }, [hidden]);

    return (
        <div  style={{ height: 500 }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <MiniMap />
                <Controls />

                <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}>
                    <div>
                        <label htmlFor="ishidden">
                            isHidden
                            <input
                                id="ishidden"
                                type="checkbox"
                                checked={hidden}
                                onChange={(event) => setHidden(event.target.checked)}
                                className="react-flow__ishidden"
                            />
                        </label>
                    </div>
                </div>
            </ReactFlow>
        </div>

    );
};

export default HiddenFlow;