import React from 'react';
import { FaTimes } from 'react-icons/fa';
import CalculatorForm from './CalculatorForm';

const CalculatorModal = ({ open, control }) => {
  const coin = {
    uuid: 'Qwsogvtv82FCd',
    symbol: 'BTC',
    name: 'Bitcoin',
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-stone-50/70 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-background absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="p-10 relative">
            <div
              className="absolute right-0 top-0 w-5 h-5 rounded-full bg-textPrimary text-background flex items-center justify-center cursor-pointer m-2"
              onClick={control}
            >
              <i className="text-sm">
                <FaTimes />
              </i>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-textPrimary mb-5">
              Calculator
            </h2>
            {/* <form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="to" className="sr-only">
                    To
                  </label>
                  <input
                    id="to"
                    name="to"
                    type="number"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-background focus:border-background focus:z-10 sm:text-sm"
                    placeholder="Name of Category"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={true}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-background/80 hover:bg-background/ focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
                >
                  Add Category
                </button>
              </div>
            </form> */}
            <CalculatorForm coin={coin} />
          </div>
        </div>
      </>
    )
  );
};

export default CalculatorModal;
