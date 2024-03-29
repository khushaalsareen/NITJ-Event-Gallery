import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
// import EventJSON from '../utils/EventJSON'
import { useParams,useNavigate } from "react-router-dom";
import Alerts from "./Alerts";


function EventsDetail() {
  const { id } = useParams()

  // const {navigate} = useNavigate();
  
  const navigate = useNavigate();
  const [Events, setEvents] = useState([])
  const [postData, setPostData] = useState('')
  const [eventDetails, setEventDetails] = useState(Events)
  const [ActivateAlert, setActivateAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState({
    statusCode: '',
    msg: ''
  })

  const userId = localStorage.getItem('id')
  const adminLogin = localStorage.getItem('adminLogged')

  function handleRegister() {
    const postJsonData = {
      eventId: postData
    }
    axios({
      method: "post",
      url: `http://localhost:8000/api/event/register/${userId}`,
      data: postJsonData,
      headers: { "Content-Type": "application/json" },
    }
    )
      .then((response) => {
        setActivateAlert(true)
        setAlertMsg({ statusCode: response.data.statusCode, msg: response.data.message });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleDelete = () => {
    console.log(id);
    axios.delete(`http://localhost:8000/api/event/deleteEvent/${id}`)
      .then((response) => {
        setActivateAlert(true);
        setAlertMsg({ statusCode: response.data.statusCode, msg: response.data.message });
        // Use navigate function to redirect
        navigate('/admin/dashboard');
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  useEffect(() => {
    axios.get("http://localhost:8000/api/event/getEvent")
      .then((response) => {
        setEvents(response.data.eventData)
      })
      .catch((err) => {
        console.error(err);
      })

  }, []);
  useEffect(() => {
    console.log(id);
    

      console.log(Events);
      const EventDeatils = Events.find((ele) => {
        console.log(ele);
        return ele.eventName.trimEnd() === id.trimEnd()
      })
      console.log(EventDeatils);
      setEventDetails(EventDeatils)
      setPostData(EventDeatils?._id)

    

  }, [Events, id])
  return (
    <div className="flex h-full lg:flex-row flex-col  ">
      <Navbar title="event" />
      <div className=" text-black flex flex-col w-full h-screen ">
        <div className="relative  flex items-center overflow-hidden bg-white white:bg-white-800 mt-5 mx-5 my-5 rounded-2xl ">
          <div className="container relative flex px-6 py-16 mx-auto items-center">
            <div className="relative  flex flex-col md:w-full lg:w-2/3">
              <span className="w-20 h-2 mb-4 bg-gray-800 dark:bg-black"></span>
              <h1 className="text-l mb-12 font-semibold leading-none text-gray-800 uppercase font-bebas-neue sm:text-l dark:text-black">
                About the Event

              </h1>
              <h1 className="flex flex-col text-4xl lg:text-6xl font-black-bold leading-none text-gray-800 uppercase font-bebas-neue md:text-5xl text-l dark:text-black">
                {eventDetails?.eventName}

              </h1>

              <details className="group pt-5">
                <summary className="flex ring-2 ring-gray-300 rounded-xl p-2 mr-6 justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-l"> About</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  {eventDetails?.eventDetail}
                </p>
              </details>
              <details className="group pt-5">
                <summary className="flex ring-2 ring-gray-300 rounded-xl p-2 mr-6 justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-l"> Start Date</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  {eventDetails?.startDate}
                </p>
              </details>
              <details className="group pt-5">
                <summary className="flex ring-2 ring-gray-300 rounded-xl p-2 mr-6 justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-l"> End Date</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  {eventDetails?.endDate}
                </p>
              </details>
              <details className="group pt-5">
                <summary className="flex ring-2 ring-gray-300 rounded-xl p-2 mr-6 justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-l"> Venue</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  College Campus
                </p>
              </details>
              <details className="group pt-5">
                <summary className="flex ring-2 ring-gray-300 rounded-xl p-2 mr-6 justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-l"> Event Coordinators</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  {eventDetails?.eventCoordinators}
                </p>
              </details>

              {adminLogin === 'true' ? 
                  <div className="flex mt-8">
                  <button onClick={handleDelete}
                    className=" block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-900 focus:bg-indigo-900 text-black hover:text-white focus:text-white rounded-lg px-2 py-2 font-semibold my-2"
                    type="button"
                    data-ripple-light="true"
                  >
                    Delete
                  </button>
                </div> 
                :
                <div className="flex mt-8">
                  {new Date(eventDetails?.endDate).getTime()<Date.now() ? null:<button onClick={handleRegister}
                    className=" block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-900 focus:bg-indigo-900 text-black hover:text-white focus:text-white rounded-lg px-2 py-2 font-semibold my-2"
                    type="button"
                    data-ripple-light="true"
                  >
                    {  alertMsg.statusCode === 200 ? 'Registered' : 'Register'}
                  </button>}
                </div>}


            </div>
            <div className="relative hidden lg:block lg:w-3/5 ">
              <img className="rounded-xl "
                src={eventDetails?.eventImage}
                alt="ui/ux review check"
              />
            </div>
          </div>
        </div>
        {ActivateAlert === true ? alertMsg.statusCode === 200 ? <Alerts msg={alertMsg.msg} type={200} /> : <Alerts msg={alertMsg.msg} type={400} /> : ''}
      </div>
    </div>
  );
}

export default EventsDetail;
