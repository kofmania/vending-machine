import "./App.css";
import { useMachine, products } from "./components/useMachine";
const cashType = [100, 500, 1000, 5000, 10000];

function App() {
  const machine = useMachine();

  return (
    <div>
      <h1 className="mb-10 text-4xl">Vending machine</h1>
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
        <div>
          <h2>Reset</h2>
          <button onClick={() => machine.reset(true, 0)}>reset</button>
        </div>
        <div className="h-1 bg-slate-400"></div>
        <div className="flex justify-center">
          <div className="grid max-w-md grid-cols-2 grid-rows-3">
            <h1 className="text-lg font-bold">Card</h1>
            <h1 className="text-lg font-bold">{machine.card ? "Yes" : "No"}</h1>
            <h1 className="text-lg font-bold">Cash </h1>
            <h1 className="text-lg font-bold">{machine.cash}</h1>
            <h1 className="text-lg font-bold">Selected item</h1>
            <h1 className="text-lg font-bold">
              {machine.selected === undefined
                ? "-"
                : products[machine.selected].name}
            </h1>
          </div>
        </div>
        <div className="h-1 bg-slate-400"></div>
        <div className="flex flex-col items-center">
          <h1>Output</h1>
          <div className="grid max-w-md grid-cols-2 grid-rows-3">
            <h1 className="text-lg font-bold">Item</h1>
            <h1 className="text-lg font-bold">{machine.result}</h1>
            <h1 className="text-lg font-bold">Cash return</h1>
            <h1 className="text-lg font-bold">{machine.returns}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
