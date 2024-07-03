import React, {useEffect} from 'react';
import {connect, css, styled } from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import {SectionText} from './HomePage';
import {TextContainer} from './Stuff';
import Loading from './Loading';
import Image from "@frontity/components/image";

export const SectionImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem 0 0;

    &:nth-child(odd) {
        background-color: #eaeaea;
    }

    &:nth-child(even) {
        background-color: #fff;
    }

    @media(max-width: 768px) {
        flex-direction: column;
        padding: 0;
    }
`;

export const Images = styled(Image)`
    max-width: 100%;
    max-height: 100%;
`

const AnniversayPeople = ({state, actions}) => {


    useEffect( () => {
            
        if(state.theme.lang === "en") {
            actions.source.fetch("/aniversariopersonas")
            actions.source.fetch("/cardpersona/")
        }

        else {
            actions.source.fetch("/es-aniversariopersonas")
            actions.source.fetch("/cardpersona/")
        }
    }, [])


    const pageAnnivPeople = state.theme.lang === "en" ? state.source.page[503] : state.source.page[489]

    const data = state.source.get('/cardpersona');

    let cardAnnivPeopleArr = [];

    if(data.isReady) {

        data.items.map(({id}) => { 
                
                if(state.theme.lang === "en") {

                    if(state.source.cardpersona[id].typeofcardpersona[0] === 36) {
                        cardAnnivPeopleArr.push(state.source.cardpersona[id])
                    }
                }

                else {
                    if(state.source.cardpersona[id].typeofcardpersona[0] === 37) {
                        cardAnnivPeopleArr.push(state.source.cardpersona[id])
                    }
                }
            }
        )
    }       

    console.log("cardAnniv: ", cardAnnivPeopleArr);

    return ( 

        <>
        {typeof pageAnnivPeople === "undefined" ? <Loading />
        
        :
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    {pageAnnivPeople.acf.title}
                </Title>
                <Separator></Separator>
            </HeadContainer>

            <SectionText>
            <div>  
                <h1>{pageAnnivPeople.acf.title_paragraph_one}</h1>              
                <p> {pageAnnivPeople.acf.text_paragraph_one}
                </p>
            </div>
            </SectionText>

            <SectionText>
            <div>  
                <h1>{pageAnnivPeople.acf.title_paragraph_two}</h1>              
                <p> {pageAnnivPeople.acf.text_paragraph_two}
                </p>
            </div>
            </SectionText>

            

            {data.isReady ?
                    
                    <>
                        {cardAnnivPeopleArr.reverse().map( cardAnnivPeople => {

                            let arrayNames = cardAnnivPeople.acf.list_staff_names.split("*");
                            let arrayProfession = cardAnnivPeople.acf.list_staff_profession.split("*");
                            let arrayDescription = cardAnnivPeople.acf.list_staff_description.split("*");

                            arrayNames.shift();
                            arrayDescription.shift();
                            arrayProfession.shift();

                                return (

                                    <SectionImage>
                                        <SectionText>
                                            <div>
                                                <h2>{cardAnnivPeople.acf.area_division}</h2>
                                                <TextContainer>
                                                {arrayNames.map( (item, index) => {
                                                    
                                                    return(
                                                    
                                                            <>
                                                                <h3>{item} <span> - {arrayProfession[index]}</span></h3> 
                                                                {arrayDescription.length > 0 ?
                                                                    <p>{arrayDescription[index]}</p>
                                                                    : null
                                                                }
                                                            </>
                                                    )

                                                })


                                                }
                                                </TextContainer>
                                                

                                            </div>
                                        </SectionText>
                                        {cardAnnivPeople.acf.image_card !== false ? 
            

                                                <Images src={cardAnnivPeople.acf.image_card.sizes.medium_large} />

                                    
                                            : null

                                        }

                                    </SectionImage>
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
 
export default connect(AnniversayPeople);