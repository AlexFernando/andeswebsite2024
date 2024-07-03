import React, {useEffect} from 'react';
import {connect} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import {PostStyled} from './SearchBar';
import Loading from './Loading';
import FeaturedImage from './FeaturedImage';

const News = ({state,actions}) => {

    useEffect( () => {
        actions.source.fetch("/es-allnews")
    }, [])

    const data = state.source.get('/es-allnews');

    let arrayOfNews = [];  

    if(data.isReady) {
        data.items.map( ({id}) => {
            const singleSearch = state.source.allnews[id];
            //create an arrays of all news
            arrayOfNews.push(singleSearch)
        
        })
    }

    if(arrayOfNews.length > 0 ) {
        arrayOfNews.sort(function(a,b) {
            return new Date(b.acf.datefield) - new Date(a.acf.datefield)
        })
    }

    return ( 

        <MarginTopContainer>
            <HeadContainer>
                <Title>Noticias</Title>
                <Separator></Separator>
                <SubTitle>Información Relevante<br></br> Historias Reales</SubTitle>
                
            </HeadContainer>

            {
            data.isReady && arrayOfNews.length > 0 ? 
            
            <>
                {
                    arrayOfNews.map( newElem => {
                        return(
                            <>
                                <PostStyled key = {newElem.id}>
                                
                                    <a href={newElem.meta._links_to} target="_blank" rel="noopener noreferrer">
                                    <FeaturedImage imgID = {newElem.featured_media} element = "singlesearch"/>

                                    <div>
                                        <h3>{newElem.title.rendered}</h3>
                                        <div dangerouslySetInnerHTML={{ __html: newElem.content.rendered}}></div>
                                        <p>Fecha : 
                                            <span dangerouslySetInnerHTML={ {__html: newElem.acf.datefield}}></span>
                                        </p>
                                    </div>           
                                    </a>
                                </PostStyled>
                            </>
                        )
                    })
                }
            </> 
            
            : <Loading />
        }

        </MarginTopContainer>
    );
}
 
export default connect(News);