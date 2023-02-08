import {useState, useEffect} from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts')
    
    if (!savedContacts) return;
    const parsedContacts = JSON.parse(savedContacts);

    if(!parsedContacts.length) return;
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (data) => {
    const { name, number } = data;
    if (validateContact(data)) {
      alert(`${name} is already in your contacts!`);
      return;
    };

    const newContact = { id: nanoid(), name, number };
    
    setContacts(contacts => [...contacts, newContact]);
    return newContact.id;   
  };

  const validateContact = (inputData) => {
    return contacts.find(contact => contact.name === inputData.name);
  };

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
  };

    const deleteContact = contactId => {
      setContacts(contacts => contacts.filter(({id}) => id !== contactId));
    };
     
    const visibleContacts = getVisibleContacts();
      
      return (
        <div className={css.phoneContainer}>
        <h1 className={css.phoneTitle}>Phonebook</h1>
        <ContactForm onSubmit={addContact}/>

        <h2 className={css.phoneTitle}>Contacts</h2>
        <Filter onChange={changeFilter} value={filter} /> 
        <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
        </div>
      );
}


export default App;
