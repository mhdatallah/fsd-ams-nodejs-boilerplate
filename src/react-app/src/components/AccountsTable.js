import React from "react";
import MaterialTable, { MTableToolbar } from 'material-table';
import "./AccountsTable.css";
import { getAccounts } from '../api'

function AccountsTable() {

	const [accounts, setAccounts] = React.useState([]);
	const tableRef = React.createRef();

	React.useEffect(() => {
		getAccounts()
			.then((response) => {
				setAccounts(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="container">
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/icon?family=Material+Icons"
			/>
			<MaterialTable
				title="Accounts"
				tableRef={tableRef}
				options={{
					paging: false,
					search: false
				}}
				columns={[
					{ title: 'ID', field: '_id' },
					{ title: 'Balance', field: 'balance' },
					{ title: 'Created At', field: 'createdAt' },
					{ title: 'Updated At', field: 'updatedAt' },
					{ title: 'Status', field: 'status' },
				]}
				data={accounts}
				actions={[
					{
						icon: 'refresh',
						tooltip: 'Refresh Data',
						isFreeAction: true,
						onClick: () => tableRef.current && tableRef.current.onQueryChange(),
					}
				]}
				components={{
					Toolbar: props => (
						<div>
							<MTableToolbar {...props} />
							<div className="toolbar">
								<p>Total # of accounts: {accounts.length}</p>
								<p>Total balance: {accounts.length ? accounts.reduce((a, b) => a + (b['balance'] || 0), 0) : 0}</p>
							</div>
						</div>
					),
				}}
			/>
		</div>
	);
}

export default AccountsTable;
