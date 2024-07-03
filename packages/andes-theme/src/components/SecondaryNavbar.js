import React, {useState, useEffect} from 'react';
import {connect, css, styled } from "frontity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const ContainerNav = styled.nav`
 display: -webkit-box;
 display: -ms-flexbox;
 display: -webkit-flex;
 display: flex;
 width: 100%;
 height: 6vh;
 background-color: #44841a;
 -webkit-box-pack: justify;
     -ms-flex-pack: justify;
         -webkit-justify-content: space-between;
          justify-content: space-between;
 -webkit-box-align: center;
     -ms-flex-align: center;
         -webkit-align-items: center;
         align-items: center;
 position: fixed;
 top:0;
 color: #fff;
 z-index: 3;


 @media (max-width: 768px) {
   display: none;
 }

   p {
       font-style: italic;
       margin-left: 2rem;
   }

   div {
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
       -webkit-box-pack: justify;
           -ms-flex-pack: justify;
               -webkit-justify-content: space-between;
               justify-content: space-between;
       -webkit-box-align: center;
           -ms-flex-align: center;
               -webkit-align-items: center;
               align-items: center;


       a {
           display: -webkit-box;
           display: -ms-flexbox;
           display: -webkit-flex;
           display: flex;
           cursor: pointer;
           text-decoration: none;
           color: #fff;
           margin-right: 2rem;


           span {      
               margin-right: 1rem;
               font-size: 1.2rem;
   
           }
       }

   }
`

const SecondaryNavbar = ({state, actions, setNavOpen, navOpen}) => {

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
            <p>"Together towards Sumaq Kawsay"</p>

            <div>
                <a href={myLink}>ENGLISH</a>
                <a href={linkSpanish}>ESPAÑOL</a>
                
                <a href="/searchbar">
                    <span>Search</span>
                    <FontAwesomeIcon css={css`font-size: 1.2rem;`}icon={faSearch}/>
                </a>
            </div>
                
        </ContainerNav >

     );
}
 
export default connect(SecondaryNavbar);