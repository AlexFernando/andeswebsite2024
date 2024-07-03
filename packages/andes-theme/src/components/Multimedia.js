import React, {useEffect} from 'react';
import {connect, styled, css} from "frontity";
import {HeadContainer, Title, SubTitle, Separator} from './Filosofia';
import Image from "@frontity/components/image";
import Loading from './Loading';

const Multimedia = ({state, actions, libraries}) => {

    useEffect( () => {
        if(state.theme.lang === "en") {
            actions.source.fetch("/multimedia")
        }
   
        else {
            actions.source.fetch("/es-multimedia")
        }
    }, [])

    const Html2react = libraries.html2react.Component;

    const contentForm = state.theme.lang === "en" ? state.source.page[1551] : state.source.page[1336];


    return ( 

        <>
            {typeof contentForm === "undefined" ? <Loading /> 
                :
                <IpalacContainter>
                    <HeadContainer>
                            <Title>   <Html2react html={contentForm.title.rendered} /></Title>
                            <Separator></Separator>
                             
                    </HeadContainer>


                    <Content>

                        <SectionMargin>

                            <TitleSection>
                                {contentForm.acf.videos_title}
                            </TitleSection>

                            <SectionVideo>
                                {
                                    Object.keys(contentForm.acf.links_videos_multimedia).map( (elem, index) => {
                                        
                                        return(
                                            <ItemVideo>

                                                {
                                                    contentForm.acf.links_videos_multimedia[elem].link_video? 
                                                        <Html2react html={contentForm.acf.links_videos_multimedia[elem].link_video} />
                                                    : null
                                                }

                                                <h3>{contentForm.acf.links_videos_multimedia[elem].title}</h3>

                                            </ItemVideo>
                                        )
                                    })
                                }
                            </SectionVideo>

                        </SectionMargin>


                        <SectionMargin>

                            <TitleSection> {contentForm.acf.gallery_title}</TitleSection>

                            <ContainerGalleryGrid>
       
                                {
                                    Object.keys(contentForm.acf.gallery).map( (elem, index) => {
                                        
                                        return(

                                            <>
                                                {contentForm.acf.gallery.length > 0 ?

                                                    <GridGalleryItem>
                                                        <GridGalleryImage src={contentForm.acf.gallery[index].full_image_url}/>
                                                    </GridGalleryItem>

                                                    :null

                                                }
                                            </>
                                        )
                                    })
                                }
                                    
                            </ContainerGalleryGrid>
                        
                        </SectionMargin>


                  

                    </Content>




                </IpalacContainter>
            }
        </>
    );
}


const IpalacContainter = styled.div`
    
    margin-top: 14vh;

    @media(min-width: 768px) {
        margin-top: 20vh;
    }
`;

const Content = styled.div`
  
    margin-top: 2rem;
    text-align: center;
    width: min(98%, 77.5rem + 10vw);
    margin-left: auto;
    margin-right: auto;
    text-align: center; 
    

    @media (min-width: 1199px) and (max-width: 1440px){
        width: min(98%, 67.5rem + 10vw);
    }
`;

const TitleSection = styled.h1`
 
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: bold;
    color: #2b2b2b;
    margin-bottom: 3rem;
`

const SectionVideo = styled.div`

    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    @media(min-width: 1280px) {
        justify-content: space-between;
    }

`

const SectionMargin = styled.div`
    margin-top: 6rem;
    margin-bottom: 6rem;
`

const ItemVideo = styled.div`

    @media(min-width: 1280px) {
        flex-basis: 30%;
        margin-top: 4rem;
    }

    @media(max-width: 1280px) {
        margin-left: .5rem;
        margin-right: .5rem;
    }

    iframe {
        max-width: 100%;
    }

`

const ContainerGalleryGrid  = styled.div`    
    display: grid;
    grid-auto-rows: 200px;
    gap: 1rem;
    grid-auto-flow: row dense;

    @media all and (min-width: 320px) {
        grid-template-columns: repeat(1, 1fr);
    }

    @media all and (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media all and (min-width: 1024px) {
        grid-template-columns: repeat(6, 1fr);
    }
`

// GridGalleryItem styled component
const GridGalleryItem = styled.div`
  &:nth-child(11n+1) {
    grid-column: span 1;
  }

  &:nth-child(11n+4) {
    grid-column: span 2;
    grid-row: span 1;
  }

  &:nth-child(11n+6) {
    grid-column: span 3;
    grid-row: span 2;
  }

  &:nth-child(11n+7) {
    grid-column: span 1;
    grid-row: span 2;
  }

  &:nth-child(11n+8) {
    grid-column: span 2;
    grid-row: span 2;
  }

  &:nth-child(11n+9) {
    grid-column: span 3;
    grid-row: span 3;
  }
`;

const GridGalleryImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
    
export default connect(Multimedia);