import React, {useState, useEffect} from 'react';
import {connect, css, styled } from "frontity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {ButtonAction} from './bgImage';
import LinkButton from "./LinkButton";

import FeaturedImage from './FeaturedImage';
import Loading from './Loading';

const SectionContainer = styled.div`
    display: -webkit-box;  
    display: -ms-flexbox;
    display: flex;
   
   -webkit-box-orient: vertical;
   -webkit-box-direction: normal;
       -ms-flex-direction: column;
           flex-direction: column;

    :nth-of-type(even) {
        background-color: #f4f4f4;   
    }
    :nth-of-type(odd) {
        background-color: #fff;   
    } 
`;

export const SearchBar = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 2rem;

    @media (max-width: 768px){
        padding: 2rem 1rem 0rem 1rem;
        flex-direction: column;
        align-items: stretch;
    }
`;

export const FormStyled = styled.form`
    display: flex;
    justify-content: space-around;
    width: 100%;

    @media (max-width: 768px){
        flex-direction: column;
    }
`

export const InputBar = styled.div`
    display: flex;
    flex-basis: 70%;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    padding: 1rem 2rem 1rem 2rem;
    border: 1px solid gray;
    border-radius: 1rem;

    @media (max-width: 768px){
        margin-bottom: 1rem;
    }

    input {
        font-size: 1.6rem;
        border: none;
        outline: none;
        padding-left: 1rem;
        width: 70%;
        @media (max-width: 768px){
            width: 100%;
            font-size: .7rem;
        }
    }    
`


export const PostStyled = styled.div`
    
 
    background-color: #eaeaea;
    padding: 2rem;
    margin: 2rem;
    border-radius: 1rem;

    @media (max-width: 768px){
        padding: 1rem;
        margin: 1rem;
    }

    a{
        text-decoration: none;
        display: flex;
        justify-content: space-around;

        @media (max-width: 768px){
            flex-direction:column-reverse;
        }

     /*    img {
            flex-basis: 30%;
            object-fit: contain;
            width: 220px;
            height: 300px;

            @media(max-width: 768px) {
                width: 100%;
                height: 100%;
                margin: 1rem 0;
            }
        } */

        div{
            flex-basis: 60%;

            h3 {
                color: #44841a;
                font-size: 1.8rem;
            }

            p {
                font-size: 1.3rem;
                color: #545454;
            }

            span, strong {
                color: #545454;
            }

            @media (max-width: 768px){
                margin: 0rem;

                div {
                    font-size: .8rem;
                }
            }
        
        }
    }
`;

export const NotFoundContainer = styled.div`
    
    text-align: center;
    margin-top: 2rem;
    color: #545454;

    h2 {
        font-size: 2rem;
    }

    h3 {
        font-size: 1.8rem;
    }

    p {
        font-size: 1.5rem;
        font-weight: 700;
    }
