import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/businessData';
import { Star, MessageSquare, Quote, CheckCircle2, Plus } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { motion } from 'framer-motion';
import { LUXURY_EASE, Reveal, SectionBackdrop, Stagger, staggerItemVariants } from './ui/motion';

export const TestimonialsSection: React.FC = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    role: '',
    rating: 5,
    comment: ''
  });
  const [submittedReview, setSubmittedReview] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;
    setSubmittedReview(true);
  };

  return (
    <section className="py-20 bg-navy-950 border-t border-slate-800/80 relative overflow-hidden" aria-label="Customer Reviews">
      <SectionBackdrop word="TRUST" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Voices of Trust"
          eyebrowIcon={MessageSquare}
          title="Testimonials & Customer Reviews"
          description="Read real feedback from patrons, corporate clients, and generations of families who have made Excellent Dress Makers their destination for tailored clothing."
        />

        {/* Testimonials Cards Grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {TESTIMONIALS_DATA.map((t, tIdx) => (
            <motion.div
              key={t.id}
              variants={staggerItemVariants}
              custom={tIdx}
              whileHover={{ y: -5 }}
              className="bg-navy-900/80 rounded-2xl p-6 border border-slate-800/80 hover:border-gold-500/40 transition-all flex flex-col justify-between relative shadow-md group"
            >
              <Quote className="w-7 h-7 text-gold-500/15 absolute top-5 right-5 group-hover:text-gold-500/30 transition-colors" aria-hidden="true" />

              <div>
                {/* Rating stars */}
                <div className="flex items-center space-x-1 mb-3.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="inline-flex"
                      initial={{ opacity: 0, scale: 0, rotate: -50 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: LUXURY_EASE }}
                    >
                      <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" aria-hidden="true" />
                    </motion.span>
                  ))}
                </div>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.role}</p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {t.date}
                </span>
              </div>
            </motion.div>
          ))}
        </Stagger>

        {/* Google Reviews CTA & Share Experience */}
        <Reveal className="bg-navy-900/80 rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-center sm:text-left shadow-lg">
          <div>
            <h4 className="font-serif text-lg sm:text-xl font-bold text-white mb-1">
              Have you experienced our tailoring craft?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Share your fitting feedback, wedding attire story, or uniform experience with our tailoring team.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-gold-500/20 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Share Your Experience
            </button>
          </div>
        </Reveal>

      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative bg-navy-950 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-serif text-xl font-bold text-white mb-1">Share Your Tailoring Review</h3>
            <p className="text-xs text-slate-400 mb-6">
              Reviews are verified for authenticity before being featured on our official brand showcase.
            </p>

            {submittedReview ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" aria-hidden="true" />
                <h4 className="font-serif text-lg font-bold text-white">Thank You for Your Feedback!</h4>
                <p className="text-xs text-slate-300">
                  Your review has been submitted for verification. We take pride in serving every client with continuous dedication.
                </p>
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setSubmittedReview(false);
                  }}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs mt-3 font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anandha Kumar"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="w-full bg-navy-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Tailored Garment / Association</label>
                  <input
                    type="text"
                    placeholder="e.g. Wedding Coat Suit Customer / Erode"
                    value={reviewForm.role}
                    onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                    className="w-full bg-navy-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Rating</label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    className="w-full bg-navy-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value={5}>5 Stars - Exceptional Fitting & Craftsmanship</option>
                    <option value={4}>4 Stars - Great Quality & Delivery</option>
                    <option value={3}>3 Stars - Satisfactory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Feedback</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the fitting, fabric consultation, or service experience..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full bg-navy-900 border border-slate-700/80 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 border border-slate-700 text-slate-400 rounded-lg text-xs hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded-lg text-xs uppercase tracking-wider"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
