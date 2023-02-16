import React from 'react';
import { useDispatch } from 'react-redux';
import { setNameFilter } from '../../redux/filterSlice';

import css from './Filter.module.css';


export const Filter = () => {
    const dispatch = useDispatch();

    const handleFilterChange = (e) => {
        dispatch(setNameFilter(e.target.value));
    };
    return (
        <label>
            <p className={css.text}>Find contacts by name</p>
            <input 
            className={css.contactInput}
            type="text"
            name="filter"
            onChange={handleFilterChange} />
        </label>
    );
}



 