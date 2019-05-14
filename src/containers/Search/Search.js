import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getHeadlinesByCountry } from '../../services/newsService';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import GridList from '../../components/UI/GridList/GridList';
import Button from '../../components/UI/Button/Button';
import { useFormInput } from '../../customHooks/formInput';
import classes from './Search.module.scss';

const countryLabels = [ { value: 'GB', label: 'Great Britain' }, { value: 'US', label: 'United States' } ];

function Search(props) {
	const { selectedLanguage, history, location } = props;
	const [ articles, setArticles ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	const isFirstRun = useRef(true);
	const queryInput = useFormInput({
		defaultValue: '',
		rules: { minLength: 2, maxLength: 20, required: true }
	});

	useEffect(()=>{
		console.log('location', location);
		const params = new URLSearchParams(location.search);
		const queryParam = params.get('q');
		if(queryParam){
			console.log(queryParam);
			queryInput.setValue(queryParam);
		}
	},[])

	// observe query change
	useEffect(
		() => {
				console.log('query on change');
				fetchCategories();
		},
		[ location.search ]
	);

	// observe language change
/* 	useEffect(
		() => {
			console.log('language fetching');

			if (queryInput.value) {
				console.log('language fetching success');

				fetchCategories();
			}
		},
		[ selectedLanguage ]
	); */

	const updateQuery = () => {
		history.push(`/search?q=${queryInput.value.trim()}`);
	};

	function fetchCategories() {
		console.log('Fetching');
		setLoading(true);
		getHeadlinesByCountry({ countryCode: selectedLanguage, term: queryInput.value })
			.then((resp) => resp.json())
			.then((resp) => {
				setArticles(resp.articles);
				setLoading(false);
				if (resp.status === 'error') {
					queryInput.setError(resp.message);
				} else {
					updateQuery();
				}
			});
	}

	const Articles = () => {
		let content;
		if (articles && articles.length) {
			content = (
				<GridList className={classes.articles}>
					{articles.map((article, index) => <ArticleCard key={index} data={article} hoverZoom />)}
				</GridList>
			);
		} else if (articles && queryInput.touched) {
			content = (
				<div className={classes.noResults}>
					no results
					<span>:(</span>
					Try something else?
				</div>
			);
		} else {
			content = null;
		}
		return content;
	};

	const submitHandle = (e) => {
		e.preventDefault();

		if (!queryInput.error) {
			fetchCategories();
		}
	};

	const countryName = countryLabels.find((country) => selectedLanguage === country.value).label;

	return (
		<div className={classes.container}>
			{JSON.stringify(queryInput.touched)}
			<h1>Search top news from {countryName}:</h1>
			<form onSubmit={submitHandle}>
				<input autoFocus type="search" placeholder="What would you like to know" {...queryInput} />
				<Button className={classes.query} disabled={Boolean(queryInput.error) || loading}>
					search
				</Button>
				<span className={classes.error}>{queryInput.error}</span>
			</form>
			{loading ? <h1>loading</h1> : Articles()}
		</div>
	);
}

const mapStateToProps = (state) => ({
	selectedLanguage: state.selectedLanguage
});

export default connect(mapStateToProps)(Search);
