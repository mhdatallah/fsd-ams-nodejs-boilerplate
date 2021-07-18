import React from "react";
import styled from 'styled-components';
import AccountsPage from "./components/AccountsPage";

function App() {
	return (
		<Page>
			<AccountsPage />
		</Page>
	);
}

const Page = styled.div`
	padding: 4em;
`;

export default App;
