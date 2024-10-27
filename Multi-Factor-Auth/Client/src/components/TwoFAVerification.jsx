import { useState } from "react";
import { reset2FA, verify2FA } from "../service/authApi";

function TwoFAVerification({ onVerifySuccess, onResetSuccess }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleTokenVerification = async (e) => {
    e.preventDefault();

    try {
      const { data } = await verify2FA(otp);
      onVerifySuccess(data);
      setMessage("2FA Authentication Successful");
      setError("");
    } catch (error) {
      setOtp("");
      console.log(error.message);
      setError("Invalid TOTP");
      setMessage("");
    }
  };

  const handleReset = async () => {
    try {
      const { data } = await reset2FA();
      onResetSuccess(data);
      setError("");
      setMessage("2FA Reset Successful");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setMessage("");
    }
  };
  return (
    <form
      onSubmit={handleTokenVerification}
      className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto"
    >
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">Validate TOTP</h2>
      </div>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="text-center text-gray-600 text-lg font-light">
        Please enter 6-digit Time Based OTP to verify 2FA Authentication
      </p>
      <div className="p-6">
        <div className="mb-4">
          <label className="text-gray-600 text-sm">Username</label>
          <input
            label="TOTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 rounde mt-2"
            placeholder="Enter your TOTP"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md mb-3"
        >
          Verify TOTP
        </button>
        <button
          type="button"
          className="w-full bg-slate-600 text-white p-2 rounded-md"
          onClick={handleReset}
        >
          Reset 2FA
        </button>
      </div>
    </form>
  );
}

export default TwoFAVerification;
