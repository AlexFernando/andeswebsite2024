import React from "react";
import { connect, styled } from "frontity";

const Anchor = styled.a`
  display: flex;
    justify-content: center;
    background-color: #f07723 ;
    align-items: center;
    padding: 1rem ;
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
        margin-bottom: 0rem;
    }

    &:hover {
        background-color: #F05523;
        transition: all 0.4s;
    }
`;

const LinkButtonHome = ({ href, actions, children }) => {
  return (

      <Anchor
        href={href}
        onClick={event => {
          event.preventDefault();
          actions.router.set(href);
        }}
      >
        {children}
      </Anchor>

  );
};

export default connect(LinkButtonHome);