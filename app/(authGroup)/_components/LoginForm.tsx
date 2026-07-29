"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { loginAction } from "../_action/loginAction";


const LoginForm = () => {

  const [state, action, pending] = useActionState(loginAction, null);

  console.log('state', state)

  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success(state.message)
    } else {
      // console.log('login failed')
      toast.error(state.message || 'login failed')
    }
  }, [state])


  return (
    <>
      <form action={action} className="space-y-4">
        <Card className="p-4 space-y-2">
          <Input name="email" type="email" placeholder="Enter your email" required />
          <Input name="password" type="password" placeholder="Enter your password" />
          <Button type="submit">
            {
              pending ? "Submitting" : "Login"
            }
          </Button>
        </Card>
      </form>
    </>
  );
};

export default LoginForm;