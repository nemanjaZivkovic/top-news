import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getHeadlinesByCountry } from '../../services/newsService';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import GridList from '../../components/UI/GridList/GridList';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import classes from './Category.module.scss';

const categoryList = [ 'entertainment', 'general', 'health', 'science', 'sports', 'technology' ];
const countryLabels = [ { value: 'GB', label: 'Great Britain' }, { value: 'US', label: 'United States' } ];

function Category(props) {
	const { match, history, selectedLanguage } = props;
	const [ articles, setArticles ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const categoryQuery = match.params.category;
	useEffect(
		() => {
			// if there is no matching category from queryParams route user to general categories
			if (categoryQuery && categoryList.includes(categoryQuery)) {
				setLoading(true);
				// @TODO create load more component
				getHeadlinesByCountry({ countryCode: selectedLanguage, category: categoryQuery, pageSize: 30 })
					.then((resp) => resp.json())
					.then((resp) => {
						console.log(resp);
						setLoading(false);
						setArticles(resp.articles);
					});
			} else {
				history.push('/categories');
			}
		},
		[ selectedLanguage ]
	);

	const Articles = (
		<GridList className={classes.articles}>
			{articles.map((article, index) => <ArticleCard key={index} data={article} hoverZoom />)}
		</GridList>
	);

	const countryName = countryLabels.find((country) => selectedLanguage === country.value).label;

	const goBackClickHandler = () => {
		history.goBack();
	};

	return loading ? (
		<Loader />
	) : (
		<div className={classes.container}>
			<h1>
				Top {categoryQuery} news from {countryName}:
			</h1>
			{Articles}
			<Button onClick={goBackClickHandler}>
				<span>{'<'}</span>
				go back
			</Button>
		</div>
	);
}

const mapStateToProps = (state) => ({
	selectedLanguage: state.selectedLanguage
});

export default connect(mapStateToProps)(Category);
