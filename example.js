import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import AddTopic from "./AddTopic";
// we create a spy/mock function
const addNewTopic = jest.fn((e) => {
  e.preventDefault();
  console.log("this is working!");
});
test("<AddTopic/>", () => {
  const { debug, queryByText, getByText, queryByTestId, container } = render(
    <AddTopic />
  );
  // expect(queryByText('Add a topic')).toBeTruthy();
  expect(queryByTestId("add-topic-title")).toBeTruthy();
  expect(container.firstChild).toMatchSnapshot();
});
// i want to see if the function is called when I click on the submit button
test("<AddTopic addNewTopic={addNewTopic}/>", () => {
  const { getByTestId } = render(<AddTopic addNewTopic={addNewTopic} />);
  // first get the submit button
  expect(getByTestId("submit-button")).toBeTruthy();
  // fire a click event on it
  expect(addNewTopic).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("submit-button"));
  // check if the submit button was called once
  expect(addNewTopic).toHaveBeenCalledTimes(1);
});
// i want to test if the element inside the input is correctly passed to the function
