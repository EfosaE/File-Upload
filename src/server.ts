import app from "./app";


// Set the port number for the server
const port = 3000;
// Define a route to render the HTML file
app.get('/', (req, res) => {
  res.render('index'); // Assuming you have an "index.ejs" file in the "views" directory
});

// Define a route for the root path ('/')
app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Hello, TypeScript + Node.js + Express!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});
