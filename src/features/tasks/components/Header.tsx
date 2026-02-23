import { Cog8ToothIcon, BellIcon } from '@heroicons/react/24/solid'

function Header() {
  return (
    <header className="flex justify-between items-center !p-5 bg-gray-900 text-white">
        <div className='!mr-10 !p-2 transition-all hover:text-gray-300 '>
            <a href="#">SmartTask</a>
        </div>
        <div className='flex-1'>
        <input
                type="text"
                placeholder="Search..."
                className=""
            />
            </div>
        <div className="flex items-center gap-5">
 
        <div className="!p-1.5 rounded hover:bg-gray-800 cursor-pointer transition-colors">
            <Cog8ToothIcon className="w-6 h-6 text-white" />
        </div>

        <div className="!p-1.5 rounded hover:bg-gray-800 cursor-pointer transition-colors">
            <BellIcon className="w-6 h-6 text-white" />
        </div>

        <a className="transition-all hover:!text-gray-200" href="#">Sign In</a>
        <a className="!p-1 rounded-lg bg-red-600 transition-all hover:bg-red-500" href="#">Sign Up</a>
        </div>
    </header>
  )
}

export default Header