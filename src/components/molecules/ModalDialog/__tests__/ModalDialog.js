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
import ModalDialog from '../ModalDialog';
import {render } from '@testing-library/react';

test("Component Should display modal)", () => {
  const { getByTestId } = render(
    <ModalDialog   
    hideClose = {false}
    callModal = {false}
    onClose={jest.fn()}
    onSuccess={jest.fn()}
    title={"title"}
     testIcon={true} 
     icon={true} 
    modalType={"sessionTransfer"} />
  );
  const getById = getByTestId("modal-dialog-id");
  expect(getById.tagName).toBe("DIV");
});

test("Component  modal title)", () => {
  const { getByTestId } = render(
    <ModalDialog   
    hideClose = {false}
    callModal = {false}
    onClose={jest.fn()}
    onSuccess={jest.fn()}
    title={"title"}
     testIcon={true} 
     icon={true} 
    modalType={"sessionTransfer"} />
  );
    const getById = getByTestId("modal-dialog-id");
    expect(getById.tagName).toBe("DIV");
   
   });

   test("Component  modal title error)", () => {
    const { getByTestId } = render(
      <ModalDialog   
      hideClose = {false}
      callModal = {false}
      onClose={jest.fn()}
      onSuccess={jest.fn()}
      title={"title"}
       testIcon={true} 
       icon={true} 
      modalType={"error"} />
    );
      const getById = getByTestId("modal-dialog-id");
      expect(getById.tagName).toBe("DIV");
     
     });

     test("Component  modal title error footer)", () => {
      const { getByTestId } = render(
        <ModalDialog   
        hideClose = {false}
        callModal = {false}
        onClose={jest.fn()}
        onSuccess={jest.fn()}
        title={"title"}
         testIcon={true} 
         icon={true} 
        modalType={"error"}
        onClick={jest.fn()}
        onCancel={jest.fn()}
        successTitle={'successTitle'}
         cancelTitle={'cancelTitle'} 
        
        
        />
      );
        const getById = getByTestId("modal-dialog-id");
        expect(getById.tagName).toBe("DIV");
       
       });