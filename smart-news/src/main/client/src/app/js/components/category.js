import React from 'react';
import PropTypes from 'prop-types';

import store from '../../../store';
import { gotoActivities } from '../actions/activities';

import '../../less/components/categoryLink.less';

class Category extends React.Component {
  render() {
    return (
      <a
        onClick={e => {e.preventDefault();store.dispatch(gotoActivities(this.props.id))}}
        href
        className="nav-link">
        <i className="icon fa fa-file"></i>{this.props.title}
        <span>{this.props.unitCount}</span>
      </a>)
  }
}

Category.propTypes = {
  title: PropTypes.string
};

export default Category;
