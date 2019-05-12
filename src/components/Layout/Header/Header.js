import React from 'react';
import Link from '../../UI/Link/Link';
import LanguageSelect from './LanguageSelect/LanguageSelect';
import classes from './Header.module.scss';

function Header() {
	return (
		<header className={classes.header}>
			<ul>
				<li>
					<Link>top news</Link>
				</li>
				<li>
					<Link>categories</Link>
				</li>
				<li>
					<Link>search</Link>
				</li>
			</ul>

			<LanguageSelect />
		</header>
	);
}

export default Header;
