const newsApiKey = '77a115023a164b7d91c2c3d59419502b';

export const getHeadlinesByCountry = ({ countryCode, category, term }) => {
	const categoryParam = category ? `&category=${category}` : '';
	const termParam = term ? `&q=${term}` : '';
	const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}${categoryParam}${termParam}&apiKey=${newsApiKey}`;
	const req = new Request(url);
	return fetch(req);
};
