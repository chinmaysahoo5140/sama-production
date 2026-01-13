import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Review {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  rating: number;
  created_at: string;
  product_id: string;
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

export const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  const queryClient = useQueryClient();

  // Check if user has purchased this product
  const { data: hasPurchased = false } = useQuery({
    queryKey: ['hasPurchased', productId, user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase
        .from('orders')
        .select('id, items')
        .eq('user_id', user.id)
        .in('status', ['paid', 'shipped', 'delivered']);

      if (error) throw error;
      
      // Check if any order contains this product
      return data?.some(order => {
        const items = order.items as Array<{ id: string }>;
        return items?.some(item => item.id === productId);
      }) ?? false;
    },
    enabled: !!user,
  });

  // Fetch reviews for this product
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['productReviews', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Review[];
    },
  });

  // Check if user already reviewed
  const userReview = reviews.find(r => r.user_id === user?.id);

  const createReview = useMutation({
    mutationFn: async (newReview: { content: string; rating: number }) => {
      const { error } = await supabase.from('reviews').insert({
        user_id: user!.id,
        user_name: user!.user_metadata?.full_name || user!.email?.split('@')[0] || 'Anonymous',
        content: newReview.content,
        rating: newReview.rating,
        product_id: productId,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productReviews', productId] });
      resetForm();
      toast.success('Review submitted!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit review');
    },
  });

  const updateReview = useMutation({
    mutationFn: async ({ id, content, rating }: { id: string; content: string; rating: number }) => {
      const { error } = await supabase
        .from('reviews')
        .update({ content, rating })
        .eq('id', id)
        .eq('user_id', user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productReviews', productId] });
      resetForm();
      toast.success('Review updated!');
    },
    onError: () => {
      toast.error('Failed to update review');
    },
  });

  const deleteReview = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id)
        .eq('user_id', user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productReviews', productId] });
      toast.success('Review deleted');
    },
    onError: () => {
      toast.error('Failed to delete review');
    },
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingReview(null);
    setRating(5);
    setContent('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Please write your review');
      return;
    }

    if (editingReview) {
      updateReview.mutate({ id: editingReview.id, content: content.trim(), rating });
    } else {
      createReview.mutate({ content: content.trim(), rating });
    }
  };

  const handleEditClick = (review: Review) => {
    setEditingReview(review);
    setRating(review.rating);
    setContent(review.content);
    setShowForm(true);
  };

  const handleAddReviewClick = () => {
    if (!user) {
      openModal('login');
      return;
    }
    if (!hasPurchased) {
      toast.error('You can only review products you have purchased');
      return;
    }
    if (userReview) {
      toast.error('You have already reviewed this product');
      return;
    }
    setShowForm(true);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <section className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-display font-bold mb-2">Customer Reviews</h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(Number(averageRating))
                        ? 'text-gold fill-gold'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {averageRating} ({reviews.length} reviews)
              </span>
            </div>
          </div>
          {!userReview && (
            <Button variant="hero" onClick={handleAddReviewClick}>
              <Plus className="h-4 w-4 mr-2" />
              Write a Review
            </Button>
          )}
        </div>

        {/* Review Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={resetForm}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card rounded-2xl p-6 w-full max-w-md border border-border"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-display font-semibold">
                    {editingReview ? 'Edit Review' : 'Write a Review'}
                  </h3>
                  <Button variant="ghost" size="icon" onClick={resetForm}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Reviewing: {productName}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <div>
                    <Label htmlFor="content">Your Review *</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share your experience with this product..."
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    disabled={createReview.isPending || updateReview.isPending}
                  >
                    {createReview.isPending || updateReview.isPending
                      ? 'Submitting...'
                      : editingReview
                      ? 'Update Review'
                      : 'Submit Review'}
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border animate-pulse">
                <div className="h-4 bg-muted rounded w-24 mb-3" />
                <div className="h-16 bg-muted rounded mb-4" />
                <div className="h-4 bg-muted rounded w-32" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <Star className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
            {!hasPurchased && user && (
              <p className="text-sm text-muted-foreground mt-2">
                Purchase this product to leave a review.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl p-6 border border-border"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? 'text-gold fill-gold' : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="font-medium">{review.user_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  {review.user_id === user?.id && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(review)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteReview.mutate(review.id)}
                        disabled={deleteReview.isPending}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground">{review.content}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
