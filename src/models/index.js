import mongoose from "mongoose";

import Account from "./account";

const connectDb = () => {
	return mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

const models = { Account };

export { connectDb };

export default models;
