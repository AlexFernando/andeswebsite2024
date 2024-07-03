import React, {useEffect} from 'react';
import {connect, styled} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import {ContainerBlocks, BlockInfo, ImageIntership} from './Pasantias';
import {SectionContainer, MainParagraph} from './potatoPark';
import Loading from './Loading';

// font awesome icons
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIconList} from './TerritoriosCulturales'

//handle image size according to size screen
import CardFeaturedImage from './CardFeatureImage';

const SpanStyled = styled.span`
    font-style: italic;
    font-weight: 700;
    margin-right: .5rem;
`;

const Cursos = ({state, actions}) => {

    useEffect( () => {
            
        if(state.theme.lang === "en") {
            actions.source.fetch("/courses")
            actions.source.fetch("/cardintership/")
        }

        else {
            actions.source.fetch("/es-courses")
            actions.source.fetch("/cardintership/")
        }
    }, [])


    const pageCourses = state.theme.lang === "en" ? state.source.page[423] : state.source.page[413]

    const data = state.source.get('/cardintership');

    let cardCoursesArr = [];

    if(data.isReady) {

        data.items.map(({id}) => { 
                
                if(state.theme.lang === "en") {

                    if(state.source.cardintership[id].typeofintershipcard[0] === 31) {
                        cardCoursesArr.push(state.source.cardintership[id])
                    }
                }

                else {
                    if(state.source.cardintership[id].typeofintershipcard[0] === 32) {
                        cardCoursesArr.push(state.source.cardintership[id])
                    }
                }
            }
        )
    }

    return ( 

        <>
        {typeof pageCourses === "undefined" ? <Loading />
        
        :

        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    {pageCourses.acf.title}
                </Title>
                <Separator></Separator>
                <SubTitle>
                    {pageCourses.acf.subtitle}
                </SubTitle>
                
            </HeadContainer>

            <SectionContainer>
                <MainParagraph>
                    {pageCourses.acf.main_text}    
                </MainParagraph>
            
            </SectionContainer>

            <ContainerBlocks>

            {data.isReady ?
                    
                    <>
                        {cardCoursesArr.reverse().map( cardIntership => {

                            let arrayParagraphs = cardIntership.acf.list_paragraphs.split("*");
                            let arrayTitles = cardIntership.acf.title_list.split("*");

                            if(arrayParagraphs.length > 1) {
                                arrayParagraphs.shift()
                            }

                            if(arrayTitles.length > 1) {
                                arrayTitles.shift()
                            }
                        
                            return(

                                <BlockInfo>
                                    <div>
                                        <h2>{cardIntership.acf.title}</h2>

                                        {
                                            arrayParagraphs.map( (item, index) => {
                      
                                                return (
                                                    <li><FontAwesomeIconList icon={faArrowAltCircleRight}/><SpanStyled>{arrayTitles[index]}</SpanStyled> {item}</li> 
                                                )
                         
                                            })
                                        }
                                        
                                    </div>
                                    
                                    
                                    {/* <ImageIntership src={cardIntership.acf.image_card.sizes.medium}/> */}

                                
                                    <CardFeaturedImage  media = {cardIntership.acf.image_card.sizes} elem = "courses"/>
                                    
                                </BlockInfo>
                            )
                        })}

                    </>
                    
                    : null

                }
            </ContainerBlocks>
        </MarginTopContainer>
        }
        </>
    );
}
 
export default connect(Cursos);