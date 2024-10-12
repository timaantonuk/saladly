import InputField from '../form/InputField/InputField.tsx';
import FormButton from '../form/FormButton/FormButton.tsx';
import './auth-form.scss';
import { Link } from 'react-router-dom';
import { IFormField } from '../SignUpForm/SignUpForm.tsx';
import { FormState } from 'react-hook-form';

interface IAuthProps {
  title: string;
  fields: IFormField[];
  buttonText: string;
  onSubmit: () => void;
  linkPath: string;
  linkText: string;
  spanText: string;
  formState: FormState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>;
}

function AuthForm({
  title,
  fields,
  buttonText,
  onSubmit,
  linkText,
  linkPath,
  spanText,
  formState,
}: IAuthProps) {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit();
  };
  const errors = formState.errors;

  return (
    <form className="auth-form">
      <h2 className="auth-form__title">{title}</h2>

      {fields.map((formFieldProps: IFormField, index: number) => (
        <>
          <InputField
            error={errors?.[formFieldProps?.name as never]}
            key={index}
            {...formFieldProps}
          />
        </>
      ))}

      <FormButton text={buttonText} onClick={handleSubmit} />

      <Link to={linkPath} className="auth-form__link">
        {linkText} <span className="auth-form__span">{spanText}</span>
      </Link>
    </form>
  );
}

export default AuthForm;
