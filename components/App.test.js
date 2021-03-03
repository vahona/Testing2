import React from "react";
import App from "./App";
import {
  fireEvent,
  getByTestId,
  render,
  waitFor,
} from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
});
test("<App/> without data", () => {
  const { debug, queryByTestId, container } = render(<App />);
  expect(queryByTestId("app-title")).toBeTruthy();
  expect(container.firstChild).toMatchSnapshot();
  // debug();
});
const fakeTopics = [
  {
    id: "52e1bb8a-e848-4db0-8fb6-270d6ff139d2",
    upvotes: 3,
    title:
      "Some studies have shown that purpose is #1 for job satisfaction. What do you think?",
    downvotes: 25,
    discussedOn: "",
  },
  {
    id: "2c241a97-b4a5-4ea7-a29f-31714a48e36c",
    upvotes: 19,
    title:
      "People are quick to forget the good things done for them. Do you agree?",
    downvotes: 14,
    discussedOn: "1580417903018",
  },
];
test("<App/> with some fake fetch data", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(fakeTopics));
  const { debug, queryByText } = render(<App />);
  // I need to wait for the asynchronous operation to be done
  await waitFor(() => queryByText(fakeTopics[0].title));
  // after this line, I can finally test my app
  expect(queryByText(fakeTopics[1].title)).toBeTruthy();
  // debug();
});
// Does the add topic work
const fakeTopicTitle = "Fake Topic";
test("<App/> Add Topic", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(fakeTopics));
  const { debug, queryByText, getByTestId } = render(<App />);
  // I need to wait for the asynchronous operation to be done
  await waitFor(() => queryByText(fakeTopics[0].title));
  // 1. add some fake data inside the input
  fireEvent.change(getByTestId("topic-title-input"), {
    target: { value: fakeTopicTitle },
  });
  // 2. click on submit
  fireEvent.click(getByTestId("submit-button"));
  // 2.1 reset the input
  fireEvent.change(getByTestId("topic-title-input"), {
    target: { value: "" },
  });
  // 3. check if that fake data now appears on the dom
  expect(queryByText(fakeTopicTitle)).toBeTruthy();
});
// Does the upvote topic work
test("<App/> Upvote topic and Downvote topic", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(fakeTopics));
  const { debug, queryByText, getByTestId } = render(<App />);
  // I need to wait for the asynchronous operation to be done
  await waitFor(() => queryByText(fakeTopics[0].title));
  // 0. check the count counter
  const previousUpvotesValue = getByTestId("upvotes-count").textContent;
  // 1. click on the upvote button
  fireEvent.click(getByTestId("upvote-button"));
  // 2. check if the count is incremented
  expect(Number(getByTestId("upvotes-count").textContent)).toBe(
    Number(previousUpvotesValue) + 1
  );
  // 3. click on the upvote button
  fireEvent.click(getByTestId("upvote-button"));
  // 4. check if the count is incremented
  expect(Number(getByTestId("upvotes-count").textContent)).toBe(
    Number(previousUpvotesValue) + 2
  );
  // Does the downvote topic work
  const previousDownvotesValue = getByTestId("downvotes-count").textContent;
  fireEvent.click(getByTestId("downvote-button"));
  expect(Number(getByTestId("downvotes-count").textContent)).toBe(
    Number(previousDownvotesValue) + 1
  );
});
test("<App/> Archive and Delete", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(fakeTopics));
  const { queryByText, getByTestId, getAllByTestId } = render(<App />);
  // I need to wait for the asynchronous operation to be done
  await waitFor(() => queryByText(fakeTopics[0].title));
  // test archive functionality
  const archiveButton = getByTestId("archive-button");
  // save the archive topic title for later comparison
  const archivedTopicTitle = archiveButton.nextElementSibling.textContent;
  fireEvent.click(archiveButton);
  expect(queryByText(archivedTopicTitle)).toBeTruthy();
  // check if the next element to the title, is the correct discussed On string
  expect(queryByText(archivedTopicTitle).nextElementSibling.textContent).toBe(
    `Discussed on ${new Date().toLocaleDateString()}`
  );
  // test delete functionality
  const deleteButtons = getAllByTestId("delete-button");
  // we get all the delete buttons but we click on the first one
  const deletedTopicTitle = deleteButtons[0].nextElementSibling.textContent;
  fireEvent.click(deleteButtons[0]);
  // check if that title has disappeared from the DOM
  expect(queryByText(deletedTopicTitle)).toBeFalsy();
});
// Does the sorting topic functionality works?
