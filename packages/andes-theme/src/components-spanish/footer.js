import React from 'react';
import {css, styled} from "frontity";
import NavFooter from './navFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faInstagram, faYoutube, faFacebookSquare, faLinkedin} from '@fortawesome/free-brands-svg-icons';

const FooterContainer = styled.div`
    background-color: #0c884a;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #FFF;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    color: #fff;
    font-family: 'PT Sans', sans-serif;

    @media(min-width: 768px) {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
`
const ElementFooter = styled.div`


    margin-top: 2rem;
  

    ul {
        display: flex;
        margin: 0;
        padding: 0;
        
        li {
            margin: 0 1rem;
            list-style: none;

            a {
                color: #FFF;
            }
        }
    }

    @media(min-width: 768px) {

  
            margin-top: 0rem;

        
        ul {
            justify-content: center;
        }
    }
`

const Footer = ({title}) => {

    const year = new Date().getFullYear();

    return (
       
        <footer>   
            <FooterContainer>
                
                <ElementFooter>
                    &copy; {title} - {year} 
                </ElementFooter>

                <ElementFooter>
                    <NavFooter />
                </ElementFooter>
                
                <ElementFooter>
                    <ul>
                        <li><a href="https://www.facebook.com/AsociacionparalaNaturalezayDesarrolloSostenible/" alt="Share on Twitter" aria-label="Link to Facebook" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebookSquare}/></a></li>
                        <li><a href="https://twitter.com/asociacionandes" alt="Share on Twitter" aria-label="Link to Twitter" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faXTwitter}/></a></li>
                        <li><a href="https://www.instagram.com/asociacionandes_/" alt="Share on Twitter" aria-label="Link to Instagram" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram}/></a></li>
                        <li><a href="https://www.youtube.com/@videosandes4733" alt="Share on Twitter" aria-label="Link to Youtube" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faYoutube}/></a></li>
                        <li><a href="https://www.linkedin.com/company/asociación-andes/" alt="Share on Linkendin" aria-label="Link to Linkedin" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin}/></a></li>
                    </ul>
                </ElementFooter>
            </FooterContainer>
        </footer>

     );
}
 
export default Footer;