import React, {useEffect} from 'react';
import {connect, styled, css} from "frontity";
import {HeadContainer, Title, SubTitle, Separator} from './Filosofia';
import Image from "@frontity/components/image";
import Loading from './Loading';

const stayInTouch = ({state, actions, libraries}) => {

    useEffect( () => {
        if(state.theme.lang === "en") {
            actions.source.fetch("/ipalac")
        }
   
        else {
            actions.source.fetch("/es-ipalac")
        }
    }, [])

    const Html2react = libraries.html2react.Component;

    const contentForm = state.theme.lang === "en" ? state.source.page[1386] : state.source.page[1177];


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
                                {contentForm.acf.video_section_title}
                            </TitleSection>

                            <SectionVideo>
                                {
                                    Object.keys(contentForm.acf.video_group).map( (elem, index) => {
                                        
                                        return(
                                            <ItemVideo>
                                                {
                                                    contentForm.acf.video_group[elem].video_link? 
                                                        <Html2react html={contentForm.acf.video_group[elem].video_link} />
                                                    : null
                                                }

                                                <h3>{contentForm.acf.video_group[elem].video_title}</h3>

                                            </ItemVideo>
                                        )
                                    })
                                }
                            </SectionVideo>

                        </SectionMargin>

                        <SectionMargin>

                            <TitleSection>
                                {contentForm.acf.docs_title_section}
                            </TitleSection>


                            <SectionPublications>
                                {
                                    Object.keys(contentForm.acf.docs_group).map( (elem, index) => {
                                        
                                        return(

                                            <>
                                                {contentForm.acf.docs_group[elem].image_doc?

                                                    <PublicationCard>

                                                        <a href={contentForm.acf.docs_group[elem].link_doc} target="_blank" rel="noopener noreferrer">
                                                            <h3>{contentForm.acf.docs_group[elem].title_doc}</h3>

                                                            {contentForm.acf.docs_group[elem].image_doc.sizes?
                                                                <Image src={contentForm.acf.docs_group[elem].image_doc.sizes.large} alt={contentForm.acf.docs_group[elem].image_doc.alt} />

                                                                : null
                                                            }
                                                        </a>

                                                    </PublicationCard>

                                                    :null

                                                }
                                            </>
                                        )
                                    })
                                }
                            </SectionPublications>

                        </SectionMargin>

                        <SectionMargin>

                            <TitleSection> {contentForm.acf.gallery_section_title}</TitleSection>

                            <ContainerGalleryGrid>
       
                                {
                                    Object.keys(contentForm.acf.gallery_projet).map( (elem, index) => {
                                        
                                        return(

                                            <>
                                                {contentForm.acf.gallery_projet.length > 0 ?

                                                    <GridGalleryItem>
                                                        <GridGalleryImage src={contentForm.acf.gallery_projet[index].full_image_url}/>
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
    justify-content: space-between;
    flex-wrap: wrap;
`

const SectionMargin = styled.div`
    margin-top: 6rem;
    margin-bottom: 6rem;
`

const ItemVideo = styled.div`

    iframe {
        max-width: 100%;
    }

`

export const SectionPublications = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0rem 2rem 1rem 2rem;
    align-items: stretch;
`;

export const PublicationCard = styled.div`
    display: flex;
    margin-top: 3rem;
    margin-left: 1%;
    margin-right: 1%;
    flex-basis: 20%;
    cursor: pointer;
    box-shadow: 0 .8px 5px .8px grey;
    border-radius: .5rem;
    align-items: stretch;
    padding: 1%;


    @media(max-width: 768px) {
        flex-basis: 100%;
    }

    &:hover{
        background-color: #dbdbdb;
    }

    a {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    h3 {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            color: #000;

            @media(max-width: 768px) {
                font-size: .9rem;
            }
        }
    
    img {
        height: 30vh;
        max-width: 100%;
    }

`;

const ContainerGallery = styled.div`
  a {
      text-decoration: none;
      color:#fff;
      font-size: .9rem;
  }
`

const ImageGallery = styled(Image)`
    max-width: 100%;
    height: 50vh;
`

const LinkGallery = styled.button`
    background-color: #44841a;
    color: #fff;
    padding: 5px 8px;
    width: 120px; /* Set the width of the container */
    height: 40px; /* Set the height of the container */
    
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
    
export default connect(stayInTouch);