import React, {useState} from 'react';
import {connect, css, styled } from "frontity";
import {MarginTopContainer} from './Filosofia';
import {FormStyled, SearchBar, InputBar, NotFoundContainer } from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {ButtonAction} from './bgImage';
import LinkButton from "./LinkButton";

import FeaturedImage from './FeaturedImage'

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
    
    img {
        max-width: 20%; 
        margin-right: 1rem;  

        @media(max-width: 768px) {
            max-width: 50%;
        }

    }

    p {
        color: #545454;
        line-height: 1.3;
    }
`;

const MatchPublication = styled.div`
    display: flex;
    margin: 3rem 10rem 0 10rem;
    cursor: pointer;

    @media(max-width: 768px) {
            margin: 1rem;
        }

    &:hover{
        background-color: #dbdbdb;
        padding: 1rem;
    }

    a {
        text-decoration: none;
        display: flex;
    }

    img {
        max-width: 20%; 
        margin-right: 1rem;  

        @media(max-width: 768px) {
            max-width: 30%;
        }

    }

    div {
        display: flex;
        flex-direction: column;

        h3 {
            font-size: 1.1rem;
            margin-bottom: 0;
            color: #000;
        }
        
        span {
            font-size: .9rem;
            color: #545454;
            margin-top: 0;
        }

        p {
            color: #545454;
            font-size: 1rem;
        }
    }


`;

const RepoAnniversaryPublications = () => {

    const [searchTerm, setSearchTerm] = useState("");
    
    const [searchResults, setSearchResults] = useState([]);

    const [alternativeTerm, setAlternativeTerm] = useState("");

    const handleChange = event => {
       setSearchTerm(event.target.value);
       
    };

    const handleSubmit = e => {

        e.preventDefault();

     
        const results = dataPublications.filter( publication => publication.Title.toLowerCase().includes(searchTerm.toLowerCase()));
     
        setSearchResults(results);

        console.log(results);

        console.log("searchTerm ", searchTerm);
       

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
                                <LinkButton href="/es-publicaciones">BUSCAR</LinkButton>
                        </ButtonAction>
                    </FormStyled>
                    
                </SearchBar>
       
            <SectionPublications>

                {/** first render */}
                { searchResults.length === 0 && alternativeTerm === "" ?
                    
                    Object.keys(dataPublications).map( publication => 
                        <>
                        {console.log(dataPublications[publication].url)}
                        <PublicationCard>
                            <a href={`${dataPublications[publication].url}`} target="_blank" rel="noopener">
                                <FeaturedImage src={dataPublications[publication].urlImage} />
                                <p>{dataPublications[publication].Title}</p>
                            </a> 
                            
                        </PublicationCard>
                        </>
                    )
                    : null
                }

                {/** match with some element  */}
                
                {    
                    searchResults.length > 0 ?
                      
                        Object.keys(searchResults).map( publication => 
                            <>
                            {console.log("match")}
                            <MatchPublication>

                            <a href={`${searchResults[publication].url}`} target="_blank" rel="noopener">
                                <FeaturedImage src={searchResults[publication].urlImage} />
                                <div>
                                    <h3>{searchResults[publication].Title}</h3>
                                    <span>Autor: {searchResults[publication].author}</span>
                                    <p>{searchResults[publication].date}</p>
                                    <p></p>
                                </div>
                             </a>  
                            </MatchPublication>
                            </>
                        )

                        : null
                      
                }


                {/** If we can't find a term */}
                
                {alternativeTerm!=="" && searchResults.length === 0 ?
                    
                    <>
                    {console.log("not found")}
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
        </MarginTopContainer>

       
    );
}
 
export default connect(RepoAnniversaryPublications);

