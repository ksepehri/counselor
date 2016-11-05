import React, { Component, PropTypes } from 'react';
import moment from 'moment'; 
 
// ContactPoint component - represents a single contact point
export default class ContactPoint extends Component {
  render() {
    return (
      <li>{this.props.contactpoint.comment} - {moment(this.props.contactpoint.contactDate).format("MM/DD/YYYY")}</li>
    );
  }
}
 
ContactPoint.propTypes = {
  // This component gets the contact point to display through a React prop.
  // We can use propTypes to indicate it is required
  contactpoint: PropTypes.object.isRequired,
};