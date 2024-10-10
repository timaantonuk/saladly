import './form-button.scss';

interface FormButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
}

function FormButton({ onClick, text }: FormButtonProps) {
  return (
    <button className="form-button" type="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default FormButton;
