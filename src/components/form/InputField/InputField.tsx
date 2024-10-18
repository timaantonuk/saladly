import React from 'react';
import './input-field.scss';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error:
    | {
        message: string;
        type: string;
      }
    | undefined;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ type, placeholder, error, ...rest }, ref) => {
    return (
      <div className="input__wrapper">
        <input
          ref={ref}
          type={type}
          className={'input' + (error ? ' input--error' : ' ')}
          placeholder={placeholder}
          {...rest}
        />
        {error && (
          <span className={'input-field__error-text'}>{error.message}</span>
        )}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
