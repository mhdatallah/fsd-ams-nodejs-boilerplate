import React from "react";
import MaterialTable, { MTableToolbar } from 'material-table';
import "./AccountsTable.css";

function AccountsTable() {

	const [accounts, setAccounts] = React.useState([]);
	const tableRef = React.createRef();

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
				data={() =>
					new Promise(resolve => {
						let url = '/api/accounts/'
						fetch(url)
							.then(response => response.json())
							.then(result => {
								setAccounts(result.data);
								resolve({
									data: result.data,
								})
							})
					})
				}
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
