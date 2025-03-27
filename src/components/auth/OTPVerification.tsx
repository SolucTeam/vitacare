
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface OTPVerificationProps {
  phoneOrEmail: string;
  onVerificationComplete: () => void;
  onResendCode: () => void;
  onCancel: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  phoneOrEmail,
  onVerificationComplete,
  onResendCode,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = () => {
    if (otp.length === 6) {
      // In a real app, verify the OTP against the backend
      // For now, we'll simulate a successful verification
      toast.success(t('auth.otpVerified'));
      onVerificationComplete();
    } else {
      toast.error(t('auth.invalidOtp'));
    }
  };

  const handleResend = () => {
    setCountdown(60);
    onResendCode();
    toast.info(t('auth.otpResent'));
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{t('auth.verifyOtp')}</h2>
        <p className="text-gray-500">
          {t('auth.otpSentTo')} {phoneOrEmail}
        </p>
      </div>

      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.map((slot, index) => (
                <InputOTPSlot key={index} {...slot} />
              ))}
            </InputOTPGroup>
          )}
        />
      </div>

      <Button 
        onClick={handleVerify} 
        className="w-full"
        disabled={otp.length !== 6}
      >
        {t('auth.verifyCode')}
      </Button>

      <div className="flex justify-between items-center text-sm">
        <button
          onClick={onCancel}
          className="text-gray-500 hover:underline"
        >
          {t('common.cancel')}
        </button>
        
        <button
          onClick={handleResend}
          disabled={countdown > 0}
          className={`text-primary hover:underline ${
            countdown > 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {countdown > 0
            ? `${t('auth.resendIn')} ${countdown}s`
            : t('auth.resendCode')}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
