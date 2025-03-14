require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const sequelize = require('./src/config/db');
const userRoutes = require('./src/routes/user.routes');
const errorHandler = require('./src/utils/errorHandler');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/users', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
