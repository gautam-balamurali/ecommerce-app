const InputField = ({
  onChangeFunction,
  label,
  label_class,
  value,
  className,
  style,
  disabled,
  placeholder,
  name,
  type,
  checked,
  span,
  span_class,
  min,
  max,
  required,
}) => {
  const handleChange = (event) => {
    if (typeof onChangeFunction === "function") {
      onChangeFunction(event);
    }
  };

  return (
    <>
      <label className={label_class} htmlFor={`${label}-txt-inpt`}>
        <span className={span_class}>{span}</span>
        {label}
      </label>
      <input
        id={`${label}-txt-inpt`}
        className={className}
        style={style}
        onChange={handleChange}
        disabled={disabled}
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        checked={checked}
        min={min}
        max={max}
        required={required}
      />
    </>
  );
};

export default InputField;
