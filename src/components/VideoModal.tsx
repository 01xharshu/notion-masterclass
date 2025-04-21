'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { useVideoModal } from './VideoModalContext';

export default function VideoModal() {
  const { isOpen, closeModal } = useVideoModal();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center bg-black/50">
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform rounded-lg bg-white shadow-xl">
              {/* Close Button */}
              <button
                onClick={closeModal}
                aria-label="Close Video"
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                type="button"
              >
                <AiOutlineClose size={24} />
              </button>

              {/* Video iframe */}
              <div className="w-full aspect-video p-4">
                <iframe
                  src="https://www.youtube.com/embed/wTSFbjT8UL4?si=UoUoOhJbielPSZ3w"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-md"
                />
              </div>

              {/* Centered Close Button */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="button"
                >
                  <AiOutlineClose size={20} />
                  Close Video
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
