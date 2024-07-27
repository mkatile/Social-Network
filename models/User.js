const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Thought = require('./Thought'); // Import the Thought model

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match a valid email address']
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
{
  toJSON: {
    virtuals: true
  },
  id: false
});

// Virtual to get friend count
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Middleware to remove associated thoughts when a user is deleted
userSchema.pre('remove', async function(next) {
  try {
    await Thought.deleteMany({ username: this.username });
    next();
  } catch (err) {
    next(err);
  }
});

const User = model('User', userSchema);

module.exports = User;
