import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Define your tasks array with objects containing task text, completion status, and unique IDs
let tasks = [
  { id: 1, text: "Use Todolist", completed: false },
  // Add more tasks here
];

// Set the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Body parsing middleware for handling form data
app.use(express.urlencoded({ extended: true }));

// Define a route to render the homepage
app.get("/", (req, res) => {
  res.render("index.ejs", { tasks });
});

// Handle POST requests to add tasks
app.post("/add-task", (req, res) => {
  // Get task text from the request body
  const newTaskText = req.body.task;

  // Check if the task is not empty before adding
  if (newTaskText.trim() !== "") {
    // Generate a unique ID for the new task
    const newTaskId = tasks.length + 1;

    // Add the new task to your tasks array with initial completion status of false and a unique ID
    tasks.push({ id: newTaskId, text: newTaskText, completed: false });
  }

  // Redirect back to the homepage or perform other actions as needed
  res.redirect("/");
});

// Handle POST requests to mark tasks as completed
app.post("/complete-task/:id", (req, res) => {
  // Get the unique ID of the task to be marked as completed from the URL parameters
  const taskId = parseInt(req.params.id);

  // Find the task with the matching ID and update its completion status to true
  const taskToComplete = tasks.find((task) => task.id === taskId);
  if (taskToComplete) {
    taskToComplete.completed = true;
  }

  // Redirect back to the homepage or perform other actions as needed
  res.redirect("/");
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
