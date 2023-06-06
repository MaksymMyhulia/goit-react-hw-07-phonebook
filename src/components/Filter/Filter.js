import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filter/filterSlice';
import { selectFilter } from 'redux/selectors';

import { Input, LabelWrapper, LabelDescription } from './Filter.styled';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const changeFilter = e => {
    dispatch(setFilter(e.target.value.toLowerCase().trim()));
  };

  return (
    <LabelDescription>
      <LabelWrapper>Find contacts by name</LabelWrapper>
      <Input type="text" value={filter} onChange={changeFilter} />
    </LabelDescription>
  );
};
