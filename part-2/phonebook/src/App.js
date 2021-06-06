import React, { useState, useEffect } from "react";
import { getAll, create, deletePerson, update } from "./services";

const Filter = ({ findNames, find }) => (
  <form>
    filter show with: <input onChange={findNames} value={find} />
  </form>
);

const PersonForm = ({
  updateName,
  newName,
  updateNumber,
  newNumber,
  addName,
}) => (
  <form>
    <div>
      name: <input onChange={updateName} value={newName} />
    </div>
    <div>
      number: <input onChange={updateNumber} value={newNumber} />
    </div>
    <div>
      <button type="submit" onClick={addName}>
        add
      </button>
    </div>
  </form>
);

const Persons = ({ persons, find, removePerson }) => (
  <ul>
    {persons
      .filter((item) => item.name.toLowerCase().includes(find))
      .map((item) => (
        <li key={item.id}>
          {item.name} {item.number}
          <button onClick={(event) => removePerson(event, item.id)}>
            Delete
          </button>
        </li>
      ))}
  </ul>
);

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notify">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [find, setFind] = useState("");
  const [notification, setNotification] = useState(null);

  const fetchPersons = () => {
    getAll().then((data) => {
      setPersons(data);
    });
  };

  useEffect(() => fetchPersons(), []);

  const updateName = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const updateNumber = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const findNames = (event) => {
    event.preventDefault();
    setFind(event.target.value.toLowerCase());
  };

  const removePerson = (event, id) => {
    event.preventDefault();
    deletePerson(id).catch((err) => {
      setTimeout(() => setNotification(`the name was already removed`), 5000);
    });
    fetchPersons();
  };

  const addName = (event, message) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const found = persons.filter((item) => item.name === newName)[0];
    if (found) {
      if (
        window.confirm(
          `${newName} already exists in phonebook. Do you want to replace existing number with a new one?`
        )
      ) {
        update(found.id, newPerson).then(() => fetchPersons()).catch(err => alert('could not update'));
      }
      setNewNumber("");
      setNewName("");
    } else {
      create(newPerson).then((response) => {
        const newPersons = [...persons];
        newPersons.push(response);
        setPersons(newPersons);
        setNewNumber("");
        setNewName("");
        setNotification(`added ${newPerson.name} to list`);
        setTimeout(() => setNotification(null), 5000);
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Filter findNames={findNames} find={find} />
      <h2>Add new</h2>
      <PersonForm
        updateName={updateName}
        newName={newName}
        updateNumber={updateNumber}
        newNumber={newNumber}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} find={find} removePerson={removePerson} />
    </div>
  );
};

export default App;
