import express from "express";
import cors from "cors";
import "dotenv/config";

import models, { connectDb } from "./models";

const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'react-app/build')));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/react-app/build/index.html"));
});

app.get("/api/accounts", (req, res) => {
	models.Account.find({}, (error, data) => {
		if (data) {
			return res.send({
				data,
			});
		}
	});
});

app.patch('/api/accounts/:id', async (req, res, next) => {
	const account = await models.Account.findById(req.params.id).exec();
	if (!account) {
		return res.status(404).send('The account with the given ID was not found.');
	}
	let query = { $set: {} };
	for (let key in req.body) {
		if (account[key] != null && account[key] !== req.body[key])
			query.$set[key] = req.body[key];
	}
	if (query.$set) {
		if (query.$set.hasOwnProperty('_id') || query.$set.hasOwnProperty('id')) {
			res.status(403).send('ID is read-only.');
			return;
		}
		if (query.$set.hasOwnProperty('createdAt')) {
			res.status(403).send('createdAt is read-only.');
			return;
		}
		if (query.$set.hasOwnProperty('updatedAt')) {
			res.status(403).send('updatedAt is read-only.');
			return;
		}
		if (query.$set.balance != null) {
			if (!isNumeric(query.$set.balance)) {
				res.status(422).send('Balance is invalid');
				return;
			}
		}
		if (query.$set.status) {
			switch (query.$set.status) {
				case 'approved':
					if (account.status !== 'pending') {
						res.sendStatus(403);
						return;
					}
					break;
				case 'funded':
					if (account.status !== 'approved') {
						res.sendStatus(403);
						return;
					}
					break;
				case 'closed':
					if (parseInt(account.balance) > 0) {
						res.status(403).send('Balance is greater than 0.');
						return;
					}
					break;
				case 'suspended':
					break;
				default:
					res.status(422).send('Status is invalid');
					return;
			}
		}
	}
	await models.Account.updateOne({ _id: req.params.id }, query).exec();
	res.sendStatus(204);
});

connectDb().then(async () => {

	app.listen(process.env.PORT, () =>
		console.log(`App ready and listening on port ${process.env.PORT}!`)
	);
});

const isNumeric = (val) => {
	if (typeof val != "number") return false
	return !isNaN(val) && !isNaN(parseFloat(val))
}
