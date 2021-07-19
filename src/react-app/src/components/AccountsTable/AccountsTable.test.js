import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, waitForElement } from '@testing-library/react';
import axiosMock from "axios";
import AccountsTable from '../AccountsTable/AccountsTable';
import { getAccounts } from '../../services/api';

jest.mock('axios');

let getByTestId;
let getByText;

beforeEach(() => {
    const component = render(<AccountsTable />);
    getByTestId = component.getByTestId;
    getByText = component.getByText;
});

afterEach(cleanup);

test('renders AccountsTable labels correctly', () => {
    const table = getByTestId("table");
    const toolbar = getByTestId("toolbar");
    expect(table).toBeTruthy();

    expect(toolbar).toHaveTextContent("Total # of accounts: 0");
    expect(toolbar).toHaveTextContent("Total balance: 0");

    expect(table).toHaveTextContent("Actions");
    expect(table).toHaveTextContent("ID");
    expect(table).toHaveTextContent("Balance");
    expect(table).toHaveTextContent("Created At");
    expect(table).toHaveTextContent("Updated At");
    expect(table).toHaveTextContent("Status");
});

test('fetches accounts successfully from the API', async () => {
    const res = {
        "data": [
            {
                "_id": "60f54cea7b252f85e6bd81be",
                "balance": 50000,
                "status": "pending",
                "createdAt": "2021-07-19T09:59:06.845Z",
                "updatedAt": "2021-07-19T09:59:06.845Z",
            },
            {
                "_id": "60f54cea7b252f85e6bd81bf",
                "balance": 40000,
                "status": "approved",
                "createdAt": "2021-07-19T09:59:06.845Z",
                "updatedAt": "2021-07-19T09:59:06.845Z",
            }
        ]
    };
    axiosMock.get.mockImplementation(() => Promise.resolve(res));

    await expect(getAccounts()).resolves.toEqual(res);
    expect(axiosMock.get).toHaveBeenCalledWith(`/api/accounts/`);
});
