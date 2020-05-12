import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApplicationsSummary from './ApplicationsSummary';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const applicationsProps = [];
  const bugsProps = [];

  ReactDOM.render(
    <BrowserRouter>
      <ApplicationsSummary bugs={bugsProps} applications={applicationsProps} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});