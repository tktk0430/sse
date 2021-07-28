import React, { useState } from 'react';
import './App.css';

const es = new EventSource("http://localhost:5000/events")

const App = () => {
  const [data, setData] = useState(getInitialFlightData())
  const updateFlightState = (flightState: any) => {
    let newData = data.map(item => {
      if (item.flight === flightState.flight) {
        item.state = flightState.state;
      }
      return item;
    });
    setData(newData);
  }

  const startConnection = () => {
    es.onmessage = e => updateFlightState(JSON.parse(e.data))
  }

  const closeConnection = () => {
    es.close()
  }

  return (
    <div className="App">
      <input type="button" onClick={startConnection} value="コネクションをつくる" />
      <input type="button" onClick={closeConnection} value="コネクションを閉じる" />
      <table>
        <thead>
          <tr>
            <th>origin</th>
            <th>flight</th>
            <th>arrival</th>
            <th>state</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => {
            return (
              <tr>
                <td>{d.origin}</td>
                <td>{d.flight}</td>
                <td>{d.arrival}</td>
                <td>{d.state}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

const getInitialFlightData = () => (
  [
    {
      origin: "London",
      flight: "A123",
      arrival: "08:15",
      state: ""
    },
    {
      origin: "Berlin",
      flight: "D654",
      arrival: "08:45",
      state: ""
    },
    {
      origin: "New York",
      flight: "U213",
      arrival: "09:05",
      state: ""
    },
    {
      origin: "Buenos Aires",
      flight: "A987",
      arrival: "09:30",
      state: ""
    },
    {
      origin: "Rome",
      flight: "I768",
      arrival: "10:10",
      state: ""
    },
    {
      origin: "Tokyo",
      flight: "G119",
      arrival: "10:35",
      state: ""
    }
  ]
)
export default App;
