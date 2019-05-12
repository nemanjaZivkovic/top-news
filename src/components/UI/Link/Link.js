import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import classes from './Link.module.scss';
function Link({ children, className, ...props }) {
	return (
		<LinkRouter className={[ classes.link, className ].join(' ')} {...props}>
			{children}
		</LinkRouter>
	);
}

export default Link;
