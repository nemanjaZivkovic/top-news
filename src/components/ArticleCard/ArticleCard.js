import React from 'react';
import classes from './ArticleCard.module.scss';

function ArticleCard(props) {
	const { data } = props;
	const imgStyle = { backgroundImage: `url(${data.urlToImage})` };

	return (
		<div className={classes.card} style={imgStyle}>
			{data.title}
		</div>
	);
}

export default ArticleCard;
