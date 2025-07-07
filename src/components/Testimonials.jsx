import React from 'react';

function Testimonials() {
  return (
    <>
      {/* First Testimonial Section */}
      <section className="bg-gray-50 overflow-hidden mt-32 py-12 md:py-20 lg:py-24" id="testimonials">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <svg className="absolute top-full right-full transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2" width="404" height="404" fill="none" viewBox="0 0 404 404" role="img" aria-labelledby="svg-workcation">
            <title id="svg-workcation">Workcation</title>
            <defs>
              <pattern id="ad119f34-7694-4c31-947f-5c9d249b21f3" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)" />
          </svg>

          <div className="relative">
            <img className="mx-auto h-16" src="img/suspendus-h.png" alt="Suspend'us" />
            <blockquote className="mt-10">
              <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
                <p>
                  &ldquo;
                  Luis is a very competent Back End developer. He has a very good understanding of the client's needs, and is able to suggest some improvements to the project at each milestone. He doesn't hesitate to give his opinion and come up with alternatives which are always welcome. We have appreciated to work with Luis, always available and a source of proposals. We recommend anyone to hire Luis.
                  &rdquo;
                </p>
              </div>
              <footer className="mt-8">
                <div className="md:flex md:items-center md:justify-center">
                  <div className="md:flex-shrink-0">
                    {/* <img className="mx-auto h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                  </div>
                  <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                    <div className="text-base font-medium text-gray-900">Laure Oriol</div>
                    <svg className="hidden md:block mx-1 h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 0h3L9 20H6l5-20z" />
                    </svg>
                    <div className="text-base font-medium text-gray-500">Founder, Suspend'us</div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Second Testimonial Section */}
      <section className="bg-gray-800">
        <div className="max-w-7xl mx-auto md:grid md:grid-cols-2 md:px-6 lg:px-8">
          <div className="py-12 px-4 sm:px-6 md:flex md:flex-col md:py-16 md:pl-0 md:pr-10 md:border-r md:border-gray-900 lg:pr-16">
            <div className="md:flex-shrink-0">
              <img className="h-12" src="img/agency-h.png" alt="Agency LA" />
            </div>
            <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
              <div className="relative text-lg font-medium text-white md:flex-grow">
                <svg className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-600" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative">
                  We hired Luis to enhance our engineering effort for a Ruby on Rails project. We enjoyed his presence and would certainly recommend him. He's an excellent coder who cares not just about getting the code right but also about the bigger picture of the project, which is very important to us.
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex items-start">
                  {/* <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white mr-4"> */}
                  {/*   <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                  {/* </div> */}
                  <div>
                    <div className="text-base font-medium text-white">Jake Correa</div>
                    <div className="text-base font-medium text-gray-200">Tech Lead & Founder, Agency LA</div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
          <div className="py-12 px-4 border-t-2 border-gray-900 sm:px-6 md:py-16 md:pr-0 md:pl-10 md:border-t-0 md:border-l lg:pl-16">
            <div className="md:flex-shrink-0">
              <img className="h-12 contrast-50 invert" src="img/tavour.png" alt="Tavour" />
            </div>
            <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
              <div className="relative text-lg font-medium text-white md:flex-grow">
                <svg className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-600" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative">
                  Luis is an excellent engineer. He is experienced, professional, proactive, and creative. While initially hired to upgrade our Ruby on Rails Platform it quickly became clear that his ability to contribute to the quality of the system reached far beyond upgrading it. He assisted across the board from improving test suite runtimes to reducing deployment costs and solving complex throughput bottlenecks. He rose to every challenge. I would hire Luis again in a heartbeat.
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex items-start">
                  {/* <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white mr-4"> */}
                  {/*   <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                  {/* </div> */}
                  <div>
                    <div className="text-base font-medium text-white">Rafik Robeal</div>
                    <div className="text-base font-medium text-gray-200">CTO, Tavour</div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;