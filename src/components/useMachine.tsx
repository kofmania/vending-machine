import React, { useEffect, useState } from "react";

type Product = { name: string; price: number; count: number };
const products: Array<Product> = [
  { name: "coke", price: 1100, count: 3 },
  { name: "water", price: 600, count: 3 },
  { name: "coffee", price: 700, count: 3 },
];
type Props = {};

const useMachine = (props: Props) => {
  const [countCoke, setCountCoke] = useState(products[0].count);
  const [countWater, setCountWater] = useState(products[0].count);
  const [countCoffee, setCountCoffee] = useState(products[0].count);
  const [selected, setSelected] = useState<number | undefined>();
  const [cash, setCash] = useState(0);
  const [card, setCard] = useState(false);
  const [work, setWork] = useState(false);

  useEffect(() => {
    if (selected !== undefined) {
      if (card) {
        setWork(true);
      } else {
        if (cash >= products[selected].price) {
          setWork(true);
        }
      }
    }
  }, [selected, cash, card]);

  useEffect(() => {
    if (work) {
      console.log("working...");
      if (card) {
        // TODO request card
        console.log("request card");
      } else {
        setCash(cash - products[selected!].price);
        console.log("consume cash", products[selected!].price);
      }

      setTimeout(() => {
        setWork(false);
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
        reset();
      }, 500);
    }
  }, [work]);

  const addCash = (more: number) => {
    setCash(cash + more);
  };

  const reset = () => {
    console.log("reset");

    if (cash > 0) {
      console.log("return cash", cash);
    }

    if (card) {
      console.log("return card");
    }

    setSelected(undefined);
    setCash(0);
    setCard(false);
  };

  return {
    cash,
    card,
    countCoke,
    countWater,
    countCoffee,
    selected,
    setCard,
    setSelected,
    addCash,
    reset,
  };
};

export { useMachine, products };
