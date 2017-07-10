/**
 * Created by johnny on 21/06/17.
 */
import React from 'react';

import store from '../../../store';
import { gotoActivities, gotoActivity } from '../actions/activities';

import '../../less/components/activityBlock.less';

class ActivityBlock extends React.Component {
  render () {
    return (
      <div className="activity-block">
        <div className="activity-header"></div>
        <div className="activity-content">
          <small>Unit#{this.props.id}</small>
          <a href onClick={e => {e.preventDefault();store.dispatch(gotoActivity(this.props.id))}}>{this.props.title}</a>
          <p>{this.props.description}</p>
          <small className="category-tags">
            <i className="fa fa-folder" />
            {this.props.categories.map((category, key) => (
              <a href onClick={e => {e.preventDefault(); store.dispatch(gotoActivities(category.id))}} key={key}>{category.title}</a>
            ))}
          </small>
        </div>
      </div>
    );
  }
}

export default ActivityBlock;