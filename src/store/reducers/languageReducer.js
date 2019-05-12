import * as actionTypes from '../actionTypes';

const initialState = {
	language: 'US'
};

const languageSet = (action) => ({ language: action });

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LANGUAGE_SET:
			return languageSet(action);
		default:
			return state;
	}
};

export default reducer;
