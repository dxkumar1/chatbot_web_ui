/*********************************************************************
 * File Name: CancelAgentButton.js
 * Date Created: 21-Dec-2022
 * Date Modified: 21-Dec-2022
 * Description: unit testing for completing scenario on CancelAgentButton.feature
 * Sample Output: 100%
 * Original Author: Arunachalamoorthy
 * Current Author: Arunachalamoorthy
 **********************************************************************/

import React from "react";
import CancelAgentButton from "../CancelAgentButton";
import { fireEvent, render } from "@testing-library/react";

test("Component Should display modal title)", () => {
  const { getByTestId, getByText } = render(
    <CancelAgentButton text="Cancel" />
  );
  const getById = getByTestId("btn_cancel");
  getByText("Cancel");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("BUTTON");
});

test("render the close button on the screen", () => {
  const { getByTestId, getByText } = render(
    <CancelAgentButton text="Cancel" />
  );
  const button = getByTestId("btn_cancel");
  fireEvent.click(button);
  expect(getByText("Cancel")).toBeInTheDocument();
});
