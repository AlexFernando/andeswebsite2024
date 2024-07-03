import React from 'react';
import {connect} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, SectionContainer, MarginTopContainer} from './Filosofia';
import UnderConstructionImage from '../static/images/image_site_under_const.png';
import Image from "@frontity/components/image";

const UnderConstruction = ({state}) => {
    return ( 
        <MarginTopContainer>
 

            <SectionContainer>
                <Image src={UnderConstructionImage} />

            </SectionContainer>
        </MarginTopContainer>
    );
}
 
export default connect(UnderConstruction);