import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import classes from './Link.module.scss';
function Link({ children, className, wrapper, ...props }) {
	const wrapperClass = wrapper ? classes['link--wrapper'] : '';
	return (
		<LinkRouter className={[ classes.link, wrapperClass, className ].join(' ')} {...props}>
			{children}
		</LinkRouter>
	);
}

export default Link;
