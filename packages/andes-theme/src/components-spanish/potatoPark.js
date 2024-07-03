import React from 'react';
import {connect, css, styled } from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';

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

export const MainParagraph = styled.span`
        padding: 0 25rem 0 4rem;
        line-height: 1.5;
        font-size: 1.4rem;
        color: #4c4c4c;

        @media(max-width: 768px) {
            padding: 0 1rem 0 1rem;
            font-size: 1.2rem;
        }
`

export const CardsContainer = styled.div`
    display: flex;
    justify-content: center;
    
    @media (max-width: 768px){
        flex-direction: column;
    }
`;

export const Card = styled.div`

    display: flex;
    flex-direction: column;
    flex-basis: 33.33%;
    flex-grow: 1;
    align-items: center;
    background-color: #eaeade;
    line-height: 1.2;
    margin: 2rem;
    border-radius: 1rem;
    padding-bottom: 1.5rem;

    @media (max-width: 768px){
        margin: 1rem 0 1rem 0;
    }

    img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 1rem 1rem 0 0;        
    }

    h3 {
        color: #44841a;
        padding: 0 1rem 0 1rem;
    }

    span {
        padding: 1rem 1rem 2rem 1rem;
        font-weight: 400;
        font-size: 1rem;
        color: #545454;
    }
    
    a {
        text-decoration: none;
        background-color: #f07723;
        color: #fff;
        padding: .8rem;
        border-radius: 10px;
    }
`;

const SectionInfoContainer = styled.div`
    margin: 2rem 0;
    h2{
        text-align: center;
    }
`;

const FastInfo = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-content: center;
    text-align: center;
    margin: 4rem 0;

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

const PotatoPark = ({state}) => {
    return ( 
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    Parque de la Papa - Pisaq
                </Title>
                <Separator></Separator>
                <SubTitle>
                    El Sistema Ayllu<br></br>Innovaciones Bioculturales
                </SubTitle>
                
            </HeadContainer> 
        </MarginTopContainer>
    );
}
 
export default connect(PotatoPark);