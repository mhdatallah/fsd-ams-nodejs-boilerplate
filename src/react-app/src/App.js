import React from "react";
import AccountsTable from "./AccountsTable";

function App() {

	const accountsTable = {
		display: 'flex',
		justifyContent: 'center',
		padding: '4em'
	}
	return (
		<div style={accountsTable}>
			<AccountsTable />
		</div>
	);
}

export default App;
