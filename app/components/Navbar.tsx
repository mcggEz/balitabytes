import Link from 'next/link'


const Navbar = () => {
  return (
    <div className="bg-blue-200 p-5" >
    <div className="text-4xl font-bold flex justify-center items-center">Balitabytes</div>

    <ul className='flex gap-2 justify-center items-center pt-5'>
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
    <Link href="/subscribe">Subscribe</Link>
    </ul>
        {/* toggle button for darkmode */}
<div className='flex gap-2 justify-center items-center pt-5'>      <button className='bg-gray-200 p-2 rounded-md'>Darkmode</button>
        <button className='bg-gray-200 p-2 rounded-md'>Lightmode</button>
        <button className='bg-gray-200 p-2 rounded-md'>Toggle</button></div>






  


  </div>
  )
}

export default Navbar