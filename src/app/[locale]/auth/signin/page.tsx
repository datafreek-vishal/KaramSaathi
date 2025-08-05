'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface SignInPageProps {
  params: { locale: string };
}

export default function SignInPage({ params: { locale } }: SignInPageProps) {
  const t = useTranslations();
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || phone.length < 10) {
      toast({
        title: t('common.error'),
        description: 'Please enter a valid phone number',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Implement actual OTP sending logic
      // For now, we'll just simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('common.success'),
        description: 'OTP sent successfully!',
      });
      
      setStep('otp');
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Failed to send OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast({
        title: t('common.error'),
        description: 'Please enter a valid 6-digit OTP',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const result = await signIn('otp', {
        phone,
        otp,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: t('common.error'),
          description: 'Invalid OTP. Please try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('common.success'),
          description: 'Login successful!',
        });
        router.push(`/${locale}`);
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Login failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {step === 'phone' ? t('auth.login') : t('auth.verifyOtp')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label htmlFor="phone" className="sr-only">
                  {t('auth.phone')}
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t('auth.phone')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="text-lg"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('common.loading') : t('auth.sendOtp')}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  OTP sent to {phone}
                </p>
                <label htmlFor="otp" className="sr-only">
                  {t('auth.otp')}
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder={t('auth.otp')}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                  className="text-lg text-center tracking-widest"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('common.loading') : t('auth.verifyOtp')}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep('phone')}
              >
                {t('common.back')}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
