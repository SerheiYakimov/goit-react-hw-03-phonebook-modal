import { Component } from "react";
import "./App.css";

import { Form } from "./components/Form/Form";
import { Filter } from "./components/Filter/Filter";
import { ContactList } from "./components/ContactList/ContactList";
import Modal from "./components/Modal/Modal"

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    showModal: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }   
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))
  };
  
  


  addNewContact = (contact) => {
    if (this.state.contacts.find((el) => el.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
    } else {
      this.setState((prevState) => {
        return {
          contacts: [...prevState.contacts, contact],
        };
      });
    }
  };

  handleFilter = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };

  findContact = () => {
    const normalizeFilter = this.state.filter.toLowerCase();
    if (this.state.filter.length > 0) {
      return this.state.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizeFilter)
      );
    } else {
      return this.state.contacts;
    }
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((el) => el.id !== id),
    }));
  };

  render() {
    const { filter, showModal } = this.state;
    const { addNewContact, handleFilter, findContact, deleteContact } = this;

    return (
      <div className="App">
        <div className="container">
          {showModal && <Modal onClose={this.toggleModal}>
            <Form addNewContact={addNewContact} />
            <button className="button" type="button" onClick={this.toggleModal}>close</button>
          </Modal>}
          <h2 className="title">Phonebook</h2>
          <button className="button" type="button" onClick={this.toggleModal}>to add</button>
          
          <div>
            <h2 className="title">Contacts</h2>
            <Filter value={filter} onChange={handleFilter} />
            <ContactList
              findContact={findContact}
              onDeleteContact={deleteContact}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
