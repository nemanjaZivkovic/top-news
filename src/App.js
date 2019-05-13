import React from 'react';
import Layout from './components/Layout/Layout';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Article from './containers/Article/Article';
import TopNews from './containers/TopNews/TopNews';

function App() {
	return (
		<Layout>
			<Switch>
				<Route path="/" exact render={() => <div style={{ color: 'black' }}>Home</div>} />
				<Route path="/top-news" component={TopNews} />
				<Route path="/categories" render={() => <div style={{ color: 'black' }}>Categories</div>} />
				<Route path="/search" render={() => <div style={{ color: 'black' }}>Search</div>} />
				<Route path="/article" component={Article} />
				<Redirect to="/" />
			</Switch>
		</Layout>
	);
}

export default withRouter(App);
