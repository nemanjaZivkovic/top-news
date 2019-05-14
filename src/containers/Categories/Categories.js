import React from 'react';
import { connect } from 'react-redux';
import CategoryWidget from '../../components/CategoryWidget/CategoryWidget';

const categoryList = [ 'entertainment', 'general', 'health', 'science', 'sports', 'technology' ];

function Categories() {
	return categoryList.map((category) => <CategoryWidget key={category} category={category} />);
}

const mapStateToProps = (state) => ({
	selectedLanguage: state.selectedLanguage
});

export default connect(mapStateToProps)(Categories);
