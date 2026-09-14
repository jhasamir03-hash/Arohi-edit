import React, { useState, useEffect } from 'react';
import { Product, ProductReview } from '../types';
import { getProductReviews, saveProductReview, calculateRatingStats } from '../utils/reviewStorage';
import { buildWhatsAppLink } from '../config';
import { Star, ThumbsUp, CheckCircle, MessageSquare, Sparkles, Send, MessageCircle } from 'lucide-react';

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
  const [userCity, setUserCity] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [fitFeedback, setFitFeedback] = useState('Perfect drape & fit');
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
      city: userCity.trim() || 'Patron, India',
      rating,
      date: 'Just now',
      comment: comment.trim(),
      fitFeedback,
      verifiedPurchase: true,
      helpfulCount: 0,
    };

    const updated = saveProductReview(product.id, newRev);
    setReviews(updated);
    setFormSuccess(true);
    setUserName('');
    setUserCity('');
    setComment('');
    setTimeout(() => {
      setShowReviewForm(false);
      setFormSuccess(false);
    }, 2800);
  };

  const fitOptions = [
    'Perfect drape & fit',
    'True to size & great twirl',
    'Comfortable pure fabric',
    'Flattering festive silhouette',
    'Soft & scratch-free lining',
  ];

  const getRatingLabel = (score: number) => {
    switch (score) {
      case 5:
        return 'Exceptional Craft & Festive Drape';
      case 4:
        return 'Very Good Quality & Finish';
      case 3:
        return 'Satisfactory Weave';
      case 2:
        return 'Needs Fabric Refinement';
      default:
        return 'Disappointed';
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return Math.round(r.rating) === filterRating;
  });

  const whatsappFeedbackMessage = `Hi AAROHI, I would like to share feedback on "${product.name}":\nRating: ${rating}/5 Stars (${getRatingLabel(rating)})\nFeedback: "${comment || 'I love this piece!'}"\nFrom: ${userName || 'Patron'} (${userCity || 'India'})`;
  const whatsappFeedbackUrl = buildWhatsAppLink(whatsappFeedbackMessage);

  return (
    <div className="pt-8 border-t border-[#E8DFC8]" id="product-reviews-section">
      {/* Section Heading & Rating Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] text-[#C59A45] uppercase mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Patron Reviews & Feedback</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#350C15] font-medium">
            Customer Ratings & Feedback
          </h3>
        </div>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#350C15] hover:bg-[#4A0E17] text-white text-xs font-semibold uppercase tracking-wider shadow-xs hover:shadow-md active:scale-95 transition-all duration-150 cursor-pointer self-start sm:self-auto"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Aggregate Rating Scoreboard */}
      <div className="bg-white rounded-2xl border border-[#E8DFC8] p-4 sm:p-6 mb-6 shadow-2xs grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        {/* Score Column */}
        <div className="sm:col-span-4 text-center sm:text-left sm:border-r border-[#E8DFC8] sm:pr-6">
          <div className="flex items-baseline justify-center sm:justify-start gap-2">
            <span className="text-4xl sm:text-5xl font-extrabold font-serif text-[#350C15] tracking-tight">
              {stats.averageRating.toFixed(1)}
            </span>
            <span className="text-sm font-medium text-[#8C7A6B]">/ 5.0</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-1 mt-1.5 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(stats.averageRating)
                    ? 'fill-[#C59A45] text-[#C59A45]'
                    : 'text-[#E8DFC8]'
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-[#6E5D53]">
            Based on <strong className="text-[#350C15]">{stats.reviewCount} verified</strong> festive
            ratings
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F8F5] text-[#0E6251] text-[10px] font-semibold">
            <CheckCircle className="w-3 h-3" />
            <span>98% of patrons recommend this weave</span>
          </div>
        </div>

        {/* Star Breakdown Column */}
        <div className="sm:col-span-8 space-y-1.5">
          {[5, 4, 3, 2, 1].map((starVal) => {
            const count = stats.starDistribution[starVal] || 0;
            const percentage = stats.reviewCount > 0 ? (count / stats.reviewCount) * 100 : 0;
            return (
              <div key={starVal} className="flex items-center gap-2 text-xs text-[#6E5D53]">
                <button
                  onClick={() => setFilterRating(filterRating === starVal ? 'all' : starVal)}
                  className={`flex items-center gap-1 w-12 hover:text-[#350C15] transition-colors cursor-pointer ${
                    filterRating === starVal ? 'font-bold text-[#350C15]' : ''
                  }`}
                >
                  <span>{starVal}</span>
                  <Star className="w-3 h-3 fill-[#C59A45] text-[#C59A45]" />
                </button>
                <div className="flex-1 h-2 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E8DFC8]/60">
                  <div
                    className="h-full bg-gradient-to-r from-[#C59A45] to-[#E5C158] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-[11px] text-[#8C7A6B] font-mono">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Submission Form (Expandable) */}
      {showReviewForm && (
        <div className="bg-[#FFFFFF] rounded-2xl border-2 border-[#C59A45]/50 p-4 sm:p-6 mb-6 shadow-md animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC8] mb-4">
            <h4 className="font-serif text-base sm:text-lg font-medium text-[#350C15]">
              Share Your Feedback for {product.name}
            </h4>
            <span className="text-[11px] text-[#8C7A6B]">Verified Patron Review</span>
          </div>

          {formSuccess ? (
            <div className="p-4 rounded-xl bg-[#E8F8F5] text-[#0E6251] border border-[#A2D9CE] text-center space-y-1 animate-fade-in">
              <CheckCircle className="w-6 h-6 mx-auto text-[#0E6251]" />
              <div className="font-semibold text-sm">Thank You for Your Feedback!</div>
              <p className="text-xs text-[#117A65]">
                Your review has been successfully added to this piece's catalog record.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-semibold text-[#350C15] uppercase tracking-wider mb-1.5">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-2xl focus:outline-none transition-transform hover:scale-125 active:scale-95 cursor-pointer"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= (hoverRating || rating)
                              ? 'fill-[#C59A45] text-[#C59A45]'
                              : 'text-[#E8DFC8]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-[#350C15] ml-2">
                    {getRatingLabel(hoverRating || rating)}
                  </span>
                </div>
              </div>

              {/* Name & City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#350C15] mb-1">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Shalini Roy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-[#FAF7F2] text-sm text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#C59A45]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#350C15] mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                    placeholder="e.g. Ahmedabad, Gujarat"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-[#FAF7F2] text-sm text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#C59A45]"
                  />
                </div>
              </div>

              {/* Fit & Drape Assessment */}
              <div>
                <label className="block text-xs font-semibold text-[#350C15] mb-1.5">
                  How was the fabric & drape?
                </label>
                <div className="flex flex-wrap gap-2">
                  {fitOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFitFeedback(opt)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                        fitFeedback === opt
                          ? 'bg-[#350C15] text-[#FAF7F2] border-[#350C15] font-medium'
                          : 'bg-[#FAF7F2] text-[#6E5D53] border-[#E8DFC8] hover:border-[#C59A45]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text Area */}
              <div>
                <label className="block text-xs font-semibold text-[#350C15] mb-1">
                  Detailed Feedback & Experience <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details about the silk texture, zari luster, pleat hold, and how it felt during your festive event..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-[#FAF7F2] text-sm text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#C59A45] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <a
                  href={whatsappFeedbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1B4332] hover:text-[#0E6251] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#55D688]" />
                  <span>Also forward this review to AAROHI on WhatsApp</span>
                </a>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-xs font-medium text-[#6E5D53] hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#C59A45] hover:bg-[#B38936] text-[#24060C] text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-all duration-150 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Filter Chips if reviews exist */}
      {reviews.length > 0 && (
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[#8C7A6B] mr-1 text-[11px] font-medium">Filter:</span>
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                filterRating === 'all'
                  ? 'bg-[#350C15] text-[#FAF7F2]'
                  : 'bg-white text-[#6E5D53] border border-[#E8DFC8] hover:border-[#C59A45]'
              }`}
            >
              All ({reviews.length})
            </button>
            {[5, 4, 3].map((starVal) => {
              const c = stats.starDistribution[starVal] || 0;
              if (c === 0) return null;
              return (
                <button
                  key={starVal}
                  onClick={() => setFilterRating(filterRating === starVal ? 'all' : starVal)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    filterRating === starVal
                      ? 'bg-[#350C15] text-[#FAF7F2]'
                      : 'bg-white text-[#6E5D53] border border-[#E8DFC8] hover:border-[#C59A45]'
                  }`}
                >
                  <span>{starVal}★</span>
                  <span>({c})</span>
                </button>
              );
            })}
          </div>

          <span className="text-[11px] text-[#8C7A6B] hidden sm:inline">
            Showing {filteredReviews.length} {filteredReviews.length === 1 ? 'review' : 'reviews'}
          </span>
        </div>
      )}

      {/* Individual Customer Reviews List */}
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-2xl border border-[#E8DFC8] p-6">
            <p className="text-sm text-[#6E5D53] mb-3">
              No reviews match this star rating filter yet.
            </p>
            <button
              onClick={() => setFilterRating('all')}
              className="text-xs font-semibold text-[#350C15] underline cursor-pointer"
            >
              Show all reviews
            </button>
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const hasMarkedHelpful = helpfulGiven[rev.id];
            return (
              <div
                key={rev.id}
                className="bg-white rounded-xl border border-[#E8DFC8] p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow space-y-2.5"
              >
                {/* Reviewer Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#241A1C]">
                        {rev.reviewerName}
                      </span>
                      {rev.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#0E6251] bg-[#E8F8F5] px-2 py-0.5 rounded-full font-medium">
                          <CheckCircle className="w-3 h-3" />
                          <span>Verified Patron</span>
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#8C7A6B] mt-0.5">
                      <span>{rev.city}</span>
                      <span className="mx-1.5">•</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= Math.round(rev.rating)
                            ? 'fill-[#C59A45] text-[#C59A45]'
                            : 'text-[#E8DFC8]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Drape / Fit Feedback Tag */}
                {rev.fitFeedback && (
                  <div className="inline-block text-[11px] font-medium bg-[#FAF7F2] text-[#7B4E28] border border-[#E8DFC8] px-2.5 py-0.5 rounded-md">
                    Feedback: {rev.fitFeedback}
                  </div>
                )}

                {/* Review Comment */}
                <p className="text-xs sm:text-sm text-[#3E332A] leading-relaxed">
                  "{rev.comment}"
                </p>

                {/* Helpful Count Button */}
                <div className="pt-2 border-t border-[#FAF7F2] flex items-center justify-between text-[11px] text-[#8C7A6B]">
                  <span>Was this feedback helpful?</span>
                  <button
                    onClick={() => handleToggleHelpful(rev.id)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer ${
                      hasMarkedHelpful
                        ? 'bg-[#E8F8F5] text-[#0E6251] font-semibold'
                        : 'hover:bg-[#FAF7F2] text-[#6E5D53]'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
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
