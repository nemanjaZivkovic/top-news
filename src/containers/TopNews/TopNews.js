import React, { useState, useEffect } from 'react';
import { getHeadLinesByCountry } from '../../services/newsService';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import GridList from '../../components/UI/GridList/GridList';
import classes from './TopNews.module.scss';

function TopNews() {
	const [ articles, setArticles ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		getHeadLinesByCountry('us').then((resp) => resp.json()).then((resp) => {
			console.log(resp);
			setLoading(false);
			setArticles(resp.articles);
		});
	}, []);

	const Articles = (
		<GridList className={classes.articles}>
			{articles.map((article, index) => (
				<ArticleCard
					key={index}
					data={article}
				/>
			))}
		</GridList>
	);

	return loading ? (
		<h1>loading</h1>
	) : (
		<div>
			<h1>Top news from Great Britain:</h1>
			{Articles}
		</div>
	);
}

export default TopNews;
