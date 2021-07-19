import React from "react";
import styled from 'styled-components';
import AccountsPage from "./views/AccountsPage/AccountsPage";
import {
	BrowserRouter as Router,
	Route,
} from "react-router-dom";

function App() {
	return (
		<Page data-testid="app">
			<Router>
				{/* Serve the Accounts Page by default */}
				<Route path={["/", "/accounts"]} component={AccountsPage} />
			</Router>
		</Page>
	);
}

const Page = styled.div`
	padding: 4em;
`;

export default App;
