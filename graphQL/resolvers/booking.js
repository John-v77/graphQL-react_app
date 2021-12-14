const Event = require('../../models/event')
const Booking = require('../../models/booking')
const { transformBooking, transformEvent } = require('./merge-data')

module.exports = {
    // Create booking Resolver _________________________________________________
    bookings:async _=>{
        try{
        const bookings = await Booking.find()
        return bookings.map(each =>  transformBooking(each)  )
        }catch(err) {throw err}
    },

    
    // Create Book event Resolver __________________________________________________
    bookEvent: async eventId => {
        try{
        const fetchedEvent = await Event.findOne({_id: args.eventId})
        const booking = new Booking({
            user: '5c0d',
            event: fetchedEvent 
        })
        const result = await booking.save()
        return transformBooking(result)

        }catch(err){throw err}
    },  // end of Create Booking Resolver ____________________________________________


    // cancel Booking Resolver____________________________________________________
    cancelBooking: async args => {
        try{
            const booking = await Booking.findById(args.bookingId).populate('event');
            
            const event = transformEvent(booking.event)

            await Booking.deleteOne({_id:args.bookingId})
            return event;
        
        }catch(err){throw err} 
    }
}