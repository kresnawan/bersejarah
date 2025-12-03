import { Form, Input, Button } from "@heroui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    
    if (username == "admin" && password == "admin123") {
      alert("Login berhasil, anda akan diarahkan ke dashboard");
      sessionStorage.setItem("user", "admin");
      navigate("/dashboard/data")
    } else {
      alert("Username tidak ditemukan, atau password salah");
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button color="primary" type="submit" fullWidth>
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login