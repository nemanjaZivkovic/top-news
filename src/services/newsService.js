const newsApiKey = '77a115023a164b7d91c2c3d59419502b';

export const getHeadLinesByCountry = (countryCode) => {
	var url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${newsApiKey}`;
	var req = new Request(url);
	return fetch(req);
    
/*     return fetch(req).then(function(response) {
		console.log(response.json());
	}); */
};
