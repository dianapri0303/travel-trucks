import css from './Spinner.module.css';

type Props = {
  size?: 'sm' | 'md';
};

export default function Spinner({ size = 'md' }: Props) {
  return (
    <span
      className={`${css.spinner} ${css[size]}`}
      role="status"
      aria-label="Loading"
    />
  );
}
