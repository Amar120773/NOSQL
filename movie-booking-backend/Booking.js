const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
    },
    showDate: {
      type: Date,
      required: true
    },
    showTime: {
      type: String,
      enum: ['10:00 AM', '1:30 PM', '4:30 PM', '7:30 PM', '10:00 PM'],
      required: true
    },
    theatre: {
      type: String,
      required: true
    },
    seats: {
      type: [String],
      required: true,
      validate: {
        validator: function(v) {
          return v.length > 0 && v.length <= 10;
        },
        message: 'Seats must be between 1 and 10'
      }
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    pricePerSeat: {
      type: Number,
      default: 250
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    },
    bookingReference: {
      type: String,
      unique: true
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'upi', 'netbanking'],
      required: true
    }
  },
  { timestamps: true }
);

bookingSchema.pre('save', async function(next) {
  if (this.isNew) {
    const randomRef = Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    this.bookingReference = `BK${randomRef}${timestamp}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
