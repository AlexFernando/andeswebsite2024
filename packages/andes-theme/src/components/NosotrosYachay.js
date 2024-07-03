import React, {useEffect} from 'react';
import {connect, css, styled} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import {SectionContainer, CardsContainer, Card , MainParagraph} from './potatoPark';
import {SectionText} from './HomePage';
import {FixedCard} from './Politica';
import {SubSection, TextContainer, ImageSection} from './Stuff';
import {BriefSection, InfoItem, FontAwesomeIconList, FontAwesomeIconStyled } from './TerritoriosCulturales'
import { VerticalBorder } from './Dropdown';
import { faLightbulb, faListAlt, faArrowAltCircleRight, faPeopleCarry } from '@fortawesome/free-solid-svg-icons';

import Loading from './Loading';

import {readMore} from './Root';

import Image from "@frontity/components/image";

//handle image size according to size screen
import CardFeaturedImage from './CardFeatureImage';


const LastSection = styled.div`
    display: flex;
    justify-content: space-around;
    align-content: center;
    text-align: center;

    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;

    @media(max-width: 1440px) {
        flex-direction: column;
        justify-content: center;
        align-content: center;
        margin: 1rem 0;
    }
`

const ImageStyled = styled(Image)`
    max-width: 100%;
    height: auto;
    object-fit: fill;
`

const NosotrosYachay = ({state, actions}) => {

    useEffect( () => {
            
        if(state.theme.lang === "en") {
            actions.source.fetch("/whoweare")
            actions.source.fetch("/cardpersona/")
        }

        else {
            actions.source.fetch("/es-whoweare")
            actions.source.fetch("/cardpersona/")
        }
    }, [])


    const pageYachay = state.theme.lang === "en" ? state.source.page[443] : state.source.page[417]

    const data = state.source.get('/cardpersona');

    let cardYachayArr = [];

    if(data.isReady) {

        data.items.map(({id}) => { 
                
                if(state.theme.lang === "en") {

                    if(state.source.cardpersona[id].typeofcardpersona[0] === 34) {
                        cardYachayArr.push(state.source.cardpersona[id])
                    }
                }

                else {
                    if(state.source.cardpersona[id].typeofcardpersona[0] === 35) {
                        cardYachayArr.push(state.source.cardpersona[id])
                    }
                }
            }
        )
    }

    let arrayList = pageYachay.acf.info_list_two.split('*');
    arrayList.shift();

    return ( 

        <>
        {typeof pageYachay === "undefined" ? <Loading />
        
        :

        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    {pageYachay.acf.title}
                </Title>
                <Separator></Separator>
                <SubTitle>
                    {pageYachay.acf.subtitle}
                </SubTitle>
                
            </HeadContainer>

            <SectionContainer>
                <MainParagraph>
                    {pageYachay.acf.main_title}                
                </MainParagraph>
                
                <p>
                    {pageYachay.acf.paragraph_one}
                </p> 
            </SectionContainer>

            <h2 css= {css`text-align: center; color: #44841a; font-size: 2rem;`} >{pageYachay.acf.info_main_title}</h2>

            <BriefSection>

                <InfoItem>
                    
                    <FontAwesomeIconStyled icon={faLightbulb}/>
                        <h3>{pageYachay.acf.info_title_one}</h3>
                    <p>
                        {pageYachay.acf.info_paragraph_one}
                    </p>
                
                </InfoItem>
                <VerticalBorder></VerticalBorder>
                
                <InfoItem>
                    <FontAwesomeIconStyled icon={faListAlt}/>
                    
                    <h3>{pageYachay.acf.info_title_two}</h3>

                    <ul>
                        
                        {arrayList.map( item => {

                                return(
                                    <li><FontAwesomeIconList icon={faArrowAltCircleRight}/>{item}</li>
                                )
                            })
                        }

                    </ul>

                </InfoItem>
                <VerticalBorder></VerticalBorder>
                <InfoItem>
                    
                    <FontAwesomeIconStyled icon={faPeopleCarry}/>
                    <h3>{pageYachay.acf.info_title_three}</h3>
                    <p>
                        {pageYachay.acf.info_paragraph_three}
                    </p>
                
                </InfoItem>
            </BriefSection>


            
            {data.isReady ?
                    
                    <>
                        {cardYachayArr.reverse().map( cardYachay => {

                            let arrayNames = cardYachay.acf.list_staff_names.split("*");
                            let arrayDescription = cardYachay.acf.list_staff_description.split("*");

                            arrayNames.shift();
                            arrayDescription.shift();

                                return (

                                    <SubSection>
                                        <TextContainer>
                                                <h2>{cardYachay.acf.area_division}</h2>

                                                {arrayNames.map( (item, index) => {

                                                    return(
                                                        <>
                                                            <br></br>
                                                            <h3>{item} <span> {arrayDescription[index]}</span></h3> 
                                                            
                                                        </>
                                                    )
                                                })
                                                
                                                }

                                        </TextContainer>
                        
                                        
                                        {/* <ImageSection src={cardYachay.acf.image_card.sizes.medium_large} /> */}
                                    
                                        <CardFeaturedImage  media = {cardYachay.acf.image_card.sizes} elem="stuff" />
                                    </SubSection>
                                )
                            })
                        }

                    </>
                    
                    : null

                }

                <SubSection>
                <LastSection>
                    <SectionText>
                        <div>
                            <h1>{pageYachay.acf.section_text_1}</h1>

                            <p>{pageYachay.acf.section_description_1}</p>
                            <div>
                                <a href= {pageYachay.acf.section_link_button_1} target="_blank" rel="noopener" >{readMore}</a>
                            </div>
                        </div>
                    </SectionText>
         
                    <ImageStyled src={pageYachay.acf.section_image_1.sizes.medium_large} alt="last section image"/>
                                    
                </LastSection>

                </SubSection>
        </MarginTopContainer>
        }
        </>

    );
}
 
export default connect(NosotrosYachay);