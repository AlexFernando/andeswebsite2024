import React from 'react';
import {connect} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, SectionContainer, MarginTopContainer} from './Filosofia';

const Intercambios = ({state}) => {
    return ( 
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    Exchanges
                </Title>
                <Separator></Separator>
                <SubTitle>
                    Formation, learn with us
                </SubTitle>
             
            </HeadContainer>
        </MarginTopContainer>
    );
}
 
export default connect(Intercambios);