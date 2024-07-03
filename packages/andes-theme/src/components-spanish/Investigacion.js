import React from 'react';
import {connect} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';


const Investigacion = ({state}) => {
    return ( 
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    Investigacion
                </Title>
                <Separator></Separator>
                <SubTitle>
                    Cambio climático <br></br> Escuelas de Campo
                </SubTitle>
              
            </HeadContainer>
        </MarginTopContainer>
    );
}
 
export default connect(Investigacion);