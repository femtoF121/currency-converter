interface StatsCardProps {
    label: string;
    value: number;
    icon: React.ReactNode;
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
    return (
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {label}
                </span>
                {icon}
            </div>
            <p className="text-2xl font-black text-slate-700">{value.toFixed(4)}</p>
        </div>
    );
}
