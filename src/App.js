import './App.css';
import './components/styles.css'
import Table from './components/tableList'
import Jumbo from './components/jumbotron'

const App = () => {
  return (
    <div className="App">
      <Jumbo/>
      <Table/>
    </div>
  );
}

export default App;
