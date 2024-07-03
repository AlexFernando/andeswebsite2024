import React from 'react';
import {connect} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';

const Intercambios = ({state}) => {
    return ( 
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    Intercambios
                </Title>
                <Separator></Separator>
                <SubTitle>
                    Capacitaciones, aprende con nosotros
                </SubTitle>
  
            </HeadContainer>
        </MarginTopContainer>
    );
}
 
export default connect(Intercambios);