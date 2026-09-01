import React, { useCallback, useMemo, useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Layers, MousePointer2, Sun, Moon } from 'lucide-react';
import dagre from 'dagre';
import { getGapStatus } from '../data/mockData';

// ─────────────────────────────────────────────────────────────────────────────
// Theme Tokens
// ─────────────────────────────────────────────────────────────────────────────

const THEMES = {
  dark: {
    // Container
    containerBg: '#121416',
    containerBorder: '#292D33',
    containerShadow: '0 1px 3px rgba(0,0,0,0.3)',
    // Canvas
    canvasBg: '#0C0D0F',
    canvasBorder: '#292D33',
    gridColor: '#292D33',
    gridOpacity: 0.5,
    // Text
    titleColor: '#F2F0EA',
    subtitleColor: '#B4B1A9',
    footerColor: '#7E7C77',
    // Badge / hint
    badgeBg: '#181B1F',
    badgeBorder: '#292D33',
    badgeText: '#B4B1A9',
    // Legend pill
    legendBg: '#181B1F',
    legendBorder: '#292D33',
    legendItemBg: '#121416',
    legendItemText: '#B4B1A9',
    // Spinner
    spinnerTrack: '#292D33',
    spinnerHead: '#3B82F6',
    spinnerText: '#7E7C77',
    // Controls
    ctrlBg: '#181B1F',
    ctrlBorder: '#292D33',
    ctrlShadow: '0 2px 8px rgba(0,0,0,0.3)',
    // Toggle button
    toggleBg: '#181B1F',
    toggleBorder: '#292D33',
    toggleColor: '#B4B1A9',
    toggleHoverBg: '#1D2025',
    // Edge defaults
    edgeDefault: '#363B43',
    edgeActive: '#3B82F6',
    edgeActiveShadow: 'drop-shadow(0 0 4px rgba(59,130,246,0.5))',
    // Tooltip
    tooltipBg: '#181B1F',
    tooltipDivider: '#292D33',
    tooltipArrowBg: '#181B1F',
    tooltipLvlColor: '#D6A84F',
    tooltipGoalColor: '#4CAF7A',
    tooltipMutedText: '#7E7C77',
    // Progress bar track
    barTrack: '#292D33',
    // Node status colors
    nodeColors: {
      matched: {
        bg: '#112217', border: '#4CAF7A', text: '#A2E6BC',
        dot: '#4CAF7A', glow: 'rgba(76,175,122,0.25)',
        barFill: '#4CAF7A', badge: '#0C2A18', badgeText: '#A2E6BC',
      },
      weak: {
        bg: '#241B08', border: '#D6A84F', text: '#FCE4A6',
        dot: '#D6A84F', glow: 'rgba(214,168,79,0.25)',
        barFill: '#D6A84F', badge: '#332306', badgeText: '#FCE4A6',
      },
      missing: {
        bg: '#260E0E', border: '#D96565', text: '#FCC5C5',
        dot: '#D96565', glow: 'rgba(217,101,101,0.25)',
        barFill: '#D96565', badge: '#380F0F', badgeText: '#FCC5C5',
      },
      default: {
        bg: '#181B1F', border: '#292D33', text: '#F2F0EA',
        dot: '#7E7C77', glow: 'rgba(126,124,119,0.15)',
        barFill: '#7E7C77', badge: '#121416', badgeText: '#B4B1A9',
      },
    },
  },

  light: {
    // Container
    containerBg: '#FCFBF8',
    containerBorder: '#DCD9D1',
    containerShadow: '0 1px 3px rgba(0,0,0,0.04)',
    // Canvas
    canvasBg: '#F5F3EE',
    canvasBorder: '#DCD9D1',
    gridColor: '#DCD9D1',
    gridOpacity: 0.6,
    // Text
    titleColor: '#1B1B19',
    subtitleColor: '#5E5C56',
    footerColor: '#85827A',
    // Badge / hint
    badgeBg: '#EEECE6',
    badgeBorder: '#DCD9D1',
    badgeText: '#5E5C56',
    // Legend pill
    legendBg: '#EEECE6',
    legendBorder: '#DCD9D1',
    legendItemBg: '#FCFBF8',
    legendItemText: '#5E5C56',
    // Spinner
    spinnerTrack: '#DCD9D1',
    spinnerHead: '#2563EB',
    spinnerText: '#85827A',
    // Controls
    ctrlBg: '#FCFBF8',
    ctrlBorder: '#DCD9D1',
    ctrlShadow: '0 1px 4px rgba(0,0,0,0.06)',
    // Toggle button
    toggleBg: '#EEECE6',
    toggleBorder: '#DCD9D1',
    toggleColor: '#5E5C56',
    toggleHoverBg: '#E2DFD7',
    // Edge defaults
    edgeDefault: '#C9C5BB',
    edgeActive: '#2563EB',
    edgeActiveShadow: 'drop-shadow(0 0 3px rgba(37,99,235,0.4))',
    // Tooltip
    tooltipBg: '#FCFBF8',
    tooltipDivider: '#DCD9D1',
    tooltipArrowBg: '#FCFBF8',
    tooltipLvlColor: '#9A6B00',
    tooltipGoalColor: '#237A4B',
    tooltipMutedText: '#85827A',
    // Progress bar track
    barTrack: '#EEECE6',
    // Node status colors
    nodeColors: {
      matched: {
        bg: '#EAF5EE', border: '#237A4B', text: '#154B2E',
        dot: '#237A4B', glow: 'rgba(35,122,75,0.12)',
        barFill: '#237A4B', badge: '#D4EBDC', badgeText: '#154B2E',
      },
      weak: {
        bg: '#FDF7E7', border: '#9A6B00', text: '#5C3F00',
        dot: '#9A6B00', glow: 'rgba(154,107,0,0.12)',
        barFill: '#9A6B00', badge: '#FAEECA', badgeText: '#5C3F00',
      },
      missing: {
        bg: '#FDF1F1', border: '#B33A3A', text: '#6B1C1C',
        dot: '#B33A3A', glow: 'rgba(179,58,58,0.12)',
        barFill: '#B33A3A', badge: '#F9D8D8', badgeText: '#6B1C1C',
      },
      default: {
        bg: '#EEECE6', border: '#DCD9D1', text: '#1B1B19',
        dot: '#85827A', glow: 'rgba(133,130,122,0.12)',
        barFill: '#85827A', badge: '#FCFBF8', badgeText: '#5E5C56',
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getNodeColors(status, theme) {
  const map = THEMES[theme].nodeColors;
  return map[status] || map.default;
}

function getSkillInsight(skill) {
  const diff = skill.requiredLevel - skill.yourLevel;
  if (diff <= 0) return "You've fully satisfied this requirement. Ready to mentor!";
  if (skill.yourLevel === 0) return "Not detected in your background. High-priority prerequisite.";
  return `Need ${diff} more level${diff > 1 ? 's' : ''} to reach proficiency. Keep practicing.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// SkillNode — reads theme from data prop
// ─────────────────────────────────────────────────────────────────────────────
const SkillNode = ({ data }) => {
  const { skill, status, isHighlighted, graphTheme = 'dark' } = data;
  const [isHovered, setIsHovered] = useState(false);

  const t = THEMES[graphTheme];
  const colors = getNodeColors(status, graphTheme);
  const pct = Math.min((skill.yourLevel / Math.max(skill.requiredLevel, 1)) * 100, 100);

  const nodeStyle = {
    background: colors.bg,
    border: `${isHighlighted ? 2 : 1.5}px solid ${colors.border}`,
    boxShadow: isHighlighted || isHovered
      ? `0 0 16px 2px ${colors.glow}, 0 0 0 1px ${colors.border}50`
      : graphTheme === 'light'
        ? '0 1px 4px rgba(0,0,0,0.06)'
        : 'none',
    transition: 'box-shadow 220ms ease, border-color 220ms ease, transform 220ms ease',
    transform: isHighlighted ? 'scale(1.04)' : 'scale(1)',
    borderRadius: '14px',
    minWidth: '210px',
    padding: '14px',
    cursor: 'pointer',
  };

  const handleStyle = {
    background: colors.border,
    width: 8,
    height: 8,
    border: `2px solid ${colors.border}`,
    boxShadow: `0 0 5px ${colors.glow}`,
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle type="target" position={Position.Left} style={handleStyle} />

      <div style={nodeStyle}>
        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[13px] font-bold leading-tight truncate" style={{ color: colors.text }}>
              {skill.name}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: colors.dot, boxShadow: `0 0 4px ${colors.glow}` }}
              />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: t.subtitleColor }}>
                Lvl {skill.yourLevel}/{skill.requiredLevel}
              </span>
            </div>
          </div>
          {/* Status badge */}
          <span
            className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
            style={{ background: colors.badge, color: colors.badgeText, border: `1px solid ${colors.border}50` }}
          >
            {status}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: t.barTrack }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: colors.barFill,
              boxShadow: `0 0 5px ${colors.glow}`,
              borderRadius: '9999px',
            }}
          />
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.14 }}
            className="absolute -top-28 left-1/2 -translate-x-1/2 w-60 p-3.5 rounded-2xl z-[200] pointer-events-none"
            style={{
              background: t.tooltipBg,
              border: `1px solid ${colors.border}60`,
              boxShadow: `0 0 20px 2px ${colors.glow}, 0 8px 24px rgba(0,0,0,0.5)`,
            }}
          >
            <div
              className="flex justify-between items-center pb-2 mb-2"
              style={{ borderBottom: `1px solid ${t.tooltipDivider}` }}
            >
              <span className="text-[12px] font-bold text-white">{skill.name}</span>
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase"
                style={{ background: colors.badge, color: colors.badgeText }}
              >
                {skill.category || 'Skill'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <p className="text-[9px] uppercase font-bold" style={{ color: t.tooltipMutedText }}>Your Level</p>
                <p className="text-sm font-black" style={{ color: t.tooltipLvlColor }}>{skill.yourLevel}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase font-bold" style={{ color: t.tooltipMutedText }}>Goal</p>
                <p className="text-sm font-black" style={{ color: t.tooltipGoalColor }}>{skill.requiredLevel}</p>
              </div>
            </div>
            <p className="text-[10px] leading-relaxed italic" style={{ color: t.tooltipMutedText }}>
              {getSkillInsight(skill)}
            </p>
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45"
              style={{
                background: t.tooltipArrowBg,
                border: `1px solid ${colors.border}60`,
                borderTop: 'none',
                borderLeft: 'none',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Layout helper
// ─────────────────────────────────────────────────────────────────────────────
const nodeWidth = 260; // Increased to prevent overlaps
const nodeHeight = 100; // Increased
const isHorizontal = true;

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ 
    rankdir: 'LR', 
    ranksep: 140, // Increased spacing between ranks
    nodesep: 80,  // Increased spacing between nodes in same rank
    marginx: 50,
    marginy: 50
  });

  nodes.forEach(n => dagreGraph.setNode(n.id, { width: nodeWidth, height: nodeHeight }));
  edges.forEach(e => dagreGraph.setEdge(e.source, e.target));
  dagre.layout(dagreGraph);

  nodes.forEach(node => {
    const pos = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
    node.position = { x: pos.x - nodeWidth / 2, y: pos.y - nodeHeight / 2 };
  });

  return { nodes, edges };
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'skillgraph_theme';

const SkillGraph = ({ skills, graphData }) => {
  // ── Theme state w/ localStorage persistence ──
  const [graphTheme, setGraphTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch { }
    // Fall back to system preference
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setGraphTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(STORAGE_KEY, next); } catch { }
      return next;
    });
  };

  const t = THEMES[graphTheme];

  // ── ReactFlow state ──
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isReady, setIsReady] = useState(false);

  // Re-build nodes when graphData, skills, OR theme changes
  useEffect(() => {
    if (!graphData || !skills || skills.length === 0) {
      setIsReady(true);
      return;
    }
    
    // If backend already provided nodes and edges (Fix 3), use them but RE-LAYOUT for consistency
    if (graphData.nodes && graphData.edges) {
      try {
        const themedNodes = graphData.nodes.map(n => ({
          ...n,
          type: 'skillNode',
          data: { 
            ...n.data, 
            skill: skills.find(s => s.name === n.data.label) || { name: n.data.label, yourLevel: 1, requiredLevel: 3 },
            status: n.data.status || 'locked',
            graphTheme 
          }
        }));

        // Force a layout pass even on backend nodes
        const { nodes: ln, edges: le } = getLayoutedElements(themedNodes, graphData.edges);
        setNodes([...ln]);
        setEdges([...le]);
        setIsReady(true);
        return;
      } catch (err) {
        console.error("Backend data layout failed:", err);
      }
    }

    // Fallback for legacy format or missing data
    try {
      const skillLookup = Object.fromEntries(skills.map(s => [s.name.toLowerCase(), s]));

      const rawNodes = (Array.isArray(graphData) ? graphData : []).map(node => {
        const skill = skillLookup[node.id?.toLowerCase()] || { name: node.id, requiredLevel: 0, yourLevel: 0 };
        const status = getGapStatus(skill);
        return {
          id: node.id,
          type: 'skillNode',
          data: { skill, status, isHighlighted: false, graphTheme },
          position: { x: 0, y: 0 },
        };
      });

      const rawEdges = (Array.isArray(graphData) ? graphData : []).flatMap(node =>
        (node.dependsOn || []).map(depId => ({
          id: `e-${depId}-${node.id}`,
          source: depId,
          target: node.id,
          animated: false,
          style: { stroke: t.edgeDefault, strokeWidth: 1.5 },
          markerEnd: { type: MarkerType.ArrowClosed, color: t.edgeDefault, width: 14, height: 14 },
        }))
      );

      if (rawNodes.length > 0) {
        const { nodes: ln, edges: le } = getLayoutedElements(rawNodes, rawEdges);
        setNodes(ln);
        setEdges(le);
        setIsReady(true);
      }
    } catch (err) {
      console.error('Layout failed:', err);
    }
  }, [graphData, skills, graphTheme, setNodes, setEdges]);

  // When only theme changes, update node data in-place (no layout re-run)
  useEffect(() => {
    setNodes(nds =>
      nds.map(n => ({ ...n, data: { ...n.data, graphTheme } }))
    );
    setEdges(eds =>
      eds.map(e => ({
        ...e,
        style: { ...e.style, stroke: e.animated ? t.edgeActive : (t.edgeDefault || '#4A4A4A'), strokeWidth: e.animated ? 2.5 : 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: e.animated ? t.edgeActive : (t.edgeDefault || '#4A4A4A'), width: 14, height: 14 },
      }))
    );
  }, [graphTheme]);

  const onNodeClick = useCallback((_, node) => {
    const reachable = new Set();
    const walk = (id, dir) => {
      reachable.add(id);
      edges.forEach(e => {
        if (dir === 'down' && e.source === id && !reachable.has(e.target)) walk(e.target, 'down');
        if (dir === 'up' && e.target === id && !reachable.has(e.source)) walk(e.source, 'up');
      });
    };
    walk(node.id, 'down');
    walk(node.id, 'up');

    setNodes(nds => nds.map(n => ({ ...n, data: { ...n.data, isHighlighted: reachable.has(n.id), graphTheme } })));
    setEdges(eds => eds.map(e => {
      const active = reachable.has(e.source) && reachable.has(e.target);
      return {
        ...e,
        animated: active,
        style: {
          stroke: active ? t.edgeActive : t.edgeDefault,
          strokeWidth: active ? 2.5 : 1.5,
          filter: active ? t.edgeActiveShadow : 'none',
        },
        markerEnd: { type: MarkerType.ArrowClosed, color: active ? t.edgeActive : t.edgeDefault, width: 14, height: 14 },
      };
    }));
  }, [edges, graphTheme, t, setNodes, setEdges]);

  const onPaneClick = useCallback(() => {
    setNodes(nds => nds.map(n => ({ ...n, data: { ...n.data, isHighlighted: false, graphTheme } })));
    setEdges(eds => eds.map(e => ({
      ...e,
      animated: false,
      style: { stroke: t.edgeDefault, strokeWidth: 1.5, filter: 'none' },
      markerEnd: { type: MarkerType.ArrowClosed, color: t.edgeDefault, width: 14, height: 14 },
    })));
  }, [graphTheme, t, setNodes, setEdges]);

  const nodeTypes = useMemo(() => ({ skillNode: SkillNode }), []);

  const legendItems = [
    { status: 'matched', label: 'Mastered' },
    { status: 'weak', label: 'Weak' },
    { status: 'missing', label: 'Missing' },
  ];

  return (
    <motion.div
      className={`rounded-2xl p-6 mb-8 overflow-hidden relative flex flex-col hover-levitate sg-theme-${graphTheme}`}
      animate={{
        background: t.containerBg,
        borderColor: t.containerBorder,
      }}
      transition={{ duration: 0.25 }}
      style={{
        background: t.containerBg,
        border: `1px solid ${t.containerBorder}`,
        boxShadow: t.containerShadow,
        height: '700px',
      }}
    >
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        {/* Title */}
        <div className="flex items-center gap-4">
          <div
            className="p-3 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              boxShadow: graphTheme === 'dark'
                ? '0 0 16px rgba(99,102,241,0.4)'
                : '0 0 12px rgba(99,102,241,0.2)',
            }}
          >
            <Network className="w-5 h-5 text-white icon-spin-float" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight" style={{ color: t.titleColor }}>
              Technical Dependency Graph
            </h3>
            <p className="text-sm font-medium" style={{ color: t.subtitleColor }}>
              Visualizing prerequisite chains for your target role
            </p>
          </div>
        </div>

        {/* Right controls: legend + theme toggle */}
        <div className="flex items-center gap-3">
          {/* Legend */}
          <div
            className="flex items-center gap-2 p-1.5 rounded-2xl"
            style={{ background: t.legendBg, border: `1px solid ${t.legendBorder}` }}
          >
            {legendItems.map(({ status, label }) => {
              const c = getNodeColors(status, graphTheme);
              return (
                <div
                  key={status}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                  style={{ background: t.legendItemBg, border: `1px solid ${t.legendBorder}` }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: c.dot, boxShadow: `0 0 5px ${c.glow}` }}
                  />
                  <span className="text-[11px] font-bold" style={{ color: t.legendItemText }}>{label}</span>
                </div>
              );
            })}
          </div>

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            title={graphTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-[11px] transition-colors duration-200"
            style={{
              background: t.toggleBg,
              border: `1px solid ${t.toggleBorder}`,
              color: t.toggleColor,
              cursor: 'pointer',
              boxShadow: graphTheme === 'light' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {graphTheme === 'dark' ? (
                <motion.span
                  key="sun"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <Sun className="w-3.5 h-3.5" />
                  Light
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <Moon className="w-3.5 h-3.5" />
                  Dark
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Canvas ── */}
      <motion.div
        className="relative flex-1 rounded-2xl overflow-hidden"
        animate={{ background: t.canvasBg, borderColor: t.canvasBorder }}
        transition={{ duration: 0.25 }}
        style={{
          background: t.canvasBg,
          border: `1px solid ${t.canvasBorder}`,
          minHeight: '500px',
        }}
      >
        {!isReady ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div
              className="w-10 h-10 rounded-full border-4 animate-spin"
              style={{ borderColor: t.spinnerTrack, borderTopColor: t.spinnerHead }}
            />
            <p className="text-sm font-medium" style={{ color: t.spinnerText }}>
              Calculating spatial layout…
            </p>
          </div>
        ) : nodes.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <p className="text-sm font-medium" style={{ color: t.spinnerText }}>
              No dependency graph available for this profile.
            </p>
          </div>
        ) : (
          <div className="w-full h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.25 }}
              minZoom={0.1}
              maxZoom={2}
              style={{ background: 'transparent' }}
            >
              <Background color={t.gridColor} gap={24} size={1} style={{ opacity: t.gridOpacity }} />
              <Controls
                style={{
                  background: t.ctrlBg,
                  border: `1px solid ${t.ctrlBorder}`,
                  borderRadius: '12px',
                  boxShadow: t.ctrlShadow,
                }}
              />
            </ReactFlow>

            {/* Hint badge */}
            <div className="absolute top-3 left-3 z-10">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold"
                style={{
                  background: t.badgeBg,
                  border: `1px solid ${t.badgeBorder}`,
                  color: t.badgeText,
                }}
              >
                <MousePointer2 className="w-3 h-3" />
                Click a node to trace dependencies
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* ── Footer ── */}
      <div className="mt-4 flex items-center justify-center gap-2" style={{ color: t.footerColor }}>
        <Layers className="w-4 h-4 opacity-60" />
        <span className="text-xs font-medium">
          Auto-layout optimized for {nodes?.length || 0} technical competencies
        </span>
      </div>
    </motion.div>
  );
};

export default SkillGraph;
