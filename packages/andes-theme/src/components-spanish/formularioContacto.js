import React from 'react';
import {connect, styled} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, SectionContainer, MarginTopContainer} from './Filosofia';

const formularioContacto = ({state, actions, libraries}) => {

    const Html2react = libraries.html2react.Component;

    const content =  state.source.page["25"].content;

    return ( 
        <MarginTopContainer>
            <HeadContainer>
                
                <Title>
                    Formulario de Contacto
                </Title>
                <Separator></Separator>
                <SubTitle>
                Manténgase en contacto. En caso de tener alguna consulta, envíenos un correo electrónico utilizando el formulario a continuación.
                </SubTitle>
                
            </HeadContainer>

            <Content>
                <Html2react html={content.rendered} />
            </Content>
        </MarginTopContainer>
    );
}


const Content = styled.div`

    font-size: 1.5rem;
    padding-left: 2rem;

    input, textarea {
        margin:1rem 1rem 2rem 1rem;
        border-radius: 5px;
        border: 2px solid #000;
        height: 30px;
    }

    @media(max-width: 768px) {
        input, textarea {
            width: 70vw;
        }
    }

    textarea {
        height: 150px;
    }

    input[type="submit"] { 
       
    background-color: #f07723 ;
    height: 60px;    
    padding: 1.5rem;
 
    border: 1px solid #fff;
     font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    color: #FFF;
    cursor: pointer;
     font-family: 'Montserrat', sans-serif;
    
    &:hover {
        background-color: #F05523;
        transition: all 0.4s;
    }
    }
`;

 
export default connect(formularioContacto);