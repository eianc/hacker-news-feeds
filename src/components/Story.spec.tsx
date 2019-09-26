import React from 'react';
import { shallow } from 'enzyme';
import Story from './Story';

describe('Story', () => {
    it('renders the component', () => {
        // Act
        const component = shallow(<Story
            score={3434}
            title="GraphQL is so cool"
            author="crazydev"
        />);
        const el = component.find('.c-storyItem');
        
        // Assert
        expect(el.length).toEqual(1);
    })
});
