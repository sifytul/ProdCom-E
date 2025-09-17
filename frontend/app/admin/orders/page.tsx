import InputField from "@/components/shared/InputField";

import React from "react";
import { SelectFilter } from "./SelectFilter";
import { DateFilter } from "./DateFilter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TfiExport } from "react-icons/tfi";

type Props = {};

const OrdersPage = (props: Props) => {
  return (
    <div className="grid grid-cols-12 gap-4 mt-4">
      {/* Filter  */}
      <div className="bg-white p-4 rounded-md col-span-3">
        <InputField
          type="text"
          placeholder="Order number, User, etc..."
          label="Search"
        />

        <div className="">
          <label>Status</label>
          <SelectFilter />
        </div>
        <div className="">
          <label>User</label>
          <SelectFilter />
        </div>
        <div className="">
          <label>Created At</label>
          <div className="flex items-center gap-2">
            <DateFilter />
            <ArrowRight className="h-6 w-6" />
            <DateFilter />
          </div>
        </div>
      </div>

      {/* order list  */}
      <div className="col-span-9 bg-white">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Orders</h1>
          <Button variant="outline">
            <TfiExport className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>1000</td>
                <td>Pending</td>
                <td>12-12-2021</td>
                <td>
                  <button className="btn btn-primary">View</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>John Doe</td>
                <td>1000</td>
                <td>Pending</td>
                <td>12-12-2021</td>
                <td>
                  <button className="btn btn-primary">View</button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>John Doe</td>
                <td>1000</td>
                <td>Pending</td>
                <td>12-12-2021</td>
                <td>
                  <button className="btn btn-primary">View</button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>John Doe</td>
                <td>1000</td>
                <td>Pending</td>
                <td>12-12-2021</td>
                <td>
                  <button className="btn btn-primary">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
