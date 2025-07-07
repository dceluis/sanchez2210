import React from 'react';

function HeroSection() {
  return (
    <main className="mt-8">
      <div className="flex justify-center mx-auto max-w-7xl w-full">
        <div className="px-4 sm:px-8 xl:pr-16 lg:w-1/2 text-center lg:text-left">
          <img className="lg:hidden rounded-full w-56 md:w-64 m-auto mb-8" src="/img/portrait_small.jpeg" alt="Luis Sanchez portrait" />
          <div className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight lg:text-5xl lg:tracking-tight xl:text-6xl xl:tracking-tight">
            <span className="inline-flex">Luis makes</span>
            <span className="inline-flex overflow-hidden relative">
              <span className="absolute inset-0" style={{animation: 'flipWord 20s ease-in-out infinite', animationDelay: '0s'}}>AI</span>
              <span className="absolute inset-0 opacity-0" style={{animation: 'flipWord 20s ease-in-out infinite', animationDelay: '4s'}}>web</span>
              <span className="absolute inset-0 opacity-0" style={{animation: 'flipWord 20s ease-in-out infinite', animationDelay: '8s'}}>python</span>
              <span className="absolute inset-0 opacity-0" style={{animation: 'flipWord 20s ease-in-out infinite', animationDelay: '12s'}}>ruby</span>
              <span className="absolute inset-0 opacity-0" style={{animation: 'flipWord 20s ease-in-out infinite', animationDelay: '16s'}}>fast</span>
              <span className="opacity-0">python</span>
            </span>
            <br />
            <span className="inline-flex text-indigo-600">applications</span>
          </div>
          <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a href="#contact" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Get in touch
              </a>
            </div>
          </div>
        </div>
        <div className="hidden lg:block px-4 lg:w-1/2 sm:px-8 -mt-8">
          <img className="rounded-full w-56 md:w-96 mx-auto mb-8" src="/img/portrait_small.jpeg" alt="Luis Sanchez portrait" />
        </div>
      </div>
    </main>
  );
}

export default HeroSection;
