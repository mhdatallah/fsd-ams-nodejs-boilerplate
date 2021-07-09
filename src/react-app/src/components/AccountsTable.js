import React from "react";
import MaterialTable, { MTableToolbar } from 'material-table';
import "./AccountsTable.css";
import { getAccounts } from '../api'

function AccountsTable() {

	const [accounts, setAccounts] = React.useState([]);
	const [filteredAccounts, setFilteredAccounts] = React.useState([]);
	const tableRef = React.createRef();

	const fetchAccounts = () => {
		getAccounts()
			.then((response) => {
				setAccounts(response.data.data);
				setFilteredAccounts(response.data.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	const updateFilteredAccounts = (predicate, data) => {
		let tmp = filteredAccounts;
		if (predicate) {
			if (!tmp.includes(data)) {
				tmp.push(data);
			}
		} else {
			if (tmp.includes(data)) {
				tmp.splice(tmp.indexOf(data), 1);
			}
		}
		setFilteredAccounts(tmp);
	}

	React.useEffect(() => {
		fetchAccounts();
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
					filtering: true,
					paging: false,
					search: false
				}}
				columns={[
					{ title: 'ID', field: '_id', filtering: false },
					{ title: 'Balance', field: 'balance', filtering: false },
					{ title: 'Created At', field: 'createdAt', filtering: false },
					{ title: 'Updated At', field: 'updatedAt', filtering: false },
					{
						title: 'Status',
						field: 'status',
						lookup: {
							'pending': 'Pending',
							'approved': 'Approved',
							'funded': 'Funded',
							'closed': 'Closed',
							'suspended': 'Suspended',
						},
						customFilterAndSearch: (term, data) => {
							const predicate = term.length ? term.includes(data.status) : true;
							updateFilteredAccounts(predicate, data);
							return predicate;
						}
					},
				]}
				data={accounts}
				actions={[
					{
						icon: 'refresh',
						tooltip: 'Refresh Data',
						isFreeAction: true,
						onClick: () => fetchAccounts(),
					}
				]}
				components={{
					Toolbar: props => (
						<div>
							<MTableToolbar {...props} />
							<div className="toolbar">
								<p>Total # of accounts: {filteredAccounts.length}</p>
								<p>Total balance: {filteredAccounts.length ? filteredAccounts.reduce((a, b) => a + (b['balance'] || 0), 0) : 0}</p>
							</div>
						</div>
					),
				}}
			/>
		</div>
	);
}

export default AccountsTable;
