import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from '@testing-library/react';
import AccountsPage from './AccountsPage';

let getByTestId;

beforeEach(() => {
    const component = render(<AccountsPage />);
    getByTestId = component.getByTestId;
})

afterEach(cleanup);

test('renders AccountsTable component', () => {
    expect(getByTestId("accounts-table")).toBeTruthy();
});
