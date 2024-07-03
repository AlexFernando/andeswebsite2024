import React from 'react';
import {connect, css, styled } from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    img {
        max-width: 100%;
        max-height: 20vh;
    }
`;

const TerritoriosCulturales = ({state}) => {
    return ( 
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    Territorios Bioculturales
                </Title>
                <Separator></Separator>
                <SubTitle>
                    Desarrollo endógeno <br></br>Conservación de la biodiversidad
                </SubTitle>
                
            </HeadContainer>
        </MarginTopContainer>
    );
}
 
export default connect(TerritoriosCulturales);