/*********************************************************************
 * File Name: ModalHeader.js
 * Date Created: 20-Dev-2022
 * Date Modified: 20-Dec-2022
 * Description: unit testing for completing scenario on ModalHeader.feature
 * Sample Output: 100%
 * Original Author: Arunachalamoorthy
 * Current Author: Arunachalamoorthy
 **********************************************************************/

import React from "react";
import { render } from "@testing-library/react";
import ModalHeader from "../ModalHeader";


test("Component Should display modal icon)", () => {
  const { debug, queryByTestId, getByText ,getByTitle} = render(
    <ModalHeader hideClose={true} icon={<svg width="14" title="icon" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 13L13 1M1 1L13 13" stroke="#262626" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>} />
  );
  const getById = queryByTestId("modal_icon");
  getByTitle("icon");
  expect(getById).toBeTruthy();
});

test("Component Should display modal title)", () => {
  const { debug, getByTestId, getByText } = render(
    <ModalHeader hideClose={true} title={"title"} icon={null} onClose={jest.fn()}/>
  );
  const getById = getByTestId("modal_title");
  getByText("title");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});

test("Component Should display modal icon)", () => {
  const { debug, getByTestId, getByText } = render(
    <ModalHeader hideClose={true} title={"title"} testIcon={true} icon={true} onClose={jest.fn()}/>
  );
  const getById = getByTestId("modal_icon");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});



