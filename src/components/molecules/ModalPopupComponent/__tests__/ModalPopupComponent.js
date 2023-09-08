/*********************************************************************
 * File Name: ModalPopupComponent.js
 * Date Created: 4-May-2023
 * Date Modified: 4-May-2023
 * Description: unit testing for completing scenario on Modals.feature
 * Sample Output: 100%
 * Original Author: Arunachalamoorthy
 * Current Author: Arunachalamoorthy
 **********************************************************************/

import React from "react";
import ModalPopupComponent from "../ModalPopupComponent";
import renderer from 'react-test-renderer';
import {
  render,
} from '@testing-library/react';

jest.mock('broadcast-channel');

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))


test("User can see ModalsComponent component", () => {
    const component = renderer.create(
        <ModalPopupComponent sessionReducer={jest.fn()} onChatEnd={jest.fn()} sessionTransfer={jest.fn()} 
        onChatEndTimer={jest.fn()} onContinueSession={jest.fn()} 
        closeEndSession={jest.fn()} openSurveyLink={jest.fn()}
        CallLiveAgent={jest.fn()}
        timeOutCountDown={120}
        global_phone_1800={"global_phone_1800"}
        onClose={jest.fn()}
        modalType = {"error"}
        />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})
test("User can see timeout component", () => {
    const onSelect = jest.fn();
    const { debug, getByTestId } = render(
      <ModalPopupComponent
      sessionReducer={jest.fn()}
      sessionTransfer={jest.fn()} 
      onRetry={jest.fn()} 
      shouldShowTimeoutMessage={true}
      modalType = {"timeout"}
      isEnded={false}
      />
    );
    const getById = getByTestId("modal_error");
    expect(getById).toBeTruthy();
    expect(getById.tagName).toBe("DIV");
  });
