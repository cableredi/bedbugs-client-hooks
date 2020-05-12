import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BugsList from './BugsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <BugsList />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});