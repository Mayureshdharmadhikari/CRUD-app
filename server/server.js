import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "", //Add localhost name
  user: "",//Add user name
  password: "",//Enter password
  database: "" //Enter database name
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL server.');
});

app.get('/', (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ Message: "Error inside server" });
    }
    return res.json(result);
  });
});

app.post('/student', (req, res) => {
  const sql = "INSERT INTO student (`name`, `address`) VALUES (?, ?)";
  const values = [
    req.body.name,
    req.body.address,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: "Error inside server" });
    }
    return res.status(201).json({ message: "Student created successfully", id: result.insertId });
  });
});

app.get('/read/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: 'Invalid ID parameter' });
  }

  const sql = "SELECT * FROM student WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: "Error inside server" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "No student found with this ID" });
    }
    return res.json(result[0]);
  });
});


app.put('/update/:id',(req,res)=>{
  const sql='UPDATE student SET `name`=?, `address`=? WHERE ID=? '
  const id=req.params.id;
  db.query(sql,[req.body.name,req.body.address,id],(err,result)=>{
    if(err) return res.json({Message:"Error inside server"});
    return res.json(result);
  })
})

app.delete('/delete/:id',(req,res)=>{
  const sql="DELETE from student WHERE ID= ? ";
  const id=req.params.id;
  db.query(sql,[id],(err,result)=>{
    if(err) return res.json({Message:"Error inside server"});
    return res.json(result);
  })

})
app.listen(8081, () => {
  console.log("Listening on port 8081...");
});


