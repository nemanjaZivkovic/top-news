import React from 'react';
import Layout from './components/Layout/Layout';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Article from './containers/Article/Article';
import TopNews from './containers/TopNews/TopNews';
import Categories from './containers/Categories/Categories';

function App() {
	return (
		<Layout>
			<Switch>
				<Route path="/top-news" component={TopNews} />
				<Route path="/categories" component={Categories} />
				<Route path="/search" render={() => <div style={{ color: 'black' }}>Search</div>} />
				<Route path="/article" component={Article} />
				<Redirect to="/categories" />
			</Switch>
		</Layout>
	);
}

export default withRouter(App);
