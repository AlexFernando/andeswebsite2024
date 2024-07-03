import React,{useState, useEffect} from 'react';
import {styled, css} from "frontity";

const MyForm = styled.form`

    margin-bottom: 3rem;

    select {
        height: 5vh;
        width: 30vw;
        font-size: 1.2rem;
        background-color: #44841a;
        border-color: #44841a;
        color: #fff;

            option {
                font-size: 1rem;
                background-color: #fff;
                color: #000;
            }

        @media(max-width: 768px) {
            width: 80vw;
        }  
    }
`

const useFilterSubcategories = () => {

    const [allCategory, saveCategory] = useState('');

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        async function fetchMyAPI() {
            let response = await fetch('http://en.andescusco.info/wp-json/wp/v2/categories?per_page=100');
    
            response = await response.json();
    
            setCategories(response);
            }
            
            fetchMyAPI()
    }, []);

    let realCategories = [];
    let realSubCategories = [];

    categories.map( category => {

        if(category.parent === 0){

            if(category.name !== "Uncategorized") {

                const newData = {"id": category.id, "name": category.name, "subcategories": []};
                realCategories.push(newData);
            }
        }
    })

    categories.map( category => {

        if(category.parent !== 0){

            if(category.name !== "Uncategorized") {

                const newData = {"id": category.id, "name": category.name, "parent": category.parent};
                realSubCategories.push(newData);
            }
        }
    })


    realSubCategories.map( subcategory => {
        
        for( var i = 0 ; i < realCategories.length; i++) {
            realCategories[i]["number"] = i+1;
            if( realCategories[i].id === subcategory.parent) {
                realCategories[i]["subcategories"].push(subcategory.name);
            }
        }
    })

    //porque parentesis y no llaves?
    const FilterSubcategoriesUI = () => (
            <MyForm>
                <select
                    onChange = { e => saveCategory(e.target.value) }
                    value={allCategory}
                >

                    <option>All Category</option>
                  
                    {realCategories.map(option => (
                        <>
                        {<option css={css`font-weight: 700`}> {option.name}</option>}
                        {
                            option.subcategories.length > 0 ? option.subcategories.map( subCategorie => <option>&nbsp;&nbsp;&nbsp;{subCategorie}</option>) : null
                        }
                        </>
                    ))}
                </select>
            </MyForm>
    )

    return {
        allCategory,
        FilterSubcategoriesUI
    }
}

export default useFilterSubcategories;