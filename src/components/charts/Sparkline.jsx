import { Area, AreaChart, ResponsiveContainer } from 'recharts';

export default function Sparkline({ data, color = '#34d399' }) {
  return (
    <div className="h-14 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area dataKey="valor" type="monotone" stroke={color} fill={color} fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
