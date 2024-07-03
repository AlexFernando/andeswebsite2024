import React from 'react';
import {connect, styled} from "frontity";
import {HeadContainer, Title, Separator, MarginTopContainer} from './Filosofia';
import ToolkitLogic from './ToolkitLogic';

const Toolkit = ({state}) => {
    return ( 
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    Toolkit 
                </Title>
               
                <Separator></Separator>
               
            </HeadContainer>


            <ToolkitLogic />
        </MarginTopContainer>


    );
}
 
export default connect(Toolkit);