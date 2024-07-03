import React, {useEffect} from 'react';
import {connect, styled } from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';

import {faListAlt, faArrowAltCircleRight, faMountain, faMale, faLanguage, faExclamationTriangle, faTractor, faSeedling, faHiking, faUtensils, faHands, faCarrot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIconList, FontAwesomeIconStyled, BriefSection, InfoItem} from './TerritoriosCulturales';

import { VerticalBorder } from './Dropdown';

import Loading from './Loading';

import {readMore} from './Root';

import Image from "@frontity/components/image";

//handle image size according to size screen
import CardFeaturedImage from './CardFeatureImage';

const PotatoPark = ({state, actions, libraries}) => {

    useEffect( () => {
        
        if(state.theme.lang === "en") {
            actions.source.fetch("/potatopark-pisac")
        }

        else {
            actions.source.fetch("/es-potatopark-pisac")
        }
    }, [])

    let FirstArrayOfIcons = [faMountain, faMale, faLanguage, faExclamationTriangle];
    let SecondArrayOfIcons = [faTractor, faSeedling, faHiking, faUtensils, faHands, faCarrot];

    const pagePotatoPark = state.theme.lang === "en" ? state.source.page[303] : state.source.page[283]

    const data = state.source.get('/cardimage');


    let cardImagesArr = [];

    
    if(data.isReady) {
        
        data.items.map(({id}) => { 
                
                if(state.theme.lang === "en") {
                    if(state.source.cardimage[id].filterbypage[0] === 27) {
                        cardImagesArr.push(state.source.cardimage[id])
                    }
                }

                else {
                    if(state.source.cardimage[id].filterbypage[0] === 28) {
                        cardImagesArr.push(state.source.cardimage[id])
                    }
                }
            }
        )
    }

    let dataTitleList = [];
    let dataTextList = [];
    let infoListOne = [];
    let infoListTwo = [];
    let listActivities = [];


    if(typeof pagePotatoPark !== "undefined") {
        
        console.log("data: ", pagePotatoPark)
        infoListOne = pagePotatoPark.acf.info_list_1.split("*");
        infoListOne.shift();
    
        infoListTwo = pagePotatoPark.acf.info_list_2.split("*");
        infoListTwo.shift();
    
        listActivities = pagePotatoPark.acf.list_activities.split("*");
        listActivities.shift();
    }

    const Html2react = libraries.html2react.Component;
    
    return ( 
       
        <>
        {typeof pagePotatoPark === "undefined" ? <Loading />
        
        :
        
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    {pagePotatoPark.acf.title}
                </Title>
                <Separator></Separator>
                <SubTitle>
                    {pagePotatoPark.acf.subtitle}
                </SubTitle>
            
            </HeadContainer>

           

            <SectionContainer>

                <ContainerParagraphMap>
                    <MainParagraph>
                        {pagePotatoPark.acf.main_text}
                    </MainParagraph>

                    <Content>       
                        <Html2react html={pagePotatoPark.content.rendered} />
                    </Content> 
                </ContainerParagraphMap>

                
                <SectionInfoContainer>

                    <FastInfo>
                        {
                            Object.keys(pagePotatoPark.acf.data_list).map( (elem, index) => {
                                return(
                                    <div>
                                        <FontAwesomeIconStyled icon={FirstArrayOfIcons[index]}/>
                                        <h3>{pagePotatoPark.acf.data_list[elem].title}</h3>
                                        <p>{pagePotatoPark.acf.data_list[elem].data}</p>
                                    </div>
                                )
                        
                            })
                        }
                
                    </FastInfo>

                </SectionInfoContainer>

                <BriefSection>

                    <InfoItem>
                        
                        <FontAwesomeIconStyled icon={faListAlt}/>
                            <h3>{pagePotatoPark.acf.info_title_1}</h3>
                            <p>{pagePotatoPark.acf.info_paragraph}</p>
                    </InfoItem>
                    <VerticalBorder></VerticalBorder>

                    <InfoItem>
                        <FontAwesomeIconStyled icon={faListAlt}/>
                        
                        <h3>{pagePotatoPark.acf.info_title_2}</h3>

                        <ul>
                            {infoListOne.map( listItem => {
                                    return(
                                        <li><FontAwesomeIconList icon={faArrowAltCircleRight}/>{listItem}</li>      
                                    )
                                }) 
                            }
                        </ul>
                    </InfoItem>
                    <VerticalBorder></VerticalBorder>
                    <InfoItem>

                        <FontAwesomeIconStyled icon={faListAlt}/>
                    
                        <h3>{pagePotatoPark.acf.info_title_3}</h3>

                        <ul>
                            {infoListTwo.map( listItem => {
                                    return(
                                        <li><FontAwesomeIconList icon={faArrowAltCircleRight}/>{listItem}</li>      
                                    )
                                }) 
                            }
                        </ul>
                    </InfoItem>
                </BriefSection>

                <SectionInfoContainer>
                    <h2>{pagePotatoPark.acf.title_activities}</h2>

                        <FastInfo>
                            {
                                listActivities.map( (itemTitleList , index)  => {
                                    return(
                                        <div>
                                            <FontAwesomeIconStyled icon={SecondArrayOfIcons[index]}/>
                                            <h3>{itemTitleList}</h3>
                                        </div>
                                    )
                                }) 
                            }
                        </FastInfo>

                </SectionInfoContainer>

            
                <CardsContainer>
                    {data.isReady ?
                    
                        <>
                            {cardImagesArr.reverse().map( cardImages => {
                                

                                return(

                                    <Card>
                                        
                                        {/* <ImagePotatoPark src={cardImages.acf.image_card.sizes.medium_large}/> */}
                                        <CardFeaturedImage  media = {cardImages.acf.image_card.sizes} />
                                        
                                        <h3>{cardImages.title.rendered}</h3>
                                        <p dangerouslySetInnerHTML={{ __html: cardImages.excerpt.rendered}}></p>

                                        <a href={cardImages.acf.link_card} target="_blank" rel="noopener noreferrer">{readMore}</a>
                                        
                                    </Card>
                                )
                            })}

                        </>
                        
                        : null

                    }

                </CardsContainer>
            </SectionContainer>
            
        </MarginTopContainer>
                        
        }
       </>
    );
}
 
