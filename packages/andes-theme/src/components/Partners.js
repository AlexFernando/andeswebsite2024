import React, {useEffect} from 'react';
import {connect, css, styled } from "frontity";
import {HeadContainer, MarginTopContainer} from './Filosofia';
import Loading from './Loading';
import Image from "@frontity/components/image";

const Partners = ({state, actions, libraries}) => {

    useEffect( () => {
            
        if(state.theme.lang === "en") {
            actions.source.fetch("/partners/")
        }

        else {
            actions.source.fetch("/es-partners")
        }
    }, [])


    const Html2react = libraries.html2react.Component;

    const pagePartners = state.theme.lang === "en" ? state.source.page[1288] : state.source.page[1080];


    return ( 
        <>
        {typeof pagePartners === "undefined" ? <Loading />
        
        :

            <>
                <MarginTopContainer>
                    <HeadContainer>
                        <Title>
                            <Html2react html={pagePartners.title.rendered} />
                        </Title>
                        <Separator></Separator>
                        
                    </HeadContainer>
                </MarginTopContainer>

                <SectionImagesPartners>

                    {
                        Object.keys(pagePartners.acf.logo_partners).map( (elem, index) => {
                            return(
                        

                                <ImagePartnerContainer key={index}>
                                <a href={pagePartners.acf.logo_partners[elem].url} target="_blank">
                                    <ImagePartner src={pagePartners.acf.logo_partners[elem].full_image_url}/>
                                </a>
                                </ImagePartnerContainer>
                            )
                    
                        })
                    }

                </SectionImagesPartners>

            </>
            }
        </>
    );
}
 
export default connect(Partners);

const Title = styled.h2`

    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 2px;
    margin: 5rem 0 1rem 0;
    text-transform: capitalize;
    text-align: center;
 
    @media(min-width: 768px) {
        font-size: 2.5rem;
    }
`
const Separator = styled.span`
    display: block;
    width: 6rem;
    height: 12px;
    /* margin-top: .5rem; */
    margin-bottom: 2rem;
    margin-right: auto;
    margin-left: auto;
    border-radius: 20px;
    background-color: #44841a;

    @media(max-width: 768px) {
        width: 3rem;
        height: 8px;
    }
`

const SectionImagesPartners = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: stretch;
    width: min(98%, 77.5rem + 10vw);
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;

    @media (min-width: 1199px) and (max-width: 1440px){
        width: min(98%, 67.5rem + 10vw);
    }

    @media (max-width: 767px) { /* Add media query for small screens */
        justify-content: center; /* Center the items on small screens */
    }
`
const ImagePartnerContainer = styled.div`
    display: flex;
    align-items: center;
    /* flex-direction: column;
    justify-content: space-between;
    align-items: center; */
    margin: 2rem;
    padding: 1rem;
    transition: background-color 0.3s ease; /* Smooth transition for the background color */
    border-radius: 5px;
    
    &:hover {
        background-color: #f2f2f2; /* Gray background color on hover */
        cursor: pointer;
    }


    h3{
        font-size: 1rem;
    }
`

const ImagePartner = styled(Image)`
    max-width: 100%;
    height: auto;
`