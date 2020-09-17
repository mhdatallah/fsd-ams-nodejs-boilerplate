import React from "react";
import axios from "axios";

function App() {
	const [accounts, setAccounts] = React.useState([]);

	React.useEffect(() => {
		axios
			.get("/api/accounts/")
			.then((response) => {
				setAccounts(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Balance</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{accounts.map((account) => (
						<tr>
							<th>{account.balance}</th>
							<th>{account.status}</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
