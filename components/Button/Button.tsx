import clsx from 'clsx';
import Link from 'next/link';
import css from './Button.module.css';

type ButtonProps = {
  href?: string;
  target?: '_blank' | '_self';
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export default function Button({
  href,
  target,
  rel,
  onClick,
  children,
  type = 'button',
  className,
}: ButtonProps) {
  const buttonClassName = clsx(css.button, className);

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={buttonClassName}
      >
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
