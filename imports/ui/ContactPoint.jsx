import React, { Component, PropTypes } from 'react';
import moment from 'moment'; 
 
import { ContactPoints } from '../api/contactpoints.js';

// ContactPoint component - represents a single contact point
export default class ContactPoint extends Component {
	deleteThisContactPoint() {
		ContactPoints.remove(this.props.contactpoint._id);
	}
	render() {
		return (
		  <li>
		  	<button className="delete" onClick={this.deleteThisContactPoint.bind(this)}>
		      &times;
		    </button>
		  	{this.props.contactpoint.comment} - {moment(this.props.contactpoint.contactDate).format("MM/DD/YYYY")}
		  </li>
		);
	}
}
 
ContactPoint.propTypes = {
  // This component gets the contact point to display through a React prop.
  // We can use propTypes to indicate it is required
  contactpoint: PropTypes.object.isRequired,
};