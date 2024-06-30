'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Manage Your Tasks Efficiently with Our New SaaS Solution
          </h1>
          <p className="text-xl mb-8">
            Our task management software helps you stay organized and productive.
          </p>
          <Link href="/auth/signin">
            <button className="bg-white text-blue-600 py-3 px-6 rounded-full font-semibold">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Task Tracking</h3>
                <p>Keep track of your tasks and stay on top of your workload with ease.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Collaboration</h3>
                <p>Collaborate with your team and manage projects efficiently.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Reports & Analytics</h3>
                <p>Generate reports and analyze your progress with our built-in tools.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-200 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4">"This software has transformed the way I manage my tasks. Highly recommended!"</p>
                <p className="font-semibold">- John Doe</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4">"Excellent tool for collaboration. Our team has never been more productive."</p>
                <p className="font-semibold">- Jane Smith</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4">"The reporting features are fantastic. I can easily see where we need to improve."</p>
                <p className="font-semibold">- Michael Brown</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Sign up now and start managing your tasks more efficiently!</p>
          <Link href="/auth/signin">
            <button className="bg-white text-blue-600 py-3 px-6 rounded-full font-semibold">
              Sign Up Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
