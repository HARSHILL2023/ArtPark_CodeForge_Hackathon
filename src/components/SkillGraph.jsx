import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Info, ArrowRight } from 'lucide-react';
import { getGapStatus, getGapColor } from '../data/mockData';

const SkillGraph = ({ skills, graphData }) => {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Calculate node positions based on dependencies (simple layered layout)
  const layout = useMemo(() => {
    if (!graphData || !skills) return { nodes: [], edges: [] };

    const layers = [];
    const processedNodes = new Set();
    const nodeMap = new Map();
    
    // Skill data indexed by name for quick lookup
    const skillLookup = Object.fromEntries(skills.map(s => [s.name, s]));

    // Determine layers
    let currentNodes = graphData.filter(n => n.dependsOn.length === 0);
    while (currentNodes.length > 0) {
      layers.push(currentNodes);
      currentNodes.forEach(n => processedNodes.add(n.id));
      
      currentNodes = graphData.filter(n => 
        !processedNodes.has(n.id) && 
        n.dependsOn.every(dep => processedNodes.has(dep))
      );
    }

    // Assign coordinates
    const nodes = [];
    const xDist = 200;
    const yDist = 80;
    
    layers.forEach((layer, layerIdx) => {
      layer.forEach((node, nodeIdx) => {
        const x = layerIdx * xDist + 50;
        const y = nodeIdx * yDist + 50;
        const skill = skillLookup[node.id] || { name: node.id, requiredLevel: 0, yourLevel: 0 };
        const status = getGapStatus(skill);
        const colors = getGapColor(status);
        
        const nodeInfo = { ...node, x, y, skill, status, colors };
        nodes.push(nodeInfo);
        nodeMap.set(node.id, nodeInfo);
      });
    });

    const edges = [];
    graphData.forEach(node => {
      node.dependsOn.forEach(depId => {
        const from = nodeMap.get(depId);
        const to = nodeMap.get(node.id);
        if (from && to) {
          edges.push({ from, to });
        }
      });
    });

    return { nodes, edges };
  }, [graphData, skills]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 mb-8 overflow-hidden relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Network className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Skill Dependency Map</h3>
            <p className="text-sm text-slate-500">Visualizing your learning path prerequisites</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-600">Mastered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-xs text-slate-600">Weak</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-xs text-slate-600">Missing</span>
          </div>
        </div>
      </div>

      <div className="relative h-[450px] w-full overflow-auto custom-scrollbar">
        <svg className="absolute top-0 left-0 w-[1000px] h-full pointer-events-none">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orientation="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
            </marker>
          </defs>
          {layout.edges.map((edge, i) => (
            <motion.line
              key={`edge-${i}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
              x1={edge.from.x + 80}
              y1={edge.from.y + 20}
              x2={edge.to.x}
              y2={edge.to.y + 20}
              stroke="#e2e8f0"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          ))}
        </svg>

        {layout.nodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: i * 0.05 }}
            className={`absolute z-10 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300
              ${node.colors.bg} ${node.colors.border} ${hoveredNode === node.id ? 'scale-110 shadow-lg' : ''}`}
            style={{ left: node.x, top: node.y, width: 160 }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold truncate ${node.colors.text}`}>{node.id}</span>
              <div className={`w-2 h-2 rounded-full ${node.colors.dot}`} />
            </div>
            
            <AnimatePresence>
              {hoveredNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-full mt-2 w-48 bg-slate-900 text-white p-3 rounded-xl z-20 shadow-xl pointer-events-none"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Required:</span>
                      <span className="font-bold">Lvl {node.skill.requiredLevel}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Current:</span>
                      <span className="font-bold">Lvl {node.skill.yourLevel}</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-400" 
                        style={{ width: `${(node.skill.yourLevel / node.skill.requiredLevel) * 100}%` }} 
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillGraph;
