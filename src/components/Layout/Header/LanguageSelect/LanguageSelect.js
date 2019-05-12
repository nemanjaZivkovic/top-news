import React from 'react';
import Button from '../../../UI/Button/Button';
import classes from './LanguageSelect.module.scss';

function LanguageSelect() {
	return (
		<div className={classes.languageSelect}>
			<Button>gb</Button>
			<Button>us</Button>
		</div>
	);
}

export default LanguageSelect;
