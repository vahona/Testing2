import React, { useState, useEffect } from 'react';
import AddTopic from './AddTopic';
import TopicList from './TopicList';

const url = `https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json`;

export default function App() {
	const [topics, setTopics] = useState([]);

	async function fetchTopics() {
    const res = await fetch(url);
    try {
      const data = await res.json();
      setTopics(data);
    } catch (e) {
      // console.log(e);
    }
  }

	useEffect(() => {
		fetchTopics();
	}, []);

	function addNewTopic(e) {
		e.preventDefault();
		const title = e.target.topic.value;
		if (!title) return;
		const newTopic = {
			title,
			upvotes: 0,
			downvotes: 0,
			id: Date.now(),
		};
		const newTopicList = [...topics, newTopic];
		setTopics(newTopicList);
		e.target.reset();
	}

	function archiveTopic(topicId) {
		const newTopicList = topics.map(topic => {
			if (topic.id === topicId) {
				return {
					...topic,
					discussedOn: Date.now(),
				};
			}
			return topic;
		});
		setTopics(newTopicList);
	}

	function upvoteTopic(topicId) {
		const newTopicList = topics.map(topic => {
			if (topic.id === topicId) {
				return {
					...topic,
					upvotes: topic.upvotes + 1,
				};
			}
			return topic;
		});
		setTopics(newTopicList);
	}

	function downvoteTopic(topicId) {
		const newTopicList = topics.map(topic => {
			if (topic.id === topicId) {
				return {
					...topic,
					downvotes: topic.downvotes + 1,
				};
			}
			return topic;
		});
		setTopics(newTopicList);
	}
	function deleteTopic(topicId) {
		const newList = topics.filter(topic => topic.id !== topicId);
		setTopics(newList);
	}

	function sortTopic(topicA, topicB) {
		const rateTopicA = topicA.upvotes - topicA.downvotes;
		const rateTopicB = topicB.upvotes - topicB.downvotes;
		return rateTopicB - rateTopicA;
	}

	return (
    <>
      <h1 data-testid="app-title"> Tea time topic 💡</h1>
      <AddTopic addNewTopic={addNewTopic}></AddTopic>
      <TopicList
        archiveTopic={archiveTopic}
        deleteTopic={deleteTopic}
        upvoteTopic={upvoteTopic}
        downvoteTopic={downvoteTopic}
        title="Next Topics"
        topics={topics.filter((topic) => !topic.discussedOn).sort(sortTopic)}
      >
	  </TopicList>
      <TopicList
        archiveTopic={archiveTopic}
        deleteTopic={deleteTopic}
        upvoteTopic={upvoteTopic}
        downvoteTopic={downvoteTopic}
        title="Past Topics"
        topics={topics.filter((topic) => topic.discussedOn).sort(sortTopic)}
      ></TopicList>
    </>
  );
}
