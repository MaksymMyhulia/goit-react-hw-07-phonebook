import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { toastifyOptions } from 'utils/toastifyOptions';

import { List, Item, DeleteBtn } from './ContactList.styled';

import { deleteContact } from 'redux/contacts/contactsOperations';


import {
  selectContacts,
  selectIsLoading,
  selectError,
  selectFilteredContacts,
  selectFilter,
} from 'redux/selectors';
import { Loader } from 'components/Loader/Loader';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  
  const result = useSelector(selectFilteredContacts);

  const getFilteredContacts = data => {
    if (filter.toLowerCase() && !data.length) {
      toast.warn(`No contacts matching your request`, toastifyOptions);
    }
    return data;
  };

  const filteredContacts = getFilteredContacts(result);

  return (
    <>
      {isLoading && contacts.length === 0 && <Loader />}
      {error && !isLoading && <div>Ooops, error...</div>}
      <List>
        {filteredContacts.map(({ name, number, id }) => {
          return (
            <Item key={id}>
              <span>{name}:</span>
              <span>{number}</span>

              <DeleteBtn
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                Delete
              </DeleteBtn>
            </Item>
          );
        })}
      </List>
    </>
  );
};
