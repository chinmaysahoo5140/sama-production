import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAuthModal } from '@/context/AuthModalContext';

export const useAuthPrompt = (delay: number = 5000) => {
  const { user, isLoading } = useAuth();
  const { openModal } = useAuthModal();

  useEffect(() => {
    // Don't show if user is already logged in or still loading
    if (user || isLoading) return;

    // Check if we've already shown the modal this session
    const hasShownModal = sessionStorage.getItem('sama-auth-prompt-shown');
    if (hasShownModal) return;

    const timer = setTimeout(() => {
      // Double check user hasn't logged in during the delay
      if (!user) {
        openModal('login');
        sessionStorage.setItem('sama-auth-prompt-shown', 'true');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [user, isLoading, openModal, delay]);
};
