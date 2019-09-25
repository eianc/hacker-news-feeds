import axios from 'axios';
import { UserInputError } from 'apollo-server';
import { HACKER_NEWS_TOP_STORIES, HACKER_NEWS_ITEM } from '../constants/stories';

const getStoryIdUrl = (storyId: String) => `${HACKER_NEWS_ITEM}${storyId}.json`; 

const resolveStoriesIds = async () => {
    let response =  await axios.get(HACKER_NEWS_TOP_STORIES);
    return await response.data;
}

const getStories = async (ids: [String]) => {
	const stories = ids.map(id => axios.get(getStoryIdUrl(id)));
	const items = await Promise.all(stories);
	const result = items.map(item => ({
		cursor: item.data.id,
		node: item.data
	}));
	return result;
}

const resolveStories = async (root: any, { first, after }: {first: number, after: number}) => {
    if (first < 0) {
      throw new UserInputError('First must be positive');
    }
    const storiesIds = await resolveStoriesIds();
    const totalCount = storiesIds.length;
    const afterIndex = storiesIds.indexOf(after); 
    const index =  afterIndex !== -1 ? afterIndex: 0;
    const edgesArray  = storiesIds.slice(index, index + first); 
    const edges = getStories(edgesArray);
    const lastCursor = index + first;
    const pageInfo = {
      lastCursor: storiesIds[lastCursor],
      hasNextPage: totalCount > lastCursor
    }
    
    const result = {
      edges,
      pageInfo,
      totalCount,
    };

    return result;
  };

  export {
	  resolveStoriesIds,
    resolveStories
  }