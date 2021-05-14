const Hello = ({ name, country }) => (
  <h1>
    {" "}
    Hello {name}. You are from {country}
  </h1>
);

const App = () => {
  return (
    <>
      <Hello name="alok" country="India" />
      <Hello name="luigi" country="France" />
    </>
  );
};

export default App;
