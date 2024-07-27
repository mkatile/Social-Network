const express = require('express');
const mongoose = require('mongoose');
const thoughtRoutes = require('./routes/thoughtRouter');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
