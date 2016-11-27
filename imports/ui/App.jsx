import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Companies } from '../api/companies.js';

import Company from './Company.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true,
    };
  }
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.companyNameInput).value.trim();
    const position = {
      name: ReactDOM.findDOMNode(this.refs.positionNameInput).value.trim(),
      url: ReactDOM.findDOMNode(this.refs.positionUrlInput).value.trim()
    };
    if(name.length > 0) {
      Companies.insert({
        name,
        position,
        createdAt: new Date(), // current time
      });

      // Clear form
      ReactDOM.findDOMNode(this.refs.companyNameInput).value = '';
      ReactDOM.findDOMNode(this.refs.positionNameInput).value = '';
      ReactDOM.findDOMNode(this.refs.positionUrlInput).value = '';

      this.toggleHide();
    }
  }
  
  renderCompanies() {
    return this.props.companies.map((company) => (
      <Company key={company._id} company={company} />
    ));
  }

  toggleHide() {
    this.setState({
      hide: !this.state.hide,
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <header>
            <h1>Counselor - Manage Your Career</h1>
          </header>
          <ul>
            {this.renderCompanies()}
          </ul>
          <div className={!this.state.hide ? "hide" :"add-company disable-select"} onClick={this.toggleHide.bind(this)}>Add Company</div>
          <form className={this.state.hide ? "hide" :"new-task"} onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="companyNameInput"
              placeholder="Type to add new Company"
            />
            <input
              type="text"
              ref="positionNameInput"
              placeholder="Position Name (optional)"
            />
            <input
              type="text"
              ref="positionUrlInput"
              placeholder="Position URL (optional)"
            />
           {/* submit input needed if wanting to submit form with multiple text inputs */}
           <input className="hide" type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  companies: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    companies: Companies.find({}).fetch(),
  };
}, App);