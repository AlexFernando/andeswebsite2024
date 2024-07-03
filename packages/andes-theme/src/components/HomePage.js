import React from 'react';
import {connect, styled } from "frontity";
import {MarginTopContainer} from './Filosofia';
import Link from './Link';
import Loading from './Loading';
import {readMore, getMore, explore, learn} from './Root'

//handle image size according to size screen
import CardFeaturedImage from './CardFeatureImage';

import Hero from './HeroComponent'

const HomePage = ({state, actions, libraries}) => {

    const pageHome = state.source.page[69];

    const data = state.source.get('/cardimage');

    let cardImagesArr = [];

    const images = [];

    let arrayOfIndexCard = [];

    if(typeof pageHome !== "undefined"){
        
        const ImageSlider = pageHome.acf.images_slider;

        Object.keys(ImageSlider).map(elem => {
            images.push(ImageSlider[elem].url)
        })   

        arrayOfIndexCard.push(...[pageHome.acf.card_image_25people.ID, pageHome.acf.card_image_fimi.ID, pageHome.acf.card_image_25projets.ID, pageHome.acf.card_image_25publications.ID, pageHome.acf.card_image_home_news.ID, pageHome.acf.card_image_home_event.ID, pageHome.acf.card_image_home_publication.ID]);
    }
  

    if(data.isReady) {
        if(state.theme.lang === "en") {
            for (let i = 0; i < arrayOfIndexCard.length; i++) {
             
                    cardImagesArr.push(state.source.cardimage[arrayOfIndexCard[i]])
                 
            }
        }

        else {
            for (let i = 0; i < arrayOfIndexCard.length; i++) {
             
                cardImagesArr.push(state.source.cardimage[arrayOfIndexCard[i]])
             
        }
        }

        // data.items.map(({id}) => { 
        //         if(state.theme.lang === "en") {
        //             if(state.source.cardimage[id].filterbypage[0] === 25) {
        //                 cardImagesArr.push(state.source.cardimage[id])
        //             }
        //         }

        //         else {
        //             if(state.source.cardimage[id].filterbypage[0] === 26) {
        //                 cardImagesArr.push(state.source.cardimage[id])
        //             }
        //         }    
        //     }
        // )

        console.log(cardImagesArr);
    }

    console.log("my data: " , data)


   
    return (        
        <>
            {typeof pageHome === "undefined" ? <Loading /> : 
            <>
         
            <MarginTopContainer></MarginTopContainer>
                <Main>
                    <Overlay>
                        <Hero images = {images}/>

                        <TextoImagenContainer>
                        <TextoImagen >
                            <h1 dangerouslySetInnerHTML={ {__html: pageHome.acf.home_title}}></h1>
                            <p dangerouslySetInnerHTML={ {__html: pageHome.acf.home_slogan}}></p>
                            <div>
                                <a href={pageHome.acf.home_button_getmore} target="_blank">{getMore}</a>
                            </div>           
                        </TextoImagen>
                        </TextoImagenContainer>
                    </Overlay>
                </Main>
                {/* <Content background = {pageHome.acf.image_background.sizes}> 
                    <TextoImagen >
                        <h1 dangerouslySetInnerHTML={ {__html: pageHome.acf.home_title}}></h1>
                        <p dangerouslySetInnerHTML={ {__html: pageHome.acf.home_slogan}}></p>
                        <div>
                            <a href={pageHome.acf.home_button_getmore} target="_blank">{getMore}</a>
                        </div>           
                    </TextoImagen>
                </Content> */}
          
            <SectionText>
                <div>  
                    <h1>{pageHome.acf.section2_title}</h1>              
                    <p>
                        {pageHome.acf.section2_textcontent}
                    </p>

                    <div>
                        {/* <Link href={pageHome.acf.section1_button_explore}>{explore}</Link> */}
                        <a href={pageHome.acf.section2_button_explore} target="_blank" rel="noopener noreferrer" >{explore}</a>
                    </div>
                </div>
                <div>  
                    <h1>{pageHome.acf.section1_title}</h1>              
                    <p>
                        {pageHome.acf.section1_textcontent}
                    </p>

                    <div>
                        {/* <Link href={pageHome.acf.section1_button_explore}>{explore}</Link> */}
                        <a href={pageHome.acf.section1_button_explore} target="_blank" rel="noopener noreferrer" >{explore}</a>
                    </div>
                </div>
            </SectionText>

        <SectionHomePage>
            
            <CardsHomeContainer>
                {data.isReady ?
                    
                        <>
                        {cardImagesArr.slice(0,4).map( cardImages => {
                            

                            return(

                            <CardsHome>
                                <div>
                                    <CardFeaturedImage media={cardImages.acf.image_card.sizes} alt = "homecards"/>
                                </div>
                        
                                <h2>{cardImages.title.rendered}</h2>
                                        
                                <span dangerouslySetInnerHTML={{ __html: cardImages.excerpt.rendered}}>
                            
                                </span>

                                <div>
                                    {/* <Link href={  cardImages.acf.link_card} >{readMore}</Link> */}
                                    <a href={  cardImages.acf.link_card} target="_blank" rel="noopener noreferrer" >{readMore}</a>
                                </div>
            
                            </CardsHome>
                            )
                        })}

                        </>
                    : null

                }
            </CardsHomeContainer>

            </SectionHomePage>       

            <SectionText>
            <div>  
                <h1>{pageHome.acf.section31_title}</h1>              
                <p>
                    {pageHome.acf.section31_textcontent}
                </p>
                
                <div>
                    <Link href={pageHome.acf.section31_button_learn}>{learn}</Link>
                </div>
            </div>

            <div>  
                <h1>{pageHome.acf.section32_title}</h1>              
                <p>
                    {pageHome.acf.section32_textcontent}
                </p>
                <div>
                    <Link href={pageHome.acf.section32_button_learn}>{learn}</Link>
                </div>
            </div>
        </SectionText>

        <SectionHomePage>

        <CardsHomeContainer>
            {data.isReady ?    
                    <>
                    {cardImagesArr.slice(4,7).map( cardImages => {
                        
                        return(

                        <CardsHome>
                        <div>
                            <CardFeaturedImage  media = {cardImages.acf.image_card.sizes} alt = "homecards"/>
                            <strong>{cardImages.acf.tag_card}</strong>
                        </div>
                
                        <h2>{cardImages.title.rendered}</h2>
                                
                                <span dangerouslySetInnerHTML={{ __html: cardImages.excerpt.rendered}}>
                              
                                </span>
                        <div>
                            <a href={  cardImages.acf.link_card} target="_blank" rel="noopener noreferrer" >{readMore}</a>
                        </div>
    
                </CardsHome>
                        )
                    })}

                    </>
                : null

            }
            </CardsHomeContainer>
            </SectionHomePage>       
            </>
            } 
        </>
    )
}
 
