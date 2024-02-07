import { useEffect, useState } from "react";
import "./App.css";
const ws = new WebSocket(
  "wss://ovg6tu6zw7.execute-api.us-east-1.amazonaws.com/prod/"
);

function App() {
  const [data, setData] = useState({
    source: "ZENDESK",
    eventype: "getInfo",
    email: "",
    matricula: "",
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    ws.onopen = () => {
      console.log("Conexion establecida");
    };
  }, []);

  const sendData = (e) => {
    e.preventDefault();
    const message = {
      action: "sendMessage",
      message: data
    };
    ws.send(JSON.stringify(message));
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]); 
    };
  };

  return (
    <>
      <form onSubmit={sendData}>
      <input
        type="text"
        placeholder="Email"
        value={data.email}
        className="border rounded-md mb-2 border-zinc-500 p-2 w-full text-black"
        onChange={(e) =>
          setData((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <input
        type="text"
        placeholder="Matricula"
        value={data.matricula}
        className="border rounded-md mb-2 border-zinc-500 p-2 w-full text-black"
        onChange={(e) =>
          setData((prev) => ({ ...prev, matricula: e.target.value }))
        }
      />
      <button 
      className="w-full p-2 border rounded-lg mb-2 text-white bg-neutral-800"
      type={"submit"}>Send Data</button>
      </form>
      {
        messages.map((message, index) => (
          <div key={index} className="border-b-2">
            <p>{message}</p>
          </div>
        ))
      }
    </>
  );
}

export default App;
