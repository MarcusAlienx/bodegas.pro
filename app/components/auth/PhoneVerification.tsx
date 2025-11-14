"use client";

import { useState, useEffect } from 'react';
import { RecaptchaVerifier, PhoneAuthProvider, signInWithCredential, User } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

interface PhoneVerificationProps {
  user: User;
  onSuccess: () => void;
}

export function PhoneVerification({ user, onSuccess }: PhoneVerificationProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'code'
  const [error, setError] = useState('');
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  useEffect(() => {
    if (!isRecaptchaReady) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'callback': () => {
          // reCAPTCHA resuelto
        }
      });
      setIsRecaptchaReady(true);
    }
  }, [isRecaptchaReady]);

  const sendVerificationCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        window.recaptchaVerifier
      );
      setVerificationId(verificationId);
      setStep('code');
    } catch (error: any) {
      setError(`Error al enviar código: ${error.message}`);
    }
  };

  const verifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      // Note: signInWithCredential will sign in the user with the phone number.
      // If the user is already signed in, this will link the phone number to the existing account.
      await signInWithCredential(auth, credential);

      // Update user profile
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), {
          phoneNumber,
          phoneVerified: true
        });
      }

      onSuccess();
    } catch (error: any) {
      setError(`Error al verificar código: ${error.message}`);
    }
  };

  return (
    <div className="phone-verification">
      {step === 'phone' ? (
        <>
          <h3>Verificación de teléfono</h3>
          <p>Ingresa tu número de teléfono para recibir un código de verificación por SMS.</p>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+52 1 55 1234 5678"
          />
          <div id="recaptcha-container"></div>
          <button onClick={sendVerificationCode}>Enviar código</button>
        </>
      ) : (
        <>
          <h3>Ingresa el código de verificación</h3>
          <p>Hemos enviado un código por SMS a {phoneNumber}</p>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="123456"
          />
          <button onClick={verifyCode}>Verificar</button>
        </>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}