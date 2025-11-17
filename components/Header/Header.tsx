/*import Link from 'next/link';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href='/' aria-label='Home'>
        NoteHub
      </Link>
      <nav aria-label='Main Navigation'>
        <ul className={css.navigation}>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/notes/filter/all'>Notes</Link>
          </li>
          </ul>
      </nav>
    </header>
  );
};

export default Header;*/
import Link from 'next/link'
import css from './Header.module.css'
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation" className={css.navigation}>
        <ul className={css.navigation}>
          <li>
            <Link className={css.headerLink} href="/">Home</Link>
          </li>
        </ul>
        <ul className={css.navigation}>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}

