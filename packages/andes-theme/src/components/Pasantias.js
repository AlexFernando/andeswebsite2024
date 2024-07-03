import React, {useEffect} from 'react';
import {connect, styled} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import {SectionContainer, MainParagraph} from './potatoPark';
import Loading from './Loading';

// font awesome icons
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIconList} from './TerritoriosCulturales'

import Image from "@frontity/components/image";

//handle image size according to size screen
import CardFeaturedImage from './CardFeatureImage';

export const ContainerBlocks = styled.div`
 
`;

export const ImageIntership = styled(Image)`
    flex-basis: 30%;
    object-fit: contain;
    width: 240px;
    height: 320px;

    @media(max-width: 768px) {
            width: 100%;
            height: 100%;
            margin: 1rem 0;
        
    }
`;

export const BlockInfo = styled.div`

    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    margin: 2rem 5rem;
    padding: 2rem 4rem;
    border-radius: 1rem;

    :nth-of-type(odd){
        background-color: #336313;
    }
    
    :nth-of-type(even){
        background-color: #333333;
    }

    div {

        flex-basis: 60%;
        h2 {
            color: #fff;
        }

        p {
            color: #fff;
        }

        ul {
            padding-left: 0;
            text-align: left;
        }

        li {
            list-style: none;
            margin-top: 1rem;
        }
    }


    @media(max-width: 768px) {

        flex-direction: column;
        margin: 1rem 0;
        padding: 2rem;
    }

`;

const Pasantias = ({state , actions}) => {

    useEffect( () => {
            
        if(state.theme.lang === "en") {
            actions.source.fetch("/intershipandvolunteering")
            actions.source.fetch("/cardintership/")
        }

        else {
            actions.source.fetch("/es-intershipandvolunteering")
            actions.source.fetch("/cardintership/")
        }
    }, [])

    const pageIntership = state.theme.lang === "en" ? state.source.page[404] : state.source.page[411]

    const data = state.source.get('/cardintership');

    let cardIntershipArr = [];

    if(data.isReady) {

        data.items.map(({id}) => { 
                
                if(state.theme.lang === "en") {

                    if(state.source.cardintership[id].typeofintershipcard[0] === 32) {
                        cardIntershipArr.push(state.source.cardintership[id])
                    }
                }

                else {
                    if(state.source.cardintership[id].typeofintershipcard[0] === 33) {
                        cardIntershipArr.push(state.source.cardintership[id])
                    }
                }
            }
        )
    }

    return ( 

        <>
        {typeof pageIntership === "undefined" ? <Loading />
        
        :
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    {pageIntership.acf.title}
                </Title>
                <Separator></Separator>
                <SubTitle>
                    {pageIntership.acf.subtitle}
                </SubTitle>
               
            </HeadContainer>

            <SectionContainer>
                <MainParagraph> {pageIntership.acf.main_text} </MainParagraph>
                <p> {pageIntership.acf.paragraph_one}</p>

                <p>
                    {pageIntership.acf.paragraph_two}
                </p>
            </SectionContainer>

            <ContainerBlocks>
                {data.isReady ?
                    
                    <>
                        {cardIntershipArr.reverse().map( cardIntership => {

                            let arrayParagraphs = cardIntership.acf.list_paragraphs.split("*");

                            if(arrayParagraphs.length > 1) {
                                arrayParagraphs.shift()
                            }
                        

                            return(

                                <BlockInfo>
                                    <div>
                                        <h2>{cardIntership.acf.title}</h2>

                                        {
                                            arrayParagraphs.map( paragraph => {
                                                return (
                                                    <p>
                                                        {paragraph}
                                                    </p>
                                                )
                                            })
                                        }
                                        
                                    </div>
                                    {/* <ImageIntership src={cardIntership.acf.image_card.sizes.medium}/> */}
                                    <CardFeaturedImage  media = {cardIntership.acf.image_card.sizes} elem = "courses"/>
                                </BlockInfo>
                            )
                        })}

                    </>
                    
                    : null

                }

                <BlockInfo>
                    <p>
                        {pageIntership.acf.text_apply}
                    </p>
                </BlockInfo>

            </ContainerBlocks>
            </MarginTopContainer>
            }
            </>
    );
}
 
export default connect(Pasantias);