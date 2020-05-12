import React from 'react';
import ReactDOM from 'react-dom';
import AddApplication from './AddApplication';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <AddApplication />, div );
  ReactDOM.unmountComponentAtNode(div);
});