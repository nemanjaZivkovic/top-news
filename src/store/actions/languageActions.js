import * as actionTypes from '../actionTypes';

export const languageSet = (languageCode) => ({
	type: actionTypes.LANGUAGE_SET,
	languageCode
});