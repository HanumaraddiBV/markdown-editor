import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { marked } from "marked";



const app = express();


app.use(cors());
app.use(bodyParser.json());

//converting markdown to HTML 
app.post('/convert', (req, res) => {
    const { markdown } = req.body;
    if (!markdown) {
      return res.status(400).json({ error: 'Markdown input is required.' });
    }
    
    // Converting markdown to HTML
    const html = marked(markdown);
    return res.json({ html });
  });

  
//port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})