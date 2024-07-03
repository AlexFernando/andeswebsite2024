import React, {useEffect} from 'react';
import {connect, css, styled } from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import Link from "./Link";
import Loading from './Loading';
import Image from "@frontity/components/image";

export const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    padding: 1rem 2rem;

    :nth-of-type(odd){
        background-color: #eaeaea;
    }
    
    :nth-of-type(even){
        background-color: #fff;
    }

    @media(max-width: 768px) {
        padding: 3rem 1rem 1rem 1rem;
    }

        h1 {
            color: #44841a;
            text-align: center;
            font-size: 1.5rem;
            margin-top: 3rem;
        }

        a {
            text-decoration: none;
            color: #000;

            h3 {
                font-size: 1.2rem;
            }
        }

        p {
            font-size: 1.2rem;
            margin-bottom: 0rem;
            text-align: center;
        } 
`

export const SectionProjectText = styled.div` 
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin-top: 2rem;
    
    div {
        flex-basis: 45%;
        margin: 0 1rem;
    }

    @media(max-width: 768px) {
        flex-direction: column;
    }
`;


export const Images = styled(Image)`
    max-width: 100%;
    max-height: 100%;
`

const AnniversaryProjects = ({state, actions}) => {


    useEffect( () => {
            
        if(state.theme.lang === "en") {
            actions.source.fetch("/anniversary-projets")
            actions.source.fetch("/cardpersona/")
        }

        else {
            actions.source.fetch("/es-anniversary-projets")
            actions.source.fetch("/cardpersona/")
        }
    }, [])


    const pageAnnivProjets = state.theme.lang === "en" ? state.source.page[526] : state.source.page[491]

    const data = state.source.get('/cardpersona');

    let cardAnnivProjetsArr = [];

    if(data.isReady) {

        data.items.map(({id}) => { 
                
                if(state.theme.lang === "en") {

                    if(state.source.cardpersona[id].typeofcardpersona[0] === 37) {
                        cardAnnivProjetsArr.push(state.source.cardpersona[id])
                    }
                }

                else {
                    if(state.source.cardpersona[id].typeofcardpersona[0] === 38) {
                        cardAnnivProjetsArr.push(state.source.cardpersona[id])
                    }
                }
            }
        )
    }       

    console.log("cardAnniv: ", cardAnnivProjetsArr);


    return ( 
    
        <>
        {typeof pageAnnivProjets === "undefined" ? <Loading />
        
        :
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    {pageAnnivProjets.acf.title}
                </Title>
                <Separator></Separator>             
            </HeadContainer>

            <SectionContainer>
            
                    <h1>{pageAnnivProjets.acf.title_paragraph_one}</h1>              
                    <p> {pageAnnivProjets.acf.text_paragraph_one}</p>

                    <h1>{pageAnnivProjets.acf.title_paragraph_two}</h1>              
                    <p> {pageAnnivProjets.acf.text_paragraph_two}</p>
            
            </SectionContainer>

            {data.isReady ?
                    
                    <>
                        {cardAnnivProjetsArr.reverse().map( cardAnnivProjet => {

                            let arrayNames = cardAnnivProjet.acf.list_staff_names.split("*");
                            let arrayDescription = cardAnnivProjet.acf.list_staff_description.split("*");

                            arrayNames.shift();
                            arrayDescription.shift();
                        
                                return (

                                    <SectionContainer>
                                        <h1>{cardAnnivProjet.acf.area_division}</h1>
                                        <SectionProjectText>
                                            <div>
                                          
                                                {arrayNames.map( (item, index) => {
                                                    
                                                    return(
                                                        <Link href={arrayDescription[index]}><h3>{item}</h3></Link>
                                                                                                                
                                                    )

                                                })


                                                }
                                                

                                            </div>

                                            <div>
                                            {cardAnnivProjet.acf.image_card !== false ? 
            
                                                    <Images src={cardAnnivProjet.acf.image_card.sizes.medium_large} />


                                                : null
                                                
                                            }
                                            </div>
                                        </SectionProjectText>


                                    </SectionContainer>
                                )
                            })
                        }

                    </>
                    
                    : null

                }
           
        </MarginTopContainer>
        }
        </>
     );
}
 
export default connect(AnniversaryProjects);