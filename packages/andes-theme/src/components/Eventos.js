import React, {useState, useEffect} from 'react';
import {connect, styled} from "frontity";
import {HeadContainer, Title, SubTitle, Separator, MarginTopContainer} from './Filosofia';
import FeaturedImage from './FeaturedImage';
import Calendar from './Calendar';
import Loading from './Loading';
import Iframe from "@frontity/components/iframe";

//filter
import useFilter from '../hooks/useFilterYears';

const Eventos = ({state, actions, libraries}) => {

    useEffect( () => {
        actions.source.fetch("/allevents")
     }, [])

   const data = state.source.get("/allevents");

   const [isEvent, setIsEvent] = useState(false)
   const [id, setId] = useState([]);//cambiar esto por un arr de ids

   //UseFilter categories 
   const {category,  FilterUI} = useFilter("");
   const [filterByYearEvents , setFilterByYearEvents] = useState([])
   const [isFilterYear, setIsFilterYear] = useState(false)

   const eventDay = [];

   const eventMonth = [];

   const eventYear = [];

   const idArray = [];

   let arrayOfEvents = [];

   const Html2react = libraries.html2react.Component;

   //array of events 
   
   if(data.isReady) {

       data.items.map( ({id}) => {
           
            const singleSearch = state.source.allevents[id];
            arrayOfEvents.push(singleSearch);
            const arrayDate = singleSearch.acf.date.split("/");
            eventDay.push(parseInt(arrayDate[0]))
            eventMonth.push(parseInt(arrayDate[1])-1)
            eventYear.push(parseInt(arrayDate[2]))
            idArray.push(singleSearch.id)
       })
   }

   let arrEventsFiltered =  id.map( elemId => {   
    return arrayOfEvents.filter(event => event.id === elemId)
   })

   let arrEvenstOrderByDate = arrayOfEvents.sort((a,b)=>new Date(b.acf.date.split("/").reverse().join("-")) - new Date(a.acf.date.split("/").reverse().join("-")))

   console.log("arr filter by date: ", arrEvenstOrderByDate)

   //detect change of year
    useEffect( () => {
       let eventsFilterByYear = arrayOfEvents.filter(event => event.acf.date.split("/")[2] === category.toString())
       setIsFilterYear(true)
       setFilterByYearEvents(eventsFilterByYear);
    }, [category])

 
    return ( 
        <MarginTopContainer>
            <HeadContainer>
                <Title>
                    Events
                </Title>
                <Separator></Separator>
                <SubTitle>
                    Take part of our events
                </SubTitle>
      
            </HeadContainer>

            {
                data.isReady ?

                <>
                <SectionEvent>

                    <ContainerEventsCalendar>
                    {
        
                        isEvent ?
        
                            arrEventsFiltered.length > 0 && arrEventsFiltered.map( event => (    
                                <EventContainer key={event[0].id}>
                                    <h1>ANDES - Events</h1>

                                    {/* <h3>{event[0].title.rendered}</h3> */}

                                    <h3>
                                        <Html2react html={event[0].title.rendered} />
                                    </h3>
                              
                                    {event[0].featured_media ? 
                                        <FeaturedImage imgID = {event[0].featured_media} element = "event"/>
                                        : null
                                    }


                                    {event[0].acf.link_video? 
                                        <Iframe 
                                            src={event[0].acf.link_video}
                                            title="video of the event"
                                            height="500"
                                            width="500" 
                                        />
                                        : null
                                    }
                                    
                                    <span>{event[0].acf.date_texto}</span>

                                    {
                                        event[0].acf.link_pdf? 
                                        <a href={event[0].acf.link_pdf} rel="noopener noreferrer" target="_blank">View pdf</a>
                                        :null
                                    }

                                    {
                                         event[0].acf.paragraph_text?
                                         <p>{event[0].acf.paragraph_text}</p>
                                         :null
                                    }                                
                                   
                                </EventContainer>   
                            )) 
                        : 
        
                        <>
                            
                            <EventContainer>
                                <h1>The Latest</h1>
                                {arrEvenstOrderByDate[0].featured_media ? 
                                    <FeaturedImage imgID = {arrEvenstOrderByDate[0].featured_media} element = "event"/>
                                :null}

                                <h3>{arrEvenstOrderByDate[0].title.rendered}</h3>
                                <span>{arrEvenstOrderByDate[0].acf.date_texto}</span>

                                {arrEvenstOrderByDate[0].acf.link_video? 
                                        <Iframe 
                                            src={arrEvenstOrderByDate[0].acf.link_video}
                                            title="video of the event"
                                            height="500"
                                            width="500" 
                                        />
                                        : null
                                    }

                                    {
                                        arrEvenstOrderByDate[0].acf.link_pdf? 
                                        <a href={arrEvenstOrderByDate[0].acf.link_pdf} rel="noopener noreferrer" target="_blank">View pdf</a>
                                        :null
                                    }

                                    {
                                         arrEvenstOrderByDate[0].acf.paragraph_text?
                                         <p>{arrEvenstOrderByDate[0].acf.paragraph_text}</p>
                                         :null
                                    }   
                            </EventContainer>
                        </>
                    }
                    </ContainerEventsCalendar>

                  
                    <CalendarPastEvents>
                        <Calendar 
                            eventDay = {eventDay} 
                            eventMonth = {eventMonth} 
                            eventYear = {eventYear} 
                            setIsEvent = {setIsEvent}
                            setId = {setId}
                            idArray = {idArray}
                        />

                        {FilterUI()}


                            {isFilterYear ? 

                                <div>
                                <h1>EVENTS IN YEAR:  {category}</h1>

                                {filterByYearEvents.length>0 && filterByYearEvents.map(elem => {
                                    return(
                                        <ContainerEventBrief>
                                            {elem.featured_media ? 
                                                <FeaturedImage imgID = {elem.featured_media} element = "event"/> : null
                                            }
                                            {elem.acf.link_video? 
                                                <Iframe 
                                                    src={elem.acf.link_video}
                                                    title="video of the event"
                                                    height="150"
                                                    width="150" 
                                                />
                                                : null
                                            }

                                            <div>
                                                <h3>{elem.title.rendered}</h3>
                                                <p>Date : 
                                                    <span>{elem.acf.date_texto}</span>
                                                </p>
                                            </div>
                                        </ContainerEventBrief>
                                    )
                                })}

                                </div>

                                :<NotEvents>
                                    <h2>
                                        There's no events in - {category}                                   
                                    </h2>
                                </NotEvents>
                            }

                       </CalendarPastEvents>
                        
                </SectionEvent>
                </>
                : <Loading />
            }    

        </MarginTopContainer>
    );
}

