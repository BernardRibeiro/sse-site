import { useState }from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState()

  const connectUser = (userId: string) => {
    const events = new EventSource(`http://localhost:8888/events?user=${userId}`);
    
    const getData = (event: any) =>{
      const data = event.data
      setMessage(data)
    }

    events.onmessage = e => getData(e);

    events.onerror = e => {
      console.log(e)
      events.close();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => connectUser('bernard')}>Connect User Bernard</button>
        <button onClick={() => connectUser('maria')}>Connect User Maria</button>

        <label>{ JSON.stringify(message) }</label>
      </header>
    </div>
  );
}

export default App;
