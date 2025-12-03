import { Form, Input, Button } from "@heroui/react"

function Login() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
      >
        <Input
          isRequired
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your username"
          type="text"
        />

        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="password"
        />
        <Button color="primary" type="submit" fullWidth>
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login