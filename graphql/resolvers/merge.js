const { dateToString } = require('../../helpers/date');
const User = require('../../models/user');
const Event = require('../../models/event');


const transformEvent = (event) => {
    return {
        ...event._doc, date: dateToString(event._doc.date), creator: user.bind(this, event._doc.creator)
    };
}

const transformBooking = (booking) => {
    return {
        ...booking._doc,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    };
}

const events = (eventIds) => {
    return Event.find({ _id: { $in: eventIds } }).then(events => {
        return events.map(event => {
            return transformEvent(event);
        })
    }).catch(err => {
        throw err;
    })
}
const singleEvent = (eventId) => {
    return Event.findById(eventId)
        .then(event => {
            return transformEvent(event);
        }).catch(err => {
            throw err;
        })
}

const user = (userId) => {
    return User.findById(userId)
        .then(user => {
            return { ...user._doc, createdEvents: events.bind(this, user._doc.createdEvents) }
        }).catch(err => {
            throw err;
        })
}

exports.user = user;
exports.events = events;
exports.singleEvent = singleEvent;
exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;
