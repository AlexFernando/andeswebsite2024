import React, {useEffect} from 'react';
import {connect, styled} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import {SectionContainer, MainParagraph, ImagePotatoPark} from './potatoPark'

import {SectionText} from './HomePage';

import {faListAlt, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIconList, FontAwesomeIconStyled, CardsContainerAlternative, CardAlternative} from './TerritoriosCulturales';
import {readMore} from './Root';

//handle image size according to size screen
import CardFeaturedImage from './CardFeatureImage';

export const FixedCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-top: 4rem;
    border-radius: 1rem;
    background-color: #f4f4f4;

    p {
        text-align: right;
    }

    img {
        border-radius: 1rem 1rem 0 0 ;
        width: 100%;
        height: 100%;
    }
`;

const SectionInfoList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5rem 0;

    h3 {
        color: #44841a;
        font-size: 1.5rem;
    }

    div {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;

        @media (max-width: 768px){
            flex-direction: column;
            justify-content: center;
            
        }

        li {
            list-style: none;
            font-size: 1.2rem;
            margin-bottom: .8rem;
        }
    }
`

const IframeStyled = styled.iframe`
    width:490px; 
    height:280px;

    
    @media(max-width: 768px) {
        max-width:100%; 
        max-height:100%;
    } 
`;

const Politica = ({state, actions}) => {

    useEffect( () => {
        
        if(state.theme.lang === "en") {
            actions.source.fetch("/advocacyandpolitics")
        }

        else {
            actions.source.fetch("/es-advocacyandpolitics")
        }
    }, [])
   
    const pagePolitics = state.theme.lang === "en" ? state.source.page[467] : state.source.page[419]

    const data = state.source.get('/cardimage');

    let cardImagesArr = [];

    if(data.isReady) {
        
        data.items.map(({id}) => { 
                
                if(state.theme.lang === "en") {
                    if(state.source.cardimage[id].filterbypage[0] === 35) {
                        cardImagesArr.push(state.source.cardimage[id])
                    }
                }

                else {
                    if(state.source.cardimage[id].filterbypage[0] === 36) {
                        cardImagesArr.push(state.source.cardimage[id])
                    }
                }
            }
        )
    }

    let listInfo = [];

    if(typeof pagePolitics !== "undefined") {

        listInfo = pagePolitics.acf.info_list.split("*");
        listInfo.shift();
    }


    return (
        
        <>
        {typeof pagePolitics === "undefined" ? <Loading />
        
        :
        
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    {pagePolitics.acf.title}
                </Title>
                <Separator></Separator>
                <SubTitle>
                    {pagePolitics.acf.subtitle}
                </SubTitle>
                
            </HeadContainer>

            <SectionContainer>
                <MainParagraph>
                    {pagePolitics.acf.main_text}
                </MainParagraph>

                <SectionInfoList>
                    <FontAwesomeIconStyled icon={faListAlt}/>
                    
                    <h3>{pagePolitics.acf.info_title}</h3>

                    <div>
                        <ul>
                            {
                                listInfo.slice(0, listInfo.length/3 ).map( item => {
                                    return(
                                        <li><FontAwesomeIconList icon={faArrowAltCircleRight}/>{item}</li>
                                    )
                                })
                            }

                            
                        </ul>

                        <ul>
                            {
                                listInfo.slice(listInfo.length/3, listInfo.length/2 + 1 ).map( item => {
                                    return(
                                        <li><FontAwesomeIconList icon={faArrowAltCircleRight}/>{item}</li>
                                    )
                                })
                            }

                            
                        </ul>

                        <ul>
                            {
                                listInfo.slice(listInfo.length/2 + 1 , listInfo.length ).map( item => {
                                    return(
                                        <li><FontAwesomeIconList icon={faArrowAltCircleRight}/>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </SectionInfoList>

                <CardsContainerAlternative>  
                {data.isReady ?
                    
                    <>
                        {cardImagesArr.reverse().map( cardImages => {
                            

                            return(

                                <CardAlternative>
                                    
                                    {/* <ImagePotatoPark src={cardImages.acf.image_card.sizes.medium_large}/> */}

                                    <ImagePotatoPark  src = {cardImages.acf.image_card.sizes.medium_large} />
                                    
                                    <div>
                                    <h3>{cardImages.title.rendered}</h3>
                                    <p dangerouslySetInnerHTML={{ __html: cardImages.excerpt.rendered}}>
                                
                                    </p>

                                    <a href={  cardImages.acf.link_card} target="_blank" rel="noopener noreferrer">{readMore}</a>
                                    </div>
                                </CardAlternative>
                            )
                        })}

                    </>
                    
                    : null

                }

                </CardsContainerAlternative>
                    
            </SectionContainer>

            <SectionText>

                <div>  
                    <IframeStyled
                        src="https://www.youtube.com/embed/79alPG6G5uc" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen 
                    >
                        
                    </IframeStyled>
                </div>

                <div>  
                    <h1>{pagePolitics.acf.news_title_one}</h1>              
                    <p>{pagePolitics.acf.description_news_one}</p>
                    <div>
                        <a href={pagePolitics.acf.link_file_news_one} target="_blank" rel="noopener">{readMore}</a>
                    </div>
                </div>

                <div>  
                    <h1>{pagePolitics.acf.news_title_two}</h1>              
                    <p>{pagePolitics.acf.description_news_two}</p>
                    <div>
                        <a href={pagePolitics.acf.link_file_news_two} target="_blank" rel="noopener">{readMore}</a>
                    </div>
                </div>
            </SectionText>

        </MarginTopContainer>
        }
        </>
    );
}
 
export default connect(Politica);