import React from 'react';
import ReactDOM from 'react-dom';
import AddBug from './AddBug';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <AddBug />, div );
  ReactDOM.unmountComponentAtNode(div);
});