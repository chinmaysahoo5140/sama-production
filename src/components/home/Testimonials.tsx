import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Plus, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  user_id: string;
  user_name: string;
  user_role: string | null;
  user_location: string | null;
  content: string;
  rating: number;
  created_at: string;
}

export const Testimonials = () => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as Review[];
    },
  });

  const createReview = useMutation({
    mutationFn: async (newReview: {
      user_name: string;
      user_role: string;
      user_location: string;
      content: string;
      rating: number;
    }) => {
      const { error } = await supabase.from('reviews').insert({
        user_id: user!.id,
        user_name: newReview.user_name,
        user_role: newReview.user_role || null,
        user_location: newReview.user_location || null,
        content: newReview.content,
        rating: newReview.rating,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      setShowForm(false);
      setContent('');
      setRating(5);
      setUserRole('');
      setUserLocation('');
      toast({
        title: 'Review submitted!',
        description: 'Thank you for sharing your experience.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openModal('login');
      return;
    }
    if (!content.trim()) {
      toast({
        title: 'Missing content',
        description: 'Please write your review.',
        variant: 'destructive',
      });
      return;
    }
    createReview.mutate({
      user_name: user.email?.split('@')[0] || 'Anonymous',
      user_role: userRole,
      user_location: userLocation,
      content: content.trim(),
      rating,
    });
  };

  const handleAddReviewClick = () => {
    if (!user) {
      openModal('login');
      return;
    }
    setShowForm(true);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            <span className="text-foreground">What Our</span>{' '}
            <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Real reviews from our valued customers. Share your experience with SAMA.
          </p>
          <Button variant="hero" onClick={handleAddReviewClick}>
            <Plus className="h-4 w-4 mr-2" />
            Write a Review
          </Button>
        </motion.div>

        {/* Review Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card rounded-2xl p-6 w-full max-w-md border border-border"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-display font-semibold">Write a Review</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Rating */}
                  <div>
                    <Label>Rating</Label>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= rating ? 'text-gold fill-gold' : 'text-muted-foreground'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <Label htmlFor="content">Your Review *</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share your experience with SAMA products..."
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <Label htmlFor="role">Your Profession (optional)</Label>
                    <Input
                      id="role"
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      placeholder="e.g., Business Consultant"
                      className="mt-1"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location">Location (optional)</Label>
                    <Input
                      id="location"
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      placeholder="e.g., Mumbai"
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    disabled={createReview.isPending}
                  >
                    {createReview.isPending ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border animate-pulse">
                <div className="h-4 bg-muted rounded w-24 mb-4" />
                <div className="h-20 bg-muted rounded mb-6" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted" />
                  <div>
                    <div className="h-4 bg-muted rounded w-24 mb-2" />
                    <div className="h-3 bg-muted rounded w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16">
            <Quote className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative bg-card rounded-2xl p-8 border border-border hover-lift"
              >
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
                
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-muted-foreground" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{review.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {review.user_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{review.user_name}</p>
                    {(review.user_role || review.user_location) && (
                      <p className="text-sm text-muted-foreground">
                        {[review.user_role, review.user_location].filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};