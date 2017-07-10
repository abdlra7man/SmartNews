/**
 * Created by johnny on 19/06/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { fetchMarketplace } from '../actions/marketplace';
import CategoriesContainer from '../containers/categories';
import ActivitiesContainer from '../containers/activitiesContainer';
import ActivityContainer from '../containers/activityContainer';

class Marketplace extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchMarketplace());
  }

  render() {
   return (
   <div>
     <CategoriesContainer {...this.props}/>
     <Route path="/category/:categoryId" exact={true} component={ActivitiesContainer}/>
     <Route path="/" exact={true} component={ActivitiesContainer}/>
     <Route path="/category/activity/:activityId" exact={true} component={ActivityContainer} />
   </div>);
  }
}

Marketplace = connect()(Marketplace);

export default Marketplace;
