const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const User = require('./models/User');
const Address = require('./models/Address');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync().then(() => {
  console.log('Database & tables created!');
}).catch(error => {
  console.error('Error syncing database:', error);
});

app.post('/register', async (req, res) => {
    const { name, address } = req.body;
  
    if (!name || !address) {
      return res.status(400).json({ message: 'Name and address are required.' });
    }
  
    try {
      // Create a new user
      const user = await User.create({ name });
  
      // Create a new address associated with the user
      await Address.create({ userId: user.id, address });
      console.log(`Name: ${name}, Address: ${address}`);
  
      return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error('Error registering user:', error); // Log the full error
      if (error.errors) {
        error.errors.forEach(err => console.error(err.message));
      }
      return res.status(500).json({ message: 'An error occurred while registering the user.' });
    }

    

  });
  
  

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      include: Address, // Include addresses associated with users
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found.' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'An error occurred while fetching users.' });
  }
});

// Your other endpoints and server start logic...

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
