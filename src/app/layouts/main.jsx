import React from "react";

const Main = () => {
  const array = [
    { name: "igor", key: 1 },
    { name: "Lesya", key: 2 },
    { name: "Matvei", key: 3 },
    { name: "Miks", key: 4 },
  ];

  const obj = {
    obj1: { name: "igor", key: 1 },
    obj2: { name: "Lesya", key: 2 },
    obj3: { name: "Matvei", key: 3 },
    obj4: { name: "Miks", key: 4 },
  };

  return (
    <>
      <ul>
        {array.map((arr) => (
          <li key={arr.key}>{arr.name}</li>
        ))}
      </ul>

      <ul>
        {Object.keys(obj).map((o) => (
          <li key={obj[o].key}>{obj[o].name}</li>
        ))}
      </ul>
    </>
  );
};

export default Main;
