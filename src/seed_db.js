import AccountModel from "./models/account";
import { connectDb } from "./models/index";

import { accounts } from "./init_data";

const seedDBWithAccounts = () => {
	connectDb().then(() => {
		accounts.map(async ({ balance, status }) => {
			const accountInstance = new AccountModel({
				balance,
				status,
			});
			await accountInstance.save();
		});
	});
};

seedDBWithAccounts()

