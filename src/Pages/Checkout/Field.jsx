const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
  readonly,
}) => {
  return (
    <div className=" w-full">
      <label htmlFor={id} className="text-xl flex ">
        {label}
      </label>
      <input
        className="FormRowInput  w-full input"
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
    </div>
  );
};

export default Field;
