import Image from 'next/image';
import Button from '@/components/Button/Button';
import type { CamperListItem } from '@/types/camper';
import { ENGINE_LABELS, TRANSMISSION_LABELS, FORM_LABELS } from '@/lib/labels';
import css from './CamperCard.module.css';

type Props = {
  camper: CamperListItem;
};

export default function CamperCard({ camper }: Props) {
  const badges = [
    {
      icon: 'icon-petrol',
      label: ENGINE_LABELS[camper.engine] ?? camper.engine,
    },
    {
      icon: 'icon-transmission',
      label: TRANSMISSION_LABELS[camper.transmission] ?? camper.transmission,
    },
    {
      icon: 'icon-car',
      label: FORM_LABELS[camper.form] ?? camper.form,
    },
  ];

  return (
    <li className={css.card}>
      <div className={css.imageFrame}>
        <Image
          src={camper.coverImage}
          alt={camper.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(min-width: 768px) 219px, 100vw"
        />
      </div>

      <div className={css.info}>
        <div className={css.header}>
          <div className={css.titleGroup}>
            <h2 className={css.name}>{camper.name}</h2>
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
                <span>{camper.location.split(', ').reverse().join(', ')}</span>
              </div>
            </div>
          </div>
          <span className={css.price}>
            €{camper.price.toLocaleString('en-US')}
          </span>
        </div>

        {camper.description && (
          <p className={css.description}>{camper.description}</p>
        )}

        <div className={css.badges}>
          {badges.map(({ icon, label }) => (
            <span key={`${icon}-${label}`} className={css.badge}>
              <svg width={20} height={20} aria-hidden="true">
                <use href={`/icons/sprite.svg#${icon}`} />
              </svg>
              <span>{label}</span>
            </span>
          ))}
        </div>

        <Button
          href={`/catalog/${camper.id}`}
          target="_blank"
          className={css.showMore}
        >
          Show more
        </Button>
      </div>
    </li>
  );
}
