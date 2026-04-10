import * as React from 'react';
import {
  networkNodes,
  networkEdges,
  NetworkNode,
  NodeSize,
} from '../mock-datas/connection.data';

/** Pixel sizes for each node tier */
const sizeMap: Record<NodeSize, number> = { lg: 110, md: 65, sm: 38 };
const borderMap: Record<NodeSize, number> = { lg: 4, md: 3, sm: 2 };

/** Person silhouette rendered as inline SVG */
const PersonIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => {
  const p = size * 0.18; // padding
  return (
    <svg viewBox="0 0 100 100" width={size - p * 2} height={size - p * 2}>
      <circle cx="50" cy="32" r="18" fill={color} />
      <path d="M18 88 C18 62, 82 62, 82 88" fill={color} />
    </svg>
  );
};

/** A single network node: colored circle + avatar or silhouette */
const GraphNode: React.FC<{ node: NetworkNode }> = ({ node }) => {
  const px = sizeMap[node.size];
  const border = borderMap[node.size];
  const isCenter = node.id === 'me';
  const labelSize = node.size === 'lg' ? 'text-xs' : node.size === 'md' ? 'text-[10px]' : 'text-[8px]';

  return (
    <div
      className="absolute z-10 flex flex-col items-center transition-transform duration-300 hover:scale-110"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: 'translate(-50%, -50%)',
        width: px,
      }}
    >
      <div
        className="flex items-center justify-center rounded-full overflow-hidden"
        style={{
          width: px,
          height: px,
          border: `${border}px solid ${node.color}`,
          background: isCenter ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.1)',
        }}
      >
        {node.avatarUrl ? (
          <img src={`${process.env.PUBLIC_URL}${node.avatarUrl}`} alt={node.name} className="h-full w-full object-cover" />
        ) : (
          <PersonIcon color={node.color} size={px} />
        )}
      </div>
      {node.size !== 'sm' && (
        <span className={`mt-1 whitespace-nowrap font-semibold ${labelSize} ${isCenter ? 'text-webtheme' : 'text-white'}`}>
          {node.name}
        </span>
      )}
      {node.size === 'lg' && !isCenter && (
        <span className="whitespace-nowrap text-[9px] text-gray-400">{node.role}</span>
      )}
    </div>
  );
};

const ConnectionGraph: React.FC = () => {
  // Build a lookup for quick position resolution
  const nodeMap = React.useMemo(() => {
    const map: Record<string, NetworkNode> = {};
    for (const n of networkNodes) map[n.id] = n;
    return map;
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[800px]" style={{ aspectRatio: '4 / 3' }}>
      {/* Edge lines */}
      <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }}>
        {networkEdges.map(([fromId, toId]) => {
          const a = nodeMap[fromId];
          const b = nodeMap[toId];
          if (!a || !b) return null;
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="#555"
              strokeWidth={1.5}
              strokeOpacity={0.45}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {networkNodes.map((node) => (
        <GraphNode key={node.id} node={node} />
      ))}
    </div>
  );
};

const ConnectionSection: React.FC = () => {
  return (
    <div
      id="contact"
      className="overflow-hidden bg-cover bg-center bg-no-repeat py-20"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/dark-theme.jpg)` }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-lg text-gray-400">MY NETWORK</p>
        <h1 className="mb-12 text-center text-4xl font-bold text-golden">Connections</h1>

        <ConnectionGraph />
      </div>
    </div>
  );
};

export default ConnectionSection;
