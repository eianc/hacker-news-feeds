import gql from 'graphql-tag';

export const getStories = gql`
    query Stories($first: Int, $after: Int) {
        allStories(first: $first, after: $after) {
            edges {
                cursor
                node {
                    id
                    score
                    author
                    title
                }
            }
            pageInfo {
                lastCursor
                hasNextPage
            }
        }
    }
`;
