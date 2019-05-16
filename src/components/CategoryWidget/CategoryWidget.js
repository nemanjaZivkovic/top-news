import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { withWindowSizeListener } from 'react-window-size-listener';
import { getHeadlinesByCountry } from '../../services/newsService';
import Link from '../../components/UI/Link/Link';
import Accordion from '../../components/UI/Accordion/Accordion';
import ArticleCard from '../ArticleCard/ArticleCard';
import Loader from '../../components/UI/Loader/Loader';
import classes from '../CategoryWidget/CategoryWidget.module.scss';

function CategoryWidget(props) {
	const { category, selectedLanguage, windowSize: { windowWidth } } = props;
	const [ loading, setLoading ] = useState(true);
	const [ expanded, setExpanded ] = useState(true);
	const [ articles, setArticles ] = useState([]);
	const [ currentIndex, setSlide ] = useState(0);
	const [ displayCount, setDisplayCount ] = useState(3);

	// observe the window width, and update the number of slides
	useEffect(
		() => {
			if (windowWidth) {
				if (windowWidth > 2000) {
					setDisplayCount(4);
				} else if (windowWidth >= 750 && windowWidth < 1100) {
					setDisplayCount(2);
				} else if (windowWidth < 750) {
					setDisplayCount(1);
				} else {
					setDisplayCount(3);
				}
			}
		},
		[ windowWidth ]
	);

	// observe the language change, and fetch on change
	useEffect(
		() => {
			setLoading(true);
			getHeadlinesByCountry({ countryCode: selectedLanguage, category: category, pageSize: 5 })
				.then((resp) => resp.json())
				.then((resp) => {
					setArticles(resp.articles);
					if (resp.articles && resp.articles.length < displayCount) {
						setDisplayCount(resp.articles.length);
					}
					setLoading(false);
				});
		},
		[ selectedLanguage ]
	);

	const carousel = () => (
		<div className={classes.carrouselWrapper}>
			<Carousel
				className={classes.carrousel}
				centerMode
				centerSlidePercentage={100 / displayCount}
				selectedItem={currentIndex}
				showStatus={false}
				showIndicators={false}
				showArrows={false}
				showThumbs={false}
			>
				{articles.map((article) => <ArticleCard className={classes.article} data={article} />)}
			</Carousel>
			<span
				disabled={currentIndex === 0}
				className={[ classes.slidesNav, classes['slidesNav--prev'] ].join(' ')}
				onClick={() => setSlide(Math.max(0, currentIndex - displayCount))}
			>
				{'<'}
			</span>
			<span
				disabled={currentIndex + displayCount >= articles.length}
				className={[ classes.slidesNav, classes['slidesNav--next'] ].join(' ')}
				onClick={() => setSlide(Math.min(currentIndex + displayCount, articles.length))}
			>
				{'>'}
			</span>
		</div>
	);

	return articles ? (
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
				{loading ? <div style={{minHeight: '150px'}}><Loader /> </div>: carousel()}
			</Accordion>
		</div>
	) : null;
}

const mapStateToProps = (state) => ({
	selectedLanguage: state.selectedLanguage
});

export default connect(mapStateToProps)(withWindowSizeListener(CategoryWidget));
