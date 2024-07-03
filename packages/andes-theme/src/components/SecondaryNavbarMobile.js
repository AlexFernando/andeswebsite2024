import React from 'react';
import {connect, css, styled } from "frontity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const ContainerNav = styled.nav`
  
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  background-color: #44841a;
  -webkit-box-pack: space-evenly;
  -webkit-justify-content: space-evenly;
      -ms-flex-pack: space-evenly;
          justify-content: space-evenly;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  top:0;
  color: #fff;
  z-index: 3;
  position: relative;
  width: 100%;
  height: 8vh;

  @media (min-width: 768px) {
      display: none;
  }

  a {
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      cursor: pointer;
      text-decoration: none;
      color: #fff;
      
      
      span {      
          font-size: 1rem;
      }
  }
`

const SecondaryNavbarMobile = ({state, actions, setNavOpen, navOpen}) => {

    let myLink = state.router.link;
    let myNewLink = "";

    let linkSpanish = "";
    if(myLink === "/") {
        linkSpanish = "/es-"
    }

    else if(myLink.indexOf("/") > -1) {
        myNewLink = myLink.replace("/","-")
        linkSpanish = "/es-"+"/es"+ myNewLink;
    }

    
    return ( 

        <ContainerNav>
                <a href={myLink}>ENGLISH</a>
                <a href={linkSpanish}>ESPAÑOL</a>
 
                <a href="/searchbar">
                    <span>Search</span>
                    <FontAwesomeIcon css={css`font-size: 1.2rem;`}icon={faSearch}/>
                </a> 
        </ContainerNav>

     );
}
 
export default connect(SecondaryNavbarMobile);