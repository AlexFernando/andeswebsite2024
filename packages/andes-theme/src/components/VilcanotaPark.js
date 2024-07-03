import React, {useEffect} from 'react';
import {connect} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import {SectionContainer, CardsContainer, Card, ImagePotatoPark} from './potatoPark'
import Loading from './Loading';
import {readMore} from './Root';
//handle image size according to size screen
import CardFeaturedImage from './CardFeatureImage';

const VilcanotaPark = ({state, actions}) => {

    useEffect( () => {
        
        if(state.theme.lang === "en") {
            actions.source.fetch("/spiritualpark-vilcanota")
        }

        else {
            actions.source.fetch("/es-spiritualpark-vilcanota")
        }
    }, [])

  
    const pageVilcanotaPark = state.theme.lang === "en" ? state.source.page[332] : state.source.page[311]

    const data = state.source.get('/cardimage');

    let cardImagesArr = [];

    
    if(data.isReady) {
        
        data.items.map(({id}) => { 
                
                if(state.theme.lang === "en") {
                    if(state.source.cardimage[id].filterbypage[0] === 29) {
                        cardImagesArr.push(state.source.cardimage[id])
                    }
                }

                else {
                    if(state.source.cardimage[id].filterbypage[0] === 30) {
                        cardImagesArr.push(state.source.cardimage[id])
                    }
                }
            }
        )
    }

    return ( 
        <>
        {typeof pageVilcanotaPark === "undefined" ? <Loading />
        :
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    {pageVilcanotaPark.acf.title}
                </Title>
                <Separator></Separator>
                <SubTitle>
                    {pageVilcanotaPark.acf.subtitle}
                </SubTitle>
              
            </HeadContainer>

            <SectionContainer>

                <p>{pageVilcanotaPark.acf.main_text}</p>

                <p>{pageVilcanotaPark.acf.paragraph_1}</p>
                 
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

                                        <a href={  cardImages.acf.link_card} target="_blank" rel="noopener noreferrer" >{readMore}</a>
                                        
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
 
export default connect(VilcanotaPark);