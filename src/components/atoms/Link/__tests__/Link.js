import { fireEvent, getByText, render, screen } from "@testing-library/react";
import Link from "../Link";
import {Provider } from "react-redux";
import store from "../../../../shared/redux/store";
describe("Link component", () => {
  it("should render without issues", () => {
    const { container } = render(<Provider store={store}><Link /></Provider>);
    expect(container).toMatchSnapshot();
  });

  test("Link Component", () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
      <Link
        text="view preventive care details"
        title="view preventive care details"
        href="https://www.optimahealth.com/documents/collateral-materials/health-care-reform-preventive-list.pdf"
      />
      </Provider>
    );
    const getbyids = getByTestId("linktest");
    getByText("view preventive care details");
    expect(getbyids).toBeTruthy();
  });
});

describe("List.js component", () => {
  const openModal = jest.fn();
  const closeModal = jest.fn();
  const openLink = jest.fn();
  test("renders initial state of listData state", () => {
    render(
      <Provider store={store}>
      <Link
        text="view preventive care details"
        title="view preventive care details"
        confirmation={true}
        helperText={"helperText"}
        helperTitle={"helperTitle"}
        testIcon={"Icon"}
        openModal={openModal}
        href="https://www.optimahealth.com/documents/collateral-materials/health-care-reform-preventive-list.pdf"
      />
      </Provider>
    );
    const list = screen.getAllByTestId("open_modal");
    expect(list.length).toEqual(1);
    const myBtn = screen.getByTestId("open_modal");
    fireEvent.click(myBtn);
  });

  test("download transcript button click", () => {
    render(
      <Provider store={store}>
      <Link
        text="view preventive care details"
        title="view preventive care details"
        confirmation={true}
        helperText={"helperText"}
        helperTitle={"helperTitle"}
        testIcon={"Icon"}
        showModal={true}
        openModal={openModal}
        setShowModal={jest.fn()}
        closeModal={closeModal}
        openLink={openLink}
        href="https://www.optimahealth.com/documents/collateral-materials/health-care-reform-preventive-list.pdf"
      />
      </Provider>
    );

    const list = screen.getAllByTestId("open_modal");
    expect(list.length).toEqual(1);
    const myBtn = screen.getByTestId("open_modal");
    fireEvent.click(myBtn);

    const list1 = screen.getAllByTestId("show_modal");
    expect(list1.length).toEqual(1);
    const myBtn1 = screen.getByTestId("show_modal");
    fireEvent.click(myBtn1);

    const list2 = screen.getAllByTestId("success-btn");
    expect(list2.length).toEqual(1);
    const myBtn2 = screen.getByTestId("success-btn");
    fireEvent.click(myBtn2);
  });

  test("download transcript button click", () => {
    render(
      <Provider store={store}>
      <Link
        text="view preventive care details"
        title="view preventive care details"
        confirmation={true}
         helperText = {"Grate! Can you guide [optimahealth.com/signin] me by selecting which topic you're looking into?"}
        helperTitle={"helperTitle"}
        testIcon={"Icon"}
        showModal={true}
        openModal={openModal}
        setShowModal={jest.fn()}
        closeModal={closeModal}
        openLink={openLink}
        href="https://www.optimahealth.com/documents/collateral-materials/health-care-reform-preventive-list.pdf"
      />
      </Provider>
    );

    const list = screen.getAllByTestId("open_modal");
    expect(list.length).toEqual(1);
    const myBtn = screen.getByTestId("open_modal");
    fireEvent.click(myBtn);

    const list1 = screen.getAllByTestId("show_modal");
    expect(list1.length).toEqual(1);
    const myBtn1 = screen.getByTestId("show_modal");
    fireEvent.click(myBtn1);

    const list2 = screen.getAllByTestId("success-btn");
    expect(list2.length).toEqual(1);
    const myBtn2 = screen.getByTestId("success-btn");
    fireEvent.click(myBtn2);
  });

  test("download transcript button click", () => {
    render(
      <Provider store={store}>
      <Link
        text="view preventive care details"
        title="view preventive care details"
        confirmation={true}
        helperText={"helperText"}
        helperTitle={"helperTitle"}
        testIcon={"Icon"}
        showModal={true}
        openModal={openModal}
        setShowModal={jest.fn()}
        closeModal={closeModal}
        openLink={openLink}
        href="https://www.optimahealth.com/documents/collateral-materials/health-care-reform-preventive-list.pdf"
      />
       </Provider>
    );

    const list = screen.getAllByTestId("open_modal");
    expect(list.length).toEqual(1);
    const myBtn = screen.getByTestId("open_modal");
    fireEvent.click(myBtn);

    const list1 = screen.getAllByTestId("show_modal");
    expect(list1.length).toEqual(1);
    const myBtn1 = screen.getByTestId("show_modal");
    fireEvent.click(myBtn1);

    const list2 = screen.getAllByTestId("cancel-btn");
    expect(list2.length).toEqual(1);
    const myBtn2 = screen.getByTestId("cancel-btn");
    fireEvent.click(myBtn2);
  });
  
});
