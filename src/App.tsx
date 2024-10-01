import "./App.css";
import InputCard from "./components/InputCard";
import InputCash from "./components/InputCash";
import { useMachine, products } from "./components/useMachine";
import Output from "./components/Output";

const cashType = [100, 500, 1000, 5000, 10000];
function App() {
  const machine = useMachine({});

  return (
    <div>
      <h1 className="mb-10">Vending machine</h1>
      <div>
        <div>
          <h2>Cash</h2>
          {cashType.map((type) => (
            <button
              className="mr-4"
              key={type}
              onClick={() => machine.addCash(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div>
          <h2>Card</h2>
          <button onClick={() => machine.setCard(!machine.card)}>
            my card
          </button>
        </div>
        <div>
          <h2>Product</h2>
          {products.map((prod, index) => {
            const count =
              index === 0
                ? machine.countCoke
                : index === 1
                ? machine.countWater
                : machine.countCoffee;

            return (
              <button
                key={prod.name}
                className="mr-4"
                disabled={count === 0}
                onClick={() => machine.setSelected(index)}
              >
                {`${prod.name} ${prod.price} ( ${count} )`}
              </button>
            );
          })}
        </div>
        <div className="h-1 bg-slate-400"></div>
        <h1>Card {machine.card ? "Yes" : "No"}</h1>
        <h1>Cash {machine.cash}</h1>
        <h1>Selected item {machine.selected}</h1>
        <div className="h-1 bg-slate-400"></div>
        <Output />
      </div>
    </div>
  );
}

export default App;
