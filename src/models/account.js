import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
	{
		balance: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
