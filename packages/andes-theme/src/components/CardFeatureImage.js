import React from 'react'
import {connect, styled} from "frontity";
import Image from "@frontity/components/image";

const CardFeaturedImage = ({media, elem, alt}) => {

    if(elem === 'stuff') {
    
        if(window.outerHeight < 768) {
            return (
                <>
                    <ImageSectionPeople src={media.medium} />
                </>
            )
        }


        else {
            return (
                <>
                    <ImageSectionPeople src={media.medium_large} />
                </>
            )
        }        
    }

    if(elem === 'courses') {
    
        if(window.outerHeight < 768) {
            return (
                <>
                    <ImageCourses src={media.medium} />
                </>
            )
        }


        else {
            return (
                <>
                    <ImageCourses src={media.medium_large} />
                </>
            )
        }        
    }

    else {

        if(window.outerHeight < 768) {
            console.log("pantalla mobile: ", 768)

            return (
                <>
                    <ImageCardHome src={media.medium} alt= {alt}  />
                </>
            )
        }


        else {
            console.log("pantalla grande")
            return (
                <>
                    <ImageCardHome src={media.medium_large} alt= {alt}/>
                </>
            )
        }
}
    }
    


const ImageCardHome = styled(Image)`
    width: 100%;
    align-self: center;
    max-height: 35vh; /**new line image height */     
    border-radius: 1rem 1rem 0 0; 
`

const ImageSectionPeople = styled(Image)`
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
    margin-top: 1rem;

    @media (min-width: 768px){
        width: 45%;
        height: 100%;
        max-height: 60vh; /**new line image height */    
        border-radius: 5rem;
        margin: 0 2rem 0 2rem;
    } 
`

const ImageCourses = styled(Image)`

    width: 100%;
    align-self: center;
    height: 40vh; /**new line image height */ 
    border-radius: 5px;

    @media(min-width: 768px) {
        width: 30vw;
        height: 50vh;
        margin: 1rem 0;
        border-radius: 2rem;
    }
`
export default connect(CardFeaturedImage);