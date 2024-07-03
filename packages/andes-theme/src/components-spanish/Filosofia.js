import React from 'react';
import {connect, styled } from "frontity";
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIconList} from './TerritoriosCulturales';


export const MarginTopContainer = styled.div`
    margin-top: 12vh;

    @media(min-width: 768px) {
        margin-top: 16vh;
    }
`;

export const Title = styled.h2`

    font-size: 2.2rem;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 3px;
    margin: 2rem 0 2rem 0;
    text-transform: uppercase;
 
    @media(min-width: 768px) {
        font-size: 4rem;
    }
`
export const SubTitle = styled.span`
    font-size: 1.5rem;

    @media(min-width: 768px) {
        font-size: 2.5rem;
        -ms-flex-wrap: nowrap;
            flex-wrap: nowrap;
    }
`
export const Separator = styled.span`
    display: block;
    width: 12rem;
    height: 12px;
    margin-top: .5rem;
    margin-bottom: 2rem;
    border-radius: 20px;
    background-color: #44841a;

    @media(max-width: 768px) {
        width: 6rem;
        height: 8px;
    }
`

export const HeadContainer = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;

    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
        flex-direction: column;
    padding: 2rem;
    overflow-wrap: break-word;
`;


export const SectionContainer = styled.div`
    display: -webkit-box;  
    display: -ms-flexbox;
    display: flex;
   
   -webkit-box-orient: vertical;
   -webkit-box-direction: normal;
       -ms-flex-direction: column;
           flex-direction: column;

    padding: 2rem;

    span {
        font-weight: bold;
        font-size: 1.3rem;
    }

    p {
        @media (min-width: 768px){
            width: 70%;
        }
       
        font-size: 1.2rem;
    }

    h3 {
        font-size: 1.4rem;
        margin: 2rem 0 0 0;
    }
`;

const ObjetivesContent = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px){
        flex-direction: column;
    }


    div {
        padding: 0rem 1rem;

        img {
            @media (max-width: 768px){
                max-width: 100%;
                max-height: 100%;
            }
            max-width: 80%;
            max-height: 80%;
            align-self: center;
        }

        ul {
            padding: 0;
        }

        li {
            list-style: none;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
    }
`

export const ImageStyle = styled.img`
    
    max-height: 100%; 
    max-width: 100%;

       
    @media (min-width: 768px){
        max-width: 50%;
        max-height: 50%;
    }
`

const Filosofia = ({state, actions}) => {
    
    const pagePhilosophy = state.source.page[192];

    const objectivesArr = pagePhilosophy.acf.objectives.split("*");

    objectivesArr.shift();

    return ( 

        <MarginTopContainer>
            <HeadContainer>
                <Title>{pagePhilosophy.acf.title}</Title>
                <Separator></Separator>
             
                <SubTitle>{pagePhilosophy.acf.subtitle}</SubTitle>       
            </HeadContainer>

            <SectionContainer>

                    <div>
                        <p><span>Nuestra Misión : </span>{pagePhilosophy.acf.mission}</p>  
                       
                        <p><span>Nuestra Visión : </span>{pagePhilosophy.acf.vision}</p>
                    </div>
        
                    <div>
                    <h3>Nuestros Objetivos: </h3>                    
                        <ObjetivesContent>
                            <div>
                                <ul>
                                    {objectivesArr.slice(0,2).map( objetive => {
                                            return(
                                                <li><FontAwesomeIconList icon={faArrowAltCircleRight}/>{objetive}</li>      
                                            )
                                        }) 
                                    }
                                </ul>

                                <img src={pagePhilosophy.acf.image_one.sizes.medium_large} />
                            </div>                       
                       

                            <div>
                                <ul>
                                    {objectivesArr.slice(2, objectivesArr.length).map( objetive => {
                                            return(
                                                <li><FontAwesomeIconList icon={faArrowAltCircleRight}/>{objetive}</li>      
                                            )
                                        }) 
                                    }
                                </ul>
                                <img src={pagePhilosophy.acf.image_two.sizes.medium_large} />
                            </div>
                        </ObjetivesContent>
                    </div>
            </SectionContainer>
            
        </MarginTopContainer>

    );
}
export default connect(Filosofia);