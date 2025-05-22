import Section from './Section/Section';
import Header from './Header/Header';
import logoImgPath from '../images/logo.svg';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Backdrop from './Backdrop/Backdrop';
import Sidebar from './Sidebar/Sidebar';
import menuItems from '../data/sidebarMenu.json';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Description from './Description/Description';
import ContactList from './ContactList/ContactList';
import contacts from '../data/contacts.json';

import SearchBox from './SearchBox/SearchBox';
import ContactForm from './ContactForm/ContactForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import Container from './Container/Container';

const homeWork = {
  number: '3',
  title: 'Forms.',
};

const defaultContactsState = contacts;

const App = () => {
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [contactsState, setContactsState] = useLocalStorage(
    'contacts',
    defaultContactsState
  );
  const [filter, setFilter] = useState('');

  //open-close mobile menu sidebar
  function updateMobileMenuStatus(mobileMenuStatus) {
    setMobileMenuStatus((mobileMenuStatus = !mobileMenuStatus));
  }

  //filter contacts list for search
  const filtersdContacts = contactsState.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  //get and set values from SearchBox
  function handleInput(value) {
    setFilter(value);
  }

  //add new contact to contacts list
  function handleAddNewContact(data) {
    if (findContact(data.name)) {
      toast.error('Contact with the same name already exists.');
      return;
    }
    setContactsState([
      ...contactsState,
      { id: nanoid(), name: data.name, number: data.number },
    ]);
  }

  //delete contact from comtact list
  function handleDeleteContact(id) {
    setContactsState(contactsState.filter(contact => contact.id != id));
  }

  //find contact in contact list by name
  function findContact(name) {
    return contactsState.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  }

  return (
    <Section>
      <Header
        logoImgPath={logoImgPath}
        moduleNumber={homeWork.number}
        moduleTitle={homeWork.title}
        onUpdate={updateMobileMenuStatus}
      />
      <Main>
        <Description
          title="Phonebook"
          description="Please add your contacts in the phonebook by filling the form below."
        />
        <ContactForm addContact={handleAddNewContact} />

        {contactsState.length === 0 ? (
          <p>There are no any contacts yet.</p>
        ) : (
          <Container variant="outerContainer">
            <SearchBox onInput={handleInput} inputValue={filter} />
            {filtersdContacts.length === 0 && contactsState.length !== 0 ? (
              <p>There are no contacts with your search.</p>
            ) : (
              <ContactList
                contacts={filtersdContacts}
                onDelete={handleDeleteContact}
              />
            )}
          </Container>
        )}
        <Toaster
          toastOptions={{
            removeDelay: 500,
          }}
        />
      </Main>
      <Footer />
      <Backdrop mobileMenu={mobileMenuStatus}>
        <Sidebar
          menuItems={menuItems}
          variant="mobileMenu"
          mobileMenu={mobileMenuStatus}
          moduleNumber={homeWork.number}
          moduleTitle={homeWork.title}
          onUpdate={updateMobileMenuStatus}
        />
      </Backdrop>
    </Section>
  );
};

export default App;
