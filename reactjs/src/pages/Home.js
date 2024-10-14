import "../App.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Students List Homepage</h1>
        <Link to="/dashboard">Dashboard</Link>
      </header>
    </div>
  );
}

export default Home;
