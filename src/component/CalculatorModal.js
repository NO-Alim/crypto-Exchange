import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import CalculatorForm from './CalculatorForm';

const CalculatorModal = ({ open, control }) => {
  //default currency Bitcoin
  const coin = {
    uuid: 'Qwsogvtv82FCd',
    symbol: 'BTC',
    name: 'Bitcoin',
  };

  //when modal open set body scroll none
  useEffect(() => {
    const func = () => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    };
    func();

    return () => {
      func();
    };
  }, [open]);

  return (
    open && (
      <>
        <div className="fixed w-screen h-screen inset-0 z-10 bg-stone-50/70 cursor-pointer flex items-center justify-center overflow-hidden">
          <div
            className="fixed w-screen h-screen bg-transparent z-10"
            onClick={control}
          ></div>
          <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-background z-[11]">
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
              <CalculatorForm coin={coin} />
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default CalculatorModal;
