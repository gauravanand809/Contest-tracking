import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src="/logo.png" width={32} height={32} alt="logo" />
            <span className="selfFlowbite-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Contest Tracker
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link
              href="/bookmark"
              className="text-sm text-gray-500 dark:text-white hover:underline"
            >
              BookMarks 🔖
            </Link>
            <Link
              href="/pastContest"
              className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
            >
              Past contest
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
