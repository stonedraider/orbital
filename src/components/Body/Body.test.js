import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Body from './Body';

describe('Body', () => {

    it('Body renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Body />, div);
    });

    test('snapshots', () => {
        const component = renderer.create(
            <Body />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});