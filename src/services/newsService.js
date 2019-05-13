const newsApiKey = '77a115023a164b7d91c2c3d59419502b';

export const getHeadlinesByCountry = (countryCode) => {
	var url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${newsApiKey}`;
	var req = new Request(url);
	return fetch(req);
    
/*     return fetch(req).then(function(response) {
		console.log(response.json());
	}); */
};

export const getHeadlinesByTerm = ({term}) => {
	var url = `https://newsapi.org/v2/everything?q=${term}&apiKey=${newsApiKey}`;
	var req = new Request(url);
	return fetch(req);
    
/*     return fetch(req).then(function(response) {
		console.log(response.json());
	}); */
};
