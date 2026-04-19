'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo} aria-label="Home">
          <svg width={136} height={16} aria-hidden="true">
            <use href="/icons/sprite.svg#logo" />
          </svg>
        </Link>
        <nav className={css.nav} aria-label="Main navigation">
          <ul className={css.list}>
            <li className={css.navItem}>
              <Link
                href="/"
                className={clsx(css.link, pathname === '/' && css.activeLink)}
              >
                Home
              </Link>
            </li>
            <li className={css.navItem}>
              <Link
                href="/catalog"
                className={clsx(
                  css.link,
                  pathname.startsWith('/catalog') && css.activeLink,
                )}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
