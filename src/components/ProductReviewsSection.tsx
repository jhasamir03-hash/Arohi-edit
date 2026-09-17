import React, { useState, useEffect } from 'react';
import { Product, ProductReview } from '../types';
import { getProductReviews, saveProductReview, calculateRatingStats } from '../utils/reviewStorage';
import { buildWhatsAppLink } from '../config';
import { Star, ThumbsUp, CheckCircle, MessageSquare, Send, MessageCircle } from 'lucide-react';

interface ProductReviewsSectionProps {
  product: Product;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ product }) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [helpfulGiven, setHelpfulGiven] = useState<Record<string, boolean>>({});
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  // Form states
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [fitFeedback, setFitFeedback] = useState('True to size & elegant drape');
  const [formSuccess, setFormSuccess] = useState(false);

  // Load reviews on product change
  useEffect(() => {
    const list = getProductReviews(product.id, product.reviews || []);
    setReviews(list);
    setShowReviewForm(false);
    setFormSuccess(false);
    setFilterRating('all');
  }, [product.id, product.reviews]);

  const stats = calculateRatingStats(reviews);

  const handleToggleHelpful = (reviewId: string) => {
    if (helpfulGiven[reviewId]) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    setHelpfulGiven((prev) => ({ ...prev, [reviewId]: true }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-user-${Date.now()}`,
      reviewerName: userName.trim(),
      city: 'Catalogue Previewer',
      rating,
      date: 'Just now',
      comment: comment.trim(),
      fitFeedback,
      verifiedPurchase: false,
      helpfulCount: 0,
    };

    const updated = saveProductReview(product.id, newRev);
    setReviews(updated);
    setFormSuccess(true);
    setUserName('');
    setComment('');
    setTimeout(() => {
      setShowReviewForm(false);
      setFormSuccess(false);
    }, 2200);
  };

  const fitOptions = [
    'True to size & elegant drape',
    'Comfortable fluid movement',
    'Structured occasion tailoring',
    'Flattering neckline & proportions',
  ];

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return Math.round(r.rating) === filterRating;
  });

  const whatsappFeedbackMessage = `Hi AZORIA, I would like to share feedback on "${product.name}":\nRating: ${rating}/5 Stars\nDrape Note: ${fitFeedback}\nReview: "${comment || 'Loved the silhouette'}"\n- ${userName || 'Prospective Client'}`;
  const whatsappFeedbackUrl = buildWhatsAppLink(whatsappFeedbackMessage);

  return (
    <div className="pt-8 border-t border-[#E9E5DD]" id="product-reviews-section">
      {/* Section Heading & Rating Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="text-[10px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase mb-1">
            Dedicated Silhouette Feedback
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#0C182B] font-normal">
            Ratings & Feedback
          </h3>
        </div>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#0C182B] hover:bg-[#16253D] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider shadow-2xs active:scale-95 transition-all cursor-pointer self-start sm:self-auto"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{showReviewForm ? 'Cancel Feedback' : 'Add Silhouette Feedback'}</span>
        </button>
      </div>

      {/* Aggregate Rating Scoreboard */}
      <div className="bg-white rounded-2xl border border-[#E9E5DD] p-4 sm:p-6 mb-6 shadow-2xs grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        {/* Score Column */}
        <div className="sm:col-span-4 text-center sm:text-left sm:border-r border-[#E9E5DD] sm:pr-6">
          <div className="flex items-baseline justify-center sm:justify-start gap-2">
            <span className="text-4xl sm:text-5xl font-normal font-serif text-[#0C182B] tracking-tight">
              {stats.averageRating.toFixed(1)}
            </span>
            <span className="text-sm font-medium text-[#7A889B]">/ 5.0</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-1 mt-1.5 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(stats.averageRating)
                    ? 'fill-[#C59A45] text-[#C59A45]'
                    : 'text-[#D8DFE9]'
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-[#5A687D]">
            Based on <strong className="text-[#0C182B]">{stats.reviewCount}</strong> sample ratings
          </p>
          <div className="mt-2 text-[10px] text-[#7A889B] tracking-wide uppercase font-medium">
            Sample Demonstrative Feedback
          </div>
        </div>

        {/* Star Breakdown Column */}
        <div className="sm:col-span-8 space-y-1.5">
          {[5, 4, 3, 2, 1].map((starVal) => {
            const count = stats.starDistribution[starVal] || 0;
            const percentage = stats.reviewCount > 0 ? (count / stats.reviewCount) * 100 : 0;
            return (
              <div key={starVal} className="flex items-center gap-2 text-xs text-[#5A687D]">
                <button
                  onClick={() => setFilterRating(filterRating === starVal ? 'all' : starVal)}
                  className={`flex items-center gap-1 w-12 hover:text-[#0C182B] transition-colors cursor-pointer ${
                    filterRating === starVal ? 'font-bold text-[#0C182B]' : ''
                  }`}
                >
                  <span>{starVal}</span>
                  <Star className="w-3 h-3 fill-[#C59A45] text-[#C59A45]" />
                </button>
                <div className="flex-1 h-2 bg-[#F4F1EA] rounded-full overflow-hidden border border-[#E9E5DD]">
                  <div
                    className="h-full bg-[#C5A880] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-[11px] text-[#7A889B] font-mono">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Submission Form */}
      {showReviewForm && (
        <div className="bg-white rounded-2xl border border-[#C5A880]/60 p-4 sm:p-6 mb-6 shadow-md animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9E5DD] mb-4">
            <h4 className="font-serif text-base sm:text-lg font-medium text-[#0C182B]">
              Feedback for {product.name}
            </h4>
            <span className="text-[10px] text-[#7A889B] uppercase font-semibold">Sample Input</span>
          </div>

          {formSuccess ? (
            <div className="p-4 rounded-xl bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] text-center space-y-1 animate-fade-in">
              <CheckCircle className="w-6 h-6 mx-auto text-[#166534]" />
              <div className="font-semibold text-sm">Feedback Recorded</div>
              <p className="text-xs text-[#15803D]">
                Your review has been saved to demonstrate live client rating capabilities.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-semibold text-[#0C182B] uppercase tracking-wider mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-2xl focus:outline-none transition-transform hover:scale-120 cursor-pointer"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating)
                            ? 'fill-[#C5A880] text-[#C5A880]'
                            : 'text-[#D8DFE9]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#0C182B] ml-2">
                    {hoverRating || rating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-[#0C182B] mb-1">
                  Your Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5DD] bg-[#FAF9F6] text-sm text-[#0C182B] focus:outline-none focus:ring-1 focus:ring-[#0C182B]"
                />
              </div>

              {/* Fit Assessment */}
              <div>
                <label className="block text-xs font-semibold text-[#0C182B] mb-1.5">
                  Silhouette & Cut Observation
                </label>
                <div className="flex flex-wrap gap-2">
                  {fitOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFitFeedback(opt)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                        fitFeedback === opt
                          ? 'bg-[#0C182B] text-[#FAF9F6] border-[#0C182B] font-medium'
                          : 'bg-[#FAF9F6] text-[#5A687D] border-[#E9E5DD] hover:border-[#0C182B]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text Area */}
              <div>
                <label className="block text-xs font-semibold text-[#0C182B] mb-1">
                  Silhouette Feedback & Review <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Notes on the silhouette proportion, fabric feel, or occasion styling..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5DD] bg-[#FAF9F6] text-sm text-[#0C182B] focus:outline-none focus:ring-1 focus:ring-[#0C182B] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <a
                  href={whatsappFeedbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0C182B] hover:text-[#C5A880] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Send review to AZORIA on WhatsApp</span>
                </a>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#E9E5DD] text-xs font-medium text-[#5A687D] hover:bg-[#FAF9F6] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0C182B] hover:bg-[#16253D] text-[#FAF9F6] text-xs font-bold uppercase tracking-wider shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-6 bg-white rounded-xl border border-[#E9E5DD] p-4 text-xs text-[#5A687D]">
            No reviews under this rating filter.
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const hasMarkedHelpful = helpfulGiven[rev.id];
            return (
              <div
                key={rev.id}
                className="bg-white rounded-xl border border-[#E9E5DD] p-4 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-semibold text-xs text-[#0C182B]">
                      {rev.reviewerName}
                    </span>
                    <div className="text-[10px] text-[#7A889B] mt-0.5">
                      <span>{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= Math.round(rev.rating)
                            ? 'fill-[#C59A45] text-[#C59A45]'
                            : 'text-[#D8DFE9]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {rev.fitFeedback && (
                  <div className="inline-block text-[10px] font-medium bg-[#F2EFE9] text-[#3A475A] border border-[#E9E5DD] px-2 py-0.5 rounded-md">
                    {rev.fitFeedback}
                  </div>
                )}

                <p className="text-xs text-[#3A475A] leading-relaxed font-light">
                  "{rev.comment}"
                </p>

                <div className="pt-2 border-t border-[#F4F1EA] flex items-center justify-between text-[11px] text-[#7A889B]">
                  <span>Sample customer feedback</span>
                  <button
                    onClick={() => handleToggleHelpful(rev.id)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] transition-all cursor-pointer ${
                      hasMarkedHelpful
                        ? 'bg-[#F0FDF4] text-[#166534] font-semibold'
                        : 'hover:bg-[#F2EFE9] text-[#5A687D]'
                    }`}
                  >
                    <ThumbsUp className="w-2.5 h-2.5" />
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
