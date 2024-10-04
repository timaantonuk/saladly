//
// import InputField from '../InputField/InputField.tsx';
// import FormButton from '../FormButton/FormButton.tsx';
// import './auth-form.scss';
// import { Link } from 'react-router-dom';
//
// function AuthForm({
//   title,
//   fields,
//   buttonText,
//   onSubmit,
//   linkText,
//   linkPath,
//   spanText,
// }) {
//   return (
//     <form className="auth-form">
//       <h2 className="auth-form__title">{title}</h2>
//
//       {fields.map((field, index) => (
//         <InputField
//           key={index}
//           type={field.type}
//           placeholder={field.placeholder}
//           value={field.value}
//           onChange={field.onChange}
//         />
//       ))}
//
//       <FormButton onClick={onSubmit} text={buttonText} />
//
//       <Link to={linkPath} className="auth-form__link">
//         {linkText} <span className="auth-form__span">{spanText}</span>
//       </Link>
//     </form>
//   );
// }
//
// export default AuthForm;

import InputField from '../InputField/InputField.tsx';
import FormButton from '../FormButton/FormButton.tsx';
import './auth-form.scss';
import { Link } from 'react-router-dom';

function AuthForm({
  title,
  fields,
  buttonText,
  onSubmit,
  linkText,
  linkPath,
  spanText,
}) {
  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // предотвращает перезагрузку страницы

    // Собираем данные полей по их ключевым именам
    const formData = fields.reduce((acc, field) => {
      if (field.type === 'email') acc.email = field.value;
      if (field.type === 'password') acc.password = field.value;
      if (field.type === 'text') acc.name = field.value; // полагаем, что это name
      return acc;
    }, {});

    onSubmit(formData); // передаем данные в родительский компонент
  };

  return (
    <form className="auth-form">
      <h2 className="auth-form__title">{title}</h2>

      {fields.map((field, index) => (
        <InputField
          key={index}
          type={field.type}
          placeholder={field.placeholder}
          value={field.value}
          onChange={field.onChange}
        />
      ))}

      <FormButton text={buttonText} onClick={handleSubmit} />

      <Link to={linkPath} className="auth-form__link">
        {linkText} <span className="auth-form__span">{spanText}</span>
      </Link>
    </form>
  );
}

export default AuthForm;
