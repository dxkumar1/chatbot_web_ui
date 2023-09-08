/*********************************************************************
 * File Name: EndSession.js
 * Date Created: 21-Dec-2022
 * Date Modified: 21-Dec-2022
 * Description: unit testing for completing scenario on EndSession.feature
 * Sample Output: 100%
 * Original Author: Arunachalamoorthy
 * Current Author: Arunachalamoorthy
 **********************************************************************/

import React from 'react';
import EndSession from '../EndSession';
import { fireEvent, render } from '@testing-library/react';

test("Component Should display modal title)", () => {
 const END_SESSION_INACTIVITY="Your chat session has expired due to inactivity."

  const { getByTestId, getByText } = render(
    <EndSession onExit={jest.fn()} onSurvey= {jest.fn()} isIdle = {true} testIcon="icon"  />
  );
  const getById = getByTestId("endSession-container");
  getByText(END_SESSION_INACTIVITY);
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");

});

test("Component Should display modal title)", () => {
    const END_SESSION_INACTIVITY="Your chat session has expired due to inactivity."
   
     const { getByTestId, getByText } = render(
       <EndSession onExit={jest.fn()} onSurvey= {jest.fn()} isIdle = {true} testIcon="icon"  />
     );
     const getById = getByTestId("survey_icon_btn");
     getByText(END_SESSION_INACTIVITY);
     expect(getById).toBeTruthy();
     expect(getById.tagName).toBe("DIV");
   
   });
/*
   test('render the close button on the screen', () => {
    const { getByTestId, getByText } = render(
      <EndSession onExit={jest.fn()} onSurvey= {jest.fn()} isIdle = {true} testIcon="icon"  />
    );
    const button = getByTestId('btn_survey')
    fireEvent.click(button)
    expect(getByText('Take Survey')).toBeInTheDocument()
  })
*/
  test('render the close button on the screen', () => {
    const mScrollIntoView = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = mScrollIntoView;

    const { getByTestId, getByText } = render(
      <EndSession onExit={jest.fn()} onSurvey= {jest.fn()} isIdle = {true} testIcon="icon"  />
    );
    const button = getByTestId('btn_exit')
    fireEvent.click(button)
    expect(getByText('Exit')).toBeInTheDocument()
    expect(mScrollIntoView).toBeCalled();
  })