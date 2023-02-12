import React, { ChangeEvent, HTMLAttributes, useCallback } from 'react';
import debounce from 'lodash/debounce';

import './SearchBar.css';
import { DEBOUNCE_WAIT_TIME } from '../../utils';

export interface SearchBarProps extends HTMLAttributes<HTMLInputElement>{
    search?: string;
    onSearch: (text: string) => void;
}

export const SearchBar = React.forwardRef(
    (
        {
    search,
    onSearch,
    ...props
} : SearchBarProps,
 ref: React.ForwardedRef<HTMLInputElement>) => {

    const debounceChange = useCallback(
        debounce((event) => onSearch(event), DEBOUNCE_WAIT_TIME),
        [onSearch],
    );
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => debounceChange(e.currentTarget.value);
    return (
    <input ref={ref} placeholder={'Search...'} onChange={handleChange} {...props}/>
 );}
);