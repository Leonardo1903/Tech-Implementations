import { useNavigate } from "react-router-dom";
import TwoFAVerification from "../components/TwoFAVerification";

function Verify2fa() {
  const navigate = useNavigate();

  const handleVerification = async (data) => {
    if (data) {
      navigate("/");
    }
  };

  const handle2FAReset = async (data) => {
    if (data) {
      navigate("/setup-2fa");
    }
  };
  return (
    <TwoFAVerification
      onVerifySuccess={handleVerification}
      onResetSuccess={handle2FAReset}
    />
  );
}

export default Verify2fa;
