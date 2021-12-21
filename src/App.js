import logo from './logo.svg';
import './App.css';
import { Container, Typography } from '@mui/material';
import Managment from './components/Managment'

function App() {
  return (
    <Container maxWidth="lg">
      <Typography
        gutterBottom
        variant="h2"
        align ="center">
          Student management 
        </Typography>
      <Managment />
    </Container>
  );
}

export default App;
