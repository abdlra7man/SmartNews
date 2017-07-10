/**
 * Created by johnny on 20/06/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import isEmpty from 'lodash/isEmpty';

import { currentCategory } from '../selectors/categorySelector';
import { updateCategory, removeCategory } from '../actions/categories';

import ActivityBlock from '../components/activityBlock';
import CategoryModal from '../components/categoryModal';
import AddUnitModal from './addUnitModal';

class ActivitiesContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      openUnitModal: false,
      openCategoryModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
  }

  openModal(modal) {
    this.setState({[modal]: true});
  }

  closeModal(modal) {
    this.setState({[modal]: false});
  }

  updateCategory(category) {
    this.props.dispatch(updateCategory(category));
  }

  removeCategory() {
    this.props.dispatch(removeCategory(this.props.currentCategory.id));
  }

  componentWillReceiveProps() {
    this.setState({
      openUnitModal: false,
      openCategoryModal: false
    })
  }

  render() {
    return (
    <main className="lf-main-content">
      <h1 className="lf-header--breadcrumbs lf-header--fixed">Marketplace > Learning Activities</h1>
      <div className="lf-content-container">
        <div className="lf-view">
          { !isEmpty(this.props.currentCategory) &&
          <a className="" onClick={() => this.openModal('openCategoryModal')}>edit category</a>
          }
          <a className="lf-btn--primary" onClick={() => this.openModal('openUnitModal')}>New learning activity</a>
          <Modal show={this.state.openUnitModal} onHide={() => this.closeModal('openUnitModal')}>
            <Modal.Header>
              <Modal.Title>Add learning activity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddUnitModal onHide={() => this.closeModal('openUnitModal')} />
            </Modal.Body>
          </Modal>
          <Modal show={this.state.openCategoryModal} onHide={() => this.closeModal('openCategoryModal')}>
            <Modal.Header>
              <Modal.Title>Update category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CategoryModal onHide={() => this.closeModal('openCategoryModal')}
              title={this.props.currentCategory.title}
              description={this.props.currentCategory.description}
              id={this.props.currentCategory.id}
              updateCategory={this.updateCategory}
              removeCategory={this.removeCategory}/>
            </Modal.Body>
          </Modal>
          {this.props.activities.map( (activity, key) => (
            <ActivityBlock key={key} {...activity} />
          ))}
        </div>
      </div>
    </main>
    )
  }
}

const stateToProps = (state, ownProps) => ({
  activities: state.activity.activitiesToDisplay,
  currentCategory: currentCategory(state, ownProps)
});

ActivitiesContainer = connect(stateToProps)(ActivitiesContainer);

export default ActivitiesContainer;