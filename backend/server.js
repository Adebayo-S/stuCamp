// Handle UNHANDLED REJECTION
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION 🔥 shutting down.....');
  process.exit(1);
  // server.close(() => {});
});
// Handle UNCAUGHT EXCEPTION
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION 🔥 shutting down.....');
  process.exit(1);
});

const dotenv = require('dotenv');
dotenv.config({ path: './.config.env' });

const app = require('./app');
const mongoose = require('mongoose');

// connect database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successfully ......'))
  .catch(err => console.log(`ERROR! 🔥: ${err}`));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
