// "use client";

// import React, { useState, useCallback, useEffect, useRef } from "react";
// import ReactFlow, {
//   addEdge,
//   applyNodeChanges,
//   applyEdgeChanges,
//   Handle,
//   Position,
//   Controls,
//   Background,
//   useReactFlow,
//   useNodesState,
//   useEdgesState,
//   ReactFlowProvider,
// } from "reactflow";
// import "reactflow/dist/style.css";
// import axios from "axios";

// const nodeTypes = {
//   customNode: ({ data, id }) => {
//     const handleInputChange = (inputId: string, value: string) => {
//       data.setInputs((inputs) =>
//         inputs.map((input) =>
//           input.id === inputId ? { ...input, value } : input
//         )
//       );
//     };

//     const onDropInput = (event: React.DragEvent) => {
//       event.preventDefault();
//       const inputDataStr = event.dataTransfer.getData("application/reactflow-input");
//       if (!inputDataStr) return;

//       try {
//         const inputData: { type: string; field?: string } = JSON.parse(inputDataStr);
//         if (!inputData.type) return;

//         const newInput: any['inputs'][0] = {
//           id: `${id}-input-${data.inputs.length + 1}`,
//           type: inputData.type || '',
//           field: inputData.field || '', 
//           value: "",
//         };
//         data.setInputs((prevInputs) => [...prevInputs, newInput]);
//       } catch (error) {
//         console.error("Error parsing input data:", error);
//       }
//     };

//     const onDragOver = (event: React.DragEvent) => event.preventDefault();
//     return (
//       <div className="p-2 rounded w-40" onDrop={onDropInput} onDragOver={onDragOver}>
//         <Handle type="target" position={Position.Left} />
//         <div className="flex flex-col gap-2">
//           <div className="text-center font-bold">{data.label}</div> {/* Add the label here */}
//           {data.inputs.map((input: any) => (
//             <div key={input.id} className="flex flex-col">
//               {input.field === "messages" ? (
//                 <>
//                   {input.type === "text" ? (
//                     <textarea
//                       className="rounded-md p-2 bg-green-100 resize-none min-h-[80px] max-h-[150px] overflow-y-auto focus:ring-0 focus:outline-none" 
//                       value={input.value}
//                       onChange={(e) => handleInputChange(input.id, e.target.value)}
//                     />
//                   ) : (
//                     <input
//                       type={input.type}
//                       className="border border-whats-message-bord rounded-md p-1 bg-green-100" 
//                       value={input.value}
//                       onChange={(e) => handleInputChange(input.id, e.target.value)}
//                     />
//                   )}
//                 </>
//               ) : null}
//             </div>
//           ))}
//         </div>
//         <Handle type="source" position={Position.Right} />
//       </div>
//     );
//   },
// };

// const Flow = () => {
//   const reactFlowWrapper = useRef(null);
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const { screenToFlowPosition } = useReactFlow();

//   const onConnect = useCallback(
//     (connection) => setEdges((eds) => addEdge(connection, eds)),
//     []
//   );

//   const onConnectEnd = useCallback(
//     (event, connectionState) => {
//       if (!connectionState.isValid) {
//         // Calculate position of the new node based on the drop coordinates
//         const { clientX, clientY } =
//           'changedTouches' in event ? event.changedTouches[0] : event;

//         const position = screenToFlowPosition({
//           x: clientX,
//           y: clientY,
//         });

//         // Create a new node at the calculated position with a label
//         const newNode = {
//           id: `${nodes.length + 1}`, // Unique ID for the new node
//           position,
//           data: {
//             label: `Node ${nodes.length + 1}`, // Assign label here
//           },
//         };

//         // Add the new node and connect it to the source node
//         setNodes((nds) => nds.concat(newNode));
//         setEdges((eds) =>
//           eds.concat({
//             id: `${nodes.length + 1}`,
//             source: connectionState.fromNode.id,
//             target: `${nodes.length + 1}`,
//           })
//         );
//       }
//     },
//     [nodes, setNodes, setEdges, screenToFlowPosition]
//   );

//   useEffect(() => {
//     const initialNode = {
//       id: "node-1",
//       type: "customNode",
//       position: { x: 0, y: 50 },
//       data: {
//         label: "Node 1", // Initial label
//         inputs: [],
//         setInputs: (callback) =>
//           setNodes((nds) =>
//             nds.map((node) =>
//               node.id === "node-1"
//                 ? { ...node, data: { ...node.data, inputs: callback(node.data.inputs) } }
//                 : node
//             )
//           ),
//       },
//     };

//     setNodes([initialNode]);
//   }, [setNodes]);

//   return (
//     <div className="h-screen w-full" ref={reactFlowWrapper}>
//       <ReactFlow
//         style={{ backgroundColor: "#F7F9FB" }}
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onConnectEnd={onConnectEnd}
//         nodeTypes={nodeTypes}
//         fitView
//         fitViewOptions={{ padding: 2 }}
//       >
//         <Controls />
//         <Background gap={7} size={1} />
//       </ReactFlow>
//     </div>
//   );
// };

// export default () => (
//   <ReactFlowProvider>
//     <Flow />
//   </ReactFlowProvider>
// );
"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";


const ChatbotEditor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content: "<p>Type your message...</p>",
  });

  // Cleanup editor instance
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  const togglePopup = () => setIsOpen((prev) => !prev);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Toggle Button */}
      <button
        onClick={togglePopup}
        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
      >
        {isOpen ? "Close Editor" : "Open Editor"}
      </button>

      {/* Popup Editor */}
      {isOpen && (
        <div className="mt-4 bg-white border border-gray-300 rounded-lg shadow-lg w-80 p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Chat Editor</h2>
            <button
              onClick={togglePopup}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          {editor ? (
            <>
              <div className="mb-2">
                {/* Formatting Toolbar */}
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`px-2 py-1 text-sm border ${
                    editor.isActive("bold")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600"
                  } rounded mr-1`}
                >
                  Bold
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`px-2 py-1 text-sm border ${
                    editor.isActive("italic")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600"
                  } rounded mr-1`}
                >
                  Italic
                </button>
                <button
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertContent(
                        `<img src="https://via.placeholder.com/150" alt="Image" />`
                      )
                      .run()
                  }
                  className="px-2 py-1 text-sm border text-gray-600 rounded"
                >
                  Insert Image
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().insertContent("😊").run()
                  }
                  className="px-2 py-1 text-sm border text-gray-600 rounded"
                >
                  Insert Emoji
                </button>
              </div>
              {/* Editor Content */}
              <EditorContent editor={editor} className="border p-2 rounded" />
            </>
          ) : (
            <p>Loading editor...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatbotEditor;



