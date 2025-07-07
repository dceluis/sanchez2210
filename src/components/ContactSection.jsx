import React from 'react';

function ContactSection() {
  return (
    <section className="mt-16" id="contact">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Twitter */}
          <a 
            href="https://twitter.com/dceluis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-white shadow-md rounded-lg border border-gray-200 p-6 transition duration-200 ease-in-out hover:shadow-lg"
          >
            <div className="flex items-center justify-center">
              <i className="fab fa-twitter text-3xl text-gray-700 group-hover:text-indigo-600 transition duration-200"></i>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900 font-normal">Twitter</h3>
              <p className="mt-2 text-gray-600">@dceluis</p>
            </div>
          </a>
          
          {/* Email */}
          <a 
            href="mailto:contact@luisfelipesanchez.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-white shadow-md rounded-lg border border-gray-200 p-6 transition duration-200 ease-in-out hover:shadow-lg"
          >
            <div className="flex items-center justify-center">
              <i className="fas fa-envelope text-3xl text-gray-700 group-hover:text-indigo-600 transition duration-200"></i>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900 font-normal">Email</h3>
              <p className="mt-2 text-gray-600 truncate">contact@luisfelipesanchez.me</p>
            </div>
          </a>
          
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/luis-sanchez-dev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-white shadow-md rounded-lg border border-gray-200 p-6 transition duration-200 ease-in-out hover:shadow-lg"
          >
            <div className="flex items-center justify-center">
              <i className="fab fa-linkedin text-3xl text-gray-700 group-hover:text-indigo-600 transition duration-200"></i>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900 font-normal">LinkedIn</h3>
              <p className="mt-2 text-gray-600">Luis Sanchez</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;