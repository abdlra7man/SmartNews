import React from 'react';
import PropTypes from 'prop-types';

class CategoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title||'',
      description: props.description||''
    };

    this.createCategory = this.createCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  createCategory(e) {
    e.preventDefault();
    if (!!this.props.createCategory) {
      this.props.createCategory(this.state);
    }
  }

  updateCategory(e) {
    e.preventDefault();
    if (!!this.props.updateCategory) {
      this.props.updateCategory(this.state);
    }
  }

  removeCategory(e) {
    e.preventDefault();
    if (!!this.props.removeCategory) {
      this.props.removeCategory(this.state);
    }
  }

  onChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {

    return (
            <form className="lf-form" onSubmit={() => {}}>
              <fieldset>
                <div className="lf-input-group">
                  <label>Title</label>
                  <input type="text" name="title" value={this.state.title} onChange={this.onChange}/>
                </div>
                <div className="lf-input-group">
                  <label>Description</label>
                  <input type="text" name="description" value={this.state.description} onChange={this.onChange}/>
                </div>
              </fieldset>
              <fieldset>
                <div className="lf-btn-row">
                  <div className="lf-btn-row__inner">
                    { !!this.props.removeCategory &&
                    <button className="lf-btn--primary" onClick={this.removeCategory}>Remove</button>
                    }
                    { !!this.props.createCategory &&
                    <button className="lf-btn--primary" onClick={this.createCategory}>Save</button>
                    }
                    { !!this.props.updateCategory &&
                    <button className="lf-btn--primary" onClick={this.updateCategory}>Update</button>
                    }
                    <button className="lf-btn--default" onClick={e => {e.preventDefault(); this.props.onHide();}}>Cancel</button>
                  </div>
                </div>
              </fieldset>
            </form>
    );
  }
}

CategoryModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

export default CategoryModal;
