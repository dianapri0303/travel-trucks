import type { Review } from '@/types/camper';
import css from './ReviewCard.module.css';

const TOTAL_STARS = 5;

type Props = {
  review: Review;
};

export default function ReviewCard({ review }: Props) {
  const initial = review.reviewer_name.charAt(0).toUpperCase();

  return (
    <div className={css.card}>
      <div className={css.topGroup}>
        <div className={css.avatar}>
          <span className={css.initial}>{initial}</span>
        </div>
        <div className={css.nameGroup}>
          <span className={css.name}>{review.reviewer_name}</span>
          <div className={css.stars}>
            {Array.from({ length: TOTAL_STARS }, (_, i) =>
              i < review.reviewer_rating ? (
                <svg
                  key={i}
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className={css.starFilled}
                >
                  <use href="/icons/sprite.svg#icon-star" />
                </svg>
              ) : (
                <svg
                  key={i}
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className={css.starEmpty}
                >
                  <use href="/icons/sprite.svg#icon-star-empty" />
                </svg>
              ),
            )}
          </div>
        </div>
      </div>
      <p className={css.comment}>{review.comment}</p>
    </div>
  );
}
