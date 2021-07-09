import React from "react";
import MaterialTable, { MTableToolbar } from 'material-table';
import "./AccountsTable.css";
import { getAccounts, updateAccount } from '../api'

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
				alert('Oops, something went wrong. Please try again later.');
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
					},
					approveData => ({
						icon: 'check',
						tooltip: 'Approve Account',
						hidden: approveData.status != 'pending',
						onClick: () => {
							if (window.confirm(`Are you sure you want to approve the account ${approveData._id}?`)) {
								let payload = (({ _id, status }) => ({ _id, status }))(approveData);
								payload.status = 'approved';
								updateAccount(payload).then(() => {
									fetchAccounts();
									alert('Account approved!');
								}).catch((error) => {
									alert('Oops, something went wrong. Please try again later.')
									console.error(error);
								});
							};
						}
					}),
					fundData => ({
						icon: 'attach_money',
						tooltip: 'Fund Account',
						hidden: fundData.status != 'approved',
						onClick: () => {
							if (window.confirm(`Are you sure you want to fund the account ${fundData._id}?`)) {
								let payload = (({ _id, status }) => ({ _id, status }))(fundData);
								payload.status = 'funded';
								updateAccount(payload).then(() => {
									fetchAccounts();
									alert('Account funded successfully!');
								}).catch((error) => {
									alert('Oops, something went wrong. Please try again later.')
									console.error(error);
								});
							};
						}
					}),
					closeData => ({
						icon: 'close',
						tooltip: 'Close Account',
						hidden: (parseInt(closeData.balance) > 0) && (closeData.status != 'approved' || closeData.status != 'funded'),
						onClick: () => {
							if (window.confirm(`Are you sure you want to close the account ${closeData._id}?`)) {
								let payload = (({ _id, status }) => ({ _id, status }))(closeData);
								payload.status = 'closed';
								updateAccount(payload).then(() => {
									fetchAccounts();
									alert('Account closed successfully!');
								}).catch((error) => {
									alert('Oops, something went wrong. Please try again later.')
									console.error(error);
								});
							};
						}
					}),
					suspendData => ({
						icon: 'block',
						tooltip: 'Suspend Account',
						hidden: suspendData.status == 'suspended',
						onClick: () => {
							if (window.confirm(`Are you sure you want to suspsend the account ${suspendData._id}?`)) {
								let payload = (({ _id, status }) => ({ _id, status }))(suspendData);
								payload.status = 'suspended';
								updateAccount(payload).then(() => {
									fetchAccounts();
									alert('Account closed successfully!');
								}).catch((error) => {
									alert('Oops, something went wrong. Please try again later.')
									console.error(error);
								});
							};
						}
					})
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
