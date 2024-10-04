import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth.ts';
import { removeUser } from '../../store/slices/userSlice.ts';
import { useNavigate } from 'react-router-dom';

function UserAccount() {
  const dispatch = useDispatch();
  const { name, email, fullName } = useAuth();
  const navigate = useNavigate();

  function onLogoutClick() {
    dispatch(removeUser());
    navigate('/');
  }

  return (
    <div>
      <p>
        Hello {name} fullname: {fullName} sir!
      </p>
      <button type="button" onClick={onLogoutClick}>
        Logout from {email}{' '}
      </button>
    </div>
  );
}

export default UserAccount;
