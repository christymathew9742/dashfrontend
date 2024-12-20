"use client";

// import React, { useCallback, useState } from "react";
// import ReactFlow, {
//   addEdge,
//   Background,
//   Controls,
//   Connection,
//   Edge,
//   Node,
//   applyNodeChanges,
//   applyEdgeChanges,
//   NodeChange,
//   EdgeChange,
//   ReactFlowProvider,
// } from "reactflow";
// import "reactflow/dist/style.css";

// // Initial nodes and edges
// const initialNodes: Node[] = [
//   {
//     id: "1",
//     type: "default",
//     data: { label: "Initial Node" },
//     position: { x: 50, y: 50 }, // Top-left corner
//     style: {
//       fontSize: "12px",
//       fontFamily: "Arial, sans-serif",
//       color: "#333",
//       textAlign: "center",
//       padding: "4px",
//       background: "#fff",
//       border: "1px solid #ccc",
//       borderRadius: "4px",
//     },
//   },
// ];

// const initialEdges: Edge[] = [];

// const App = () => {
//   const [nodes, setNodes] = useState<Node[]>(initialNodes);
//   const [edges, setEdges] = useState<Edge[]>(initialEdges);

//   const onNodesChange = useCallback(
//     (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );

//   const onEdgesChange = useCallback(
//     (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect = useCallback(
//     (params: Connection) => {
//       setEdges((eds) => addEdge(params, eds));
//     },
//     []
//   );

//   const onConnectStart = useCallback((_, { nodeId, handleType }) => {
//     // This is called when a connection starts
//     if (nodeId && handleType === "source") {
//       const sourceNode = nodes.find((node) => node.id === nodeId);

//       if (sourceNode) {
//         // Create a new node near the source node
//         const newNode: Node = {
//           id: `${nodes.length + 1}`,
//           data: { label: `Node ${nodes.length + 1}` },
//           position: {
//             x: sourceNode.position.x + 150,
//             y: sourceNode.position.y, // Place it horizontally next to the source node
//           },
//           type: "default",
//           style: {
//             fontSize: "12px",
//             fontFamily: "Arial, sans-serif",
//             color: "#333",
//             textAlign: "center",
//             padding: "4px",
//             background: "#fff",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//           },
//         };

//         setNodes((nds) => [...nds, newNode]);

//         // Optionally create an edge connecting the source to the new node
//         const newEdge: Edge = {
//           id: `e${sourceNode.id}-${newNode.id}`,
//           source: sourceNode.id,
//           target: newNode.id,
//         };

//         setEdges((eds) => [...eds, newEdge]);
//       }
//     }
//   }, [nodes]);

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100vh",
//         background: "#f0f0f0",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onConnectStart={onConnectStart}
//         fitView
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// };

// export default function AppWrapper() {
//   return (
//     <ReactFlowProvider>
//       <App />
//     </ReactFlowProvider>
//   );
// }


import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

// Initial nodes and edges
const initialNodes: Node[] = [
  {
    id: "1",
    type: "default",
    data: { label: "Initial Node" },
    position: { x: 500, y: 500 }, // Top-left corner
    style: {
      fontSize: "12px",
      fontFamily: "Arial, sans-serif",
      color: "#333",
      textAlign: "center",
      padding: "4px",
      background: "#fff",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
  },
];

const initialEdges: Edge[] = [];

const App = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    []
  );

  const onConnectStart = useCallback((_, { nodeId, handleType }) => {
    // This is called when a connection starts
    if (nodeId && handleType === "source") {
      const sourceNode = nodes.find((node) => node.id === nodeId);

      if (sourceNode) {
        // Create a new node near the source node
        const newNode: Node = {
          id: `${nodes.length + 1}`,
          data: { label: `Node ${nodes.length + 1}` },
          position: {
            x: sourceNode.position.x + 150,
            y: sourceNode.position.y, // Place it horizontally next to the source node
          },
          type: "default",
          style: {
            fontSize: "12px",
            fontFamily: "Arial, sans-serif",
            color: "#333",
            textAlign: "center",
            padding: "4px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
          },
        };

        setNodes((nds) => [...nds, newNode]);

        // Optionally create an edge connecting the source to the new node
        const newEdge: Edge = {
          id: `e${sourceNode.id}-${newNode.id}`,
          source: sourceNode.id,
          target: newNode.id,
          type: "smoothstep", // Using ReactFlow's built-in smoothstep edge
        };

        setEdges((eds) => [...eds, newEdge]);
      }
    }
  }, [nodes]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#f0f0f0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        fitView
      >
          <Background 
          className="bg-cover bg-center bg-no-repeat object-cover" 
          style={{ backgroundImage: "url('Qbot/qbotbg.jpg)" }} //Whitewhatsap.png, whatsappi.png,Qbot/qbotbg.jpg
        />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default function AppWrapper() {
  return (
    // <ReactFlowProvider>
      <App />
    // </ReactFlowProvider>
  );
}







