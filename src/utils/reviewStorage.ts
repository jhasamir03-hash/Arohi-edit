import { ProductReview, BoutiqueFeedback } from '../types';
import { SAMPLE_CATALOGUE_FEEDBACK } from '../data/feedback';

const PRODUCT_REVIEWS_STORAGE_KEY = 'azoria_product_reviews_v1';
const CATALOGUE_FEEDBACK_STORAGE_KEY = 'azoria_catalogue_feedback_v1';

/**
 * Get all reviews for a specific product, merging initial reviews with user-submitted reviews
 */
export function getProductReviews(
  productId: string,
  initialReviews: ProductReview[] = []
): ProductReview[] {
  try {
    const raw = localStorage.getItem(PRODUCT_REVIEWS_STORAGE_KEY);
    if (!raw) return initialReviews;
    const storedMap: Record<string, ProductReview[]> = JSON.parse(raw);
    const customReviews = storedMap[productId] || [];
    return [...customReviews, ...initialReviews];
  } catch {
    return initialReviews;
  }
}

/**
 * Save a new user review for a product
 */
export function saveProductReview(productId: string, review: ProductReview): ProductReview[] {
  try {
    const raw = localStorage.getItem(PRODUCT_REVIEWS_STORAGE_KEY);
    const storedMap: Record<string, ProductReview[]> = raw ? JSON.parse(raw) : {};
    const existing = storedMap[productId] || [];
    storedMap[productId] = [review, ...existing];
    localStorage.setItem(PRODUCT_REVIEWS_STORAGE_KEY, JSON.stringify(storedMap));
    return storedMap[productId];
  } catch (e) {
    console.error('Failed to save product review to local storage', e);
    return [review];
  }
}

/**
 * Calculate average rating and count from a list of reviews
 */
export function calculateRatingStats(reviews: ProductReview[]): {
  averageRating: number;
  reviewCount: number;
  starDistribution: Record<number, number>;
} {
  if (!reviews || reviews.length === 0) {
    return {
      averageRating: 5.0,
      reviewCount: 0,
      starDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }

  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;

  for (const r of reviews) {
    const rounded = Math.min(5, Math.max(1, Math.round(r.rating)));
    distribution[rounded] = (distribution[rounded] || 0) + 1;
    sum += r.rating;
  }

  const avg = Math.round((sum / reviews.length) * 10) / 10;

  return {
    averageRating: avg,
    reviewCount: reviews.length,
    starDistribution: distribution,
  };
}

/**
 * Get all catalogue general feedback
 */
export function getBoutiqueFeedback(): BoutiqueFeedback[] {
  try {
    const raw = localStorage.getItem(CATALOGUE_FEEDBACK_STORAGE_KEY);
    if (!raw) return SAMPLE_CATALOGUE_FEEDBACK;
    const custom: BoutiqueFeedback[] = JSON.parse(raw);
    return [...custom, ...SAMPLE_CATALOGUE_FEEDBACK];
  } catch {
    return SAMPLE_CATALOGUE_FEEDBACK;
  }
}

/**
 * Save new catalogue general feedback
 */
export function saveBoutiqueFeedback(feedback: BoutiqueFeedback): BoutiqueFeedback[] {
  try {
    const raw = localStorage.getItem(CATALOGUE_FEEDBACK_STORAGE_KEY);
    const custom: BoutiqueFeedback[] = raw ? JSON.parse(raw) : [];
    const updated = [feedback, ...custom];
    localStorage.setItem(CATALOGUE_FEEDBACK_STORAGE_KEY, JSON.stringify(updated));
    return [...updated, ...SAMPLE_CATALOGUE_FEEDBACK];
  } catch (e) {
    console.error('Failed to save catalogue feedback', e);
    return [feedback, ...SAMPLE_CATALOGUE_FEEDBACK];
  }
}
