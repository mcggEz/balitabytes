import Link from 'next/link'


const Navbar = () => {
  return (
    <div className="bg-red-500 p-5" >
    <div className="text-4xl font-bold">Balitabytes</div>

    <ul className='flex gap-2'>
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
 
    <Link href="/news">News</Link>
    <Link href="/subscribe">Subscribe</Link>

    
    </ul>
  </div>
  )
}

export default Navbar