const SectionEvent = styled.div`
    display: grid;
    grid-template-columns: 40% 50%;
    grid-template-rows: auto;
    grid-gap: 1rem;


    @media (max-width: 768px){
        grid-template-columns: 1fr;
    }

`;

const ContainerEventsCalendar = styled.div`
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    margin-bottom: 3rem;
    padding-left: 5rem;
    padding-right: 5rem;


    @media (max-width: 768px){
        padding-left: 1rem;
        padding-right: 1rem;
    }
`

export const EventContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    margin-bottom: 3rem;

    h1 {
        text-transform: uppercase;
        font-size: 2rem;
        font-weight: bold;
        color: #44841a;
    }

    img {
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
    }

    h3 {
        //color: #f07723;
        color: #fff;
        font-size: 1.2rem;
        text-transform: uppercase;
        background-color: #333333;
        padding: 1rem;
        border-radius: 1rem;
    }

    span {
        //color: #44841a;
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        background-color: #44841a;
        color: #fff;
        padding: .5rem;
        margin: 0;
        border-radius: .5rem;
        margin-top: 1rem;
    }

    a {
        text-decoration: none;
        color: #fff;
        font-size: 1rem;
        background-color: #44841a;
        margin-top: 1rem;
        padding: .8rem;
        border-radius: .5rem;
    }

    p{
        font-size: 1rem;
        color: #333333;
        text-align: justify;
        line-height: 1.5;
    }
`;

/**Calendar and past events */
const CalendarPastEvents = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 50%;

    @media (max-width: 768px){
        padding: 0 .5rem;
    }
`

const ContainerEventBrief = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-auto-rows: minmax(100px, 150px);
    grid-gap: 1rem;
    background-color: #eaeaea;
    padding: 1rem;
    margin: 1rem;
    border-radius: .5rem;

    @media (max-width: 768px){
        padding: 1rem;
        margin: 1rem;
        grid-template-columns: 1fr 1fr;

        grid-auto-rows: minmax(100px, 250px);
    }

    div{
        flex-basis: 40%;

        h3 {
            color: #44841a;
            font-size: 1rem;
        }

        p {
            font-size: 1rem;
            color: #545454;
        }

        span, strong {
            color: #545454;
        }        
    }
`
const NotEvents = styled.div`
    text-align: center;
    margin-top: 1rem;
    color: #545454;

    h2 {
        font-size: 1.2rem;
    }
`
/**Calendar and past events */
 
export default connect(Eventos);
