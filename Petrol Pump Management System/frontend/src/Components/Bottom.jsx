import { Footer } from "flowbite-react";
import React from "react";

const Bottom = () => {
  return (
    <Footer container className="bg-gradient-to-l from-blue-800 to-black">
      <div className="w-full text-center">
        <Footer.Copyright
          className="text-white"
          href="/"
          by="PETROL PUMP™"
          year={2024}
        />
      </div>
    </Footer>
  );
};

export default Bottom;
