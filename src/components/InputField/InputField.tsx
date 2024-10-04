import './input-field.scss';

interface InputFieldProps {
  type: 'text' | 'email' | 'password'; // Узкий тип для полей ввода
  placeholder: string;
  value: string;
  onChange: (value: string) => void; // Функция onChange принимает строковое значение
}

function InputField({ type, placeholder, value, onChange }: InputFieldProps) {
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
