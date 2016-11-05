import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Companies } from '../api/companies.js';

import Company from './Company.jsx';

// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    if(name.length > 0) {
      Companies.insert({
        name,
        createdAt: new Date(), // current time
      });
    }

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  
  renderCompanies() {
    return this.props.companies.map((company) => (
      <Company key={company._id} company={company} />
    ));
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
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new Company"
            />
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