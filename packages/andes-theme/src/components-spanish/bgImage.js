import React from "react";
import {connect, styled } from "frontity";
import {MarginTopContainer} from './Filosofia';
import Link from './Link';

const Content = styled.div`  
    background-repeat: no-repeat;
    background-size: cover;
    background-position:center center;
`

const TextoImagen = styled.div`

    background-image: linear-gradient(to top, rgba(34,49,63, .5), rgba(34, 49, 63, .6));
    color: #FFF;
    display: flex;
    padding: 1.5rem;
    flex-direction: column;
    justify-content: space-between;
    align-content: flex-start;
    overflow-wrap: break-word;
   
    @media(min-width: 768px) {
        height: 573px;
        padding: 6rem;
    }

    h1 {
        text-transform: uppercase;
        font-size: 2rem;
        letter-spacing: 4px;
        margin-top: 5rem;

        @media(min-width: 768px) {
            font-size: 4.5rem;
            margin-right: 20rem;
        }
    }

    p {
        font-size: 1rem;
        margin-top: 0;
        margin-bottom: 2rem;
        line-height: 1.8;
        font-family: 'Montserrat', sans-serif;

        @media(min-width: 768px) {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            margin-right: 10rem;
        }
    }

        div {

            display: flex;
            justify-content: flex-start;
            align-items: center;

            a {
                text-decoration: none;
                background-color: #f07723;
                text-transform: uppercase;
                color: #fff;
                padding: 1.2rem 2.2rem;
                border-radius: 10px;
                text-align: center;
                margin-bottom: 2rem;
                font-weight: 700;
                font-size: 1.2rem;

                &:hover {
                    background-color: #F05523;
                    transition: all 0.4s;
                }
            }

    }    
`

export const ButtonAction = styled.button`
    display: flex;
    justify-content: center;
    background-color: #f07723 ;
    align-items: center;
    padding: 1.5rem;
    height: 30px;
    border: 1px solid #fff;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    color: #FFF;
    cursor: pointer;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 5rem;
    

    @media(min-width: 768px) {
        flex-basis: 20%;
        margin-bottom: 0rem;
    }

    &:hover {
        background-color: #F05523;
        transition: all 0.4s;
    }
`;

export const ButtonHome = styled.a`
    display: flex;
    justify-content: center;
    background-color: #f07723 ;
    align-items: center;
    padding: 1rem;
    height: 30px;
    border: 1px solid #fff;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    color: #FFF;
    cursor: pointer;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 5rem;
    

    @media(min-width: 768px) {
        flex-basis: 20%;
        margin-bottom: 0rem;
    }

    &:hover {
        background-color: #F05523;
        transition: all 0.4s;
    }
`;


const BgImage = () => {
    return (
            <MarginTopContainer>
                <Content>
                    <TextoImagen>
                        <h1>25 Aniversario de la Asociación ANDES </h1>
                        <p>Únete a la celebración de 25 años de trabajo por salvaguardar el patrimonio biocultural</p>
                        <div>
                            <Link href="/es-aniversariopersonas">Saber Mas</Link>
                        </div>           
                    </TextoImagen>
                </Content>
            </MarginTopContainer>
     );
}
 
export default connect(BgImage);