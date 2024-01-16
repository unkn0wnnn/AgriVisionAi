const express = require('express');
const multer = require('multer');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3001;

// Use the cors middleware
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send('Express.js server is running!');
});

app.post('/upload', upload.single('video'), (req, res) => {
  res.status(200).json({ message: 'File uploaded successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
