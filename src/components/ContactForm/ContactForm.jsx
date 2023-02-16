import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts, getContacts } from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';

import css from './ContactForm.module.css'; 

export const ContactForm = () => {
    const [name, setName] = useState('');
    const [number,setNumber] = useState('');

    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();
    
    const handleChange = (e) => {
        
        switch (e.target.name) {
            case 'name' :
                setName(e.target.value);
                break;
            case 'number' :
                setNumber(e.target.value);
                break;
            default:
                console.log(`Error in ${e.target.name}`);
        };
    };

    const addContact = (data) => {
        const { name, number } = data;
        if (validateContact(data)) {
        alert(`${name} is already in your contacts!`);
        return;
        };

        const newContact = { id: nanoid(), name, number };
        dispatch(addContacts(newContact));
    };
     const validateContact = (inputData) => {
         return contacts.find(contact => contact.name === inputData.name);
  };

    const handleSubmit = e => {
        e.preventDefault();
        addContact ({ name, number });
        setName('');
        setNumber('');
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <label>
                Name 
                <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
            </label>
            <label>
                Number 
                <input
                type="tel"
                name="number"
                value={number}
                onChange={handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                />
            </label>
            <button className={css.btn} type="submit">Add contact</button>       
        </form>
    );
};
