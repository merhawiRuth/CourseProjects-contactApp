import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  };
  state = {
    query: ''
  };

  updateQuery(query) {
    this.setState({ query: query.trim() });
  }
  render() {
    const { query } = this.state;
    const { contacts, onDeleteContact } = this.props;

    const filterdData =
      query === ''
        ? contacts
        : contacts.filter(c => {
            return c.name.toLowerCase().includes(query.toLowerCase());
          });
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
        </div>
        <ol className="contact-list">
          {filterdData.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                onClick={() => onDeleteContact(contact)}
                className="contact-remove"
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
