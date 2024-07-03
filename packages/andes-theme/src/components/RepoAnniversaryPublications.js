import React, {useState, useEffect} from 'react';
import {connect, css, styled } from "frontity";
import {MarginTopContainer, SectionContainer} from './Filosofia';
import {FormStyled, SearchBar, InputBar, NotFoundContainer } from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {ButtonAction} from './bgImage';
import LinkButton from "./LinkButton";

import FeaturedImage from './FeaturedImage';
import Loading from "./Loading";

const SectionPublications = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0rem 2rem 1rem 2rem;
`;

export const PublicationCard = styled.div`
    display: flex;
    margin-top: 3rem;
    flex-basis: 22%;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    cursor: pointer;

    @media(max-width: 768px) {
        flex-basis: 100%;
    }

    &:hover{
        background-color: #dbdbdb;
    }

    a {
        text-decoration: none;
        display: flex;
    }


    h3 {
            font-size: 1.1rem;
            margin-bottom: 0;
            color: #000;

            @media(max-width: 768px) {
                font-size: .9rem;
            }
        }
    
    img {
        max-width: 40%;
        margin-right: 1rem;
        align-self:center;  

        @media(max-width: 768px) {
            max-width: 50%;
        }

    }

    p {
        color: #545454;
        line-height: 1.3;
        font-weight: 700;
        font-size: 1.1rem;

        @media(max-width: 768px) {
            font-size: .9rem;
        }
    }

    span {
            font-size: 1.1rem;
            margin-top: 0;

            @media(max-width: 768px) {
                font-size: .9rem;
            }
        }
`;

const RepoAnniversaryPublications = ({state, actions}) => {

    

    useEffect( () => {

        if(state.theme.lang === "en") {
            actions.source.fetch("/search")

        }

        else {
            actions.source.fetch("/es-search")
        }
     }, [])

    const data = state.theme.lang === "en" ? state.source.get('/search') : state.source.get('/es-search');

    let linkMyButtonSubmit = state.theme.lang === "en" ? "/aniversariopublicaciones" : "/es-aniversariopublicaciones"

    console.log(linkMyButtonSubmit)

    let publications = [];

    //filling the array of publications
    if(data.isReady) {
        
        data.items.map( ({id}) => {
            if(state.source.singlesearch[id].typeofpublication.length > 1) {
                publications.push(state.source.singlesearch[id]);
            }
        })
    } 
    //sorting the taking the recent year first
    publications.sort((a, b) => (a.acf.date < b.acf.date) ? 1 : -1)

    const [searchTerm, setSearchTerm] = useState("");
    
    const [searchResults, setSearchResults] = useState([]);

    const [alternativeTerm, setAlternativeTerm] = useState("");

    const handleChange = event => {
       setSearchTerm(event.target.value);
    };

    const handleSubmit = e => {

        e.preventDefault();
        
        const results = publications.filter( publication => publication.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) || publication.acf.author.toLowerCase().includes(searchTerm.toLowerCase()));
     
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
        
        <MarginTopContainer>
          
          <SectionContainer>
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
                        <LinkButton href={linkMyButtonSubmit}>SEARCH</LinkButton>
                    </ButtonAction>
                </FormStyled>
            </SearchBar>
        </SectionContainer>

        {data.isReady ? 
        <SectionPublications>

            {searchResults.length === 0 && alternativeTerm === "" ?
                
                publications.map( publication => {

                    return (
                        
                        <PublicationCard key = {publication.id}>
                            <a href={publication.meta._links_to} target="_blank" rel="noopener noreferrer">
                              <FeaturedImage imgID = {publication.featured_media} element = "publication"/>

                              <div>
                                <h3>{publication.title.rendered}</h3>

                                <p>Author : 
                                    <span dangerouslySetInnerHTML={ {__html: publication.acf.author}}></span>
                                </p>
                            
                                <p>Date : 
                                    <span dangerouslySetInnerHTML={ {__html: publication.acf.date}}></span>
                                </p>
                              </div>           
                            </a>
                        </PublicationCard>
                    )
                })

                :null
            }

            {/** match with some element  */}
            
            {    
                searchResults.length > 0 ?
                   
                    searchResults.map( publication => {
                    
                        return (
                       
                            <PublicationCard key = {publication.id}>
                                <a href={publication.meta._links_to} target="_blank" rel="noopener noreferrer">
                                    <FeaturedImage imgID = {publication.featured_media} element = "publication"/>
    
                                    <div>
                                    <h3>{publication.title.rendered}</h3>
                                    <p>Author : 
                                        <span dangerouslySetInnerHTML={ {__html: publication.acf.author}}></span>
                                    </p>
                            
                                    <p>Date : 
                                        <span dangerouslySetInnerHTML={ {__html: publication.acf.date}}></span>
                                    </p>
                                    </div>           
                                </a>
                            </PublicationCard>
                        )
                    })
  
                  :null                    
            }

            {/** If we can't find a term */}
                
            {alternativeTerm!=="" && searchResults.length === 0 ?
                    
                <>
                <NotFoundContainer>
                    <h2>Oops!</h2> 
                        
                    <h3>We coudn't find any content related to the word "{alternativeTerm}"</h3>

                    <p>Plase use another term of search</p>

                    <p>Thank you.</p>
                </NotFoundContainer> 
                </>
                :null
            }

        </SectionPublications>
        : <Loading />
        }
        </MarginTopContainer>

       
    );
}
 
export default connect(RepoAnniversaryPublications);

