/*********************************************************************
 * File Name: ChatbotInput.js
 * Date Created: 24-Feb-2022
 * Date Modified: 24-Feb-2022
 * Description: unit testing for completing scenario on CancelAgentButton.feature
 * Sample Output: 100%
 * Original Author: Arunachalamoorthy
 * Current Author: Arunachalamoorthy
 **********************************************************************/

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import ChatbotInput from "../ChatbotInput";
import { SignalRProvider } from "../../../../shared/context/SignalRContext";
import { Provider } from "react-redux";
import store from "../../../../shared/redux/store";

test("Component Should display modal title)", () => {
  const { getByTestId, getByText } = render(
    <SignalRProvider>
      <Provider store={store}>
        <ChatbotInput
          onCall={jest.fn()}
          handleChange={jest.fn()}
          input="hello"
          checkDisable={jest.fn()}
          onSend={jest.fn()}
          setInput={jest.fn()}
        />
      </Provider>
    </SignalRProvider>
  );
  const getById = getByTestId("chat-bot-footer-input");
  expect(getById).toBeTruthy();
});

test("render the close button on the screen", () => {
  const { getByTestId, getByText } = render(
    <SignalRProvider>
    <Provider store={store}>
      <ChatbotInput
        onCall={jest.fn()}
        handleChange={jest.fn()}
        input="hello"
        checkDisable={jest.fn()}
        onSend={jest.fn()}
        setInput={jest.fn()}
      />
    </Provider>
  </SignalRProvider>
  );
  const button = getByTestId("close-button");
  fireEvent.click(button);
  expect(getByText("Call Live Agent")).toBeInTheDocument();
});

  test("onkeypress - function runs", () => {
    const { getByTestId } = render(
      <SignalRProvider>
        <Provider store={store}>
        <ChatbotInput
        onCall={jest.fn()}
        handleChange={jest.fn()}
        input="hello"
        checkDisable={jest.fn()}
        onSend={jest.fn()}
        setInput={jest.fn()}
      />
        </Provider>
      </SignalRProvider>
    );
    const inputNode = getByTestId("inputvalid");
    fireEvent.change(inputNode, { target: { value: "hello" } });
    expect(inputNode.value).toBe("hello");
    fireEvent.keyPress(inputNode, { key: "Enter", keyCode: 13 });

  });

  test("render the close button on the screen", () => {
    const { getByTestId, getByText } = render(
      <SignalRProvider>
      <Provider store={store}>
        <ChatbotInput
          onCall={jest.fn()}
          handleChange={jest.fn()}
          input="hello"
          checkDisable={jest.fn()}
          onSend={jest.fn()}
          setInput={jest.fn()}
          onClick={jest.fn()}
        />
      </Provider>
    </SignalRProvider>
    );
    const button = getByTestId("rebtnvalid");
    fireEvent.click(button);
    expect(getByText("Call Live Agent")).toBeInTheDocument();
  });