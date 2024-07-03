import React, {useState, useEffect} from 'react';
import {connect, styled, css} from "frontity";
import getAllIndexes from  '../helpers/findIndexes';



const Calendar = ({eventDay, eventMonth, eventYear, setIsEvent, setId, idArray}) => {
 
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const today = new Date();
    const [date, setDate] = useState(today);
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());

    const calculateStartDayOfMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay() === 0 ? 7 :  new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }
    

    const [startDay, setStartDay] = useState(calculateStartDayOfMonth(date));
    
    useEffect(() => {
      setDay(date.getDate());
      setMonth(date.getMonth());
      setYear(date.getFullYear());
      setStartDay(calculateStartDayOfMonth(date));
    }, [date]);

    const showEvent = (eventId) => {
      setIsEvent(true);
      setId(eventId);
    }

    
    const isLeapYear = (year) => {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

    return ( 
      <MyCalendar>  
        <Frame>
          
          <Header>
            <Button onClick={() => setDate(new Date(year, month - 1, day))}>Prev</Button>
            <div>
              {MONTHS[month]} {year}
            </div>
            <Button onClick={() => setDate(new Date(year, month + 1, day))}>Next</Button>
          </Header>

          <Body>
            {DAYS_OF_THE_WEEK.map(d => (

              <Day key={d}>
                <strong>{d}</strong>
              </Day>
            ))}

            {Array(days[month] + (startDay - 1))
              .fill(null)
              .map((_, index) => {

                console.log("index: ", index)
              
                const theDay = index - (startDay - 2);

                console.log("the day : ", theDay)

                let indexDay = eventDay.indexOf(theDay)

                let manyIndex = getAllIndexes(eventDay,theDay)

                console.log("manyIndex: ", manyIndex);
                
                if(manyIndex.length > 0) {

                  let arrEventsId = [];

                  for(let j = 0 ; j < manyIndex.length ; j++ ){
                    
                    if(manyIndex[j] > -1 && month === eventMonth[manyIndex[j]] && year === eventYear[manyIndex[j]]) {
                      arrEventsId.push(idArray[manyIndex[j]])
                    }
                  }

                  if(arrEventsId.length >0) {
                    console.log("arrEventsId: ", arrEventsId);
                    return (
                      <Day
                        key={index}
                        isSelected={true}
                        onClick = { () => showEvent(arrEventsId)}
                      >
                        {theDay > 0 ? theDay : ''}
                      </Day>
                    );
                  }

                  else {
                    return (
                    <Day
                      key={index}
                    >
                      {theDay > 0 ? theDay : ''}
                    </Day>
                    )
                  }

                }


                else {
                  return(
                    <Day
                    key={index}
                  >
                    {theDay > 0 ? theDay : ''}
                  </Day>)
                  }
                  
              }
              
              )}
          </Body>
      </Frame>

      <h1>{`CURRENT DAY : ${today}`}</h1>
    </MyCalendar>
     );
}

const MyCalendar =  styled.div`
  flex-basis: 40%;
  text-align: center;
  margin-top: 10rem;

  @media(max-width: 768px) {
    margin-top: 2rem;
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 1.6rem;
    color: #000;
  }
`

const Frame = styled.div`
  border: 1px solid lightgrey;
  border-radius: 1rem;
  box-shadow: 2px 2px 2px #eee;

`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
  background-color: #44841a;
  border-radius: 1rem 1rem 0 0;
  color: #fff;
`;

const Button = styled.div`
  cursor: pointer;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Day = styled.div`
  width: 14.2%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  

  ${props =>
    props.isSelected &&
    css`
      background-color: green;
      border-radius: .5rem;
      cursor: pointer;
      font-weight: 700;
      color: #fff;
    `}
`;

export default Calendar;