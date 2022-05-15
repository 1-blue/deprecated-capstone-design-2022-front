import { useState } from "react";

const Login = () => {
  const [Id, setID] = useState();
  const [password, setPassword] = useState();

  const changeId = (e) => {
    setID(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  console.log(password);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Login</label>
        <input type="text" onChange={changeId}></input>
        <label>Password</label>
        <input type="password" onChange={changePassword}></input>

        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
