import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import EventCard from './EventCard'
import axios from 'axios';

function ParticipatedEvents() {
    const userId = localStorage.getItem('id')
    const [participated, setParticipated] = useState([])
    // const [isParticipatePage,setIsParticipatePage] = useState(true);
    const [userPage, setUserPage] = useState(true);

    const updateUserPage = ()=>{
      setUserPage(!userPage)
    }
  

    useEffect(() => {
        axios.get(`http://localhost:8000/api/event/participatedEvent/${userId}`)
            .then((response) => {;
                setParticipated(response.data.data)
                console.log(response)
                // setCodingEvents(response.data.eventData)
            })
            .catch((err) => {
                console.error(err);
            })

    }, [userId]);
    return (
        <>
            <div className='flex lg:h-full h-full w-full flex-col lg:flex-row '>

                <Navbar title='pe' />
                <div className='lg:w-full sm:h-screen lg:h-full text-white mt-4 ml-4 mr-2'>
                    <div className="participated-events mt-4">
                        <p className="text-xl bg-white text-black font-medium p-3 lg:w-full rounded-xl "> You have Participated in the following Events</p>
                        <div className="event-main flex flex-wrap justify-evenly">

                            {participated.length>0?
                                
                                participated.map((ele) => {
                                    return (
                                    ele!==null?
                                    <EventCard userPage={userPage} setUserPage={updateUserPage} key={ele._id} dataToFetch={ele.eventName} eventName={ele.eventName.charAt(0).toUpperCase() + ele.eventName.slice(1)} date={ele.startDate} eventCategory={ele.eventType} eventImage={ele.eventImage} />:''
                                )
                            }):<h1>You have not Participated In any Event</h1>}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default ParticipatedEvents