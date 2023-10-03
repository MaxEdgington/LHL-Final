import React from 'react';
import NewProjectForm from './NewProjectForm';

function StartNewProject(props) {
  const { SetView } = props;

  return (
    <>
      <div>
        <NewProjectForm SetView={SetView} />
      </div>
    </>
  );
}

export default StartNewProject;
