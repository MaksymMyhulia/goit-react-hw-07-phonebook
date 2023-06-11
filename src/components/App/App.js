import { GlobalStyle } from './GlobalStyle';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Section } from 'components/Section/Section';
import { Header } from 'components/Header/Header';
import { Container } from 'components/Container/Container';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/contacts/contactsOperations';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm />
        <Header title="Contacts" />
        <Filter />
        {isLoading && !error && <b>Request in progress...</b>}
        <ContactList />
      </Section>
      <ToastContainer />
      <GlobalStyle />
    </Container>
  );
};
