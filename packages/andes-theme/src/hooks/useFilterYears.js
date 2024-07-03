import React,{useState} from 'react';
import {styled} from "frontity";
// import {yearsCategories} from '../data/yearsCategoriesEvents';

const Formulario = styled.form`
    width: 60%;
    display: flex;
    border: 1px solid #e1e1e1;
    max-width: 1200px;
    margin: 2rem auto 2rem auto;
    @media(max-width: 768px) {
        width: 100%;
    }
`;

const Select = styled.select`
    flex: 1;
    padding: 1rem;
    appearance: none;
    border: none;
    background-color: #44841a;
    color: #fff;
    font-family: 'Lato', sans-serif;
    outline-color: #fff;
    font-size: 1.2rem;


    @media(max-width: 768px) {
        font-size: .8rem;
    }
`;

const yearsCategories = [
    {"id": "1", "year": 2023},
    {"id": "1", "year": 2022},
    {"id": "1", "year": 2021},
    {"id": "1", "year": 2020},
    {"id": "1", "year": 2019},
    {"id": "1", "year": 2018},
    {"id": "1", "year": 2017},
    {"id": "1", "year": 2016},
    {"id": "1", "year": 2015},
    {"id": "1", "year": 2014},
    {"id": "1", "year": 2013},
    {"id": "1", "year": 2012},
    {"id": "1", "year": 2011},
    {"id": "1", "year": 2010},
]

const useFilter = () => {

    const [category, saveCategory] = useState('');

    //porque parentesis y no llaves?
    const FilterUI = () => (
        <Formulario>
            <Select
                onChange = { e => saveCategory(e.target.value) }
                value={category}
            >
                <option value="" label="Choose a year">-- Choose a year --</option>
                {yearsCategories.map(option => (
                    <option key={option.id} label={option.year} value={option.year}>{option.year}</option>
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