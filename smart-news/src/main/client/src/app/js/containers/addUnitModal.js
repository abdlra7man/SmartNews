/**
 * Created by johnny on 26/06/17.
 */
import React from 'react';
import Select from 'react-select';
import Promise from 'bluebird';
import { connect } from 'react-redux';

import AddCategoryFieldset from '../components/addCategoryFieldset';
import { ERROR } from '../actions/actionTypes';
import { createActivity } from '../actions/activities';
import { searchUnitsByKeywords } from '../utils/API';
import { allNamedCategories as categories} from '../selectors/categorySelector';

class AddUnitModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activity: {}
    };

    this.getUnits = this.getUnits.bind(this);
    this.onAddUnit = this.onAddUnit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
  }

  onAddUnit(unit) {
    this.setState({
      activity: unit
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.dispatch(createActivity(this.state.activity, this.selectedCategories));
  }

  updateCategories(categories) {
    this.selectedCategories = categories;
  }

  getUnits(keyword) {
    if (!keyword) {
      return Promise.resolve({options: []});
    } else {
      return searchUnitsByKeywords(keyword).then( resp => {
        return { options: resp.map( item => {
          return Object.assign(item, { label: `(${item.id}) ${item.title}`, value: item.id});
        })};
      }).catch(error => {
        this.props.dispatch({
          type:ERROR,
          payload: {
            message: error.response.data.message
          }
        });
      });
    }
  }

  render() {
    const AsyncSelect = Select.Async;
    return (
      <form className="lf-form" onSubmit={this.onSubmit}>
        <fieldset>
          <div className="lf-input-group">
            <label>Learning activity</label>
            <AsyncSelect multi={false} clearable={false} onChange={this.onAddUnit} loadOptions={this.getUnits} value={this.state.activity}/>
          </div>
        </fieldset>
        <AddCategoryFieldset categories={this.props.categories} updateCategories={this.updateCategories} />
        <fieldset>
          <div className="lf-btn-row lf-btn-row--right">
            <div className="lf-btn-row__inner">
              <button className="lf-btn--primary" type="submit">Save</button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

const stateToProps = state => ({
  categories: categories(state)
});

AddUnitModal = connect(stateToProps)(AddUnitModal);

export default AddUnitModal;