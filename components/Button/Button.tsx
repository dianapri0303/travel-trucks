import clsx from 'clsx';
import Link from 'next/link';
import css from './Button.module.css';

type ButtonProps = {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export default function Button({
  href,
  onClick,
  children,
  type = 'button',
  className = '',
}: ButtonProps) {
  const buttonClassName = clsx(css.button, className);

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonClassName}>
      {children}
    </button>
  );
}
