import './form-button.scss';

function FormButton({ onClick, text }) {
  return (
    <button className="form-button" type="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default FormButton;
