import React from "react";
import { getAccounts, updateAccount } from '../../services/api';
import { CONSTANTS } from '../../models/constants'
import AccountsTable from '../../components/AccountsTable/AccountsTable';

function AccountsPage() {

	// accounts is what is being returned from the back-end.
	const [accounts, setAccounts] = React.useState([]);

	// Fetch the accounts from the api service
	const fetchAccounts = () => {
		getAccounts()
			.then((response) => {
				setAccounts(response.data.data);
			})
			.catch((error) => {
				alert(CONSTANTS.ERROR_SOMETHING_WENT_WRONG);
				console.error(error);
			});
	}

	const handleActionClick = (data, action, newStatus) => {
		if (window.confirm(`${CONSTANTS.PROMPT_ARE_YOU_SURE} ${action} the account ${data._id}?`)) {
			// Getting only the required fields (_id and status) instead of the whole object.
			// This is to match the HTTP PATCH standard of sending a partial update, unlike PUT where we send the whole object.
			let payload = (({ _id, status }) => ({ _id, status }))(data);
			payload.status = newStatus;
			updateAccount(payload).then(() => {
				fetchAccounts();
				alert(CONSTANTS.SUCCESS);
			}).catch((error) => {
				alert(CONSTANTS.ERROR_SOMETHING_WENT_WRONG);
				console.error(error);
			});
		}
	}

	React.useEffect(() => {
		fetchAccounts();
	}, []);

	return (
		<div data-testid="accounts-table">
			<AccountsTable
				accounts={accounts}
				onRefreshClick={fetchAccounts}
				onActionClick={handleActionClick} />
		</div>
	);
}

export default AccountsPage;
