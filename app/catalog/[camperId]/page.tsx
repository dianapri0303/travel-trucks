'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import { getCamperById, getCamperReviews } from '@/lib/api';
import {
  ENGINE_LABELS,
  TRANSMISSION_LABELS,
  FORM_LABELS,
  AMENITY_LABELS,
} from '@/lib/labels';
import Spinner from '@/components/Spinner/Spinner';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import BookingForm from '@/components/BookingForm/BookingForm';
import css from './page.module.css';

export default function CamperDetailsPage() {
  const { camperId } = useParams<{ camperId: string }>();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const {
    data: camper,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['camper', camperId],
    queryFn: () => getCamperById(camperId),
    enabled: !!camperId,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', camperId],
    queryFn: () => getCamperReviews(camperId),
    enabled: !!camperId,
  });

  if (isLoading) {
    return (
      <main className={css.page}>
        <div className={css.loaderBox}>
          <Spinner />
        </div>
      </main>
    );
  }

  if (isError || !camper) {
    return (
      <main className={css.page}>
        <p className={css.message}>Something went wrong.</p>
      </main>
    );
  }

  const formLabel = FORM_LABELS[camper.form] ?? camper.form;

  const badges = [
    TRANSMISSION_LABELS[camper.transmission] ?? camper.transmission,
    ENGINE_LABELS[camper.engine] ?? camper.engine,
    ...camper.amenities.map(a => AMENITY_LABELS[a] ?? a),
    formLabel,
  ];

  const specs = [
    { label: 'Form', value: formLabel },
    { label: 'Length', value: camper.length },
    { label: 'Width', value: camper.width },
    { label: 'Height', value: camper.height },
    { label: 'Tank', value: camper.tank },
    { label: 'Consumption', value: camper.consumption },
  ];

  return (
    <main className={css.page}>
      <div className={css.topSection}>
        <div className={css.gallery}>
          <Swiper
            modules={[Navigation, Thumbs]}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            navigation
            className={css.mainSwiper}
          >
            {camper.gallery.map((img, i) => (
              <SwiperSlide key={img.id}>
                <div className={css.mainImageFrame}>
                  <Image
                    src={img.original}
                    alt={camper.name}
                    fill
                    sizes="638px"
                    style={{ objectFit: 'cover' }}
                    priority={i === 0}
                    loading={i === 0 ? 'eager' : undefined}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            modules={[FreeMode, Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={32}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            className={css.thumbsSwiper}
          >
            {camper.gallery.map((img, i) => (
              <SwiperSlide key={img.id}>
                <div className={css.thumbWrapper}>
                  <Image
                    src={img.thumb}
                    alt=""
                    fill
                    sizes="135px"
                    priority={i === 0}
                    loading={i === 0 ? 'eager' : undefined}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={css.infoContainer}>
          <div className={css.topDetails}>
            <div className={css.titleSection}>
              <h1 className={css.name}>{camper.name}</h1>
              <div className={css.metaRow}>
                <div className={css.rating}>
                  <svg width={16} height={16} aria-hidden="true">
                    <use href="/icons/sprite.svg#icon-star" />
                  </svg>
                  <span>
                    {camper.rating}({camper.totalReviews} Reviews)
                  </span>
                </div>
                <div className={css.location}>
                  <svg width={16} height={16} aria-hidden="true">
                    <use href="/icons/sprite.svg#icon-map" />
                  </svg>
                  <span>
                    {camper.location.split(', ').reverse().join(', ')}
                  </span>
                </div>
              </div>
              <p className={css.price}>
                €{camper.price.toLocaleString('en-US')}
              </p>
            </div>
            <p className={css.description}>{camper.description}</p>
          </div>

          <div className={css.vehicleDetails}>
            <div className={css.vehicleHeader}>
              <h2 className={css.vehicleTitle}>Vehicle details</h2>
              <div className={css.badges}>
                {badges.map(label => (
                  <span key={label} className={css.badge}>
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <hr className={css.divider} />

            <dl className={css.specs}>
              {specs.map(({ label, value }) => (
                <div key={label} className={css.specRow}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <section className={css.bottomSection}>
        <h2 className={css.reviewsTitle}>Reviews</h2>
        <div className={css.bottomRow}>
          <ul className={css.reviewsList}>
            {reviews.map(review => (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
          <BookingForm camperId={camperId} />
        </div>
      </section>
    </main>
  );
}
