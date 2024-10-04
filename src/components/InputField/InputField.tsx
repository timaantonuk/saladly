import './input-field.scss';

function InputField({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)} // Передаем значение напрямую
    />
  );
}

export default InputField;
