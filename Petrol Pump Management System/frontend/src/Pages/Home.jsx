import { Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="mt-32 ml-28">
          <img src="/images/pump.png" height={350} width={350} />
        </div>
        <div className="">
          <div className="">
            <div className="m-16">
              <Link to="/tanks">
                <Card className="max-w-sm">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Tanks
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    View all the tanks you want to configure
                  </p>
                </Card>
              </Link>
            </div>
            <div className="m-16">
              <Link to="/products">
                <Card className="max-w-sm">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Products
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    View all the products you want to configure
                  </p>
                </Card>
              </Link>
            </div>
            <div className="m-16">
              <Link to="/stock">
                <Card className="max-w-sm">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Stocks
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    View all the stocks you want to configure
                  </p>
                </Card>
              </Link>
            </div>
          </div>
        </div>
        <div className="">
        <div className="m-16">
          <Link to="/transactions">
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Transactions
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                View all the transactions you want to configure
              </p>
            </Card>
          </Link>
        </div>
        <div className="m-16">
          <Link to="/account">
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Account
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                View all the accounts you want to configure
              </p>
            </Card>
          </Link>
        </div>
        <div className="m-16">
        <Link to="/reports">
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Report
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                View all the reports you want to print
              </p>
            </Card>
          </Link>
        </div>
        </div>
      </div>
    </>
  );
};

export default Home;
