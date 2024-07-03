import React,{useState} from 'react';
import {styled} from "frontity";
import {dataCategories} from '../data/categories';

const Formulario = styled.form`
    width: 100%;
    display: flex;
    border: 1px solid #e1e1e1;
    max-width: 1200px;
    margin: 2rem auto 0 auto;
`;

const Select = styled.select`
    flex: 1;
    padding: 1rem;
    appearance: none;
    border: none;
    font-family: 'Lato', sans-serif;
`;

const useFilter = () => {

    const [category, saveCategory] = useState('');

    //porque parentesis y no llaves?
    const FilterUI = () => (
        <Formulario>
            <Select
                onChange = { e => saveCategory(e.target.value) }
                value={category}
            >
                <option value="" label="Todas las categorías">-- Todas las categorías --</option>
                {dataCategories.map(option => (
                    <option key={option.id} label={option.name} value={option.name}>{option.name}</option>
                ))}
            </Select>
        </Formulario>
    )

    return {
        category,
        FilterUI
    }
}

export default useFilter;