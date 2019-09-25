import React from 'react';
import { IStory } from '../interfaces/stories';

const Story: React.SFC<IStory> = (props) => {
    const { score, title, author } = props;
    return (
        <li className="c-Story" data-score={score}>
            <h2 className="c-Story__title">{title}</h2>
            <p className="c-Story__author">{author}</p>
            {/* <div className="c-Story__content">
                <p className="c-Story__text">{text}</p>
            </div> */}
        </li>
    )
};

export default Story;