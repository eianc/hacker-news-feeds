import React from 'react';
import { IStory } from '../interfaces/stories';

import './Story.css';

const Story: React.SFC<IStory> = (props) => {
    const { score, title, author } = props;
    return (
        <li className="c-storyItem" data-score={score}>
            <h2 className="c-storyItem__title">{title}</h2>
            <p className="c-storyItem__author">{author}</p>
            {/* <div className="c-story__content">
                <p className="c-story__text">{text}</p>
            </div> */}
        </li>
    )
};

export default Story;