`

const SearchBarComponent = ({state, actions}) => {

    useEffect( () => {
        actions.source.fetch("/search")
        actions.source.fetch("/allnews")
     }, [])

    const data = state.source.get('/search');
    const newsData = state.source.get("/allnews")

    let publications = [];

    if(data.isReady) {
        data.items.map( ({id}) => {
            publications.push(state.source.singlesearch[id]);
        })
    }

    if(newsData.isReady) {
        newsData.items.map( ({id}) => {
            publications.push(state.source.allnews[id]);
        })
    }

    const [searchTerm, setSearchTerm] = useState("");
    
    const [searchResults, setSearchResults] = useState([]);

    const [alternativeTerm, setAlternativeTerm] = useState("");

    const handleChange = event => {
       setSearchTerm(event.target.value);
    };

    const handleSubmit = e => {

        e.preventDefault();
        
        const results = publications.filter( publication => publication.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()));
     
        setSearchResults(results);


        if(results.length === 0 && searchTerm) {
            setAlternativeTerm(searchTerm);
        }

        setSearchTerm("")
    };

    // Enter Key for search button 
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    return ( 


        <SectionContainer css={css`margin-top: 18vh;`}>
       
            <SearchBar>

                <FormStyled>
                    <InputBar>
                        <FontAwesomeIcon css={css`font-size: 1.8rem; color: #44841a;`}icon={faSearch}/>
                        
                            <input 
                                type="text"
                                placeholder="What are you searching for?"
                                value={searchTerm}
                                onChange={handleChange}
                                onKeyPress={handleKeypress}
                            />    
                    </InputBar>
                
                    <ButtonAction  onClick={handleSubmit} type="submit">
                            <LinkButton href="/searchbar">SEARCH</LinkButton>
                    </ButtonAction>
                </FormStyled>
            </SearchBar>
            
            
            {data.isReady && publications.length > 0 ? 
            
                <>
                {searchResults.length === 0 && alternativeTerm === "" ?
                    
                    publications.map( elem  => {

                        return (
                            <>
                        
                            {elem.typeofpublication && elem.typeofpublication[0] === 3 ?

                                <PostStyled key = {elem.id}>
                                    <a href={elem.meta._links_to} target="_blank" rel="noopener noreferrer">
                                    <FeaturedImage imgID = {elem.featured_media} element = "singlesearch"/>
        
                                    <div>
                                        <h3>{elem.title.rendered}</h3>
        
                                        <p>Author : 
                                            <span dangerouslySetInnerHTML={ {__html: elem.acf.author}}></span>
                                        </p>
                                    
                                        <p>Date : 
                                            <span dangerouslySetInnerHTML={ {__html: elem.acf.date}}></span>
                                        </p>
                                    </div>           
                                    </a>
                                </PostStyled>

                            : 

                                <PostStyled key = {elem.id}>
                                    <a href={elem.meta._links_to} target="_blank" rel="noopener noreferrer">
                                        <FeaturedImage imgID = {elem.featured_media} element = "singlesearch"/>

                                        <div>
                                            <h3>{elem.title.rendered}</h3>
    
                                            <p>Date : 
                                                <span dangerouslySetInnerHTML={ {__html: elem.acf.datefield}}></span>
                                            </p>
                                        </div>           
                                    </a>
                                </PostStyled>
                        
                            }
                            </>
                        )
                    })
    

                    :null 
                }
              

                {searchResults.map(item => (

                    <>
                    {item.typeofpublication && item.typeofpublication[0] === 3 ? 
                    
                        <PostStyled key = {item.id}>
                            <a href={item.meta._links_to} target="_blank" rel="noopener noreferrer">
                            <FeaturedImage imgID = {item.featured_media} element = "singlesearch"/>

                            <div>
                                <h3>{item.title.rendered}</h3>

                                <p>Author : 
                                    <span dangerouslySetInnerHTML={ {__html: item.acf.author}}></span>
                                </p>
                            
                                <p>Date : 
                                    <span dangerouslySetInnerHTML={ {__html: item.acf.date}}></span>
                                </p>
                            </div>           
                            </a>
                        </PostStyled>

                        :
                        
                        <PostStyled key = {item.id}>
                            <a href={item.meta._links_to} target="_blank" rel="noopener noreferrer">
                            <FeaturedImage imgID = {item.featured_media} element = "singlesearch"/>

                            <div>
                                <h3>{item.title.rendered}</h3>
                            
                                <p>Date : 
                                    <span dangerouslySetInnerHTML={ {__html: item.acf.datefield}}></span>
                                </p>
                            </div>           
                            </a>
                        </PostStyled>
                    }

                    </>
                ))
                
                }

                {alternativeTerm!=="" && searchResults.length === 0 ?
                    <NotFoundContainer>
                        <h2>Oops!</h2> 
                            
                        <h3>We coudn't find any content related to the word "{alternativeTerm}"</h3>

                        <p>Plase use another term of search</p>

                        <p>Thank you.</p>
                    </NotFoundContainer> 
                    
                    :null
                }
                </>



                : <Loading />
            }

        
        </SectionContainer>
     );
}
 
export default connect(SearchBarComponent);