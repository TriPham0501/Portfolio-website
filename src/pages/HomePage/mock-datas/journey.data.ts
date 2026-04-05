export type TimelineEvent = {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
};

export type TimelineYear = {
  year: string;
  events: TimelineEvent[];
};

export const timelineData: TimelineYear[] = [
  { 
    year: '2026',
    events: [
      {
        title: 'FPT Automotive Corporation',
        description: 'Senior Embedded Engineer',
        bgColor: 'bg-pink-200',
        textColor: 'text-gray-800'
      },
      {
        title: 'HCM City University of Technology and Engineering (HCMUTE)',
        description: 'Pedagogical Certificate',
        bgColor: 'bg-pink-200',
        textColor: 'text-gray-800'
      },
      {
        title: 'Certified in Functional Safety',
        description: 'ISO 26262 Sponsored by the Company',
        bgColor: 'bg-pink-200',
        textColor: 'text-gray-800'
      }
    ]
  },
  { 
    year: '2025',
    events: [
      {
        title: 'FPT Automotive Corporation',
        description: 'Junior Embedded Engineer',
        bgColor: 'bg-pink-200',
        textColor: 'text-gray-800'
      }
    ]
  },
  { 
    year: '2024',
    events: [
      {
        title: 'Ban Vien Corporation',
        description: 'Junior Embedded Software Engineer\nStart of Industry Path',
        bgColor: 'bg-yellow-200',
        textColor: 'text-gray-800'
      }
    ]
  },
  { 
    year: '2023',
    events: [
      {
        title: 'HCM City University of Technology and Engineering (HCMUTE)',
        description: 'Bachelor of Engineering in Mechatronics\nHonors Program (Talented Program)',
        bgColor: 'bg-orange-200',
        textColor: 'text-gray-800'
      },
      {
        title: 'Published a National-Level Research Paper',
        description: 'Tutored Math, Physics and Programming\nFreelancer in technical projects',
        bgColor: 'bg-red-200',
        textColor: 'text-gray-800'
      },
      {
        title: 'TOEIC Achievement',
        description: '775 (L/R), 245 (S/W)',
        bgColor: 'bg-amber-200',
        textColor: 'text-gray-800'
      }
    ]
  },
  { 
    year: '2019',
    events: [
      {
        title: 'Gia Dinh High School',
        description: 'Graduated - High School Diploma\nPhysics Specialized Class',
        bgColor: 'bg-green-200',
        textColor: 'text-gray-800'
      },
      {
        title: 'Awarded City-Level Physics Competition',
        description: 'First Prize',
        bgColor: 'bg-emerald-200',
        textColor: 'text-gray-800'
      }
    ]
  },
  { 
    year: '2016',
    events: []
  },
  { 
    year: '2001',
    events: []
  }
];

