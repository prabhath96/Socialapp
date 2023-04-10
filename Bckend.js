const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Dummy data to simulate user profiles
let profiles = [
  {
    name: "Alice",
    email: "alice@example.com",
    phone: "555-1234",
    username: "alice123"
  },
  {
    name: "Bob",
    email: "bob@example.com",
    phone: "555-5678",
    username: "bob456"
  }
];

// Route to create a user profile
app.post("/api/create-profile", (req, res) => {
  // Get the data from the request body
  const { name, email, phone, username } = req.body;

  // Check if the username already exists
  const profileExists = profiles.some(profile => profile.username === username);
  if (profileExists) {
    return res.status(409).json({ error: "Username already exists" });
  }

  // Create the new profile object
  const newProfile = { name, email, phone, username };

  // Add the new profile to the array
  profiles.push(newProfile);

  // Send a response with the new profile object
  res.json(newProfile);
});

// Route to get a user's profile
app.get("/api/get-profile", (req, res) => {
  // For simplicity, we will just return the first profile in the array
  res.json(profiles[0]);
});

// Route to get a list of all users
app.get("/api/get-users", (req, res) => {
  // Map the profiles array to an array of objects with just the name and username properties
  const users = profiles.map(profile => ({ name: profile.name, username: profile.username }));

  // Send the array of users as the response
  res.json(users);
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
