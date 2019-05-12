import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { languageDisableSet, languageDisableUnset } from '../../store/actions/languageActions';

function Article(props) {
	const { disableLanguageChange, enableLanguageChange } = props;

	useEffect(() => {
		disableLanguageChange();
		return () => {
			enableLanguageChange();
		};
	});

	return (
		<div style={{ color: 'black' }}>
			Article!
			{JSON.stringify(props.match)}
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
