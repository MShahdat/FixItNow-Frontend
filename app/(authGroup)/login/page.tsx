import Link from "next/link";
import LoginForm from "../_components/LoginForm";



export default function LoginPage() {


  return (
    <div className="flex min-h-[90vh] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-gray-500">Enter you credentials to access you account</p>
        </div>
        <LoginForm />
        <div className='text-center -mt-4'>
          <p>New user?
            <Link href={"/register"} className='font-semibold text-decoration-line: underline'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}