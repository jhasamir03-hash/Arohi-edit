import React, { useState } from 'react';
import { BoutiqueFeedback } from '../types';
import { getBoutiqueFeedback, saveBoutiqueFeedback } from '../utils/reviewStorage';
import { buildWhatsAppLink } from '../config';
import {
  Sparkles,
  Star,
  MessageSquarePlus,
  Send,
  CheckCircle,
  MessageCircle,
  HeartHandshake,
  ShieldCheck,
  Truck,
  Award,
} from 'lucide-react';

export const FeedbackSection: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<BoutiqueFeedback[]>(() => getBoutiqueFeedback());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
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
      city: city.trim() || 'Valued Patron, India',
      rating,
      date: 'Just now',
      feedbackType,
      purchasedItem: purchasedItem.trim() || 'Festive Handloom Collection',
      comment: comment.trim(),
    };

    const updated = saveBoutiqueFeedback(newFeedback);
    setFeedbackList(updated);
    setFormSuccess(true);
    setName('');
    setCity('');
    setComment('');
    setPurchasedItem('');

    setTimeout(() => {
      setIsFormOpen(false);
      setFormSuccess(false);
    }, 2800);
  };

  const whatsappMessage = `Hi AAROHI, I would like to submit feedback for the boutique:\nCategory: ${feedbackType}\nRating: ${rating}/5 Stars\nItem: ${purchasedItem || 'Navratri Collection'}\nFeedback: "${comment || 'Wonderful handloom collection'}"\n- ${name || 'Patron'} (${city || 'India'})`;
  const whatsappUrl = buildWhatsAppLink(whatsappMessage);

  return (
    <section id="feedback-section" className="py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.25em] text-[#C59A45] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Patron Experiences & Community Voices</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#350C15] tracking-tight font-normal">
            Boutique Feedback & Reviews
          </h2>
          <div className="w-12 h-0.5 bg-[#C59A45] mx-auto mt-3 mb-3"></div>
          <p className="text-sm sm:text-base text-[#6E5D53] font-normal">
            Real stories from patrons across India celebrating Navratri in authentic handlooms,
            bespoke fits, and festive silhouettes.
          </p>
        </div>

        {/* Trust Badges Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="bg-white rounded-2xl border border-[#E8DFC8] p-4 text-center shadow-2xs">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] flex items-center justify-center mx-auto mb-2 text-[#C59A45]">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#350C15] font-serif">4.9 / 5.0</div>
            <div className="text-[11px] text-[#8C7A6B] mt-0.5">Average Patron Rating</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8DFC8] p-4 text-center shadow-2xs">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] flex items-center justify-center mx-auto mb-2 text-[#C59A45]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#350C15] font-serif">100% Real</div>
            <div className="text-[11px] text-[#8C7A6B] mt-0.5">Verified Handloom Weaves</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8DFC8] p-4 text-center shadow-2xs">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] flex items-center justify-center mx-auto mb-2 text-[#C59A45]">
              <Truck className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#350C15] font-serif">99.2%</div>
            <div className="text-[11px] text-[#8C7A6B] mt-0.5">On-Time Festive Delivery</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8DFC8] p-4 text-center shadow-2xs">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] flex items-center justify-center mx-auto mb-2 text-[#C59A45]">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#350C15] font-serif">480+ Weaves</div>
            <div className="text-[11px] text-[#8C7A6B] mt-0.5">Celebrated this Season</div>
          </div>
        </div>

        {/* Action Row: Category Filter Tabs & "Leave Feedback" Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#350C15] text-[#FAF7F2] shadow-xs'
                    : 'bg-white text-[#6E5D53] border border-[#E8DFC8] hover:border-[#C59A45]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C59A45] hover:bg-[#B38936] text-[#24060C] text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{isFormOpen ? 'Close Form' : 'Share Your Experience'}</span>
          </button>
        </div>

        {/* Feedback Submission Form */}
        {isFormOpen && (
          <div className="bg-white rounded-3xl border-2 border-[#C59A45]/60 p-5 sm:p-8 mb-10 shadow-lg animate-fade-in max-w-3xl mx-auto">
            <div className="border-b border-[#E8DFC8] pb-3 mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-[#350C15] font-medium">
                  Share Your Boutique Feedback
                </h3>
                <p className="text-xs text-[#8C7A6B] mt-0.5">
                  Help fellow patrons choose the perfect festive weave.
                </p>
              </div>
              <span className="text-[11px] bg-[#FAF7F2] border border-[#E8DFC8] text-[#C59A45] px-3 py-1 rounded-full font-semibold">
                AAROHI Patron Review
              </span>
            </div>

            {formSuccess ? (
              <div className="p-6 rounded-2xl bg-[#E8F8F5] text-[#0E6251] border border-[#A2D9CE] text-center space-y-2 animate-fade-in">
                <CheckCircle className="w-8 h-8 mx-auto text-[#0E6251]" />
                <h4 className="font-serif text-lg font-semibold">Thank You for Your Feedback!</h4>
                <p className="text-xs text-[#117A65]">
                  Your review has been verified and published to the boutique community feedback
                  board.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#350C15] uppercase tracking-wider mb-1.5">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating
                                ? 'fill-[#C59A45] text-[#C59A45]'
                                : 'text-[#E8DFC8]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-[#350C15] ml-2">{rating}.0 / 5.0</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#350C15] uppercase tracking-wider mb-1.5">
                      Feedback Type
                    </label>
                    <select
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value as BoutiqueFeedback['feedbackType'])}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-[#FAF7F2] text-sm text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#C59A45]"
                    >
                      <option value="Fabric Quality">Fabric Quality & Weave Authenticity</option>
                      <option value="Festive Fitting">Festive Fitting & Silhouette</option>
                      <option value="Customer Care">Customer Care & WhatsApp Video Styling</option>
                      <option value="Delivery & Packaging">Delivery, Fall & Pico & Packaging</option>
                    </select>
                  </div>
                </div>

                {/* Name & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#350C15] mb-1">
                      Your Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Radhika Sen"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-[#FAF7F2] text-sm text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#C59A45]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#350C15] mb-1">
                      City / State
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai, Maharashtra"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-[#FAF7F2] text-sm text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#C59A45]"
                    />
                  </div>
                </div>

                {/* Purchased Piece / Item */}
                <div>
                  <label className="block text-xs font-semibold text-[#350C15] mb-1">
                    Design or Garment Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={purchasedItem}
                    onChange={(e) => setPurchasedItem(e.target.value)}
                    placeholder="e.g. Crimson Banarasi Saree or Abhla Mirror Kurti"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-[#FAF7F2] text-sm text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#C59A45]"
                  />
                </div>

                {/* Detailed Feedback */}
                <div>
                  <label className="block text-xs font-semibold text-[#350C15] mb-1">
                    Your Experience & Testimonial <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share how the fabric felt, packaging quality, fitting, or your experience with our team..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFC8] bg-[#FAF7F2] text-sm text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#C59A45] resize-none"
                  />
                </div>

                {/* Footer buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1B4332] hover:text-[#0E6251] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#55D688]" />
                    <span>Send directly to Boutique Desk via WhatsApp</span>
                  </a>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-xs font-medium text-[#6E5D53] hover:bg-[#FAF7F2] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#350C15] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-all duration-150 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Post Feedback</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Feedback Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E8DFC8] p-5 sm:p-6 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header: Feedback Type Pill & Stars */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] text-[#350C15]">
                    {item.feedbackType}
                  </span>

                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= item.rating
                            ? 'fill-[#C59A45] text-[#C59A45]'
                            : 'text-[#E8DFC8]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Purchased Item Highlight */}
                {item.purchasedItem && (
                  <div className="text-[11px] font-medium text-[#C59A45] mb-2 truncate">
                    Piece: {item.purchasedItem}
                  </div>
                )}

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-[#3E332A] leading-relaxed italic mb-4">
                  "{item.comment}"
                </p>
              </div>

              {/* Author & Location */}
              <div className="pt-3 border-t border-[#FAF7F2] flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#241A1C] font-serif">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#8C7A6B]">{item.city}</p>
                </div>
                <span className="text-[10px] text-[#A89F91] font-mono">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
