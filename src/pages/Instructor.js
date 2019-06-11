import React from 'react';
import DataContainer from '../components/DataContainer';
import LoadingLarge from '../components/LoadingLarge';
import { INSTRUCTOR_URL } from '../util/api';

class Instructor extends React.Component {
  render() {
    return (
      <div>
        <div className='uk-container'>
          <DataContainer url={INSTRUCTOR_URL}>
            <div>
              <LoadingLarge key="instructor-course" />
            </div>
          </DataContainer>
        </div>
      </div>
    );
  }
}

export default Instructor;