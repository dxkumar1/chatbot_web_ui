/*********************************************************************
 * File Name: ConnectingAgentText.js
 * Date Created: 21-Dec-2022
 * Date Modified: 21-Dec-2022
 * Description: unit testing for completing scenario on ConnectingAgentText.feature
 * Sample Output: 100%
 * Original Author: Arunachalamoorthy
 * Current Author: Arunachalamoorthy
 **********************************************************************/

import React from "react";
import { render } from "@testing-library/react";
import ConnectingAgentText from "../ConnectingAgentText";
import { CONNECTION_LIVE_AGENT } from "../../../../shared/utils/strings";
test("Component should display modal content)", () => {
  const { getByTestId, getByText } = render(
    <ConnectingAgentText />
  );
  const getById = getByTestId("connect_agent_text");
  getByText(CONNECTION_LIVE_AGENT);
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});

