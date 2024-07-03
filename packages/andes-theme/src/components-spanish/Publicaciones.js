import React, {useState, useEffect} from 'react';
import {connect, css, styled, Global } from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer, SectionContainer} from './Filosofia';
import {SearchBar, InputBar, NotFoundContainer, FormStyled } from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {ButtonAction} from './bgImage';
import LinkButton from "./LinkButton";

import FeaturedImage from './FeaturedImage';
import Loading from './Loading';

/**CAROUSEL*/
// import Carousel from "react-multi-carousel";
// import multiCarouselStyles from  "react-multi-carousel/lib/styles.css";
// import generalStyles from '../styles/generalStyles.css';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30
    }
};



const SectionPublications = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0rem 2rem 1rem 2rem;
    align-items: stretch;
`;

export const PublicationCard = styled.div`
    display: flex;
    margin-top: 3rem;
    margin-left: 1%;
    margin-right: 1%;
    flex-basis: 20%;
    cursor: pointer;
    box-shadow: 0 .8px 5px .8px grey;
    border-radius: .5rem;
    align-items: stretch;
    padding: 1%;


    @media(max-width: 768px) {
        flex-basis: 100%;
    }

    &:hover{
        background-color: #dbdbdb;
    }

    a {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
        /* align-items: flex-start; */
        /* border-radius: .5rem 0 0 .5rem; */
        height: 18vh;

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

const ImageInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: .5rem;
`



const Publicaciones = ({state, actions}) => {

    useEffect( () => {
        actions.source.fetch("/es-search")
     }, [])

    const data = state.source.get('/es-search');

    let publications = [];

    //filling the array of publications
    if(data.isReady) {
        
        data.items.map( ({id}) => {
            if(state.source.singlesearch[id].typeofpublication[0] === 3 || state.source.singlesearch[id].typeofpublication[1] === 3) {
                publications.push(state.source.singlesearch[id]);
            }
            
        })
    } 
    //sorting the taking the recent year first
    publications.sort((a, b) => ((a.acf.author > b.acf.author)) ? 1 : -1)

    const [searchTerm, setSearchTerm] = useState("");
    
    const [searchResults, setSearchResults] = useState([]);

    const [alternativeTerm, setAlternativeTerm] = useState("");

    const handleChange = event => {
       setSearchTerm(event.target.value);
    };

    const handleSubmit = e => {

        e.preventDefault();
        
        const results = publications.filter( publication => {

            let keywords = [];

            let keywordCleaned = [];

            if(publication.acf.keywords && publication.acf.keywords.length > 0){
                keywords = publication.acf.keywords.split(',');
            }

            for( let i = 0 ; i < keywords.length ; i++) {
                keywordCleaned.push(keywords[i].trim().toLowerCase());
            } 
 
            if(publication.title.rendered !== undefined && publication.acf.author !== undefined && keywordCleaned.length > 0) {
                return (
                    publication.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) || publication.acf.author.toLowerCase().includes(searchTerm.toLowerCase()) || keywordCleaned.includes(searchTerm.toLowerCase())
                );
            }
        })    
        setSearchResults(results);

        if(results.length === 0 && searchTerm) {
            setAlternativeTerm(searchTerm);
        }

        setSearchTerm("")
    };

    useEffect( () => {
        handleSubmit;

    })

    // Enter Key for search button 
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };


    return (
        <>
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    Publicaciones
                </Title>
                <SubTitle>
                    Investigación<br></br>Portal de Conocimiento
                </SubTitle>
                <Separator></Separator>
            </HeadContainer>

        </MarginTopContainer>

        <SectionContainer>
            <SearchBar>

                <FormStyled>

                    <InputBar>
                        <FontAwesomeIcon css={css`font-size: 1.8rem; color: #44841a;`}icon={faSearch}/>

                            <input 
                                type="text"
                                placeholder="Qué estás buscando?"
                                value={searchTerm}
                                onChange={handleChange}
                                onKeyPress={handleKeypress}
                            />
                    </InputBar>
                
                    <ButtonAction  onClick={handleSubmit} type="submit">
                        <LinkButton href="/es-/es-publications">BUSCAR</LinkButton>
                    </ButtonAction>
                </FormStyled>
                
            </SearchBar>
        </SectionContainer>

        {data.isReady ?

        <div>
            {data.isReady & searchResults.length === 0 && alternativeTerm === "" ?

                <SectionPublications>
                    {/* <Global styles={multiCarouselStyles} />
                    <Global styles={generalStyles} />
                    <Carousel
                        ssr
                        partialVisbile
                        itemClass="image-item"
                        responsive={responsive}
                        swipeable={true}
                        autoPlay = {true}
                        autoPlaySpeed = {4000}
                    ></Carousel> */}
                        {
                            publications.map( publication => {

                                return (
                                
                                    <PublicationCard key = {publication.id}>
                                    <a href={publication.meta._links_to} target="_blank" rel="noopener noreferrer">

                                        <h3>{publication.title.rendered}</h3>
                                    
                                    
                                        <ImageInfo>

                                            <FeaturedImage imgID = {publication.featured_media} element = "publication"/>

                                            <div> 
                                                <p>Autor : 
                                                    <span dangerouslySetInnerHTML={ {__html: publication.acf.author}}></span>
                                                </p>
                                            
                                                <p>Fecha : 
                                                    <span dangerouslySetInnerHTML={ {__html: publication.acf.date}}></span>
                                                </p>
                                            </div>    

                                        </ImageInfo>

                                    </a>

                                </PublicationCard>
                                )
                            })
                        }

                 
                </SectionPublications>

                :  <null />    
            } 


            {data.isReady &  searchResults.length > 0 ?

                <SectionPublications>

                    {/* <Global styles={multiCarouselStyles} />
                    <Global styles={generalStyles} /> */}
                    {/* <Carousel
                        ssr
                        partialVisbile
                        itemClass="image-item"
                        responsive={responsive}
                        swipeable={true}
                        autoPlay = {true}
                        autoPlaySpeed = {4000}
                    ></Carousel> */}

                        {
                            searchResults.map( publication => {

                                return (
                                
                                         
                                    <PublicationCard key = {publication.id}>
                                    <a href={publication.meta._links_to} target="_blank" rel="noopener noreferrer">

                                        <h3>{publication.title.rendered}</h3>
                                    
                                    
                                        <ImageInfo>

                                            <FeaturedImage imgID = {publication.featured_media} element = "publication"/>

                                            <div> 
                                                <p>Autor : 
                                                    <span dangerouslySetInnerHTML={ {__html: publication.acf.author}}></span>
                                                </p>
                                            
                                                <p>Fecha : 
                                                    <span dangerouslySetInnerHTML={ {__html: publication.acf.date}}></span>
                                                </p>
                                            </div>    

                                        </ImageInfo>

                                    </a>

                                </PublicationCard>
                                )
                            })
                        }

                </SectionPublications>

                :  <null />    
                } 

                    
                {alternativeTerm!=="" && searchResults.length === 0 ?
                        
                    <>
                    <NotFoundContainer>
                        <h2>Oops!</h2> 
                            
                        <h3>No pudimos encontrar ningun contenido relacionado a la palabra "{alternativeTerm}"</h3>

                        <p>Por favor, intenta usar otro término de búsqueda</p>

                        <p>Gracias.</p>
                    </NotFoundContainer> 
                    </>
                    :null
                }
        </div>

        :<Loading />

        }
        </>
       
    );
}
 
export default connect(Publicaciones);
