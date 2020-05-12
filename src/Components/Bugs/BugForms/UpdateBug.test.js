import React from 'react';
import ReactDOM from 'react-dom';
import UpdateBug from './UpdateBug';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <UpdateBug />, div );
  ReactDOM.unmountComponentAtNode(div);
});