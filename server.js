const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


// Replace with your MongoDB Atlas connection string
const dbURI = 'mongodb+srv://maxsmith1:<Crikey@95>@cluster0.33zxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));


// Middlewares
app.use(cors());
app.use(express.json());

// Data Models
const CategorySchema = new mongoose.Schema({
    name: String,
    subjects: [
        { name: String, votes: { type: Number, default: 0 } }
    ]
});

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const Category = mongoose.model('Category', CategorySchema);

// Get categories with subjects
app.get('/api/categories', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

// Vote on a subject
app.post('/api/vote', async (req, res) => {
    const { categoryName, subjectName } = req.body;
    await Category.updateOne(
        { "name": categoryName, "subjects.name": subjectName },
        { $inc: { "subjects.$.votes": 1 } }
    );
    res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
