import Navbar from '../../../components/public/Navbar/Navbar.jsx';
import VerifyAccountForm from '../../../components/public/VerifyAccountForm/VerifyAccountForm.jsx';
import Footer from '../../../components/public/Foteer/Foteer.jsx';
import './VerifyAccount.css';

function VerifyAccount() {
  return (
    <div className="verify-page-wrapper">
      <Navbar />

      <main className="verify-main-content">
        <VerifyAccountForm />
      </main>

      <Footer />
    </div>
  );
}

export default VerifyAccount;
