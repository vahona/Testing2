import React from "react";
import { render, cleanup } from "@testing-library/react";
import TopicList from "./TopicList";


afterEach(() => {
  cleanup();
  console.error.mockClear();
});


console.error = jest.fn();


test("Testing <TopicList/> without topics", () => {
  render(<TopicList />);
  expect(console.error).toHaveBeenCalled();
});


// fake topic to pass to the component
const fakeTopicList = [
  {
    id: "52e1bb8a-e848-4db0-8fb6-270d6ff139d2",
    upvotes: 3,
    title:
      "Some studies have shown that purpose is #1 for job satisfaction. What do you think?",
    downvotes: 25,
    discussedOn: "",
  },
];


test("<TopicList/> with a topic undiscussed", () => {
  const { queryByTestId, container } = render(
    <TopicList topics={fakeTopicList} />
  );
  expect(queryByTestId("archive-button")).toBeTruthy();
  expect(queryByTestId("delete-button")).toBeFalsy();
  expect(container.firstChild).toMatchSnapshot();
});



test("<TopicList/> with a topic undiscussed and with a title", () => {
  const { queryByTestId, queryByText } = render(
    <TopicList topics={fakeTopicList} title="test my title" />
  );
  expect(queryByTestId("topic-list-title").textContent).toBe("test my title");
  expect(queryByText("Loading...")).toBeFalsy();
});

test("Test the loading state", () => {
  const { queryByText } = render(<TopicList topics={[]} />);
  expect(queryByText("Loading...")).toBeTruthy();
});
