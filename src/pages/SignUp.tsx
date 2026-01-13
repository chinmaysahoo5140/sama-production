import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const SignUp = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  // Redirect to home - the auth modal will handle signup
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <Link to="/" className="inline-block">
          <h1 className="text-4xl font-display font-bold text-gradient">SAMA</h1>
        </Link>
        <p className="text-muted-foreground mt-4">Redirecting to home...</p>
      </motion.div>
    </div>
  );
};

export default SignUp;
