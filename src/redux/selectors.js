import { createSelector } from '@reduxjs/toolkit';

//export const selectContacts = state => state.items;
export const selectIsLoading = state => state.isLoading;
export const selectError = state => state.error;
export const selectFilter = ({ filter }) => filter;

export const selectContacts = ({ contacts }) =>
  [...contacts.items].sort((a, b) => a.name.localeCompare(b.name));

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(
      ({ name, phone }) =>
        name.toLowerCase().trim().includes(normalizedFilter) ||
        phone.trim().includes(normalizedFilter)
    );
    return filteredContacts;
  }
);
