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

const ContainerInputs = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #44841a;
    padding: 1rem 2rem 1rem 2rem;
    border: 1px solid #fff;
    border-radius: 1rem;
    margin: 1rem 3rem;

    @media(max-width: 768px) {
        margin: 0rem 1rem;
    }


`

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #fff;
  outline: none;
  width: 15%;

  @media(max-width: 768px) {
        flex-basis: 100%;
        width: auto;
  }


    &::placeholder {
        font-size: 1rem;
    }
`;

const ButtonGetBack = styled.button`
    background-color: #f07723 ;
    padding: .8rem 1rem;
    border: 1px solid #fff;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    color: #FFF;
    cursor: pointer;

    &:hover {
        background-color: #F05523;
        transition: all 0.4s;
    }
`

const ButtonSearchBar = styled.button`
    display: block;
    background-color: #f07723 ;
    padding: .8rem 1rem;
    border: 1px solid #fff;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    color: #FFF;
    cursor: pointer;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 1rem;

    margin-right: .5rem;
    margin-left: .5rem;
    
    @media(min-width: 768px) {
        flex-basis: 15%;
        margin-bottom: 0rem;
    }

    &:hover {
        background-color: #F05523;
        transition: all 0.4s;
    }
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


const Select = styled.select`
  font-family: inherit;
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  /* appearance: none; */

  &:hover {
    border-color: #999;
  }

  &:focus {
    outline: none;
    border-color: #44841a;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

    @media(max-width: 768px) {
        width: 100%;
        max-width: 100%;
    }
`;

const Option = styled.option`
  font-family: inherit;
  font-size: 16px;
  color: #333;
`;


const Publicaciones = ({state, actions}) => {

    useEffect( () => {
        actions.source.fetch("/es-search");
        actions.source.fetch("/es-search/page/2/")
     }, [])

    const data = state.source.get('/es-search');
    const dataAddtional = state.source.get('/es-search/page/2/');

    let publications = [];

    //filling the array of publications
    if(data.isReady) {
        
        data.items.map( ({id}) => {

            publications.push(state.source.singlesearch[id]);
                        
        })
    } 

    if(dataAddtional.isReady) {
             
        dataAddtional.items.map( ({id}) => {
            //CORREGIR ESTO
            // if(state.source.singlesearch[id].typeofpublication[0] === 3 || state.source.singlesearch[id].typeofpublication[1] === 3) {
            //     publications.push(state.source.singlesearch[id]);
            // }
            publications.push(state.source.singlesearch[id]);
        })
    } 
    //sorting the taking the recent year first
    publications.sort((a, b) => ((a.acf.author > b.acf.author)) ? 1 : -1)

    /**NEW LINES */
    const AllAuthors = publications.map(publication => {
        return publication.acf.author.trim();
    })

    const uniqueAuthors = [...new Set(AllAuthors)]

    const AllYears = publications.map(publication => {
        return parseInt(publication.acf.date);
    })

    //order year for select option
    AllYears.sort((a, b) => (a > b) ? 1 : -1)

    const AllyearsToString = AllYears.map(elem => {
        return elem.toString()
    })

    const uniqueYears = [...new Set(AllyearsToString)]

    uniqueYears.map(elem => {
        console.log("type of : ", typeof elem, "elem: ", elem)
    })

    const [titleTerm, setTitleTerm] = useState("");
    const [authorTerm, setAuthorTerm] = useState("");
    const [yearTerm, setYearTerm] = useState("");

    /**END NEW LINES */
    
    const [searchResults, setSearchResults] = useState([]);

    const [alternativeTerm, setAlternativeTerm] = useState("");

    const handleSearch = () => {
        
        const results = publications.filter( publication => {

            // let keywords = [];

            // let keywordCleaned = [];

            // if(publication.acf.keywords && publication.acf.keywords.length > 0){
            //     keywords = publication.acf.keywords.split(',');
            // }

            // for( let i = 0 ; i < keywords.length ; i++) {
            //     keywordCleaned.push(keywords[i].trim().toLowerCase());
            // }

            if(publication.title.rendered && publication.acf.author && publication.acf.date > 0) {

                return(
                    publication.title.rendered.toLowerCase().includes(titleTerm.toLowerCase()) &&
                    publication.acf.author.toLowerCase().includes(authorTerm.toLowerCase()) &&
                    publication.acf.date.includes(yearTerm.toLowerCase().trim())
                )
            }
        })
    
        console.log(results)

        setSearchResults(results);

        if(results.length === 0 ){

            if(titleTerm){
            setAlternativeTerm(titleTerm)}

            else if(authorTerm) {
                setAlternativeTerm(authorTerm)
            }

            else if (yearTerm) {
                setAlternativeTerm(yearTerm)
            }
        }
    };
    // Enter Key for search button 

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          handleSearch();
        }
    };

    const handleButtonClick = () => {
        handleSearch();
    };


    const handleClearAll = () =>{
        setTitleTerm("")
        setYearTerm("")
        setAuthorTerm("")
        setSearchResults(publications)
    }

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

        <ContainerInputs>

            <Input
                type="text"
                placeholder="Búsqueda por título"
                value={titleTerm}
                onChange={(event) => setTitleTerm(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            {/* <Select onChange={(event) => setAuthorTerm(event.target.value)}  onKeyDown={handleKeyDown}>
                <Option>Choose an Author</Option>
                {uniqueAuthors.map(option => {
                    return(
                    <Option key={option} value={option}>
                        {option}
                    </Option>
                    )
                })}
            </Select>

            <Select onChange={(event) => setYearTerm(event.target.value)}  onKeyDown={handleKeyDown}>
                <Option>Choose a Year</Option>
                {uniqueYears.map(option => {
                    return(
                    <Option key={option} value={option}>
                        {option}
                    </Option>
                    )
                })}
            </Select> */}

            <Input
                type="text"
                placeholder="Búsqueda por autor"
                value={authorTerm}
                onChange={(event) => setAuthorTerm(event.target.value)}
                onKeyDown={handleKeyDown}

                list = "authors"
            />

            <datalist id="authors">
                {uniqueAuthors.map(option => {
                    return(
                    <Option key={option} value={option}>
                        {option}
                    </Option>
                    )
                })}
            </datalist>

            <Input
                type="text"
                placeholder="Búsqueda por año"
                value={yearTerm}
                onChange={(event) => setYearTerm(event.target.value)}
                onKeyDown={handleKeyDown}
                list = "years"
            />

            <datalist id="years">
                {uniqueYears.map(option => {
                    return(
                    <Option key={option} value={option}>
                        {option}
                    </Option>
                    )
                })}
            </datalist>

            <ButtonSearchBar type="button" onClick={handleButtonClick}>Buscar</ButtonSearchBar>

            <ButtonSearchBar type="button" onClick={handleClearAll}>Limpiar Búsqueda</ButtonSearchBar>

        </ContainerInputs>



        {data.isReady ?

        <div>
            {data.isReady & searchResults.length === 0 && alternativeTerm === "" ?

                <SectionPublications>
     
                        {
                            publications.map( publication => {

                                return (
                                
                                    <PublicationCard key = {publication.id}>
                                    <a href={publication.meta._links_to} target="_blank" rel="noopener noreferrer">

                                    <h3 dangerouslySetInnerHTML={ {__html: publication.title.rendered}}></h3>
                                    
                                    
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

                        {
                            searchResults.map( publication => {

                                return (
                                
                                         
                                    <PublicationCard key = {publication.id}>
                                    <a href={publication.meta._links_to} target="_blank" rel="noopener noreferrer">

                                        <h3 dangerouslySetInnerHTML={ {__html: publication.title.rendered}}></h3>
                                    
                                    
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
                            
                        <h3>No pudimos encontrar ningun contenido relacionado a la palabra {`" ${titleTerm} ${'   '}  ${'   '+authorTerm} ${'  '} ${'   '+yearTerm} "`}</h3>

                        <p>Por favor, intenta usar otro término de búsqueda</p>

                        <p>Gracias.</p>

                        <ButtonGetBack type="button" onClick={handleClearAll}>Volver</ButtonGetBack>
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
