/*********************************************************************
 * File Name: ModalContent.js
 * Date Created: 20-Dev-2022
 * Date Modified: 20-Dec-2022
 * Description: unit testing for completing scenario on ModalContent.feature
 * Sample Output: 100%
 * Original Author: Arunachalamoorthy
 * Current Author: Arunachalamoorthy
 **********************************************************************/

import React from "react";
import { render } from "@testing-library/react";
import ModalContent from "../ModalContent";

test("Component should display modal content)", () => {
  const { getByTestId, getByText } = render(
    <ModalContent content={"content"} />
  );
  const getById = getByTestId("modal_content");
  getByText("content");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});

test("Component dhould display modal sub content)", () => {
  const { getByTestId, getByText } = render(
    <ModalContent subContent={"subContent"} />
  );
  const getById = getByTestId("modal_subcontent");
  getByText("subContent");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});

test("Component Should display modal title)", () => {
  const { getByTestId, getByText } = render(
    <ModalContent hideClose={true} title={"title"} icon={"icon"} />
  );
  const getById = getByTestId("modal_title");
  getByText("title");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});


test("Component Should display modal title)", () => {
  const { getByTestId, getByText } = render(
    <ModalContent hideClose={true} title={"title"} icon={"icon"} modalType={"sessionTransfer"} />
  );
  const getById = getByTestId("modal_title");
  getByText("title");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});

test("Component Should display modal title)", () => {
  const { getByTestId, getByText } = render(
    <ModalContent hideClose={true} title={"title"} icon={"icon"} modalType={"survey"} />
  );
  const getById = getByTestId("modal_title");
  getByText("title");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});

test("Component Should display modal title)", () => {
  const { getByTestId, getByText } = render(
    <ModalContent hideClose={true} title={"title"} icon={"icon"} modalType={"CallAgent"} />
  );
  const getById = getByTestId("modal_title");
  getByText("title");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});
test("Component Should display modal title)", () => {
  const { getByTestId, getByText } = render(
    <ModalContent hideClose={true} title={"title"} icon={"icon"} modalType={"endSessionModal"} />
  );
  const getById = getByTestId("modal_title");
  getByText("title");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});
test("Component Should display modal title)", () => {
  const { getByTestId, getByText } = render(
    <ModalContent hideClose={true} title={"title"} icon={"icon"} modalType={"error"} />
  );
  const getById = getByTestId("modal_title");
  getByText("title");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});
