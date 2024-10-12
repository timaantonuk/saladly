import './form-button.scss';
import { HTMLProps } from 'react';

interface FormButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
}

function FormButton({
  onClick,
  text,
  type = 'button',
  ...props
}: FormButtonProps & HTMLProps<HTMLButtonElement>) {
  return (
    <button
      className="form-button"
      type={type as 'button' | 'submit' | 'reset' | undefined}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
}

export default FormButton;
