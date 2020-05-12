import React from 'react';
import ReactDOM from 'react-dom';
import UpdateApplication from './UpdateApplication';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <UpdateApplication />, div );
  ReactDOM.unmountComponentAtNode(div);
});