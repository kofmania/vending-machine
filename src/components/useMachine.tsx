import React, { useEffect, useState } from "react";

type Product = { name: string; price: number; count: number };
const products: Array<Product> = [
  { name: "Coke", price: 1100, count: 3 },
  { name: "Water", price: 600, count: 3 },
  { name: "Coffee", price: 700, count: 3 },
];

const useMachine = () => {
  const [countCoke, setCountCoke] = useState(products[0].count);
  const [countWater, setCountWater] = useState(products[0].count);
  const [countCoffee, setCountCoffee] = useState(products[0].count);
  const [selected, setSelected] = useState<number | undefined>();
  const [cash, setCash] = useState(0);
  const [card, setCard] = useState(false);
  const [working, setWorking] = useState(false);
  const [result, setResult] = useState("");
  const [returns, setReturns] = useState(0);

  useEffect(() => {
    if (working || selected === undefined) return;

    if (card || cash >= products[selected].price) {
      console.log("set working");
      setWorking(true);
    }
  }, [selected, cash, card, working]);

  useEffect(() => {
    if (selected !== undefined && working) {
      console.log("working...");
      let need = products[selected].price;
      let used = 0;
      let rest = cash;

      if (cash > 0 && need > 0) {
        rest -= need;
        used = need;

        if (rest < 0) {
          used = need + rest;
          need = rest;
          rest = 0;
        } else {
          need = 0;
        }

        console.log(["consume cash", used].join(" "));
      }

      if (need > 0 && card) {
        console.log("request card");
        console.log(["consume card", need].join(" "));
        need = 0;
      }

      switch (selected) {
        case 1:
          setCountWater(countWater - 1);
          break;
        case 2:
          setCountCoffee(countCoffee - 1);
          break;
        default: // 0
          setCountCoke(countCoke - 1);
          break;
      }

      console.log("working done");
      const item = products[selected].name;
      console.log(["drop", item].join(" "));
      setResult(item);
      setWorking(false);
      reset(false, rest);
    }
  }, [working]);

  const addCash = (more: number) => {
    setCash(cash + more);
  };

  const reset = (cancel: boolean, rest: number) => {
    console.log("reset");

    if (cancel) {
      setResult("");
      console.log(["return cash", cash].join(" "));
      setReturns(cash);
      setCash(0);
    } else {
      if (rest > 0) {
        console.log(["return cash", rest].join(" "));
      }

      setCash(0);
      setReturns(rest);
    }

    if (card) {
      console.log("eject card");
      setCard(false);
    }

    setSelected(undefined);
  };

  return {
    cash,
    card,
    countCoke,
    countWater,
    countCoffee,
    selected,
    returns,
    result,
    setCard,
    setSelected,
    addCash,
    reset,
  };
};

export { useMachine, products };
