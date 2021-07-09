import React, { forwardRef } from "react";
import MaterialTable from 'material-table';
import { alpha } from '@material-ui/core/styles'

import {
	AddBox,
	ArrowDownward,
	Check,
	ChevronLeft,
	ChevronRight,
	Clear,
	DeleteOutline,
	Edit,
	FilterList,
	FirstPage,
	LastPage,
	Remove,
	SaveAlt,
	Search,
	ViewColumn
} from '@material-ui/icons';

function AccountsTable() {

	const tableIcons = {
		Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
		Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
		Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
		DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
		Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
		Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
		Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
		FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
		LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
		NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
		PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
		ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
		SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
		ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
		ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
	};

	return (
		<div style={{ width: '100%' }}>
			<MaterialTable
				title="Accounts"
				icons={tableIcons}
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
				data={query =>
					new Promise(resolve => {
						let url = '/api/accounts/'
						fetch(url)
							.then(response => response.json())
							.then(result => {
								console.log(result);
								resolve({
									data: result.data,
								})
							})
					})
				}
			/>
		</div>
	);
}

export default AccountsTable;
