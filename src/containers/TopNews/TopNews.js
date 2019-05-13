import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from '../../components/UI/Link/Link';
import { getHeadlinesByCountry } from '../../services/newsService';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import GridList from '../../components/UI/GridList/GridList';
import classes from './TopNews.module.scss';

const countryLabels = [ { value: 'GB', label: 'Great Britain' }, { value: 'US', label: 'United States' } ];

function TopNews(props) {
	const { selectedLanguage } = props;
	const [ articles, setArticles ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		setLoading(true);
		getHeadlinesByCountry(selectedLanguage).then((resp) => resp.json()).then((resp) => {
			console.log(resp);
			setLoading(false);
			setArticles(resp.articles);
		});
	}, [selectedLanguage]);

	const Articles = (
		<GridList className={classes.articles}>
			{articles.map((article, index) => (
				<Link
					to={{
						pathname: `/article`,
						state: article
					}}
					wrapper={true}
				>
					<ArticleCard key={index} data={article} />
				</Link>
			))}
		</GridList>
	);

	const countryName = countryLabels.find((country) => selectedLanguage === country.value).label;

	return loading ? (
		<h1>loading</h1>
	) : (
		<div>
			<h1>Top news from {countryName}:</h1>
			{Articles}
		</div>
	);
}

const mapStateToProps = (state) => ({
	selectedLanguage: state.selectedLanguage
});

export default connect(mapStateToProps)(TopNews);
