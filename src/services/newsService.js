const newsApiKey = '77a115023a164b7d91c2c3d59419502b';

export const getHeadlinesByCountry = ({ countryCode, category }) => {
	const categoryParam = category ? `&category=${category}` : '';
	const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}${categoryParam}&apiKey=${newsApiKey}`;
	const req = new Request(url);
	return fetch(req);
};

export const getHeadlinesByTerm = ({ term }) => {
	const url = `https://newsapi.org/v2/everything?q=${term}&apiKey=${newsApiKey}`;
	const req = new Request(url);
	return fetch(req);
};
