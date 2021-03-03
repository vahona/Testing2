import React from "react";
import {
  render,
  fireEvent,
  getByTestId,
  cleanup,
} from "@testing-library/react";

import AddTopic from "./AddTopic";

afterEach(() => {
  cleanup();
  addNewTopic.mockClear();
});



// we create a spy/mock function
const addNewTopic = jest.fn();
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
  // add a topic to the text input
  // THIS WAY DOESN'T WORK
  // getByTestId('topic-title-input').value = 'hello onja';
  // fireEvent.change(getByTestId('topic-title-input'));
  // THIS WAY DOES
  fireEvent.change(getByTestId("topic-title-input"), {
    target: { value: "hello onja" },
  });

  
  // fire a click event on it
  fireEvent.click(getByTestId("submit-button"));
  expect(addNewTopic).toHaveBeenCalledWith("hello onja");
  // check if it was called with a new topic
});
