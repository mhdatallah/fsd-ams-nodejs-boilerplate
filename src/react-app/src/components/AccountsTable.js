import React from "react";
import MaterialTable from 'material-table';

function AccountsTable() {

	const tableRef = React.createRef();

	return (
		<div style={{ width: '100%' }}>
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/icon?family=Material+Icons"
			/>
			<MaterialTable
				title="Accounts"
				tableRef={tableRef}
				options={{
					paging: false
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
			/>
		</div>
	);
}

export default AccountsTable;
