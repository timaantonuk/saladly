import InputField from '../form/InputField/InputField.tsx';
import FormButton from '../form/FormButton/FormButton.tsx';
import './auth-form.scss';
import { Link } from 'react-router-dom';
import { IFormField } from '../SignUpForm/SignUpForm.tsx';

interface IAuthProps {
  title: string;
  fields: IFormField[];
  buttonText: string;
  onSubmit: (formData: object) => void;
  linkPath: string;
  linkText: string;
  spanText: string;
}

function AuthForm({
  title,
  fields,
  buttonText,
  onSubmit,
  linkText,
  linkPath,
  spanText,
}: IAuthProps) {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = fields.reduce(
      (
        acc: { email: string; password: string; name: string },
        field: IFormField,
      ) => {
        if (field.type === 'email') acc.email = field.value;
        if (field.type === 'password') acc.password = field.value;
        if (field.type === 'text') acc.name = field.value;
        return acc;
      },
      { email: '', password: '', name: '' },
    );

    onSubmit(formData);
  };

  return (
    <form className="auth-form">
      <h2 className="auth-form__title">{title}</h2>

      {fields.map((field: IFormField, index) => (
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
