'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createBooking } from '@/lib/api';
import Spinner from '@/components/Spinner/Spinner';
import css from './BookingForm.module.css';

type Props = {
  camperId: string;
};

export default function BookingForm({ camperId }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: () => createBooking(camperId, { name, email }),
    onSuccess: () => {
      toast.success('Booking successful!');
      setName('');
      setEmail('');
    },
  });

  return (
    <form
      className={css.form}
      onSubmit={e => {
        e.preventDefault();
        mutate();
      }}
    >
      <div className={css.titleGroup}>
        <h2 className={css.title}>Book your campervan now</h2>
        <p className={css.description}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <div className={css.fields}>
        <input
          className={css.input}
          type="text"
          placeholder="Name*"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className={css.input}
          type="email"
          placeholder="Email*"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <button className={css.sendBtn} type="submit" disabled={isPending}>
        {isPending ? <Spinner size="sm" /> : 'Send'}
      </button>
    </form>
  );
}
