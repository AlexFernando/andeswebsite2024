import React, {useEffect} from 'react';
import {connect, css, styled } from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';

import Loading from './Loading';

import Image from "@frontity/components/image";

//handle image size according to size screen
import CardFeaturedImage from './CardFeatureImage';

export const SubSection = styled.div`
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    
    :nth-of-type(odd) {
        background-color: #fff;   
    }
    :nth-of-type(even) {
        background-color: #f4f4f4;   
    } 

    @media (min-width: 768px){
        flex-direction: row;
        padding: 5rem;

        :nth-of-type(odd) {
            flex-direction: row-reverse;
        }
    }
`;

export const TextContainer = styled.div`

    display: flex;
    flex-direction: column;
    margin: 0 0 1.5rem 0;

    @media (min-width: 768px){
        flex-basis: 50%;
    }
   

    h3 {
        margin: 0 0 .5rem 0;
    }

    span {
        color: #44841a;
        font-size: 1.1rem;
    }

    p {
        margin: 0 0 1.5rem 0;
    }

    @media (min-width: 768px){
        margin: 0 2rem 0 2rem;
    } 
`;

export const ImageSection = styled(Image)`
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
    margin-top: 1rem;

    @media (min-width: 768px){
        width: 45%;
        height: 100%;
        border-radius: 10rem;
        margin: 0 2rem 0 2rem;
    } 
`;

const Staff = ({state, actions}) => {

    useEffect( () => {
            
        if(state.theme.lang === "en") {
            actions.source.fetch("/people")
            actions.source.fetch("/cardpersona/")
        }

        else {
            actions.source.fetch("/es-people")
            actions.source.fetch("/cardpersona/")
        }
    }, [])


    const pageStuff = state.theme.lang === "en" ? state.source.page[432] : state.source.page[415]

    const data = state.source.get('/cardpersona');

    let cardStuffArr = [];

    if(data.isReady) {

        data.items.map(({id}) => { 
                
                if(state.theme.lang === "en") {

                    if(state.source.cardpersona[id].typeofcardpersona[0] === 33) {
                        cardStuffArr.push(state.source.cardpersona[id])
                    }
                }

                else {
                    if(state.source.cardpersona[id].typeofcardpersona[0] === 34) {
                        cardStuffArr.push(state.source.cardpersona[id])
                    }
                }
            }
        )
    }


    return ( 

        <>
        {typeof pageStuff === "undefined" ? <Loading />
        
        :
        
        <MarginTopContainer>
            <HeadContainer>
                <Title>{pageStuff.acf.title}</Title>
                <Separator></Separator>
               
            </HeadContainer>

            
            {data.isReady ?
                    
                    <>
                        {cardStuffArr.reverse().map( cardStuff => {

                            let arrayNames = cardStuff.acf.list_staff_names.split("*");
                            let arrayProfession = cardStuff.acf.list_staff_profession.split("*");
                            let arrayDescription = cardStuff.acf.list_staff_description.split("*");

                            arrayNames.shift();
                            arrayProfession.shift();
                            arrayDescription.shift();

                                return (

                                    <SubSection>
                                        <TextContainer>
                                                <h2>{pageStuff.acf.area_division}</h2>

                                                {arrayNames.map( (item, index) => {

                                                    return(
                                                        <>
                                                            <h3>{item} <br></br><span> {arrayProfession[index]}</span></h3> 
                                                            <p>{arrayDescription[index]}</p>   
                                                        </>
                                                    )
                                                })
                                                
                                                }

                                        </TextContainer>
                        
                                        {/* <ImageSection src={cardStuff.acf.image_card.sizes.medium_large} /> */}

                                        <CardFeaturedImage  media = {cardStuff.acf.image_card.sizes} elem="stuff" />

                                    </SubSection>
                                )
                            })
                        }

                    </>
                    
                    : null

                }

        </MarginTopContainer>
        }
        </>
 );
}
 
export default connect(Staff);
