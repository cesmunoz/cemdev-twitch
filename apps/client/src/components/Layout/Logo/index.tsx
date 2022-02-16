import React from 'react';

function Logo() {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href="#" className="flex">
      <svg
        className="mr-3 h-10"
        viewBox="0 0 52 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z"
          fill="#76A9FA"
        />
        <path
          d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z"
          fill="#A4CAFE"
        />
        <path
          d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z"
          fill="#1C64F2"
        />
      </svg>
      <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
        CemBot
      </span>
    </a>
  );
}

export default Logo;
