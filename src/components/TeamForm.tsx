interface TeamFormProps {
  form: ('W' | 'D' | 'L')[];
  size?: 'sm' | 'md' | 'lg';
}

const TeamForm: React.FC<TeamFormProps> = ({ form, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-8 h-8 text-base'
  };

  const getResultColor = (result: 'W' | 'D' | 'L') => {
    switch (result) {
      case 'W':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'D':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'L':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/50';
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      {form.map((result, index) => (
        <div
          key={index}
          className={`
            ${sizeClasses[size]}
            rounded-md border flex items-center justify-center font-bold
            ${getResultColor(result)}
          `}
          title={result === 'W' ? 'Победа' : result === 'D' ? 'Ничья' : 'Поражение'}
        >
          {result}
        </div>
      ))}
    </div>
  );
};

export default TeamForm;
