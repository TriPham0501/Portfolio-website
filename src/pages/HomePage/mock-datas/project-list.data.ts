export type ProjectItem = {
  id: string;
  name: string;
  organization: string;
  imageUrl: string;
  technologies: string[];
  description: string;
  projectLink?: string;
  highlights?: string[];
};

export const projectListData: ProjectItem[] = [
  {
    id: 'proj-01',
    name: 'GIS Water Network Management System',
    organization: 'Water Supply Company – Ho Chi Minh City',
    imageUrl: '/assets/images/projects/gis-water.jpg',
    technologies: ['ArcGIS', 'React', 'NestJS', 'PostgreSQL', 'TypeORM'],
    description:
      'A full-stack GIS platform for managing urban water-supply pipe networks. Enables real-time mapping of pipelines, valves, and meters; tracks maintenance schedules; and generates incident reports for field engineers.',
    projectLink: 'https://github.com/obiradust/gis-water-network',
    highlights: [
      'Interactive map with real-time pipeline status overlay',
      'Role-based access control for engineers and administrators',
      'Automated incident report generation with PDF export',
      'Integrated with SCADA data feeds via REST polling',
    ],
  },
  {
    id: 'proj-02',
    name: 'Automotive AUTOSAR Stack – ADAS Module',
    organization: 'FPT Automotive Corporation',
    imageUrl: '/assets/images/projects/adas.jpg',
    technologies: ['C', 'AUTOSAR', 'CANoe', 'DOORS', 'ISO 26262'],
    description:
      'Developed and integrated AUTOSAR-compliant software components for an Advanced Driver Assistance System (ADAS). Implemented the RTE, COM, and diagnostics layers, and conducted fault injection tests to verify functional safety at ASIL-B level.',
    projectLink: 'https://github.com/obiradust/autosar-adas',
    highlights: [
      'Compliant with AUTOSAR Classic Platform 4.4',
      'ASIL-B functional safety verification via fault injection',
      'CAN bus communication validated with CANoe simulation',
      'Requirements traced end-to-end in IBM DOORS',
    ],
  },
  {
    id: 'proj-03',
    name: 'Real-time IoT Dashboard for Smart Factory',
    organization: 'HCMUTE – Research Lab',
    imageUrl: '/assets/images/projects/iot-dashboard.jpg',
    technologies: ['Node.js', 'MQTT', 'InfluxDB', 'Grafana', 'Docker'],
    description:
      'Built an end-to-end IoT telemetry pipeline ingesting sensor data from 200+ edge devices via MQTT broker. Time-series data is stored in InfluxDB and visualised through custom Grafana dashboards with alert triggers for anomaly detection.',
    projectLink: 'https://github.com/obiradust/iot-smart-factory',
    highlights: [
      '200+ edge devices connected via MQTT with QoS level 1',
      'Sub-second latency from sensor publish to dashboard update',
      'Anomaly detection alerts via Grafana webhook notifications',
      'Fully containerised with Docker Compose for one-command deployment',
    ],
  },
  {
    id: 'proj-04',
    name: 'Personal Portfolio Website',
    organization: 'Self-initiated',
    imageUrl: '/assets/images/projects/portfolio.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'NestJS', 'Docker'],
    description:
      'Designed and built this portfolio site from scratch with a modern dark aesthetic. Features interactive sections including a technology lexicon, relationship network graph, career timeline, and project activity heatmap.',
    projectLink: 'https://github.com/obiradust/portfolio',
    highlights: [
      'GitHub-style project activity heatmap with animated tooltips',
      'SVG-based relationship network graph with physics-like layout',
      'Scroll-triggered career timeline with intersection observers',
      'Responsive layout across mobile, tablet, and desktop breakpoints',
    ],
  },
  {
    id: 'proj-05',
    name: 'Functional Safety Compliance Tool',
    organization: 'FPT Automotive Corporation',
    imageUrl: '/assets/images/projects/safety-tool.jpg',
    technologies: ['Python', 'DOORS', 'FMEA', 'ISO 26262', 'Excel VBA'],
    description:
      'Automated the ISO 26262 hazard analysis and risk assessment (HARA) workflow. The tool parses requirement databases, generates safety goals, and produces audit-ready reports, reducing manual effort by ~60%.',
    projectLink: 'https://github.com/obiradust/functional-safety-tool',
    highlights: [
      'Parses DOORS XML exports and maps requirements to safety goals',
      'Auto-generates HARA tables and FMEA spreadsheets',
      '~60% reduction in manual documentation time',
      'Audit-ready PDF reports aligned with ISO 26262 Part 3',
    ],
  },
  {
    id: 'proj-06',
    name: 'Spatial Data Catalog & REST API',
    organization: 'Department of Natural Resources – Binh Duong Province',
    imageUrl: '/assets/images/projects/spatial-catalog.jpg',
    technologies: ['NestJS', 'PostGIS', 'GeoServer', 'OpenLayers', 'TypeScript'],
    description:
      'Delivered a spatial data catalog exposing WMS/WFS endpoints for provincial cadastral and land-use layers. Includes role-based access control, dataset versioning, and a lightweight viewer built with OpenLayers.',
    projectLink: 'https://github.com/obiradust/spatial-data-catalog',
    highlights: [
      'OGC-compliant WMS/WFS endpoints served via GeoServer',
      'PostGIS spatial queries with sub-100ms response on 10M+ features',
      'Dataset versioning with diff tracking and rollback support',
      'OpenLayers viewer with layer toggle, opacity sliders, and attribute table',
    ],
  },
];
