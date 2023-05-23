import React, { useEffect } from 'react';
import { AlphabetType, fetchAlphabet } from '../state/slice/root/rootSlice';
import { useAppDispatch } from '../state/store';

interface Props {
    data: AlphabetType
}

export const Alphabet: React.FC<Props> = ({data}) => {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchAlphabet(data?.index as number))
        }, 3000);
        return () => {
            clearInterval(interval);
        }
    }, []);
 
    return <div className='alphabet'>
        <div>Select: {data?.index}</div>
        <div>Letter Index: {data?.letter_index}</div>
        <div>Letter: {data?.letter}</div>
    </div>;
};