interface IStory {
    id?: string,
    score: number,
    title: string,
    author: string
}

interface IEdge {
    cursor: string;
    node: IStory;
}

interface IPageInfo {
    lastCursor?: string;
    hasNextPage: boolean;
}

interface IStoriesResultCursor {
    edges: IEdge[];
    pageInfo: IPageInfo;
    totalCount: number;
}

export {
    IStory,
    IEdge,
    IPageInfo,
    IStoriesResultCursor
}