export default connect(HomePage);

const Content = styled.div`  
    background-image:
    url(${props => props.background.large});
    background-repeat: no-repeat;
    background-size: cover;
    background-position:center center;
`


/**BACKGROUND VIDEO */  
export const Main = styled.section`

  height: 750px;
  position: relative;

  @media (max-width: 576px){
    height: 700px;
    }

    @media (min-width: 576px) and (max-width: 968px){
        height: 750px;
    }

    @media (min-width: 968px) and (max-width: 1440px){
        height: 550px;
    }  
`

export const Overlay = styled.div`

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    font-family: 'Lato';
    /* background-image: linear-gradient(180deg, rgba(0,0,0,.5)  0%, rgba(200,139,0, 0.5) 100%);*/
    background-image: linear-gradient(180deg, #000000D4 25%, #00000000 60%);
    background-repeat: no-repeat;

    @media(max-width: 768px) {
        height: 600px;
    }
`

const TextoImagenContainer = styled.div`
    color: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    overflow-wrap: break-word;
    height: 100%;

    @media (max-width: 480px) {
        height: 100%;
    }

    @media (min-width: 481px) and (max-width: 1024px) {
        height: 100%;
    }
`

const TextoImagen = styled.div`
    /* background-image: linear-gradient(to top, rgba(34,49,63, .5), rgba(34, 49, 63, .6));
    color: #FFF;
    display: flex;
    padding: 1.5rem;
    flex-direction: column;
    justify-content: space-between;
    align-content: flex-start;
    overflow-wrap: break-word;
    height: auto;

    @media(min-width: 768px) {
     
        padding: 10rem;
    } */

    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;

    @media(min-width: 1468px) {
        align-items: center;
    align-content: center;
        margin-top: 5rem;
    }
  



    h1 {
        text-transform: uppercase;
        font-size: 2rem;
        letter-spacing: 4px;
        text-align: center;
        margin-right: .5rem;
        margin-left: .5rem;

        @media(min-width: 768px) {
            font-size: 3.5rem;
            font-size: 2.5rem;
            margin-top: 4rem;
        }
    }

    p {
     
        font-size: 1.2rem;
        margin-top: 0;
        line-height: 1.8;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
        max-width: 50%;

        @media(max-width: 1468px) {
            max-width: 80%;
        }

        @media(min-width: 768px) {
            font-size: 1.4rem;
           
        }

        @media(max-width: 768px) {
            max-width: 100%;
        }
    }

    div {

        display: flex;
        justify-content: center;
        align-items: center;

        @media(min-width: 1468px) {
            margin-top: 10rem;
        }

        @media(max-width: 1468px) {
            margin-top: 4rem;
        }

        @media(max-width: 768px) {
            margin-top: 8rem;
        }


      

        a {
            text-decoration: none;
            background-color: #f07723;
            text-transform: uppercase;
            color: #fff;
            padding: 1.2rem 2.2rem;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 2rem;
            font-weight: 700;
            font-size: 1.2rem;

            &:hover {
                background-color: #F05523;
                transition: all 0.4s;
            }
        }

    }    
`

