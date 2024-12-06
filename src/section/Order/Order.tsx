"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Handle,
  Position,
  Controls,
  Background,
  NodeChange,
  EdgeChange,
  Connection,
  Node,
  Edge,
  NodeProps,
} from "reactflow";;
import { Editor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import 'react-quill/dist/quill.snow.css'; 
import "reactflow/dist/style.css";
import axios from "axios";
import {constantsText} from "../../constant/constant"


const {
  BOT:{
    DEFAULT,
    STEP,
  },
} = constantsText;

type Input = {
  id: string;
  type: string;
  field: string;
  value: string; 
  editor:any;
}

type CustomNodeData = {
  inputs: Input[];
  label:string;
  setInputs: (callback: (inputs: Input[]) => Input[]) => void;
};

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data, id }) => {
  const editorRefs = useRef<Map<string, Editor>>(new Map());

  const handleInputChange = (inputId: string, value: string) => {
    data.setInputs((inputs) =>
      inputs.map((input) =>
        input.id === inputId ? { ...input, value } : input
      )
    );
  };

  const onDropInput = (event: React.DragEvent) => {
    event.preventDefault();
    const inputDataStr = event.dataTransfer.getData("application/reactflow-input");
    if (!inputDataStr) return;

    try {
      const { type, field } = JSON.parse(inputDataStr);
      const newInput: Input = {
        id: `${id}-input-${data.inputs.length + 1}`,
        type,
        field: field || "messages",
        editor: new Editor({
          extensions: [StarterKit],
          content: "<p>Type your message...</p>",
        }),
        value: "",
      };
      
      editorRefs.current.set(newInput.id, newInput.editor);
      data.setInputs((prevInputs) => [...prevInputs, newInput]);
    } catch (error) {
      console.error("Error parsing input data:", error);
    }
  };

  const onDragOver = (event: React.DragEvent) => event.preventDefault();

  useEffect(() => {
    data.inputs.forEach((input) => {
      if (input.editor) {
        input.editor.on('update', () => handleInputChange(input.id, input.editor.getHTML()));
      }
    });

    return () => {
      data.inputs.forEach((input) => {
        input.editor?.off('update');
        editorRefs.current.delete(input.id); 
      });
    };
  }, [data.inputs]);

  useEffect(() => {
    return () => {
      editorRefs.current.forEach((editor) => editor.destroy());
      editorRefs.current.clear();
    };
  }, []);

  return (
    <div className="rounded w-40" onDrop={onDropInput} onDragOver={onDragOver}>
      <h2 className={`${!data.inputs.length ? "text-center" : "text-left"} font-semibold text-sm font-sans mb-2 text-text-theme`}>
        {!data.inputs.length ? DEFAULT : data.label}
      </h2>
      <Handle type="target" position={Position.Left} />
      <div className="flex flex-col gap-2">
        {data.inputs.map(({ id, type, field, editor, value }) => (
          <div key={id} className="flex flex-col">
            {field === "messages" && (
              <>
                {type === "rich-text" && editor ? (
                  <div className="tiptap-editor-container">
                    <EditorContent className="" editor={editor} />
                  </div>
                ) : (
                  <input
                    type={type}
                    className="border border-gray-300 rounded-md p-1 bg-green-100"
                    value={value}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNode,
};

const Flow = () => {
  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const onDropNode = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData("application/reactflow-node");
      if (!nodeType) return;

      const lastNode = nodes[nodes.length - 1]; 
      if (!lastNode) return;

      const offsetX = 200;
      const offsetY = 100; 
      const position = {
        x: lastNode.position.x + offsetX,
        y: lastNode.position.y + offsetY,
      };

      const newNode: Node<CustomNodeData> = {
        id: `group-${nodes.length + 1}`,
        type: nodeType,
        position,
        data: {
          inputs: [],
          label: `${STEP}${nodes.length + 1}`,
          setInputs: (callback) =>
            setNodes((nds) =>
              nds.map((node) =>
                node.id === `group-${nodes.length + 1}`
                  ? { ...node, data: { ...node.data, inputs: callback(node.data.inputs) } }
                  : node
              )
            ),
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [nodes]
  );

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const saveData = () => {
    const formData = nodes.map((node) => ({
      id: node.id,
      inputs: node.data.inputs.map((input) => ({
        type: input.type,
        value: input.value,
      })),
    }));
    console.log("Saved Data:", formData);
    axios.post("/api/save", { data: formData }).then(() => {
      alert("Data saved successfully!");
    });
  };

  useEffect(() => {
    const initialNode: Node<CustomNodeData> = {
      id: "group-1",
      type: "customNode",
      position: { x: 20, y: 20 },
      data: {
        inputs: [],
        label: `${STEP}${nodes.length + 1}`,
        setInputs: (callback) =>
          setNodes((nds) =>
            nds.map((node) =>
              node.id === "group-1"
                ? { ...node, data: { ...node.data, inputs: callback(node.data.inputs) } }
                : node
            )
          ),
      },
    };

    setNodes([initialNode]);
  }, []);

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDropNode}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitViewOptions={{ padding: 0, maxZoom: 1, minZoom: 0.5 }}
        fitView
      >
        <Controls />
        <Background gap={7} size={1} />
      </ReactFlow>
      <div className="absolute top-0 right-0 bottom-0 w-full sm:w-44 bg-white p-4 rounded shadow-lg overflow-y-auto">
        <div
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow-node", "customNode")
          }
          className="border-2 border-dotted border-gray-300 p-3 rounded cursor-pointer mb-4 text-gray-500 text-center text-sm"
        >
          Drop Node
        </div>

        <div className="grid grid-cols-2  gap-y-2 gap-x-1 text-center">
          {["rich-text", "Image", "Video", "YouTube"].map((type) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => {
                const inputData = {
                  type: type,
                  field: "messages",
                };
                e.dataTransfer.setData(
                  "application/reactflow-input",
                  JSON.stringify(inputData)
                );
              }}
              className="bg-white border-2 border-dotted border-gray-300 p-2 rounded cursor-pointer text-gray-500 text-sm"
            >
              {type}
            </div>
          ))}
        </div>

        <hr className="my-4 border-b border-gray-200" />

        <button
          onClick={saveData}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Flow;
