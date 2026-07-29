// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col min-h-screen items-center justify-center'>
      <h2>Page Not Found</h2>
      <p>Could not find the requested resource.</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}