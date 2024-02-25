const EventModel = require("../modals/event.modal")

const GetCompletedEvent = async (req,res) => {
    const events = await EventModel.find({})
    if (events === null) {
        res.json({
            'message': 'No event found',
            'statusCode': 400,
        })
    } else {
        // console.log()
        res.json({
            'eventData': events.filter((event) =>{
                return new Date(event.endDate).getTime() < Date.now() 
         }   ),
            'message': 'Events Send Successfully',
            'statusCode': 400,
        }) 
    }
}
module.exports=GetCompletedEvent