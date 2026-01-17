
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'Narrative Pacing', A: 120, fullMark: 150 },
  { subject: 'Color Grading', A: 98, fullMark: 150 },
  { subject: 'Sound Design', A: 86, fullMark: 150 },
  { subject: 'Visual Effects', A: 99, fullMark: 150 },
  { subject: 'Motion Graphics', A: 85, fullMark: 150 },
  { subject: 'Organization', A: 110, fullMark: 150 },
];

const SkillsChart: React.FC = () => {
  return (
    <div className="w-full h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#4c1d95" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#a78bfa', fontSize: 10 }} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#a855f7"
            fill="#a855f7"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsChart;
