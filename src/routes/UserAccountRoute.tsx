import Header from '../components/layout/Header/Header.tsx';
import Footer from '../components/layout/Footer/Footer.tsx';
import UserAccount from '../components/UserAccount/UserAccount.tsx';

function UserAccountRoute() {
  return (
    <>
      <Header />
      <UserAccount />
      <Footer />
    </>
  );
}

export default UserAccountRoute;
