import React from 'react';
import PropTypes from 'prop-types';
import AssignmentIcons from './AssignmentIcons';
import AssignmentDetails from './AssignmentDetails';
import { gradeRound } from '../util/grades';
import Modal from './Modal';

class StudentAssignmentRow extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isFake: PropTypes.bool,
    fakeScore: PropTypes.number,
    score: PropTypes.number,
    percent: PropTypes.number,
    outOf: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    getCategoryName: PropTypes.func.isRequired,
    removeFakeAssignment: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isFake: false,
    fakeScore: undefined,
    score: undefined,
    percent: undefined,
  }

  render() {
    const {
      id,
      name,
      isFake,
      fakeScore,
      score,
      outOf,
      percent,
      category,
      getCategoryName,
      removeFakeAssignment,
    } = this.props;

    const icons = <AssignmentIcons {...this.props} />;
    const details = <AssignmentDetails {...this.props} />;

    let displayScore = '-';
    if (fakeScore != null) displayScore = <strong className="uk-text-link">{fakeScore}</strong>;
    else if (score != null) displayScore = score;

    let displayPercent = '-';
    if (fakeScore != null) {
      displayPercent = (
        <strong className="uk-text-link">
          {gradeRound(percent)}
          <span>%</span>
        </strong>
      );
    } else if (percent != null) displayPercent = `${gradeRound(percent)}%`;

    const displayCategory = getCategoryName(category);

    return (
      <tr>
        <td id={`details-${id}-boundary`}>
          {isFake ? (
            <span className="uk-text-link">
              <strong>{name}</strong>
              <a className="uk-margin-small-left" data-uk-icon="trash" onClick={() => removeFakeAssignment(id)} />
            </span>
          ) : name}
          <span className="uk-margin-small-left">
            <span className="uk-visible@m">
              <a>{icons}</a>
              <div id={`details-${id}-dropdown`} data-uk-dropdown={`mode: click; boundary: #details-${id}-boundary; boundary-align: true; pos: top-justify; animation: uk-animation-slide-bottom-small uk-animation-fast`}>
                {details}
              </div>
            </span>
            <span className="uk-hidden@m">
              <a data-uk-toggle={`target: #details-${id}-modal`}>{icons}</a>
              <Modal name={`details-${id}`} isCentered>
                <span className="uk-text-center">
                  <h4 className="uk-heading-line uk-margin-remove-bottom"><span>{name}</span></h4>
                  <p className="uk-text-muted uk-margin-remove-top">
                    <strong>Score: </strong>
                    {displayScore}
                    <span> / </span>
                    {outOf}
                    <span> | </span>
                    <strong>Percent: </strong>
                    {displayPercent}
                    <span> | </span>
                    {displayCategory}
                  </p>
                </span>
                {details}
              </Modal>
            </span>
          </span>
        </td>
        <td>
          {displayScore}
        </td>
        <td>{outOf}</td>
        <td>
          {displayPercent}
        </td>
        <td>{displayCategory}</td>
      </tr>
    );
  }
}

export default StudentAssignmentRow;
