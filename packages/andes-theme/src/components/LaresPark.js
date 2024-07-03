import React, {useEffect} from 'react';
import {connect, styled} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import {SectionContainer, CardsContainer, Card, ImagePotatoPark, SectionInfoContainer, FastInfo} from './potatoPark'
import Loading from './Loading';
import {readMore} from './Root';

//handle image size according to size screen
import CardFeaturedImage from './CardFeatureImage';

// more import 
import {faListAlt, faArrowAltCircleRight, faMountain, faMale, faLanguage, faExclamationTriangle, faTractor, faSeedling, faHiking, faUtensils, faHands, faCarrot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIconList, FontAwesomeIconStyled, BriefSection, InfoItem} from './TerritoriosCulturales';

import { VerticalBorder } from './Dropdown';

import Image from "@frontity/components/image";

const LaresPark = ({state, actions}) => {

    useEffect( () => {
        
        if(state.theme.lang === "en") {
            actions.source.fetch("/chalakuypark-lares")
        }

        else {
            actions.source.fetch("/es-chalakuypark-lares")
        }
    }, [])
  
    const pageLaresPark = state.theme.lang === "en" ? state.source.page[330] : state.source.page[309]

    const data = state.source.get('/cardimage');

    let cardImagesArr = [];

    let FirstArrayOfIcons = [faMountain, faMale, faLanguage, faExclamationTriangle];
    let SecondArrayOfIcons = [faTractor, faSeedling, faHiking, faUtensils, faHands, faCarrot];


    
    if(data.isReady) {
        
        data.items.map(({id}) => { 
                
                if(state.theme.lang === "en") {
                    if(state.source.cardimage[id].filterbypage[0] === 28) {
                        cardImagesArr.push(state.source.cardimage[id])
                    }
                }

                else {
                    if(state.source.cardimage[id].filterbypage[0] === 29) {
                        cardImagesArr.push(state.source.cardimage[id])
                    }
                }
            }
        )
    }


    let infoListOne = [];
    let infoListTwo = [];
    let listActivities = [];


    if(typeof pagePotatoPark !== "undefined") {
    
        infoListOne = pagePotatoPark.acf.info_list_1.split("*");
        infoListOne.shift();
    
        infoListTwo = pagePotatoPark.acf.info_list_2.split("*");
        infoListTwo.shift();
    
        listActivities = pagePotatoPark.acf.list_activities.split("*");
        listActivities.shift();
    }

    return ( 
        <>
        {typeof pageLaresPark === "undefined" ? <Loading />

        :

        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    {pageLaresPark.acf.title}
                </Title>
                <Separator></Separator>
                <SubTitle>
                    {pageLaresPark.acf.subtitle}
                </SubTitle>
               
            </HeadContainer>

            <SectionContainer>
                <p>{pageLaresPark.acf.main_text}</p>

                <p>{pageLaresPark.acf.paragraph_1}</p>

                <p>{pageLaresPark.acf.paragraph_2}</p>   

                <SectionInfoContainer>

                    <FastInfo>
                        {
                            Object.keys(pageLaresPark.acf.data_list).map( (elem, index) => {
                                return(
                                    <div>
                                        <FontAwesomeIconStyled icon={FirstArrayOfIcons[index]}/>
                                        <h3>{pageLaresPark.acf.data_list[elem].title}</h3>
                                        <p>{pageLaresPark.acf.data_list[elem].data}</p>
                                    </div>
                                )
                        
                            })
                        }
                
                    </FastInfo>

                </SectionInfoContainer>

                <BriefSection>

                    <InfoItem>
                        
                        <FontAwesomeIconStyled icon={faListAlt}/>
                            <h3>{pageLaresPark.acf.info_title_1}</h3>
                            <p>{pageLaresPark.acf.info_paragraph}</p>
                    </InfoItem>
                    <VerticalBorder></VerticalBorder>

                    <InfoItem>
                        <FontAwesomeIconStyled icon={faListAlt}/>
                        
                        <h3>{pageLaresPark.acf.info_title_2}</h3>

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

                        <h3>{pageLaresPark.acf.info_title_3}</h3>

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
                    <h2>{pageLaresPark.acf.title_activities}</h2>

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
                                        <CardFeaturedImage  media = {cardImages.acf.image_card.sizes} />
                                        {/* <ImagePotatoPark src={cardImages.acf.image_card.sizes.medium_large}/> */}
                                        
                                        <h3>{cardImages.title.rendered}</h3>
                                        <p dangerouslySetInnerHTML={{ __html: cardImages.excerpt.rendered}}>
                                    
                                        </p>

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
 
export default connect(LaresPark);