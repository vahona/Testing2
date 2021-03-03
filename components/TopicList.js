import React from "react";
export default function TopicList({
  title,
  topics,
  archiveTopic,
  deleteTopic,
  upvoteTopic,
  downvoteTopic,
}) {
  if (!topics) {
    console.error("No topics passed");
    return null;
  }
  return (
    <section className="next-topic">
      <header>
        <h4 data-testid="topic-list-title">{title}</h4>
      </header>
      <section className="next-topic-container">
        {!topics.length && "Loading..."}
        {topics.map((topic) => {
          const discussedOnDate = new Date(Number(topic.discussedOn));
          return (
            <article key={topic.id}>
              {!topic.discussedOn ? (
                <button
                  onClick={() => archiveTopic(topic.id)}
                  className="archive"
                  data-testid="archive-button"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => deleteTopic(topic.id)}
                  className="delete"
                  data-testid="delete-button"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              )}
              <h5 className="topic-text">{topic.title}</h5>
              {!topic.discussedOn ? (
                <div className="votes">
                  <button
                    onClick={() => upvoteTopic(topic.id)}
                    className="upvote"
                    data-testid="upvote-topic"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      ></path>
                    </svg>
                  </button>
                  <span className="upvote-number">{topic.upvotes}</span>
                  <button
                    onClick={() => downvoteTopic(topic.id)}
                    className="downvote"
                    data-testid="down-topic"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                      ></path>
                    </svg>
                  </button>
                  <span className="downvote-number">{topic.downvotes}</span>
                </div>
              ) : (
                <p>Discussed on {discussedOnDate.toLocaleDateString()}</p>
              )}
            </article>
          );
        })}
      </section>
    </section>
  );
}
