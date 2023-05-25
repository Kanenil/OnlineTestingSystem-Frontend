import {Component} from '@angular/core';

@Component({
  selector: 'course-item-skeleton',
  template: `
    <div
      class="animate-pulse relative bg-white dark:bg-[#1d2144] shadow-md rounded-md overflow-hidden mb-10 animate-fadeInUp">
      <a class="w-full block relative bg-gray-300 dark:bg-gray-700">
        <svg class="py-5 text-gray-200 w-full h-28 object-center object-cover" xmlns="http://www.w3.org/2000/svg"
             aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
          <path
            d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
        </svg>
      </a>
      <div class="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
        <h3>
          <div
            class="font-bold text-black dark:text-white text-xl sm:text-2xl block mb-4 hover:text-[#4a6cf7] dark:hover:text-[#4a6cf7]">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          </div>
        </h3>
        <div
          class="text-base text-[#959cb1] font-medium pb-6 mb-6 border-b border-[#959cb1] border-opacity-10 dark:border-white dark:border-opacity-10">
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="flex items-center">
          <div
            class="flex items-center pr-5 mr-5 xl:pr-3 2xl:pr-5 xl:mr-3 2xl:mr-5 ">
            <div class="max-w-[50px] w-full h-[50px] rounded-full overflow-hidden mr-4">
              <svg class="text-gray-200 w-full h-full dark:text-gray-700" aria-hidden="true" fill="currentColor"
                   viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="w-full">
              <div>
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CourseItemSkeletonComponent {

}
