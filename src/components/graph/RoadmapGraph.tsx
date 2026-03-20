import { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  BackgroundVariant,
  ConnectionLineType,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { TopicGraphNode } from './TopicGraphNode';
import { initialNodes, initialEdges, TOPICS_DATA, type TopicNodeData } from '../../data/graphData';

const nodeTypes = {
  topicNode: TopicGraphNode,
};

const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: false,
  style: { stroke: '#4B5563', strokeWidth: 2 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#4B5563',
  },
};

export const RoadmapGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
        // Collapse: remove subtopic nodes and edges
        const topicData = TOPICS_DATA.find(t => t.id === categoryId);
        if (topicData) {
          const nodeIdsToRemove = new Set<string>();
          topicData.subtopics.forEach(sub => {
            nodeIdsToRemove.add(sub.id);
            sub.items?.forEach(item => nodeIdsToRemove.add(item.id));
          });
          setNodes(nds => nds.filter(n => !nodeIdsToRemove.has(n.id)));
          setEdges(eds => eds.filter(e => !nodeIdsToRemove.has(e.source) && !nodeIdsToRemove.has(e.target)));
        }
      } else {
        newSet.add(categoryId);
        // Expand: add subtopic nodes and edges
        const topicData = TOPICS_DATA.find(t => t.id === categoryId);
        const categoryNode = nodes.find(n => n.id === categoryId);
        if (topicData && categoryNode) {
          const newNodes: Node<TopicNodeData>[] = [];
          const newEdges: Edge[] = [];

          // Position subtopics relative to category
          const baseX = categoryNode.position.x;
          const baseY = categoryNode.position.y + 80;

          topicData.subtopics.forEach((sub, subIndex) => {
            const subX = baseX - 150;
            const subY = baseY + subIndex * 100;

            newNodes.push({
              id: sub.id,
              type: 'topicNode',
              position: { x: subX, y: subY },
              data: { label: sub.name, type: 'topic', topicId: sub.id },
            });

            newEdges.push({
              id: `e-${categoryId}-${sub.id}`,
              source: categoryId,
              target: sub.id,
              type: 'smoothstep',
            });

            // Add items under subtopic
            if (sub.items) {
              sub.items.forEach((item, itemIndex) => {
                const itemX = subX - 180;
                const itemY = subY + itemIndex * 35 - ((sub.items!.length - 1) * 35) / 2;

                newNodes.push({
                  id: item.id,
                  type: 'topicNode',
                  position: { x: itemX, y: itemY },
                  data: { label: item.name, type: 'subtopic', topicId: item.id },
                });

                newEdges.push({
                  id: `e-${sub.id}-${item.id}`,
                  source: sub.id,
                  target: item.id,
                  type: 'smoothstep',
                });
              });
            }
          });

          setNodes(nds => [...nds, ...newNodes]);
          setEdges(eds => [...eds, ...newEdges]);
        }
      }
      return newSet;
    });
  }, [nodes, setNodes, setEdges]);

  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node<TopicNodeData>) => {
    if (node.data.type === 'category') {
      toggleCategory(node.id);
    }
  }, [toggleCategory]);

  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#0A0A0A' }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        color: '#fff',
        fontSize: '12px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '8px 16px',
        borderRadius: '4px',
      }}>
        Click on a category to expand/collapse subtopics
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        proOptions={proOptions}
      >
        <Controls
          style={{
            backgroundColor: '#1F1F1F',
            borderRadius: '8px',
            border: '1px solid #374151',
          }}
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#1F1F1F"
        />
      </ReactFlow>
    </div>
  );
};
