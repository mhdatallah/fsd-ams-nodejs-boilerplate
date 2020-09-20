import AccountModel from "./models/account";

import { accounts } from "./init_data";

const seedDBWithAccounts = () => {
	accounts.map(async ({ balance, status }) => {
		const accountInstance = new AccountModel({
			balance,
			status,
		});
		await accountInstance.save();
	});
};

seedDBWithAccounts()

