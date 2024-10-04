import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { UserState } from '../store/slices/userSlice.ts';

export function useAuth() {
  const { email, token, id, name, fullName } = useSelector(
    (state: RootState) => state.user as UserState,
  );

  return {
    isAuth: !!email,
    name,
    email,
    token,
    id,
    fullName,
  };
}
