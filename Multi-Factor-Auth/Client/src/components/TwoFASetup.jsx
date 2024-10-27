import { useEffect, useState } from "react";
import { setup2FA } from "../service/authApi";

function TwoFASetup({ onSetupComplete }) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const fetchQRCode = async () => {
    try {
      const { data } = await setup2FA();
      console.log("QR Code Data:", data);
      setResponse(data);
    } catch (error) {
      console.error("Error fetching QR code:", error);
      setMessage("Failed to fetch QR code");
    }
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  const copyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(response.secret);
      setMessage("Secret copied to clipboard");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      setMessage("Failed to copy secret to clipboard");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto">
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">
          Turn on 2FA Verification
        </h2>
      </div>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="text-center text-gray-600 text-lg font-light">
        Scan the QR Code below with your Authenticator App
      </p>
      <div className="p-6">
        <div className="flex justify-center">
          {response.qrImageUrl ? (
            <img
              src={response.qrImageUrl}
              alt="2FA QR Code"
              className="mb-4 border rounded-md"
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center mt-3 mb-3">
          <div className="border-t border-1 border-gray-200 flex-grow"></div>
          <div className="text-gray-600 text-sm font-light pr-2 pl-2">
            OR enter the code Manually
          </div>
          <div className="border-t border-1 border-gray-200 flex-grow"></div>
        </div>
        <div className="mb-6">
          {message && <p className="text-green-600 text-sm mb-3">{message}</p>}
          <input
            readOnly
            value={response.secret}
            className="w-full border rounded mt-2 text-xs text-gray-600 p-4"
            onClick={copyClipboard}
          />
        </div>
        <button
          onClick={onSetupComplete}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Continue to Verification
        </button>
      </div>
    </div>
  );
}

export default TwoFASetup;
