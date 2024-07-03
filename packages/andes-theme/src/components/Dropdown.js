import React, { useEffect, useRef } from "react";
import {styled} from "frontity";
import {Border} from './Menu';
import LinkMenu from "./LinkMenu";
import Image from "@frontity/components/image";

const DropDownBox = styled.div`  
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1 0 100%; /**new line */
    width: 100%;
    top: 12vh;
    z-index: 5;

  @media(min-width: 319px) and (max-width: 361px) {
    justify-content: center;
  }
 
  @media(min-width: 768px) {
 
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    position: fixed;
    
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
        -ms-flex-direction: row;
            flex-direction: row;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
          justify-content: flex-start;
    -webkit-box-align: center;
    -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    margin-top: 0;

    top: 18vh;
  }


`

export const VerticalBorder = styled.div `
  
  @media(min-width: 768px){ 
    border-left: 1px solid #808080;
    margin-left: 2rem;
  }
`

const ListContainer = styled.ul`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex: 1 0 100%;
  
 
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;  
  text-decoration: none;
  padding-left: 0;

  @media(min-width: 768px){ 
    padding-left: 4rem;
  }
`

const ListStyle = styled.li`
  list-style: none;
  font-weight: 300;
  margin: 1rem 0 1rem 2rem;

  @media(min-width: 768px){
    margin: 0;
  }

  &:first-of-type {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
`
const ImageStyle = styled(Image)`
  
  display:none;
  
  @media(min-width: 768px) {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      height:140px; 
      width: 220px;
      padding: 2rem;
      margin-left: 3rem;
  }
`

const ButtonStyled = styled.button`
    background-color: #fff;
    border: none;
    color: #000;
    font-size: 1rem;
`;

const Dropdown = ({ navOpen, setNavOpen, open, setOpen, hoverOpen, setHoverOpen, hoverOpenResearch, setHoverOpenResearch, options=null, secondTitle =null, options2 = null, ImageNav = null, thirdTitle =null, options3 = null}) => {

  let titleOptions = options.shift();

  const node = useRef();

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      console.log("inside click")
      return;
    }
    // outside click
    setOpen(false);
    setHoverOpen(false);
  };

   
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (

    <DropDownBox ref={node}>
      
      {(open || hoverOpen) && (
        <>
          <ImageStyle src={ImageNav} />

          <VerticalBorder>
            <ListContainer>

              <ListStyle key={titleOptions}>
                    {titleOptions}
              </ListStyle>
         
              {options.map(opt => (
                    <>
                      <ListStyle key={opt}>
                        <ButtonStyled onClick={() => {setOpen(false); setNavOpen(false);}}><LinkMenu href={`/${opt.toLowerCase().replace(/\s/g, "")}`}>{opt}</LinkMenu></ButtonStyled>
                      </ListStyle>
                      <Border />
                    </>
                ))}
            </ListContainer>
          </VerticalBorder>
          
                {options2 ? 
                  <VerticalBorder>
                    <ListContainer>
                              <ListStyle key={secondTitle}>
                                {secondTitle}
                              </ListStyle>
                        {options2.map(opt2 => (
                              <>
                              <ListStyle key={opt2}>
                                <ButtonStyled onClick={() => {setOpen(false); setNavOpen(false);}}>
                                  <LinkMenu href={`/${opt2.toLowerCase().replace(/\s/g, "")}`}>{opt2}</LinkMenu>  
                                </ButtonStyled>                                
                              </ListStyle>
                              <Border />
                              </>
                        ))}
                    </ListContainer>
                    
                  </VerticalBorder> 
                
                  : null  
                }

                {options3 ? 
                  <VerticalBorder>
                    <ListContainer>
                              <ListStyle key={thirdTitle}>
                                {thirdTitle}
                              </ListStyle>
                        {options3.map(opt3 => (
                              <>
                              <ListStyle key={opt3}>
                                <ButtonStyled onClick={() => {setOpen(false); setNavOpen(false);}}>
                                  <LinkMenu href={`/${opt3.toLowerCase().replace(/\s/g, "")}`}>{opt3}</LinkMenu>  
                                </ButtonStyled>                                
                              </ListStyle>
                              <Border />
                              </>
                        ))}
                    </ListContainer>
                    
                  </VerticalBorder> 
                
                  : null  
                }
        </>  
      )}
    </DropDownBox>
  );
};

export default Dropdown;
