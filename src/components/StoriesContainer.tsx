import React, {Fragment }  from 'react';
import { useQuery } from '@apollo/react-hooks';
import { IEdge } from '../interfaces/stories'; 
import { getStories } from '../queries/stories';
import Story from './Story';

const StoriesContainer = () => {
    const { loading, error, data, fetchMore } = useQuery(getStories,
        { variables: { first: 50, after: 0 }}
    );
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! ${error.message}</p>;

    const showLoadMoreButton = data.allStories && data.allStories.pageInfo.hasNextPage;

    const loadMore = () => {
        const newlyFetchedDate =  fetchMore({
            variables: {
                first: 50,
                after: parseInt(data.allStories.pageInfo.lastCursor),
            },
            updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                if (!fetchMoreResult) return prev;
                return {
                    allStories: {
                        __typename: "StoriesResult",
                        edges: [
                            ...prev.allStories.edges,
                            ...fetchMoreResult.allStories.edges, 
                        ],
                        pageInfo: {
                            __typename: "PageInfo",
                            lastCursor: fetchMoreResult.allStories.pageInfo.lastCursor,
                            hasNextPage: fetchMoreResult.allStories.pageInfo.hasNextPage
                        }
                    }
                };
            },
        });
        return newlyFetchedDate;
    }

    return (
        <div>
            <ul className="c-story">
                {data.allStories.edges.map((item: IEdge) => (
                    <Fragment key={item.node.id}>
                        <Story 
                            score={item.node.score}
                            title={item.node.title}
                            author={item.node.author}
                            // text='fdsfdsf'
                        />
                    </Fragment>
                ))}
            </ul>
            {showLoadMoreButton && (
                //TODO load more data on infinite scroll React WayPoint
                <button type="button" onClick={loadMore}>Load More</button>
            )}
        </div>
    );
};

export default StoriesContainer;