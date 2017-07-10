/**
 * Created by johnny on 20/06/17.
 */
import React from 'react';
import { connect } from 'react-redux';

import { createCategory } from '../actions/categories';

import CategoryModal from '../components/categoryModal.js';

class CreateCategoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.createCategory = this.createCategory.bind(this);
  }

  createCategory(category) {
   this.props.dispatch(createCategory(category));
  }

  render() {
    return (
      <CategoryModal  {...this.props} createCategory={this.createCategory} />
    );
  }
}

CreateCategoryContainer = connect()(CreateCategoryContainer);

export default CreateCategoryContainer;

