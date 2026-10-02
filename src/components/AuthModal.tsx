import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import { heroCakeImg } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string, phone: string) => void;
  onShowToast: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onShowToast
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('9823045892');
  const [customerName, setCustomerName] = useState('Ananya Roy');
  const [otp, setOtp] = useState(['4', '8', '2', '1', '', '']);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: any;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      onShowToast('Please enter a valid 10-digit mobile number in Pune.');
      return;
    }
    setStep('otp');
    setTimer(60);
    onShowToast(`Verification code sent to +91 ${phone}`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(customerName || 'Ananya', `+91 ${phone}`);
    onShowToast(`Welcome back, ${customerName}! Signed in successfully.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative bg-[#FFFDF9] border border-[#E6D8C7] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#FFFDF9]/80 backdrop-blur-md border border-[#E6D8C7] text-[#75675F] hover:text-[#30231F] flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Editorial Food Photography */}
        <div className="md:w-1/2 relative min-h-[220px] md:min-h-full bg-[#4A1328] overflow-hidden">
          <img
            src={heroCakeImg}
            alt="Artisanal celebration cake"
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A1328] via-[#4A1328]/40 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white text-left">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#F1D5CC] block">
              BakeGhar Pune
            </span>
            <h3 className="font-serif text-xl font-bold mt-1">
              Celebrations start with a local touch.
            </h3>
            <p className="text-xs text-white/80 mt-1">
              Join 12,000+ Pune cake lovers ordering directly from vetted home kitchens.
            </p>
          </div>
        </div>

        {/* Right Side: Clean Form */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="font-serif text-2xl font-bold text-[#30231F]">
              {step === 'phone' ? 'Welcome to BakeGhar' : 'Verify Mobile'}
            </h2>
            <p className="text-xs text-[#75675F] mt-1">
              {step === 'phone'
                ? 'Sign in or create account to track orders & earn rewards.'
                : `Enter the 6-digit OTP sent to +91 ${phone}`}
            </p>
          </div>

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#30231F] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ananya Roy"
                  required
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:bg-white focus:outline-none focus:border-[#6F1D3A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#30231F] block mb-1">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <span className="text-xs font-mono font-semibold px-3 py-2.5 bg-[#FFF8EE] border border-[#E6D8C7] rounded-xl flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98230 45892"
                    maxLength={10}
                    required
                    className="flex-1 text-xs p-2.5 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:bg-white focus:outline-none focus:border-[#6F1D3A] font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#6F1D3A] hover:bg-[#4A1328] text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Send Verification OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#75675F]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5E7844]" />
                <span>Zero spam · Only SMS order tracking alerts</span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-[#30231F]">
                    6-Digit Verification Code
                  </label>
                  <span className="text-xs font-mono text-[#6F1D3A] font-semibold">
                    {timer > 0 ? `${timer}s remaining` : 'Code expired'}
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-1.5">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[idx] = e.target.value;
                        setOtp(newOtp);
                      }}
                      className="w-full h-11 text-center font-mono text-base font-bold rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:bg-white focus:outline-none focus:border-[#6F1D3A]"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#6F1D3A] hover:bg-[#4A1328] text-white text-xs font-semibold rounded-xl shadow-md transition-all"
              >
                Confirm & Sign In
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-xs text-[#75675F] hover:text-[#6F1D3A]"
                >
                  Change phone number
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
