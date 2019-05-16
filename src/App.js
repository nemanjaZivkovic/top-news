import React from 'react';
import Layout from './components/Layout/Layout';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Article from './containers/Article/Article';
import TopNews from './containers/TopNews/TopNews';
import Categories from './containers/Categories/Categories';
import Category from './containers/Category/Category';
import Search from './containers/Search/Search';

function App(props) {
	const {history} = props;
	
	// as this is single page application we need to 'manually' scroll to top on each route change
	history.listen(()=> window.scrollTo(0, 0));

	return (
		<Layout>
			<Switch>
				<Route path="/top-news" component={TopNews} />
				<Route path="/categories" component={Categories} />
				<Route path="/category/:category" component={Category} />
				<Route path="/search" component={Search} />
				<Route path="/article" component={Article} />
				<Redirect to="/top-news" />
			</Switch>
		</Layout>
	);
}

export default withRouter(App);
