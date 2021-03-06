import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/auth-context';
import './eventItem.css'
import actions from '../../../API/api'

function EventItem(props) {

    // console.log(props, 'item Event')

    const [user] = useContext(UserContext)

    const token = user.token
    let eventIdz = props.eventId

    const [checkDetails, setCheckDetails] = useState(false)
    const showDetails =(e)=> setCheckDetails(!checkDetails)
    
    const bookEventHandler =(e)=>{
        
        //API call
        actions.bookEvents(eventIdz, token)
            .then((res) => {
                if(res.status !==200 && res.status !==201)  {throw new Error('Failed')}
                return res})
            // .then(resData => {
            //     console.log(resData.data.data) 
            // })
            .catch((err) => console.log(err)) 
    }

    return (
        <li key={props.eventId} className="events__list-item">
            <div>
                <h2>{props.title}</h2>
                <h3>${props.price}</h3>
            </div>

            <div>
                <button onClick={showDetails} className='btn'>{checkDetails ? "Hide Details" : "View Details"}</button>
            </div>
            {checkDetails && <div className='events__list-item__details'>
                <h3>{new Date(props.date).toLocaleString()}</h3>
                <p>{props.description}</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A eum harum asperiores, quam iusto quod sunt!</p>
                <p>{`Creator: ${props.creatorId}`}</p>
                <p>{`Event ID: ${props.eventId}`}</p>
                <button onClick={bookEventHandler} className='btn'>Book</button>
            </div>}
        </li>
    );
}
export default EventItem;