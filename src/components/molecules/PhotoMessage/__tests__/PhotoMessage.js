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
 import PhotoMessage from '../PhotoMessage';
 import { fireEvent, render } from '@testing-library/react';
 
 test("Component Should display modal title)", () => {
    
  const { getByTestId, getByText, debug } = render(
    <PhotoMessage status={"sent"} text="text" />
  );
  const getById = getByTestId("photo_message");
  getByText("text");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");

});

 test("Component Should display modal title)", () => { 
   const { getByTestId, getByText } = render(
     <PhotoMessage status={"sent"}  />
   );
   const getById = getByTestId("btn_download");
   getByText("Download");
   expect(getById).toBeTruthy();
   expect(getById.tagName).toBe("BUTTON");
 
 });
 
 test("Component Should display modal title)", () => {
    
      const { getByTestId, getByText } = render(
        <PhotoMessage status={"sent"} text="text" />
      );
      const getById = getByTestId("text");
      getByText("text");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    
    });
 
//     test('render the close button on the screen', () => {
//      const { getByTestId, getByText } = render(
//        <EndSession onExit={jest.fn()} onSurvey= {jest.fn()} isIdle = {true} testIcon="icon"  />
//      );
//      const button = getByTestId('btn_survey')
//      fireEvent.click(button)
//      expect(getByText('Take Survey')).toBeInTheDocument()
//    })
 
//    test('render the close button on the screen', () => {
//      const { getByTestId, getByText } = render(
//        <EndSession onExit={jest.fn()} onSurvey= {jest.fn()} isIdle = {true} testIcon="icon"  />
//      );
//      const button = getByTestId('btn_exit')
//      fireEvent.click(button)
//      expect(getByText('Exit')).toBeInTheDocument()
//    })