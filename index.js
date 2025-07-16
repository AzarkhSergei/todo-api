const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let currentId = 1;

app.post('/tasks', (req, res) => {
    const {text, status} = req.body;

    if (!text || !['in progress', 'completed'].includes(status)){
        return res.status(400).json({ error: 'Invalid data. Both text and valid status are required.' });
    }

    const newTask = {
        id: currentId++,
        text,
        status,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/tasks', (req, res) => {
    const {status} = req.query;

    if(status){
        if(!['in progress', 'completed'].includes(status)){
            return res.status(400).json({ error: 'Invalid status for filtering.' });
        }
        const filteredTasks = tasks.filter(task => task.status === status);
        return res.json(filteredTasks);
    }

    res.json(tasks)
});

app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status, text } = req.body;
    
    if (text !== undefined) {
        return res.status(400).json({ error: 'Updating text is not allowed.' });
    }
    
    if (!['in progress', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status.' });
    }
    
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
    }

    task.status = status;
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found.' });
    }
  
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.json(deletedTask);
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
