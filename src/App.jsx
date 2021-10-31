import { useState, useEffect } from 'react';
import shortid from 'shortid';
import s from './App.module.css';
import Form from './components/Form';
import Filter from './components/Filter';
import ContactList from './components/ContactList/ContactList';
import Container from './components/Container';
import { data } from './data/data';
//import useLS from './hooks/useLS';

function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? data,
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    if (contacts.some(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`You have already had ${data.name} in your contacts`);
      return;
    }
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    setContacts([contact, ...contacts]);
  };

  const handleInputChange = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
    return visibleContacts;
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <h1>Phonebook &#128222;</h1>
      <Form addContact={addContact} />
      <h2 className={s.contactsTitle}>Contacts</h2>
      <Filter value={filter} onChange={handleInputChange} />
      <ContactList
        contacts={contacts}
        getVisibleContacts={getVisibleContacts}
        deleteContact={deleteContact}
      />
    </Container>
  );
}

export default App;