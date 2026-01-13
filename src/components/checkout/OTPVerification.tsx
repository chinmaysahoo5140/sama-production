import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface OTPVerificationProps {
  phone: string;
  onVerified: () => void;
  isVerified: boolean;
}

export const OTPVerification = ({ phone, onVerified, isVerified }: OTPVerificationProps) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const formatPhone = (phoneNumber: string) => {
    // Remove spaces and dashes
    let cleaned = phoneNumber.replace(/[\s-]/g, '');
    // Add +91 if not present
    if (!cleaned.startsWith('+')) {
      if (cleaned.startsWith('91')) {
        cleaned = '+' + cleaned;
      } else {
        cleaned = '+91' + cleaned;
      }
    }
    return cleaned;
  };

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsSending(true);
    try {
      const formattedPhone = formatPhone(phone);
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { phone: formattedPhone },
      });

      if (error) throw error;
      
      setOtpSent(true);
      toast.success('OTP sent to your phone');
    } catch (error: any) {
      console.error('Send OTP error:', error);
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    try {
      const formattedPhone = formatPhone(phone);
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { phone: formattedPhone, otp },
      });

      if (error) throw error;
      
      toast.success('Phone verified successfully');
      onVerified();
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      toast.error(error.message || 'Invalid OTP');
    } finally {
      setIsVerifying(false);
    }
  };

  if (isVerified) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
      >
        <CheckCircle className="h-5 w-5 text-green-500" />
        <span className="text-green-500 font-medium">Phone number verified</span>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-2">
        <Phone className="h-5 w-5 text-primary" />
        <Label className="font-medium">Verify Phone Number</Label>
      </div>

      {!otpSent ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            We'll send a verification code to confirm your order.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={handleSendOTP}
            disabled={isSending || !phone}
            className="w-full"
          >
            {isSending ? 'Sending...' : 'Send OTP'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to {phone}
          </p>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleSendOTP}
              disabled={isSending}
              className="flex-1"
            >
              Resend
            </Button>
            <Button
              type="button"
              onClick={handleVerifyOTP}
              disabled={isVerifying || otp.length !== 6}
              className="flex-1"
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

