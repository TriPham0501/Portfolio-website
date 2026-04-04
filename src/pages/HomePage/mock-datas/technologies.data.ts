export type LexiconTech = {
  label: string;
  short: string;
  color: string;
  img: string;
};

export type LexiconSection = {
  folder: string;
  description: string;
  type?: 'icons' | 'tags';
  techs: LexiconTech[];
};

export const lexiconSections: LexiconSection[] = [
  {
    folder: 'Software',
    description: 'Server-side languages and frameworks powering robust APIs and services.',
    type: 'icons',
    techs: [
      { label: 'Proteus', short: 'Pr', color: '#ea580c', img: '/assets/icons/skills-techs/proteus.png' },
      { label: 'LTSpice', short: 'Lt', color: '#1d4ed8', img: '/assets/icons/skills-techs/ltspice.png' },
      { label: 'PSIM', short: 'Nd', color: '#15803d', img: '/assets/icons/skills-techs/psim.png'},
      { label: 'MATLAB', short: 'Ne', color: '#be123c', img: '/assets/icons/skills-techs/matlab.png' },
      { label: 'dSPACE', short: 'Pg', color: '#334155', img: '/assets/icons/skills-techs/dspace.png' },
      { label: 'CubeMX', short: 'Cm', color: '#334155', img: '/assets/icons/skills-techs/cubemx.png' },
      { label: 'e2studio', short: 'e2', color: '#ea580c', img: '' },
      { label: 'CCS', short: 'ccs', color: '#15803d', img: '' },
      { label: 'MPLAB-X', short: 'Mx', color: '#15803d', img: '/assets/icons/skills-techs/mplabx.png' },
      { label: 'Visual Studio', short: 'Vs', color: '#15803d', img: '/assets/icons/skills-techs/visualstudio.png' },
    ],
  },
  {
    folder: 'Programming',
    description: 'Client-side technologies for building responsive and interactive UIs.',
    type: 'icons',
    techs: [
      { label: 'Python', short: 'Py', color: '#0284c7', img: '/assets/icons/skills-techs/python.png' },
      { label: 'C++', short: 'Cpp', color: '#1d4ed8', img: '/assets/icons/skills-techs/cpp.png' },
      { label: 'C', short: 'C', color: '#0891b2', img: '/assets/icons/skills-techs/c.png' },
      { label: 'MATLAB', short: 'Mx', color: '#111827', img: '/assets/icons/skills-techs/matlab.png' },
    ],
  },
  {
    folder: 'Operating Systems',
    description: 'DevOps, version control, and data management essentials.',
    type: 'icons',
    techs: [
      { label: 'Ubuntu', short: 'Ub', color: '#2563eb', img: '/assets/icons/skills-techs/ubuntu.png' },
      { label: 'Windows', short: 'Wi', color: '#b91c1c', img: '/assets/icons/skills-techs/windows8.png' },
      
    ],
  },
  {
    folder: 'Electrical Hardware',
    description: 'Client-side technologies for building responsive and interactive UIs.',
    type: 'tags',
    techs: [
      { label: 'PCB Layout', short: 'Pl', color: '#0284c7', img: '/assets/icons/skills-techs/pcb_layout.png' },
      { label: 'Component Selection', short: 'Cs', color: '#1d4ed8', img: '/assets/icons/skills-techs/component_selection.png' },
      { label: 'Soldering/Handcrafting Circuit Prototypes', short: 'Tw', color: '#0891b2', img: '/assets/icons/skills-techs/tailwindcss.png' },
      { label: 'Logic Analyzer', short: 'Nx', color: '#111827', img: '/assets/icons/skills-techs/nextjs.png' },
      { label: 'Multimeter', short: 'Rx', color: '#6d28d9', img: '/assets/icons/skills-techs/redux.png' },
      { label: 'Oscilloscope Tool', short: 'Os', color: '#6d28d9', img: '/assets/icons/skills-techs/oscilloscope.png' },
      { label: 'Cabinet Sysyem Implementation', short: 'Cs', color: '#6d28d9', img: '/assets/icons/skills-techs/cabinet.png' },
    ],
  },
  {
    folder: 'MCU',
    description: 'DevOps, version control, and data management essentials.',
    type: 'tags',
    techs: [
      { label: 'Arduino', short: 'Do', color: '#2563eb', img: '/assets/icons/skills-techs/docker.png' },
      { label: 'C2000 (TI)', short: 'Gi', color: '#b91c1c', img: '/assets/icons/skills-techs/git.png' },
      { label: 'PIC (Microchip)', short: 'Ag', color: '#7c3aed', img: '/assets/icons/skills-techs/arcgis.png' },
      { label: 'RA (Renesas)', short: 'Mo', color: '#166534', img: '/assets/icons/skills-techs/mongodb2.png' },
      { label: 'STM32 (STM)', short: 'Rd', color: '#dc2626', img: '/assets/icons/skills-techs/jenkins.png' },
    ],
  },
  {
    folder: 'SBC',
    description: 'Cloud platforms and infrastructure for scalable deployments.',
    type: 'tags',
    techs: [
      { label: 'Rasperi Pi', short: 'Aw', color: '#d97706', img: '/assets/icons/skills-techs/aws.png' },
      { label: 'BeageBone Black', short: 'Ng', color: '#15803d', img: '/assets/icons/skills-techs/nginx.png' },
    ],
  },
  {
    folder: 'Peripheral Protocols',
    description: 'Server-side languages and frameworks powering robust APIs and services.',
    type: 'tags',
    techs: [
      { label: 'SimplyIO', short: 'Ja', color: '#ea580c', img: '/assets/icons/skills-techs/java.png' },
      { label: 'UART', short: 'Py', color: '#1d4ed8', img: '/assets/icons/skills-techs/python.png' },
      { label: 'I2C', short: 'Nd', color: '#15803d', img: '/assets/icons/skills-techs/nodejs.png'},
      { label: 'SPI', short: 'Ne', color: '#be123c', img: '/assets/icons/skills-techs/nestjs.png' },
      { label: 'SSI', short: 'Pg', color: '#334155', img: '/assets/icons/skills-techs/postgres.png' },
      { label: 'USB', short: 'Pg', color: '#334155', img: '/assets/icons/skills-techs/postgres.png' },
      { label: 'RS232', short: 'Pg', color: '#334155', img: '/assets/icons/skills-techs/postgres.png' },
    ],
  },
  {
    folder: 'Industrial Networks',
    description: 'Client-side technologies for building responsive and interactive UIs.',
    type: 'tags',
    techs: [
      { label: 'RTEX', short: 'Re', color: '#0284c7', img: '/assets/icons/skills-techs/reactjs.png' },
      { label: 'CAN', short: 'Ts', color: '#1d4ed8', img: '/assets/icons/skills-techs/typescript.png' },
      { label: 'RS422', short: 'Tw', color: '#0891b2', img: '/assets/icons/skills-techs/tailwindcss.png' },
      { label: 'RS485', short: 'Nx', color: '#111827', img: '/assets/icons/skills-techs/nextjs.png' },
    ],
  },
  {
    folder: 'RTOS',
    description: 'Cloud platforms and infrastructure for scalable deployments.',
    type: 'tags',
    techs: [
      { label: 'FreeRTOS', short: 'Aw', color: '#d97706', img: '/assets/icons/skills-techs/aws.png' },
      { label: 'ThreadX', short: 'Ng', color: '#15803d', img: '/assets/icons/skills-techs/nginx.png' },
    ],
  },
  {
    folder: 'Control Theories',
    description: 'Server-side languages and frameworks powering robust APIs and services.',
    type: 'tags',
    techs: [
      { label: 'Classical Control (Pole Placement, Bode Method)', short: 'Ja', color: '#ea580c', img: '/assets/icons/skills-techs/java.png' },
      { label: 'Modern Control (State-Space)', short: 'Py', color: '#1d4ed8', img: '/assets/icons/skills-techs/python.png' },
      { label: 'Path Planning', short: 'Nd', color: '#15803d', img: '/assets/icons/skills-techs/nodejs.png'},
    ],
  },
  {
    folder: 'Robotics',
    description: 'Client-side technologies for building responsive and interactive UIs.',
    type: 'tags',
    techs: [
      { label: 'Arm Robot (Classic Method, Quaternium Method)', short: 'Re', color: '#0284c7', img: '/assets/icons/skills-techs/reactjs.png' },
      { label: 'Mobile Robot', short: 'Ts', color: '#1d4ed8', img: '/assets/icons/skills-techs/typescript.png' },
    ],
  },
  {
    folder: 'Testing',
    description: 'Cloud platforms and infrastructure for scalable deployments.',
    type: 'tags',
    techs: [
      { label: 'MiL', short: 'Aw', color: '#d97706', img: '/assets/icons/skills-techs/aws.png' },
      { label: 'PiL', short: 'Ng', color: '#15803d', img: '/assets/icons/skills-techs/nginx.png' },
      { label: 'HiL', short: 'Li', color: '#111827', img: '/assets/icons/skills-techs/linux.png' },
    ],
  },
  {
    folder: 'Process Frameworks',
    description: 'Cloud platforms and infrastructure for scalable deployments.',
    type: 'tags',
    techs: [
      { label: 'Waterfall', short: 'Aw', color: '#d97706', img: '/assets/icons/skills-techs/aws.png' },
      { label: 'Agile-Scrum', short: 'Ng', color: '#15803d', img: '/assets/icons/skills-techs/nginx.png' },
      { label: 'V-Model', short: 'Li', color: '#111827', img: '/assets/icons/skills-techs/linux.png' },
      { label: 'Hybrid Process', short: 'Ku', color: '#2563eb', img: '/assets/icons/skills-techs/kubernetes.png' },
    ],
  },
  {
    folder: 'Soft skills',
    description: 'Cloud platforms and infrastructure for scalable deployments.',
    type: 'tags',
    techs: [
      { label: 'Git', short: 'Aw', color: '#d97706', img: '/assets/icons/skills-techs/aws.png' },
      { label: 'SVN', short: 'Ng', color: '#15803d', img: '/assets/icons/skills-techs/nginx.png' },
      { label: 'Office Computing', short: 'Li', color: '#111827', img: '/assets/icons/skills-techs/linux.png' },
      { label: 'LaTeX', short: 'Ku', color: '#2563eb', img: '/assets/icons/skills-techs/kubernetes.png' },
      { label: 'Mathcad', short: 'Rd', color: '#dc2626', img: '/assets/icons/skills-techs/redis.png' },
    ],
  },
];
