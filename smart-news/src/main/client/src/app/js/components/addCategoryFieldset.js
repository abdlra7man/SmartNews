/**
 * Created by johnny on 27/06/17.
 */
import React from 'react';
import Select from 'react-select';
import without from 'lodash/without';
import unionBy from 'lodash/unionBy';

import '../../less/components/addCategoryFieldset.less';

class AddCategoryFieldset extends React.Component {
  constructor(props) {
    super(props);

    let categories = this.props.categories.map(item => Object.assign({}, item, { label: item.title, value: item.id }));
    let selectedCategories = (this.props.selectedCategories || []).map(item => Object.assign({}, item, { label: item.title, value: item.id }));

    this.state = {
      selectedCategories,
      categories,
      value: {}
    };

    this.onAddCategory = this.onAddCategory.bind(this);
    this.onRemoveCategory = this.onRemoveCategory.bind(this);
  }

  onAddCategory(value) {
    this.setState({
      value,
      selectedCategories: unionBy(this.state.selectedCategories, [value], 'value')
    }, () => {
      this.props.updateCategories(this.state.selectedCategories.slice(0));
    });
  }

  onRemoveCategory(category) {
    this.setState({
      selectedCategories: without(this.state.selectedCategories, category)
    }, () => {
      this.props.updateCategories(this.state.selectedCategories.slice(0));
    });
  }

  render() {
    return (
      <fieldset>
        <legend>
          categories
        </legend>
        <div className="lf-input-group">
          <label>Add to a category</label>
          <Select onChange={this.onAddCategory} backspaceRemoves={false} clearable={false} options={this.state.categories} value={this.state.value} />
        </div>
        <div className="lf-input-group">
          <label>Categories</label>
          <div>
            <ul>
              {this.state.selectedCategories.map((item, key) => {
                return (
                  <li key={key}><span>{item.title}</span><a onClick={() => this.onRemoveCategory(item)}><i className="fa-minus-circle fa"></i></a></li>
                );
              })}
            </ul>
          </div>
        </div>
      </fieldset>
    );
  }
}

export default AddCategoryFieldset;