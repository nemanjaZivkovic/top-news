import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { languageDisableSet, languageDisableUnset } from '../../store/actions/languageActions';
import classes from './Article.module.scss';
import Button from '../../components/UI/Button/Button';

function Article(props) {
	const { disableLanguageChange, enableLanguageChange, selectedLanguage, location, history } = props;
	const [ article, setArticle ] = useState(true);

	useEffect(() => {
		// if there is no article data route user to homepage
		const articleData = location.state;
		if (!articleData) {
			history.push('/');
		} else {
			setArticle(articleData);
		}

		disableLanguageChange();
		return () => {
			enableLanguageChange();
		};
	}, []);

	const goBackClickHandler = () => {
		history.goBack();
	};

	return (
		<div className={classes.container}>
			<h1>{article.title}</h1>
			<img
				style={{ maxWidth: '100%', maxHeight: '50vh', marginBottom: '20px' }}
				src={article.urlToImage}
				alt="article cover"
			/>
			<p>{article.description}</p>
			<Button onClick={goBackClickHandler}>
				<span>{'<'}</span>
				go back
			</Button>
		</div>
	);
}

const mapStateToProps = (state) => ({
	selectedLanguage: state.language
});

const mapDispatchToProps = (dispatch) => ({
	disableLanguageChange: () => dispatch(languageDisableSet()),
	enableLanguageChange: () => dispatch(languageDisableUnset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
