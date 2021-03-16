const Event = require('../../models/event');
const Booking = require('../../models/booking');
const {transformBooking, transformEvent} = require('./merge')


module.exports = {
    bookings: () => {
        return Booking.find()
            .then(results => {
                return results.map(booking => {
                    return transformBooking(booking);
                })
            }).catch(err => {
                throw err;
            })
    },
    bookEvent: async (args) => {
        const featchedEvent = await Event.findOne({ _id: args.eventId });
        const booking = new Booking({
            user: '604710c2543cd3241a64c9b9',
            event: featchedEvent
        });
        return booking.save()
            .then(result => {
                return transformBooking(result)
            }).catch(err => {
                throw err;
            })
    },
    cancelBooking: async (args) => {
        const booking = await Booking.findById(args.bookingId).populate('event');
        const event = transformEvent(booking.event);

        return Booking.deleteOne({ _id: args.bookingId })
            .then(result => {
                return event;
            }).catch(err => {
                throw err;
            })
    }
}