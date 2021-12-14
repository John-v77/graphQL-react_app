const Event = require('../../models/event')
const User = require('../../models/user')
const { transformEvent } = require('./merge-data')

module.exports = {

    events: async _=> {

        try{
            const events = await Event.find()
            return ev.map(each =>   transformEvent(each)    )
        } catch(err) { throw err }
    },
    // Create event Resolver _________________________________________________
    createEvent: async (args)=>{
        const event = new Event({
            title:args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5c0d'
        })

        let createdEvent
        try{
            const result = await event.save()
            // save() is provided by the mongoose package
            createdEvent = transformEvent(result)

            const creator = await User.findById('5c0d')
            if(!creator){ throw new Error('User not found.') }


            creator.createEvent.push(event)
            await creator.save()

            return createdEvent
        } catch(err) { throw err }
    },
    // end of Create event Resolver __________________________________________

}