export default connect(PotatoPark);

export const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0rem 2rem 2rem 2rem;

    @media(max-width: 768px) {
        padding: 0 1rem 0 1rem;
    }

    p {
        padding: 2rem 25rem 0 4rem;
        line-height: 1.5;
        font-size: 1.1rem;
        color: #545454;
        margin-bottom: 0;

        @media(max-width: 768px) {
            padding: 0 1rem 0 1rem;
            font-size: 1rem;
        }
    }
`;

export const ContainerParagraphMap = styled.div`
    display: flex;
    justify-content: space-between;

    @media(max-width: 1000px) {
        flex-direction: column;
    }
`

export const MainParagraph = styled.span`
        flex-basis: 40%;
        padding: 0 2rem 0 2rem;
        line-height: 1.5;
        font-size: 1.4rem;
        color: #4c4c4c;

        @media(max-width: 768px) {
            padding: 0 1rem 0 1rem;
            font-size: 1.2rem;
        }
`

/**Styles google map content rendered */
export const Content = styled.div`
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;
    padding-bottom: 4rem;

    @media (max-width: 968px) {
        flex-direction: column;
        flex-wrap: wrap;
        padding-right: 1rem;
        padding-left: 1rem;
    } 

    iframe{
        @media (max-width: 768px) {
            width: 300px;
        } 
     
    }
`

export const CardsContainer = styled.div`
    display: flex;
    justify-content: center;
    
    @media (max-width: 768px){
        flex-direction: column;
    }    


    @media (max-width: 1300px){
       flex-wrap: wrap;
   }
`;

export const Card = styled.div`

    display: flex;
    flex-direction: column;
    flex-basis: 33.33%;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
    /* background-color: #eaeade; */
    line-height: 1.2;
    margin: 2rem;
    border-radius: 1rem;
    padding-bottom: 1.5rem;
    box-shadow: 0 1px 20px 1px grey;

    @media (max-width: 768px){
        margin: 1rem 0 1rem 0;
    }

    @media (max-width: 1300px){
        flex-basis: 40%;
        flex-grow: 0;
    }

    h3 {
        color: #44841a;
        padding: 0 1rem 0 1rem;
    }

    p {
        margin-top: 0;
        padding: 0rem 1rem 1rem 1rem;
        font-weight: 400;
        font-size: 1rem;
        color: #545454;
        text-align: justify;
    }
    
    a {
        text-decoration: none;
        background-color: #f07723;
        color: #fff;
        padding: .8rem;
        border-radius: 10px;
    }
`;

export const ImagePotatoPark = styled(Image)`
    max-width: 100%;
    max-height: 100%;
    border-radius: 1rem 1rem 0 0;   

    /**new style last fixed */
    width: 50%;
    align-self: center;
    max-height: 45vh; 

    @media (max-width: 768px){
        display: none;
    }
`

export const SectionInfoContainer = styled.div`
    margin: 2rem 0;
    h2{
        text-align: center;
    }
`;

export const FastInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
    text-align: center;
    margin: 4rem 0;

    @media(min-width: 768px) {
        div {
            flex-basis: 25%;
        }
    }


    @media(max-width: 768px) {
        flex-direction: column;

        div {
            margin: 1rem 0;
        }
    }

    p {
        color: #000;
        padding: 0;
    }
`;