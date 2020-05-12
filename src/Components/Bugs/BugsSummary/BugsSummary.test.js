import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BugsSummary from './BugsSummary';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const applicationsProps = [{
    application_id: 1,
    application_name: 'test'
  }];
  const bugsProps = {
      "bug_id": 1,
      "bug_name": "Bug 1",
      "application_id": 1,
      "ticket_number": "14538",
      "priority": "High",
      "status": "In-Progress",
      "environment": "Production",
      "notes": "Was messing around and got the wrong face",
      "reported_by": "Gimli",
      "reported_on": "2015-03-25T18:00:00.000Z",
      "expected_result": "Smiley face",
      "actual_result": "Sad Face",
      "steps": "this is the steps for bug 1",
      "developer": "Frodo",
      "developer_notes": "working on it",
      "last_updated": "2019-12-27T19:00:00.000Z"
  };

  ReactDOM.render(
    <BrowserRouter>
      <BugsSummary bugs={bugsProps} applications={applicationsProps} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});