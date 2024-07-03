import React, {useEffect} from 'react';
import {connect, styled, css} from "frontity";

import Loading from './Loading';

const stayInTouch = ({state, actions, libraries}) => {

    useEffect( () => {
        if(state.theme.lang === "en") {
            actions.source.fetch("/contact-footer")
        }
   
        else {
            actions.source.fetch("/es-contact-footer")
        }
    }, [])

    const Html2react = libraries.html2react.Component;

    const contentForm =  state.theme.lang === "en" ? state.source.page["806"] : state.source.page["730"];

    return ( 

        <>
            {typeof contentForm === "undefined" ? <Loading /> 
                :
                <Content>
                    <Html2react html={contentForm.content.rendered} />
                </Content>
            }
        </>
    );
}
 
const Content = styled.div`

    font-size: 1.5rem;
    margin-top: 2rem;

    input, textarea {
        margin-top: .5rem;
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
        
        background-color: #f4623a;
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
            background-color: #ee3e0d;
            transition: all 0.4s;
        }
    }
`;




export default connect(stayInTouch);