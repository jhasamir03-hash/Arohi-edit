import React, { useState } from 'react';
import { BoutiqueFeedback } from '../types';
import { getBoutiqueFeedback, saveBoutiqueFeedback } from '../utils/reviewStorage';
import { buildWhatsAppLink, STORE_CONFIG } from '../config';
import {
  Star,
  MessageSquarePlus,
  Send,
  CheckCircle,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

export const FeedbackSection: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<BoutiqueFeedback[]>(() => getBoutiqueFeedback());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [feedbackType, setFeedbackType] = useState<BoutiqueFeedback['feedbackType']>('Fabric Quality');
  const [purchasedItem, setPurchasedItem] = useState('');
  const [comment, setComment] = useState('');

  const categories = ['All', 'Fabric Quality', 'Festive Fitting', 'Customer Care', 'Delivery & Packaging'];

  const filteredList = feedbackList.filter((fb) => {
    if (selectedCategory === 'All') return true;
    return fb.feedbackType === selectedCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newFeedback: BoutiqueFeedback = {
      id: `fb-user-${Date.now()}`,
      name: name.trim(),
      city: 'Catalogue Reviewer',
      rating,
      date: 'Just now',
      feedbackType,
      purchasedItem: purchasedItem.trim() || 'AZORIA Collection',
      comment: comment.trim(),
    };

    const updated = saveBoutiqueFeedback(newFeedback);
    setFeedbackList(updated);
    setFormSuccess(true);
    setName('');
    setComment('');
    setPurchasedItem('');

    setTimeout(() => {
      setIsFormOpen(false);
      setFormSuccess(false);
    }, 2400);
  };

  const whatsappMessage = `Hi ${STORE_CONFIG.brandName}, I would like to submit feedback on the collection:\nTopic: ${feedbackType}\nRating: ${rating}/5 Stars\nPiece of Interest: ${purchasedItem || 'Blooming Vichitra Silk Lehenga'}\nNotes: "${comment || 'Impressive collection and presentation'}"\n- ${name || 'Prospective Client'}`;
  const whatsappUrl = buildWhatsAppLink(whatsappMessage);

  return (
    <section id="feedback-section" className="py-14 sm:py-20 bg-[#FAF9F6] border-t border-[#E9E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#C59A45] uppercase mb-2">
            Collection Insights
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0C182B] tracking-tight font-normal">
            Feedback & Ratings
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-3 mb-3" />
          <p className="text-sm sm:text-base text-[#5A687D] font-normal leading-relaxed">
            Share feedback on fabric quality, embroidery finish, 7.5m flair, and catalogue experience.
          </p>
          <span className="inline-block mt-2 text-[11px] text-[#7A889B] tracking-wider uppercase font-medium bg-[#F2EFE9] px-3 py-1 rounded-full border border-[#E9E5DD]">
            Customer Feedback & Boutique Ratings
          </span>
        </div>

        {/* Action Row: Category Filter Tabs & "Share Feedback" Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0C182B] text-[#FAF9F6] shadow-xs'
                    : 'bg-white text-[#5A687D] border border-[#E9E5DD] hover:border-[#0C182B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0C182B] hover:bg-[#16253D] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#C5A880]" />
            <span>{isFormOpen ? 'Close Feedback Form' : 'Submit Feedback'}</span>
          </button>
        </div>

        {/* Feedback Submission Form */}
        {isFormOpen && (
          <div className="bg-white rounded-3xl border border-[#E9E5DD] p-5 sm:p-8 mb-10 shadow-lg animate-fade-in max-w-2xl mx-auto">
            <div className="border-b border-[#E9E5DD] pb-3 mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-[#0C182B] font-medium">
                  Submit Feedback on {STORE_CONFIG.brandName}
                </h3>
                <p className="text-xs text-[#7A889B] mt-0.5">
                  Demonstrative feedback test form for this digital catalogue concept.
                </p>
              </div>
              <span className="text-[10px] bg-[#F2EFE9] border border-[#E9E5DD] text-[#0C182B] px-2.5 py-1 rounded-full font-semibold uppercase">
                Demo Form
              </span>
            </div>

            {formSuccess ? (
              <div className="p-6 rounded-2xl bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] text-center space-y-2 animate-fade-in">
                <CheckCircle className="w-8 h-8 mx-auto text-[#166534]" />
                <h4 className="font-serif text-lg font-semibold">Thank You for Your Feedback!</h4>
                <p className="text-xs text-[#15803D]">
                  Your sample review has been recorded to demonstrate catalogue interactivity.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating & Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          className="p-1 focus:outline-none transition-transform hover:scale-115 cursor-pointer"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating
                                ? 'fill-[#C5A880] text-[#C5A880]'
                                : 'text-[#D8DFE9]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-[#0C182B] ml-2">{rating}.0 / 5.0</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0C182B] uppercase tracking-wider mb-1.5">
                      Feedback Subject
                    </label>
                    <select
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value as BoutiqueFeedback['feedbackType'])}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E9E5DD] bg-[#FAF9F6] text-sm text-[#0C182B] focus:outline-none focus:ring-1 focus:ring-[#0C182B]"
                    >
                      <option value="Fabric Quality">Fabric Quality & Material Drape</option>
                      <option value="Festive Fitting">Silhouette Fitting & Styling</option>
                      <option value="Customer Care">WhatsApp Consultation Flow</option>
                      <option value="Delivery & Packaging">Presentation & Packaging</option>
                    </select>
                  </div>
                </div>

                {/* Name & Silhouette */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0C182B] mb-1">
                      Your Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Vance"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5DD] bg-[#FAF9F6] text-sm text-[#0C182B] focus:outline-none focus:ring-1 focus:ring-[#0C182B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0C182B] mb-1">
                      Silhouette of Interest (Optional)
                    </label>
                    <input
                      type="text"
                      value={purchasedItem}
                      onChange={(e) => setPurchasedItem(e.target.value)}
                      placeholder="e.g. Midnight Silk Drape Edit"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5DD] bg-[#FAF9F6] text-sm text-[#0C182B] focus:outline-none focus:ring-1 focus:ring-[#0C182B]"
                    />
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-xs font-semibold text-[#0C182B] mb-1">
                    Your Feedback <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Provide notes on the design, silhouette balance, or enquiry experience..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E5DD] bg-[#FAF9F6] text-sm text-[#0C182B] focus:outline-none focus:ring-1 focus:ring-[#0C182B] resize-none"
                  />
                </div>

                {/* Submit / WhatsApp Option */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0C182B] hover:text-[#C5A880] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Send directly via WhatsApp</span>
                  </a>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#E9E5DD] text-xs font-medium text-[#5A687D] hover:bg-[#FAF9F6] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0C182B] hover:bg-[#16253D] text-[#FAF9F6] text-xs font-bold uppercase tracking-wider shadow-xs active:scale-95 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Post Feedback</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Feedback Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E9E5DD] p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Feedback Type Pill & Stars */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E9E5DD] text-[#0C182B]">
                    {item.feedbackType}
                  </span>

                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= item.rating
                            ? 'fill-[#C5A880] text-[#C5A880]'
                            : 'text-[#D8DFE9]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Silhouette Highlight */}
                {item.purchasedItem && (
                  <div className="text-[11px] font-medium text-[#C5A880] mb-2 truncate">
                    Focus: {item.purchasedItem}
                  </div>
                )}

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-[#3A475A] leading-relaxed font-light mb-4">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Note */}
              <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between text-xs text-[#7A889B]">
                <span className="font-serif font-medium text-[#0C182B]">{item.name}</span>
                <span className="text-[10px] uppercase tracking-wider font-mono">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
