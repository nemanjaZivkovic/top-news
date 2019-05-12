import React from 'react';
import classes from './Button.module.scss';
function Button(props) {
	const { variant, children } = props;
	let variantClass;
	switch (variant) {
		case 'attention':
		default:
	}
	return <button className={classes.button}>{children}</button>;
}

export default Button;
