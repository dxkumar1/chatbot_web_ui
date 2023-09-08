/*********************************************************************
 * File Name: Modals.js
 * Date Created: 19-Jan-2022
 * Date Modified: 19-Jan-2022
 * Description: unit testing for completing scenario on Modals.feature
 * Sample Output: 100%
 * Original Author: Arunachalamoorthy
 * Current Author: Arunachalamoorthy
 **********************************************************************/

import React from "react";
import Modals from "../Modals";
import { SignalRProvider } from "../../../../shared/context/SignalRContext";
import { Provider } from "react-redux";
import store from "../../../../shared/redux/store";
import { useSignalr } from "../../../../shared/context/SignalRContext";
import { setSessionAttributes } from "../../../../shared/redux/action";
import actionTypes from '../../../../shared/types/actionTypes';
import renderer from 'react-test-renderer';

import {
  render, fireEvent,
  screen,
  waitFor
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';


jest.mock('broadcast-channel');

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

test("ChatbotFooter snapshot test", () => {
  const component = renderer.create(
    <SignalRProvider>
    <Provider store={store}>
      
    <Modals onChatEnd={jest.fn()} sessionTransfer={jest.fn()} 
    onChatEndTimer={jest.fn()} onContinueSession={jest.fn()} 
    closeEndSession={jest.fn()} openSurveyLink={jest.fn()}
    CallLiveAgent={jest.fn()}
    timeOutCountDown={120}
    global_phone_1800={"global_phone_1800"}
    onClose={jest.fn()}
    />
    </Provider>
  </SignalRProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

test("Component Should display modal title)" ,async () => {

  const { debug, getByTestId, getByText } = render(<SignalRProvider>
    <Provider store={store}>
      
    <Modals onChatEnd={jest.fn()} sessionTransfer={jest.fn()} 
    onChatEndTimer={jest.fn()} onContinueSession={jest.fn()} 
    closeEndSession={jest.fn()} openSurveyLink={jest.fn()}
    CallLiveAgent={jest.fn()}
    timeOutCountDown={120}
    global_phone_1800={"global_phone_1800"}
    onClose={jest.fn()}
    />
    </Provider>
  </SignalRProvider>);
  const getById = getByTestId("modal_component");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});

