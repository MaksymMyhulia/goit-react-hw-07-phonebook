import { GlobalStyle } from './GlobalStyle';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Section } from 'components/Section/Section';
import { Header } from 'components/Header/Header';
import { Container } from 'components/Container/Container';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/contacts/contactsOperations';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm />

        <Header title="Contacts" />
        <Filter />
        <ContactList />
      </Section>
      <ToastContainer />
      <GlobalStyle />
    </Container>
  );
};
