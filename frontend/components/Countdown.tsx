import React from "react";

const Countdown = () => {
  return (
    <div>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-white-100 text-black rounded-md text-neutral-content">
          <span className="countdown text-5xl">
            <span>14</span>
          </span>
          days
        </div>
        <div className="flex flex-col p-2 bg-white-100 text-black rounded-md">
          <span className="countdown text-5xl">
            <span>33</span>
          </span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-white-100 text-black rounded-md">
          <span className="countdown  text-5xl">
            <span>33</span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-white-100 text-black rounded-md">
          <span className="countdown  text-5xl">
            <span>33</span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

export default Countdown;
