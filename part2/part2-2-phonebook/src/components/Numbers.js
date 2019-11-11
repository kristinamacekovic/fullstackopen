import React from "react";

const Numbers = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(person => (
        <div key={person.name}>
          <p>
            {person.name}: {person.number}
            <button onClick={() => deletePerson(person.id)}>Delete</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export { Numbers };
