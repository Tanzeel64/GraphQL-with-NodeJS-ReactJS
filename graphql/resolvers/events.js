const { dateToString } = require('../../helpers/date');
const Event = require('../../models/event');
const User = require('../../models/user');
const {transformEvent} = require('./merge');
 

module.exports = {
    events: () => {
        return Event.find()
            .populate('creator')
            .then(events => {
                return events.map(event => {
                    return transformEvent(event);
                })
            }).catch(err => {
                throw err;
            })
    },
    createEvent: (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: "604710c2543cd3241a64c9b9"
        })
        let createdEvent;
        return event.save()
            .then(event => {
                createdEvent = transformEvent(event);
                return User.findById('604710c2543cd3241a64c9b9')
            }).then(user => {
                if (!user) {
                    throw new Error('User does not exist.');
                }
                user.createdEvents.push(event);
                return user.save();
            }).then(result => {
                return createdEvent
            })
            .catch(err => {
                console.log(err);
            });
    },
}