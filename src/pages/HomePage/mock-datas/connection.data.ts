export type SocialItem = {
  platform: 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'twitter';
  href: string;
  className?: string;
};

export const socialLinks: SocialItem[] = [
  { platform: 'facebook', href: 'https://www.facebook.com/tripham1705' },
  { platform: 'instagram', href: '', className: 'text-[#E1306C]' },
  { platform: 'youtube', href: '' },
  { platform: 'tiktok', href: '' },
  { platform: 'twitter', href: '' },
];

export const contactInfo = {
  email: 'support@radrab.com',
  phone: '+84932723283',
  address: '26 De Tham, District 10, HCMC, Vietnam',
};

export type NodeSize = 'lg' | 'md' | 'sm';

export type NetworkNode = {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  color: string;
  /** Position as percentage of container (0–100) */
  x: number;
  y: number;
  size: NodeSize;
};

export type NetworkEdge = [string, string];

export const networkNodes: NetworkNode[] = [
  // Center — me
  { id: 'me',  name: 'Mạnh Huy',    role: 'Fullstack Dev',  avatarUrl: '/assets/AvaMHuy.jpg', color: '#dc2626', x: 50, y: 50, size: 'lg' },
  // Large nodes
  { id: 'n1',  name: 'Vũ Hoàng',    role: 'CEO',            avatarUrl: '/assets/images/ava1.jpg', color: '#2563eb', x: 70, y: 15,  size: 'lg' },
  { id: 'n2',  name: 'Anh Minh',    role: 'Director',       avatarUrl: '/assets/images/ava1.jpg', color: '#f97316', x: 15,  y: 20, size: 'lg' },
  { id: 'n3',  name: 'Thanh Tùng',  role: 'Backend Dev',    avatarUrl: '/assets/images/ava1.jpg', color: '#7c3aed', x: 25, y: 80, size: 'lg' },
  { id: 'n4',  name: 'Minh Quân',   role: 'Frontend Dev',   avatarUrl: '/assets/images/ava1.jpg', color: '#15803d', x: 85, y: 75, size: 'lg' },
  // Medium nodes
  { id: 'n5',  name: 'Hải Đăng',    role: 'DevOps',         color: '#ec4899', x: 30, y: 10, size: 'md' },
  { id: 'n6',  name: 'Thảo Vy',     role: 'PM',             color: '#38bdf8', x: 10, y: 45, size: 'md' },
  { id: 'n7',  name: 'Quốc Bảo',    role: 'Designer',       color: '#ec4899', x: 80, y: 10, size: 'md' },
  { id: 'n8',  name: 'Đức Anh',     role: 'QA',             color: '#eab308', x: 80, y: 35, size: 'md' },
  { id: 'n9',  name: 'Hoàng Long',  role: 'Data Analyst',   color: '#f97316', x: 65, y: 90, size: 'md' },
  // Small nodes
  { id: 'n10', name: 'Tuấn Kiệt',   role: 'Intern',        color: '#78716c', x: 40, y: 5,  size: 'sm' },
  { id: 'n11', name: 'Phúc Khang',   role: 'Mobile Dev',    color: '#dc2626', x: 95, y: 20, size: 'sm' },
  { id: 'n12', name: 'Bảo Ngọc',     role: 'Tester',        color: '#7c3aed', x: 95, y: 50, size: 'sm' },
  { id: 'n13', name: 'Khánh Linh',   role: 'Support',       color: '#16a34a', x: 5,  y: 65, size: 'sm' },
  { id: 'n14', name: 'Trí Dũng',     role: 'Intern',        color: '#eab308', x: 50, y: 97, size: 'sm' },
  { id: 'n15', name: 'Minh Châu',    role: 'DevOps',        color: '#78716c', x: 90, y: 90, size: 'sm' },
];

/** Edges define connections between nodes by id */
export const networkEdges: NetworkEdge[] = [
  // Center connections
  ['me', 'n1'],
  ['me', 'n2'],
  ['me', 'n3'],
  ['me', 'n4'],
  ['me', 'n6'],
  ['me', 'n9'],
  // Branch connections
  ['n1', 'n7'],
  ['n1', 'n10'],
  ['n2', 'n5'],
  ['n7', 'n11'],
  ['n4', 'n8'],
  ['n4', 'n9'],
  ['n4', 'n12'],
  ['n6', 'n13'],
  ['n3', 'n6'],
  ['n9', 'n14'],
  ['n9', 'n15'],
];
