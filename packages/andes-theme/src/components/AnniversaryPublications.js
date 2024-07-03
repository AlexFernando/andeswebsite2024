import React, {useEffect} from 'react';
import {connect} from "frontity";
import {HeadContainer, Title, Separator, MarginTopContainer} from './Filosofia';
import {SectionText} from './HomePage';
import RepoAnniversaryPublications from './RepoAnniversaryPublications';

const AnniversaryPublications = ({state, actions}) => {

    useEffect( () => {
            
        if(state.theme.lang === "en") {
            actions.source.fetch("/aniversariopublicaciones")
        }

        else {
            actions.source.fetch("/es-aniversariopublicaciones")
        }
    }, [])

    const pageAnnivPublications = state.theme.lang === "en" ? state.source.page[530] : state.source.page[493]

    return ( 
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                 {pageAnnivPublications.acf.title}
                </Title>
                <Separator></Separator>
            </HeadContainer>

            <SectionText>
            <div>  
                <h1>{pageAnnivPublications.acf.title_paragraph_one}</h1>             
                <p> {pageAnnivPublications.acf.text_paragraph_one}</p>
                
                <h1>{pageAnnivPublications.acf.title_paragraph_two}</h1>
                <p>
                    {pageAnnivPublications.acf.text_paragraph_two}
                </p> 
              
            </div>
            </SectionText>

        
            <RepoAnniversaryPublications />
        </MarginTopContainer>
     );
}
 
export default connect(AnniversaryPublications);

