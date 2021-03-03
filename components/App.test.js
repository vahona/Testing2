import React from "react";
import App from "./App";
import { render, waitFor, fireEvent } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import AddTopic from './AddTopic'
import TopicList from './TopicList'



fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
  //  console.error.mockClear();
  
});

const addNewTopic = jest.fn(() => {})

const downvoteTopic = jest.fn(() => {});

const archiveTopic = jest.fn(() => {});
const deleteTopic = jest.fn(() => {});
const upvoteTopic = jest.fn(() => {});

const sortTopic = jest.fn(() => {})


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

	const { debug, queryByText, container } = render(<App />);
	await waitFor(() => queryByText(fakeTopics[0].title));
	expect(queryByText(fakeTopics[1].title)).toBeTruthy();
	expect(container.firstChild).toMatchSnapshot()
	debug();

});




test("<App addNewTopic={addNewTopic} /> add topic", () => {
    const { debug, queryByTestId, getByText } = render(<AddTopic addNewTopic={addNewTopic} />);
    expect(queryByTestId("submit-button")).toBeTruthy;

    fireEvent.click(getByText("Submit"));
    debug();
});




test("<App upvoteTopic={upvoteTopic}/> upvote", () => {
  const { debug, queryByTestId } = render(<TopicList topics={fakeTopics} upvoteTopic={upvoteTopic} />);
  expect(queryByTestId("upvote-topic")).toBeTruthy;

  fireEvent.click(queryByTestId("upvote-topic"));
    debug()
});


test("<App downvoteTopic={downvoteTopic}/> downvote", () => {
  const { debug, queryByTestId } = render(
    <TopicList topics={fakeTopics} downvoteTopic={downvoteTopic} />
  );
  expect(queryByTestId("downvote-topic")).toBeTruthy;

  fireEvent.click(queryByTestId("down-topic"));
  debug();
});




test("<App archiveTopic={archiveTopic}/> archive", () => {
  const { debug, queryByTestId } = render(
    <TopicList topics={fakeTopics} archiveTopic={archiveTopic} />
  );
  expect(queryByTestId("archive-button")).toBeTruthy;
  debug();
});



test("<App deleteTopic={deleteTopic}/> delete", () => {
  const { debug, queryByTestId } = render(
    <TopicList topics={fakeTopics} deleteTopic={deleteTopic} />
  );
  expect(queryByTestId("delete-button")).toBeTruthy;

   fireEvent.click(queryByTestId("delete-button"));
  debug();
});


test("<App  topics={topics.filter((topic) => topic.discussedOn).sort(sortTopic)}/>", () => {
  const { debug } = render(<TopicList topics={fakeTopics.filter((topic) => topic.discussedOn).sort(sortTopic)} />);

  const value = sortTopic(sortTopic);
  expect(sortTopic).toHaveBeenCalled()
  debug()
}
);


// install jest-fetch-mock
// require it
// create the mock data for app.js (tea-time-topics)
// create the test, and link the fetch mock response with the data
// use waitForElements to wait the data (mark your function as async)
// once you have that, test if the topics appears on the page
// start to do integrations tests to see if the functions work correctly


// Does the add topic work
// Does the upvote topic work
// Does the downvote topic work
// Does the archive topic work
// Does the delete topic work
// Does the sorting topic functionality works?
