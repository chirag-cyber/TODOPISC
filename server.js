const PORT = process.env.PORT || 5000;
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const db = require('./db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// app.get('/todos', (req, res) => { 
//     const todos = 'SELECT * FROM todos';
//     db.query(todos, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         res.send(result);
//     });
//   });
      


//get all todos
app.get('/todos/:userEmail', async (req, res) => {
  const { userEmail } = req.params
  try {
    const todos = await db.query('SELECT * FROM todos WHERE user_email = ?', [userEmail])
    res.json(todos.rows)
  } catch (err) {
    console.log(err)
  }
})

// create a new todo
app.post('/todos', async(req, res) => {
  const { user_email, title, progress, date } = req.body
  const id = uuidv4()
  try {
    const newToDo = await db.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES(?, ?, ?, ?, ?)`,
      [id, user_email, title, progress, date])
    res.json(newToDo)
  } catch (err) {
    console.error(err)
  }
})

// edit a new todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params
  const { user_email, title, progress, date } = req.body
  try {
    const editToDo =
      await db.query('UPDATE todos SET user_email = ?, title = ?, progress = ?, date = ? WHERE id = ?;',
      [user_email, title, progress, date, id])
    res.json(editToDo)
  } catch (err) {
    console.error(err)
  }
})

// delete a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deleteToDo = await db.query('DELETE FROM todos WHERE id = ?;', [id])
    res.json(deleteToDo)
  } catch (err) {
    console.error(err)
  }
})

// signup
app.post('/signup', async (req, res) => {
  const { email, password } = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  try {
    const signUp = await db.query(`INSERT INTO users (email, hashed_password) VALUES(?, ?)`,
      [email, hashedPassword])
  
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
    
    res.json({ email, token })
  } catch (err) {
    console.error(err)
    if (err) {
      res.json({ detail: err.detail})
    }
  }
})


// login
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const users = await db.query('SELECT * FROM users WHERE email = ?', [email])

    if (!users.rows.length) return res.json({ detail: 'User does not exist!' })
    
    const success = await bcrypt.compare(password, users.rows[0].hashed_password)
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })

    if (success) {
      res.json({ 'email' : users.rows[0].email, token})
    } else {
      res.json({ detail: "Login failed"})
    }
  } catch (err) {
    console.error(err)
  }
})




app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))
