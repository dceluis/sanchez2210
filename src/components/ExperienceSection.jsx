import React from 'react';

function ExperienceSection() {
  return (
    <div className="mt-16">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
          <div></div>
          <div className="grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:grid-cols-2">
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img className="max-h-12" src="/img/checkmate.png" alt="ItsaCheckmate" />
            </div>
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img className="max-h-12" src="/img/tavour.png" alt="Tavour" />
            </div>
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img className="max-h-12" src="/img/t49.png" alt="Terminal49" />
            </div>
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img className="max-h-12" src="/img/suspendus-h.png" alt="Suspend'us" />
            </div>
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img className="max-h-12" src="/img/syncta-h.png" alt="Syncta" />
            </div>
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img className="max-h-12 invert" src="/img/agency-h.png" alt="Agency LA" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;
