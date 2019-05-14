import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from '../../components/UI/Link/Link';
import Accordion from '../../components/UI/Accordion/Accordion';
import ArticleCard from '../ArticleCard/ArticleCard';
import { getHeadlinesByCountry } from '../../services/newsService';
import classes from '../CategoryWidget/CategoryWidget.module.scss';

const displayCount = 3;

function CategoryWidget(props) {
	const { category, selectedLanguage } = props;
	const [ loading, setLoading ] = useState(true);
	const [ expanded, setExpanded ] = useState(true);
	const [ articles, setArticles ] = useState([]);
	const [ currentIndex, setSlide ] = useState(0);

	useEffect(
		() => {
			setLoading(true);
			getHeadlinesByCountry({ countryCode: selectedLanguage, category: category })
				.then((resp) => resp.json())
				.then((resp) => {
					console.log(resp);
					setArticles(resp.articles);
					setLoading(false);
				});
		},
		[ selectedLanguage ]
	);

	const carousel = (
		<div className={classes.carrouselWrapper}>
			<Carousel
				className={classes.carrousel}
				centerMode
				centerSlidePercentage={100 / displayCount}
				selectedItem={currentIndex}
				//showStatus={false}
				showIndicators={false}
				showArrows={false}
				showThumbs={false}
				onChange={(e) => console.log('Change', e)}
				onClickItem={(e) => console.log('Item', e)}
				onClickThumb={(e) => console.log('Thumb', e)}
			>
				{articles.map((article) => <ArticleCard className={classes.article} data={article} />)}
			</Carousel>
			<span
				disabled={currentIndex === 0}
				className={[ classes.slidesNav, classes['slidesNav--prev'] ].join(' ')}
				onClick={() => setSlide((currentIndex - 3 + articles.length) % articles.length)}
			>
				{'<'}
			</span>
			<span
				disabled={currentIndex === articles.length}
				className={[ classes.slidesNav, classes['slidesNav--next'] ].join(' ')}
				onClick={() => setSlide((currentIndex + 3) % articles.length)}
			>
				{'>'}
			</span>
		</div>
	);

	return (
		<div className={classes.container}>
			<h1>
				{/* Category headline taking user to the specific category */}
				<Link to={`/category/${category}`} wrapper={true}>
					<span className={classes.name}>{category}</span>{' '}
				</Link>
				<span
					className={classes.expandIcon}
					onClick={() => setExpanded(!expanded)}
					style={{ transform: `rotate(${expanded ? -90 : 90}deg)` }}
				>
					{'>'}
				</span>
			</h1>

			<Accordion className={classes.accordion} expanded={expanded}>
				{loading ? <span>loading</span> : carousel}
			</Accordion>
		</div>
	);
}

const mapStateToProps = (state) => ({
	selectedLanguage: state.selectedLanguage
});

export default connect(mapStateToProps)(CategoryWidget);
