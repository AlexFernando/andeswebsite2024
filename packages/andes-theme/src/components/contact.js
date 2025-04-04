import React from 'react';
import {styled } from "frontity";
import {faMapMarkedAlt, faStreetView, faMailBulk, faLink} from '@fortawesome/free-solid-svg-icons';
import {ButtonAction} from './bgImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInstagram, faYoutube, faFacebookSquare, faLinkedin, faXTwitter} from '@fortawesome/free-brands-svg-icons';
import LinkButton from './LinkButton';

//contact footer
import ContactFooter from './ContactFooter';

const ContactContainer = styled.div`
    display: flex;
    background-color: #333333;
    color: #fff;
    justify-content: space-around;
    align-content: center;

    @media(max-width: 768px) {
        flex-direction: column;
    }
`;

const ContactElement = styled.div`

    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    @media(max-width: 768px) {
        padding: 1rem;
        h2 {
            font-size: 1rem;
        }
    }

    ul {
        margin: 0;
        padding: 0;

        &:first-of-type {
            display: flex;
            justify-content: center;
            align-content: center;

            li {
                margin: 0 1.5rem 2rem 1.5rem;

                a {
                    color : #fff;
                    font-size: 2rem;
                }
            }
        }
    }

    h2 {
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    h3 {
        margin-top: 0;
        font-size: 2rem;
        font-weight: 300;
        text-align: center;
    }

    li {
        list-style: none;
        font-weight: 200;
        margin-bottom: 1rem;
        letter-spacing: 1px;

        @media(max-width: 768px) {
            font-size: 1.2rem;
        }

    }
`;

const ContactForm = styled.div`
    
    @media(max-width: 768px) {
        padding: 1rem;
    }
    
    h3 {
        font-size: 2rem;
        font-weight: 300;
    }
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    margin-right: 1rem;
`;


const Contact = () => {

    return ( 
        <ContactContainer>
            <ContactElement>
                <h2>Promoting a conservation and development approach <br></br>rights-based <br></br> through the implementation <br></br> of Biocultural Territories</h2>
            
                <ul>
                        <li><a href="https://www.facebook.com/AsociacionparalaNaturalezayDesarrolloSostenible/" alt="Share on Twitter" aria-label="Link to Facebook" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebookSquare}/></a></li>
                        <li><a href="https://twitter.com/asociacionandes" alt="Share on Twitter" aria-label="Link to Twitter" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faXTwitter}/></a></li>
                        <li><a href="https://www.instagram.com/asociacionandes_/" alt="Share on Twitter" aria-label="Link to Instagram" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram}/></a></li>
                        <li><a href="https://www.youtube.com/@videosandes4733" alt="Share on Twitter" aria-label="Link to Youtube" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faYoutube}/></a></li>
                        <li><a href="https://www.linkedin.com/company/asociación-andes/" alt="Share on Linkendin" aria-label="Link to Linkedin" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin}/></a></li>
                </ul>

                <ul>
                    <li><FontAwesomeIconStyled icon={faMapMarkedAlt}/>ANDES Asociation</li>
                   
                    <li><FontAwesomeIconStyled icon={faStreetView}/>HUARAN,  SECTOR  ACANPERAY S/N - CALCA-CUSCO</li>
                
                    <li> <FontAwesomeIconStyled icon={faMailBulk}/>Postal Code Nº 567, Cusco - Peru </li>
                </ul>
            </ContactElement>
            <ContactForm>
                <h3>Contact</h3>
                
                <ContactFooter />
            </ContactForm>
        </ContactContainer>

    );
}
 
export default Contact;