export const SectionText = styled.div`

    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
   -webkit-box-pack: center;
       -ms-flex-pack: center;
           -webkit-justify-content: center;
           justify-content: center;
   -webkit-box-align: center;
       -ms-flex-align: center;
           -webkit-align-items: center;
           align-items: center;
    padding: 3rem 2rem 1rem 2rem;

    @media(max-width: 768px) {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
        -webkit-flex-direction: column;
                flex-direction: column;
        padding: 3rem 1rem 1rem 1rem;
    }

   div {
       display: -webkit-box;
       display: -ms-flexbox;
       display: -webkit-flex;
       display: flex;
       -webkit-box-pack: center;
           -ms-flex-pack: center;
       -webkit-justify-content: center;
               justify-content: center;
       -webkit-box-align: center;
           -ms-flex-align: center;
        -webkit-align-items: center;
               align-items: center;
       -webkit-box-orient: vertical;
       -webkit-box-direction: normal;
           -ms-flex-direction: column;
       -webkit-flex-direction: column;
               flex-direction: column;
       /* padding: 1rem 2rem 1rem 2rem; */
       flex-basis: 50%;

       @media(max-width: 768px) {
           padding: 1rem;
       }

       h1, h2 {
           color: #44841a;
           text-align: center;
       }

       p {
           color: #545454;
           font-size: 1.2rem;
           margin-bottom: 1rem;
           text-align: center;
       }  


       div {
           display: -webkit-box;
           display: -ms-flexbox;
           display: -webkit-flex;
           display: flex;
           -webkit-box-pack: center;
               -ms-flex-pack: center;
           -webkit-justify-content: center;
                   justify-content: center;
           -webkit-box-align: center;
               -ms-flex-align: center;
           -webkit-align-items: center;
                   align-items: center;
       
           a {
               text-decoration: none;
               background-color: #f07723;
               text-transform: uppercase;
               color: #fff;
               padding: 1rem;
               border-radius: 10px;
               text-align: center;
               margin-bottom: 2rem;
               font-weight: 700;
           }
       }
   }
`;

const SectionHomePage = styled.div` 
    background-color: #eaeaea;
`;

const CardsHomeContainer = styled.div`
    
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: center;
        -ms-flex-pack: center;
    -webkit-justify-content: center;
            justify-content: center;
    
    -webkit-box-align: center;
        -ms-flex-align: center;
    -webkit-align-items: center;
            align-items: center;
    padding: 2rem;

    @media (max-width: 768px){
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
        -webkit-flex-direction: column;
                flex-direction: column;
        padding: 0rem;
    }

    @media (max-width: 1300px){
       flex-wrap: wrap;
   }

   align-items: stretch;
`;

const CardsHome = styled.div`
    display: -webkit-box;
  
  display: -ms-flexbox;
 
  display: -webkit-flex;
 
  display: flex;
   -webkit-box-orient: vertical;
   -webkit-box-direction: normal;
       -ms-flex-direction: column;
           -webkit-flex-direction: column;
           flex-direction: column;
   margin: 1rem 2rem;
   -ms-flex-preferred-size: 33.33%;
       -webkit-flex-basis: 33.33%;
           flex-basis: 33.33%;

   
   background-color: #fff;
   box-shadow: 0 1px 20px 1px grey;
   border-radius: 1rem;
    padding-bottom: 1.5rem;

    /* background-color: #eaeade; */
    line-height: 1.2;
    margin: 2rem;

   @media (max-width: 768px){
       margin: 1rem;
   }

   div {
       position: relative;
 
       strong {
           display: -webkit-box;
           display: -ms-flexbox;
           display: -webkit-flex;
           display: flex;
           -webkit-box-pack: center;
               -ms-flex-pack: center;
                   -webkit-justify-content: center;
                   justify-content: center;
           background-color: #f07723 ;
           -webkit-box-align: center;
               -ms-flex-align: center;
                   -webkit-align-items: center;
                   align-items: center;
           position: absolute;
           padding: .5rem;
           border-radius: .5rem;
           top: -.5rem;
           left: -1.2rem;
           font-size: .8rem;
           color: #fff;
           -webkit-transform: rotate(-30deg);
               -ms-transform: rotate(-30deg);
                   transform: rotate(-30deg);
       }
   }

   h2 {
       color: #44841a;
       text-align: center;
       font-size: 1.2rem;
   }

   span {
       padding: 1rem 1rem 2rem 1rem;
       font-weight: 400;
       font-size: 1rem;  
       text-align: center;      
   }

   div {
       display: -webkit-box;
       display: -ms-flexbox;
       display: -webkit-flex;
       display: flex;
       -ms-flex-preferred-size: 50%;
       -webkit-flex-basis: 50%;
               flex-basis: 50%;
       -webkit-box-pack: center;
           -ms-flex-pack: center;
       -webkit-justify-content: center;
               justify-content: center;
       margin-bottom: 1rem;

       a {
           text-decoration: none;
           background-color: #44841a;
           color: #fff;
           padding: .8rem;
           border-radius: 10px;
           text-align: center;

           align-self: center;
       }
   }
`;
