import React, { useState } from 'react';
import classes from './ArticleCard.module.scss';
import Button from '../UI/Button/Button';
import ConditionalTruncate from '../ConditionalTruncate/ConditionalTruncate';

function ArticleCard(props) {
	const { data } = props;
	const [ hovering, setHovering ] = useState(false);
	const imgStyle = { backgroundImage: `url(${data.urlToImage})` };

	const mouseEnterHandler = () => {
		setHovering(true);
	};

	const mouseLeaveHandler = () => {
		setHovering(false);
	};

	return (
		<article className={classes.card} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
			{/* Image */}
			<div className={classes.image} style={imgStyle} />
			{/* Title */}
			<div className={classes.title}>
				<ConditionalTruncate condition={!hovering} lines={2}>
					{data.title}
				</ConditionalTruncate>
			</div>
			{/* Description */}
			<div className={classes.description}>
				<ConditionalTruncate condition={!hovering} lines={2}>
					{data.description}
				</ConditionalTruncate>
				<Button className={classes.moreCta}>
					more <span>></span>
				</Button>
			</div>
		</article>
	);
}

export default ArticleCard;
