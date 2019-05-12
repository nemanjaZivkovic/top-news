import React from 'react';
import Link from '../../UI/Link/Link';
import LanguageSelect from './LanguageSelect/LanguageSelect';
import classes from './Header.module.scss';

function Header() {
	return (
		<header className={classes.header}>
			<ul>
				<li>
					<Link to="/top-news">top news</Link>
				</li>
				<li>
					<Link to="/categories">categories</Link>
				</li>
				<li>
					<Link to="/search">search</Link>
				</li>
			</ul>

			<LanguageSelect />
		</header>
	);
}

export default Header;
