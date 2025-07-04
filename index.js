var express = require('express');
var app = express();

// Enable CORS
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

// Serve static files
app.use(express.static('public'));

// Serve index.html for root route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for hello
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint for timestamp
app.get("/api/:date?", function (req, res) {
  let inputDate = req.params.date;

  // If no date is provided, use current time
  if (!inputDate) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString()
    });
  }

  // Try to parse the input as a number (Unix timestamp) or date string
  let date;
  if (/^\d+$/.test(inputDate)) {
    // If input is a number (Unix timestamp in milliseconds)
    date = new Date(parseInt(inputDate));
  } else {
    // Otherwise, treat as a date string
    date = new Date(inputDate);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return valid date in required format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 7000
var listener = app.listen(process.env.PORT || 7000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});