import React from "react";
import styled from 'styled-components';
import MaterialTable, { MTableToolbar } from 'material-table';
import { AccountStatusEnum } from '../models/accountStatusEnum';
import { AccountFieldsEnum } from '../models/accountFieldsEnum';
import { ActionsEnum } from '../models/actionsEnum';
import { CONSTANTS } from '../models/constants'

function AccountsTable({ accounts, onRefreshClick, onActionClick }) {

	// accounts is what is being returned from the back-end.
	// filteredAccounts is what is being displayed according to the user filering.
	const [filteredAccounts, setFilteredAccounts] = React.useState([]);
	const tableRef = React.createRef();

	// Updating the filtered accounts display. Directly updating the state threw a warning because it was taking too long.
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

	// Calculate the total balance of the displayed (filtered) accounts. Default = 0.
	const calculateTotalBalance = (accountsList) => {
		return accountsList.length ? accountsList.reduce((a, b) => a + (b['balance'] || 0), 0) : 0;
	}

	// Specify if an action is allowed given specific business requirements. 
	const actionIsDisabled = (action, data) => {
		switch (action) {
			// I am intentionally disabling the linter here, because I do not want to validate the type
			case ActionsEnum.APPROVE:
				// eslint-disable-next-line
				return data.status != AccountStatusEnum.PENDING;
			case ActionsEnum.FUND:
				// eslint-disable-next-line
				return data.status != AccountStatusEnum.APPROVED;
			case ActionsEnum.CLOSE:
				// eslint-disable-next-line
				return (parseInt(data.balance) > 0) || (data.status == AccountStatusEnum.CLOSED || data.status == AccountStatusEnum.SUSPENDED);
			case ActionsEnum.SUSPEND:
				// eslint-disable-next-line
				return data.status == AccountStatusEnum.SUSPENDED;
			default:
				return true;
		}
	}

	// Some fancy UI capitlization. Has no effect on the logic.
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const tableColumns = [
		{ title: CONSTANTS.ACCOUNTS_TABLE_COL_ID, field: AccountFieldsEnum.ID, filtering: false },
		{ title: CONSTANTS.ACCOUNTS_TABLE_COL_BALANCE, field: AccountFieldsEnum.BALANCE, filtering: false },
		{ title: CONSTANTS.ACCOUNTS_TABLE_COL_CREATED_AT, field: AccountFieldsEnum.CREATED_AT, filtering: false },
		{ title: CONSTANTS.ACCOUNTS_TABLE_COL_UPDATED_AT, field: AccountFieldsEnum.UPDATED_AT, filtering: false },
		{
			title: CONSTANTS.ACCOUNTS_TABLE_COL_STATUS,
			field: AccountFieldsEnum.STATUS,
			lookup: {
				'pending': capitalizeFirstLetter(AccountStatusEnum.PENDING),
				'approved': capitalizeFirstLetter(AccountStatusEnum.APPROVED),
				'funded': capitalizeFirstLetter(AccountStatusEnum.FUNDED),
				'closed': capitalizeFirstLetter(AccountStatusEnum.CLOSED),
				'suspended': capitalizeFirstLetter(AccountStatusEnum.SUSPENDED),
			},
			customFilterAndSearch: (term, data) => {
				const predicate = term.length ? term.includes(data.status) : true;
				updateFilteredAccounts(predicate, data);
				return predicate;
			}
		},
	]

	const tableActions = [
		{
			icon: 'refresh',
			tooltip: CONSTANTS.TOOLTIP_REFRESH,
			isFreeAction: true,
			onClick: () => onRefreshClick(),
		},
		approveData => ({
			icon: 'check',
			tooltip: CONSTANTS.TOOLTIP_APPROVE_ACCOUNT,
			hidden: actionIsDisabled(ActionsEnum.APPROVE, approveData),
			onClick: () => onActionClick(approveData, ActionsEnum.APPROVE, AccountStatusEnum.APPROVED)
		}),
		fundData => ({
			icon: 'attach_money',
			tooltip: CONSTANTS.TOOLTIP_FUND_ACCOUNT,
			hidden: actionIsDisabled(ActionsEnum.FUND, fundData),
			onClick: () => onActionClick(fundData, ActionsEnum.FUND, AccountStatusEnum.FUNDED)
		}),
		closeData => ({
			icon: 'close',
			tooltip: CONSTANTS.TOOLTIP_CLOSE_ACCOUNT,
			hidden: actionIsDisabled(ActionsEnum.CLOSE, closeData),
			onClick: () => onActionClick(closeData, ActionsEnum.CLOSE, AccountStatusEnum.CLOSED)
		}),
		suspendData => ({
			icon: 'block',
			tooltip: CONSTANTS.TOOLTIP_SUSPEND_ACCOUNT,
			hidden: actionIsDisabled(ActionsEnum.SUSPEND, suspendData),
			onClick: () => onActionClick(suspendData, ActionsEnum.SUSPEND, AccountStatusEnum.SUSPENDED)
		})
	];

	const tableOptions = {
		filtering: true,
		paging: false,
		search: false
	};

	const customComponents = {
		Toolbar: props => (
			<div>
				<MTableToolbar {...props} />
				<ToolbarFields>
					<p>{`${CONSTANTS.ACCOUNTS_TABLE_TOOLBAR_TOTAL_NO_ACCOUNTS} ${filteredAccounts.length}`}</p>
					<p>{`${CONSTANTS.ACCOUNTS_TABLE_TOOLBAR_TOTAL_BALANCE} ${calculateTotalBalance(filteredAccounts)}`}</p>
				</ToolbarFields>
			</div>
		),
	};

	React.useEffect(() => {
		setFilteredAccounts(accounts);
	}, [accounts]);

	return (
		<Wrapper>
			{/* 
			Including the Google Fonts CDN here is not ideal, but this is for the sake of swift delivery.
			I didn't want to get busy with installing the fonts and importing them.
			*/}
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/icon?family=Material+Icons"
			/>
			<MaterialTable
				title={CONSTANTS.ACCOUNTS_TABLE_TITLE}
				tableRef={tableRef}
				options={tableOptions}
				columns={tableColumns}
				data={accounts}
				actions={tableActions}
				components={customComponents}
			/>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
`;

const ToolbarFields = styled.div`
	display: flex;
	justify-content: space-evenly;
	border-bottom: 1px solid lightgray;
`;

export default AccountsTable;
