const SkillInput = ({ id, label, value = 1, min = 1, max = 10, onChange }) => {
  const percentage = ((value - 1) / 9) * 100;
  const handleChange = (e) => {
    onChange?.(parseInt(e.target.value, 10));
  };

  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-lg font-medium text-text-primary">
          {label}
        </label>
        <span className="rounded-md bg-primary-100 px-3 py-1 font-bold text-primary-700">
          {value}/{max}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-soft accent-primary transition-all hover:accent-primary-600"
        style={{
          background: `linear-gradient(to right, #9B876E ${percentage}%, #EDE5DC ${percentage}%)`,
        }}
      />
      <div className="mt-1 flex justify-between text-xs text-text-muted">
        <span>Pemula ({min})</span>
        <span>Menengah ({Math.floor((min + max) / 2)})</span>
        <span>Ahli({max})</span>
      </div>
    </div>
  );
};

export default SkillInput;
