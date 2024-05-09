import { Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const ReportSelection = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="m-16">
          <Link to="/report-one-day">
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                One Day Report
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Print or save one day report
              </p>
            </Card>
          </Link>
        </div>
        <div className="m-16">
          <Link to="/report-three-day">
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Three Days Report
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Print or save three days report
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ReportSelection;
