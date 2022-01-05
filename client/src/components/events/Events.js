import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/auth-context';
import Backdrop from '../backdrop/Backdrop';
import Modal from '../modal/Modal';
import './events.css'

function Events(props) {

    const [user] = useContext(UserContext)
    const token = user.token
    // console.log(user)
 
    const [creatingEvent, setCreatingEvent] = useState(false)
    const [eventCreated, setEventCreated] = useState({})
    const [eventsList, setEventsList] = useState([])

    const createEventHandler =()=>{setCreatingEvent(true)}

    const recordVal=(e)=>{ 
        setEventCreated({...eventCreated, [e.target.id] : e.target.value}) 
    }

    const modalCancel =()=>{setCreatingEvent(false)}

    const modalConfirm =(e)=>{
        e.preventDefault()
        setCreatingEvent(false)
        

        console.log(eventCreated)
        // guard clause

        if (eventCreated.title.trim().lenght === 0 ||
            eventCreated.description.trim().lenght === 0 ||
            +eventCreated.price <= 0 
            ) return


        // sending data - Create Event

        const endpoint = 'http://localhost:5000/graphql'
        const headers ={
            "content-type":"application/json",
            "Authorization": 'Bearer ' + token
        }

        // GraphQl mutation creating the user
        const createEventMutation={
            query:`
                mutation{
                    createEvent(eventInput: {title:"${eventCreated.title}", 
                                             price:${+eventCreated.price},
                                             date:"${eventCreated.date}",
                                             description:"${eventCreated.description}",
                                            }) {
                                                _id
                                                title
                                                description
                                                date
                                                price
                                                creator{
                                                    _id
                                                    email
                                                }
                                            }
                }
            `
        }

        axios({
            url : endpoint,
            method: 'post',
            headers: headers,
            data: createEventMutation
            })
            .then((res) => {
                if(res.status !==200 && res.status !==201)  {throw new Error('Failed')}
                return res
            })
            .then(resData => {
                console.log(resData)
                fetchEvents()
            })
            .catch((err) => console.log(err)) 

    }

    //Fetch all events
    const fetchEvents =()=>{
        const requestBody = {
            query:`
                query{
                    events{
                        _id
                        title
                        description
                        date
                        price
                        
                    }
                }
            `
        }

        const endpoint = 'http://localhost:5000/graphql'
        const headers ={ "content-type":"application/json" }


        axios({
            url : endpoint,
            method: 'post',
            headers: headers,
            data: requestBody
            })
            .then((res) => {
                if(res.status !==200 && res.status !==201)  {throw new Error('Failed')}
                return res
            })
            .then(resData => {
                
                console.log(resData.data.data.events)
                setEventsList(resData.data.data.events)
            })
            .catch((err) => console.log(err)) 
    }


    useEffect(()=>{fetchEvents()}, [])


    return (
        <div>
            
                {creatingEvent && <Backdrop/>}
                {creatingEvent && 
                                <Modal title="Add Event" canCancel canConfirm onCancel={modalCancel} onConfirm={modalConfirm}>
                                    <p>Model Content</p>

                                    <form>
                                        <div className='form-control'>
                                            <label htmlFor='title'>Title</label>
                                            <input type="text" onChange={recordVal} placeholder='your new event' id="title"></input>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor="price">Price</label>
                                            <input type="number" onChange={recordVal} id="price" placeholder='9.99'></input>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor="date">Date</label>
                                            <input type="datetime-local" onChange={recordVal} id="date"></input>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor="description">Description</label>
                                            <textarea rows={'4'} onChange={recordVal} id="description"></textarea>
                                        </div>
                                    </form>
                                </Modal>
                }
                {token &&
                        <div className='events-control'>
                            <p>Share your own Events!</p>
                            <button className='btn' onClick={createEventHandler}> Create Event</button>
                        </div>}

                        <ul className='events__list'>
                            {
                                eventsList.map(each =>{
                                return (
                                    <li className='events__list-item' key={each._id}>
                                        {each.title}
                                    </li>
                                    )
                                })
                            }
                            
                        </ul>
            
        </div>
    );
}

export default Events;