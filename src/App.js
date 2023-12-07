import logo from './logo.svg';
import './App.css';
import EditIcon  from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello World!
        </p>
        <Button variant="contained" startIcon={<EditIcon />}>Hello World</Button>
      </header>
    </div>
  );
}

export default App;
