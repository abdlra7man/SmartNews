import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';

import { createCategory } from '../actions/categories';
import { allCategories as categories } from '../selectors/categorySelector';

import Category from '../components/category.js';
import CreateCategoryModal from './createCategoryModal';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      createCategory: category => this.props.dispatch(createCategory(category)),
      title: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({openModal: true});
  }

  closeModal() {
    this.setState({openModal: false});
  }

  componentWillReceiveProps() {
    this.setState({openModal: false});
  }

  render () {
    return (
      <aside className="side-panel">
        <Modal show={this.state.openModal} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>This is title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateCategoryModal onHide={this.closeModal} />
          </Modal.Body>
        </Modal>
        <header>
          <span className="breadcrumb nav-title">Marketplace</span>
        </header>
        <section className="nav-section">
          <div className="container">
            <h3 className="nav-section-title newLink">
              <a className="new lf-btn--primary" onClick={this.openModal}></a>
              CATEGORIES
            </h3>
            <ul>
              {this.props.categories.map( (category, key) => (
                <li key={key} className="nav-item">
                  <Category
                    {...category}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </aside>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array
};

const mapStateToProps = state => ({
  categories: categories(state)
});

Categories = connect(mapStateToProps)(Categories);

export default Categories;
