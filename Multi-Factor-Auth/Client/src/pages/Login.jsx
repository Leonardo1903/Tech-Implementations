import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useSession } from "../context/sessionContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useSession();

  const handleLoginSuccess = (userData) => {
    console.log(userData);
    login(userData);

    if (!userData.isMfaActive) {
      navigate("/setup-2fa");
    } else {
      navigate("/verify-2fa");
    }
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
}

export default Login;
