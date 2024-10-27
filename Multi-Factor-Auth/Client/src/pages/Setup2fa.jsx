import { useNavigate } from "react-router-dom";
import TwoFASetup from "../components/TwoFASetup";

function Setup2fa() {
  const navigate = useNavigate();

  const handleSetupComplete = () => {
    navigate("/verify-2fa");
  };

  return <TwoFASetup onSetupComplete={handleSetupComplete} />;
}

export default Setup2fa;
