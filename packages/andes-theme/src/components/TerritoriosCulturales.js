import React, {useEffect} from 'react';
import {connect, styled } from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import {SectionContainer, MainParagraph, ImagePotatoPark} from './potatoPark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faListAlt, faLeaf, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { VerticalBorder } from './Dropdown';
import { readMore } from './Root';

import Image from "@frontity/components/image";

export const SubSectionTitle = styled.h2`
       color: #44841a;
       padding: 2rem 1rem 0 1rem;
       font-size: 1.8rem;
       text-align: center;
`;

export const BriefSection = styled.div`
    display: flex;
    padding: 2rem 4rem;

    @media(max-width: 768px) {
        flex-direction: column;
        padding: 2rem 1rem;
    }
`

export const InfoItem = styled.div`
    flex-basis: 33.33%;
    padding: 0 2rem;
    text-align: center;

    @media(max-width: 768px) {
        padding: 1rem 1rem;
    }

    p {
        line-height: 1.5;
        padding: 0;
        color: #000;
    }
    
    h3 {
        color: #44841a;
        padding: 0 1rem 0 1rem;
    }

    ul {
        margin-top: 2rem;
        padding-left: 0;
        text-align: left;
    }

    li {
        list-style: none;
        margin-top: 1rem;
    }
`;

export const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    color: #44841a;
    font-size: 3rem;
`;

export const FontAwesomeIconList = styled(FontAwesomeIcon)`
    color: #44841a;
    margin-right: .5rem;
`;

const AditionalContainer = styled.div`
    
    display: flex;
    padding: 1rem 2rem 4rem 2rem;
    justify-content: center;
    align-items: center;

    @media(max-width: 768px) {
            flex-direction: column;
            padding: 0rem;
        }

    a{
        margin: 0 1rem;
        background-color: #eaeade;
        padding: 1rem;
        border-radius: 1rem;

        @media(max-width: 768px) {
            margin: .5rem 0;
        }

    }
`;

const AditionalContainerImage = styled(Image)`
    max-width: 100%;
    max-height: 20vh;
`

export const CardsContainerAlternative = styled.div`
    display: flex;
    justify-content: center;
    
    @media (max-width: 768px){
        flex-direction: column;
    }    


    @media (max-width: 1300px){
       flex-wrap: wrap;
   }
`

export const CardAlternative = styled.div`
    display: flex;
    /* flex-direction: column; */
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
            /* flex-direction: column; */
    }

    @media (max-width: 1300px){
        flex-basis: 40%;
        flex-grow: 0;
    }

    div {
        text-align: center;
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
`


const TerritoriosCulturales = ({state,actions}) => {

    useEffect( () => {
        
        if(state.theme.lang === "en") {
            actions.source.fetch("/bioculturalterritories")
        }

        else {
            actions.source.fetch("/es-bioculturalterritories")
        }
    }, [])

    const pageBiocultural = state.theme.lang === "en" ? state.source.page[262] : state.source.page[269]

    const data = state.source.get('/cardimage');
  

    let cardImagesArr = [];

    
    if(data.isReady) {
        
        data.items.map(({id}) => { 
                

                if(state.theme.lang === "en") {
                    if(state.source.cardimage[id].filterbypage[0] === 26) {
                        cardImagesArr.push(state.source.cardimage[id])
                    }
                }

                else {
                    if(state.source.cardimage[id].filterbypage[0] === 27) {
                        cardImagesArr.push(state.source.cardimage[id])
                    }
                }
            }
        )
    }

    const listArrOne = pageBiocultural.acf.info2_list.split("*");
    listArrOne.shift();

    const listArrTwo = pageBiocultural.acf.info3_list.split("*");
    listArrTwo.shift();

    return ( 
      
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    {pageBiocultural.acf.title}
                </Title>
                <Separator></Separator>
                <SubTitle>
                    {pageBiocultural.acf.subtitle}
                </SubTitle>
            
            </HeadContainer>

            <SectionContainer>
                <MainParagraph>
                    {pageBiocultural.acf.main_text}
                </MainParagraph>
                <p>
                    {pageBiocultural.acf.second_text} 
                </p>

                <p>
                    {pageBiocultural.acf.thrid_text}
                </p>
            </SectionContainer>

            <BriefSection>

                <InfoItem>
                    
                    <FontAwesomeIconStyled icon={faQuestionCircle}/>
                    <h3>{pageBiocultural.acf.info1_title}</h3>
                    <p>
                        {pageBiocultural.acf.info1_paragraph}                    
                    </p>
                </InfoItem>
                <VerticalBorder></VerticalBorder>
                
                <InfoItem>
                    <FontAwesomeIconStyled icon={faListAlt}/>
                    
                    <h3>{pageBiocultural.acf.info2_title}</h3>

                    <ul>

                        {listArrOne.map( listItem => {
                                return(
                                    <li><FontAwesomeIconList icon={faArrowAltCircleRight}/>{listItem}</li>      
                                )
                            }) 
                        }
    
                    </ul>

                </InfoItem>
                <VerticalBorder></VerticalBorder>
                <InfoItem>
                
                    <FontAwesomeIconStyled icon={faLeaf}/>
                    
                    <h3>{pageBiocultural.acf.info3_title}</h3>
                
                    <ul>
                        {listArrTwo.map( listItem => {
                                return(
                                    <li><FontAwesomeIconList icon={faArrowAltCircleRight}/>{listItem}</li>      
                                )
                            }) 
                        }
                    </ul>
                </InfoItem>
            </BriefSection>

            <SubSectionTitle>Case Studies</SubSectionTitle>
            
            <CardsContainerAlternative>

            {data.isReady ?
                
                <>
                {cardImagesArr.reverse().map( cardImages => {
                    

                    return(

                    <CardAlternative>

                        <ImagePotatoPark src={cardImages.acf.image_card.sizes.medium_large}/>
                        <div>
                            <h3>{cardImages.title.rendered}</h3>
                            <span dangerouslySetInnerHTML={{ __html: cardImages.excerpt.rendered}}></span>
                            <a href={  cardImages.acf.link_card} target="_blank" rel="noopener noreferrer">{readMore}</a>
                        </div>
                    </CardAlternative>
                    )
                })}

                </>
            : null

            }

            </CardsContainerAlternative>

            <SubSectionTitle>{pageBiocultural.acf.additional_resources_title}</SubSectionTitle>
            
            <AditionalContainer>
                <a href="https://www.iied.org/" target="_blank" rel="noopener" ><AditionalContainerImage src={pageBiocultural.acf.img_additional_1.sizes.medium}/></a>
            
                <a href="https://www.iied.org/" target="_blank" rel="noopener" ><AditionalContainerImage src={pageBiocultural.acf.img_additional_2.sizes.medium}/></a>
            
                <a href="https://www.iied.org/" target="_blank" rel="noopener" ><AditionalContainerImage src={pageBiocultural.acf.img_additional_3.sizes.medium}/></a>
            
                <a href="https://www.iied.org/" target="_blank" rel="noopener" ><AditionalContainerImage src={pageBiocultural.acf.img_additional_4.sizes.medium}/></a>
            </AditionalContainer>
        </MarginTopContainer>
 
    );
}
 
export default connect(TerritoriosCulturales);