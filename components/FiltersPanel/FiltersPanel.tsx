'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/Button/Button';
import type {
  CamperFilters,
  CamperForm,
  Engine,
  Transmission,
} from '@/types/camper';
import css from './FiltersPanel.module.css';

const FORM_OPTIONS: { value: CamperForm; label: string }[] = [
  { value: 'alcove', label: 'Alcove' },
  { value: 'panel_van', label: 'Panel Van' },
  { value: 'integrated', label: 'Integrated' },
  { value: 'semi_integrated', label: 'Semi-Integrated' },
];

const ENGINE_OPTIONS: { value: Engine; label: string }[] = [
  { value: 'diesel', label: 'Diesel' },
  { value: 'petrol', label: 'Petrol' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'electric', label: 'Electric' },
];

const TRANSMISSION_OPTIONS: { value: Transmission; label: string }[] = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'manual', label: 'Manual' },
];

type LocalFilters = {
  location: string;
  form: CamperForm | '';
  engine: Engine | '';
  transmission: Transmission | '';
};

const initialFilters: LocalFilters = {
  location: '',
  form: '',
  engine: '',
  transmission: '',
};

type Props = {
  onSearch: (filters: CamperFilters) => void;
};

export default function FiltersPanel({ onSearch }: Props) {
  const [filters, setFilters] = useState<LocalFilters>(initialFilters);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: CamperFilters = {};
    if (filters.location) params.location = filters.location;
    if (filters.form) params.form = filters.form;
    if (filters.engine) params.engine = filters.engine;
    if (filters.transmission) params.transmission = filters.transmission;
    onSearch(params);
  };

  const handleClear = () => {
    setFilters(initialFilters);
    onSearch({});
  };

  return (
    <aside className={css.panel} aria-label="Camper filters">
      <form
        className={css.form}
        onSubmit={handleSubmit}
        noValidate
        aria-label="Filter campers"
      >
        <div className={css.locationBox}>
          <label htmlFor="location" className={css.locationLabel}>
            Location
          </label>
          <div className={css.locationBadge}>
            <svg
              width={20}
              height={20}
              aria-hidden="true"
              className={clsx(css.mapIcon, filters.location && css.active)}
            >
              <use href="/icons/sprite.svg#icon-map" />
            </svg>
            <input
              id="location"
              type="text"
              name="location"
              autoComplete="address-level2"
              className={css.locationInput}
              placeholder="City"
              value={filters.location}
              onChange={e =>
                setFilters(f => ({ ...f, location: e.target.value }))
              }
            />
          </div>
        </div>

        <div className={css.filtersBox}>
          <h2 className={css.filtersTitle}>Filters</h2>

          <FilterGroup
            label="Camper form"
            name="form"
            options={FORM_OPTIONS}
            value={filters.form}
            onChange={val => setFilters(f => ({ ...f, form: val }))}
          />

          <FilterGroup
            label="Engine"
            name="engine"
            options={ENGINE_OPTIONS}
            value={filters.engine}
            onChange={val => setFilters(f => ({ ...f, engine: val }))}
          />

          <FilterGroup
            label="Transmission"
            name="transmission"
            options={TRANSMISSION_OPTIONS}
            value={filters.transmission}
            onChange={val => setFilters(f => ({ ...f, transmission: val }))}
          />
        </div>

        <div className={css.buttonsBox}>
          <Button type="submit" className={css.searchBtn}>
            Search
          </Button>
          <button type="button" className={css.clearBtn} onClick={handleClear}>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M17.25 17.25L6.75 6.75M17.25 6.75L6.75 17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Clear filters
          </button>
        </div>
      </form>
    </aside>
  );
}

type FilterGroupProps<T extends string> = {
  label: string;
  name: string;
  options: { value: T; label: string }[];
  value: T | '';
  onChange: (val: T | '') => void;
};

function FilterGroup<T extends string>({
  label,
  name,
  options,
  value,
  onChange,
}: FilterGroupProps<T>) {
  return (
    <fieldset className={css.filterGroup}>
      <legend className={css.groupLabel}>{label}</legend>
      <div className={css.options}>
        {options.map(opt => (
          <label key={opt.value} className={css.option}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              className={css.radio}
              onChange={() => onChange(value === opt.value ? '' : opt.value)}
            />
            <span className={css.circle} />
            <span className={css.optionText}>{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
