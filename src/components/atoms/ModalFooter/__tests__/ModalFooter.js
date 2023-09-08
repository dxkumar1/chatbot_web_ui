import React from 'react';
import {
    render, screen, fireEvent
  } from '@testing-library/react'
import ModalFooter from '../ModalFooter';

test("User can see the Popup", () => {
    const handleClose = jest.fn();
    const handleCancel = jest.fn()
    const {getByText} = render(
        <ModalFooter onClick={handleClose} onCancel={handleCancel} successTitle={'successTitle'} cancelTitle={'cancelTitle'} hideClose={true}/>
    );
    fireEvent.click(getByText('cancelTitle'))
    expect(handleCancel).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('success-btn')).toHaveTextContent('successTitle');
    expect(screen.getByTestId('cancel-btn')).toHaveTextContent('cancelTitle');
    fireEvent.click(getByText('successTitle'))
    expect(handleClose).toHaveBeenCalledTimes(1)

})


