import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment'; 

import { ContactPoints } from '../api/contactpoints.js';
import { Companies } from '../api/companies.js';

import ContactPoint from './ContactPoint.jsx';
 
// Company component - represents a single company
export class Company extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      hide: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  renderContactPoints(companyId) {
    return this.props.contactpoints.filter(cp => cp.companyId.toString() === companyId.toString()).map((contactpoint) => (
      <ContactPoint key={contactpoint._id} contactpoint={contactpoint} />
    ));
  }
  deleteThisCompany() {
  	confirm("Are you sure?") ? Companies.remove(this.props.company._id) : "";
  }

  handleSubmit(event) {
    event.preventDefault();

    const companyId = this.props.company._id;

    // Find the text field via the React ref
    let comment = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    if(comment.length > 0) {
	    // see if you can extract a date from the comment to use as the contact date
	    let contactDate = moment(comment, "M/D/YYYY").toDate();

	    // if not then set contact date to today
	    if(!moment(contactDate).isValid())
	    	contactDate = new Date();
	    else
	    	comment = comment.replace(/\d{1,2}[\-|\.|\/]\d{1,2}([\-|\.|\/]\d{2,4})?/g, "").trim();

	    ContactPoints.insert({
	      companyId,
	      comment,
	      contactDate,
	      createdAt: new Date(), // current time
	    });
	}
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHide() {
    this.setState({
      hide: !this.state.hide,
    });
  }

  render() {
  	let positionInfo = this.props.company.position ? 
  		<div><a href={this.props.company.position.url}>{this.props.company.position.name}</a></div> :
  		"";
    return (
      <li>
      	<button className="delete" onClick={this.deleteThisCompany.bind(this)}>
	      &times;
	    </button>
      	<h3 className="disable-select" onClick={this.toggleHide.bind(this)}>{this.props.company.name}</h3>
      	{positionInfo}
      	<div className={this.state.hide ? "hide" :""}>
	      	<ul>{this.renderContactPoints(this.props.company._id)}</ul>
	      	<form className="new-task" onSubmit={this.handleSubmit} >
	            <input
	              type="text"
	              ref="textInput"
	              placeholder="Type to add new contact point"
	            />
	        </form>
        </div>
      </li>
    );
  }
}
 
Company.propTypes = {
  // This component gets the company to display through a React prop.
  // We can use propTypes to indicate it is required
  company: PropTypes.object.isRequired,
};

export default createContainer(() => {
  return {
    contactpoints: ContactPoints.find({}, {sort: {contactDate: 1}}).fetch(),
  };
}, Company);