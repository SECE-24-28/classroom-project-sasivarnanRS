function Guss() {
    const [guess,setGuss] = useState("");
  return (
    <div>
      Guess
      <input type="text" value={guess} onChange={(e) => setGuss(e.target.value)} > 
      </input> 
      <h3>Your guess is: {guess}</h3>

    </div>
  );
}
import default Guss;