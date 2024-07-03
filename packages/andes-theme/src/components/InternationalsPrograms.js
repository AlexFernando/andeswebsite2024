import React, {useEffect} from 'react';
import {connect} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import {SectionContainer, CardsContainer, Card, ImagePotatoPark} from './potatoPark'
import {readMore} from './Root'

//handle image size according to size screen
import CardFeaturedImage from './CardFeatureImage';

const InternationalPrograms = ({state, actions}) => {

    useEffect( () => {
        
        if(state.theme.lang === "en") {
            actions.source.fetch("/internationalprogramsandnetworks")
        }

        else {
            actions.source.fetch("/es-internationalprogramsandnetworks")
        }
    }, [])

  
    const pageInternationalPark = state.theme.lang === "en" ? state.source.page[334] : state.source.page[313]

    const data = state.source.get('/cardimage');

    let cardImagesArr = [];

    
    if(data.isReady) {
        
        data.items.map(({id}) => { 
                
                if(state.theme.lang === "en") {
                    if(state.source.cardimage[id].filterbypage[0] === 30) {
                        cardImagesArr.push(state.source.cardimage[id])
                    }
                }

                else {
                    if(state.source.cardimage[id].filterbypage[0] === 31) {
                        cardImagesArr.push(state.source.cardimage[id])
                    }
                }
            }
        )
    }


    return ( 

        <>
        {typeof pageInternationalPark === "undefined" ? <Loading />
        :

        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    {pageInternationalPark.acf.title}
                </Title>
                <Separator></Separator>
                <SubTitle>
                    {pageInternationalPark.acf.subtitle}
                </SubTitle>
              
            </HeadContainer>

            <SectionContainer>
                <p>{pageInternationalPark.acf.main_text}</p>

                 
                <CardsContainer>
                    {data.isReady ?  
                        <>
                            {cardImagesArr.reverse().map( cardImages => {
                                
                                return(

                                    <Card>
                                        <CardFeaturedImage  media = {cardImages.acf.image_card.sizes} />
                                        {/* <ImagePotatoPark src={cardImages.acf.image_card.sizes.medium_large}/> */}
                                        
                                        <h3>{cardImages.title.rendered}</h3>
                                        <p dangerouslySetInnerHTML={{ __html: cardImages.excerpt.rendered}}>
                                    
                                        </p>

                                        <a href={  cardImages.acf.link_card} target="_blank" rel="noopener noreferrer">{readMore}</a>                                        
                                    </Card>
                                )
                            })}

                        </>
                        
                        : null
                    }
                </CardsContainer>
            </SectionContainer>
        </MarginTopContainer>
        }
        </>
    );
}
 
export default connect(InternationalPrograms);