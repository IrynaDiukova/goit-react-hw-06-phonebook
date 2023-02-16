import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/contactsSlice';
import { getNameFilter } from '../../redux/filterSlice';
import { ContactItem } from '../ContactItem/ContactItem';


export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const contactFilter = useSelector(getNameFilter);

   const getVisibleContacts = () => {
    const normalized = contactFilter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalized));
  };
    return (
        <>
      <ul>
        {getVisibleContacts().map(({id, name, number}) => (
            <ContactItem 
            key={id}
            id={id}
            name={name}
            number={number}
        />))}
       </ul>
       </>
    )
    
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
