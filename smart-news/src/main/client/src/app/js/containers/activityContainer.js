/**
 * Created by johnny on 27/06/17.
 */
import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { updateActivity } from '../actions/activities';
import { allNamedCategories as categories } from '../selectors/categorySelector';
import AddCategoryFieldset from '../components/addCategoryFieldset';

const STATUS = {
  Active: [{ label: 'Active', value: 'Active'}, { label: 'Inactive', value: 'Inactive'}],
  Inactive: [{ label: 'Active', value: 'Active'}, { label: 'Inactive', value: 'Inactive'}],
  Draft: [{ label: 'Active', value: 'Active'}, { label: 'Draft', value: 'Draft'}]
};

class ActivityContainer extends React.Component {
  constructor(props) {
    super(props);
    const { categories, ...rest } = props.activity;

    this.state = {
      selectedCategories: categories.slice(0),
      activity: Object.assign({ price: 0 }, rest),
      stateOptions: STATUS[rest.status]
    };

    this.updateCategories = this.updateCategories.bind(this);
    this.updateUnit = this.updateUnit.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  updateCategories(selectedCategories) {
    this.setState({selectedCategories});
  }
  
  updateUnit(e) {
    const { value, name } = e.target;
    this.setState({
      activity: Object.assign({}, this.state.activity, { [name]: value })
    });
  }

  updateStatus(selection) {
    this.setState({
      activity: Object.assign({}, this.state.activity, { status: selection.value })
    });
  }

  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.dispatch(updateActivity(this.state.activity, this.state.selectedCategories));
  }

  render() {
    return (
      <main className="lf-main-content">
        <h1 className="lf-header--breadcrumbs lf-header--fixed">Marketplace > Learning Activities</h1>
        <div className="lf-content-container">
          <form className="lf-view lf-form" onSubmit={this.onSubmit}>
            <fieldset>
              <legend>Learning activity</legend>
              <div>
                <div></div>
                <div>
                  <span>Unit#{this.props.activity.id}</span>
                  <h3>{this.props.activity.title}</h3>
                  <p>{this.props.activity.description}</p>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>options</legend>
              <div className="lf-input-group">
                <label>Cost</label>
                <input type="number" name="price" value={this.state.activity.price} onChange={this.updateUnit}/>
              </div>
              <div className="lf-input-group">
                <label>Status</label>
                <Select options={this.state.stateOptions} backspaceRemoves={false} onChange={this.updateStatus} clearable={false} value={this.state.activity.status}/>
              </div>
            </fieldset>

            <AddCategoryFieldset categories={this.props.categories} selectedCategories={this.state.selectedCategories} updateCategories={this.updateCategories}/>

            <div className="lf-btn-row--footer">
              <div className="lf-btn-row__inner">
                <button type="submit" className="lf-btn--primary">save</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

const stateToProps = state => ({
  activity: state.activity.currentActivity,
  categories: categories(state)
});

ActivityContainer = connect(stateToProps)(ActivityContainer);
export default  ActivityContainer;