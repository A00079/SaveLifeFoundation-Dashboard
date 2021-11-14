import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';
import customAxios from "../../../../utils/interceptor";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function EditDeleteCake() {
  const [getCases, setCases] = useState([]);

  useEffect(async () => {
    const result = await customAxios.get(`case/allcases`);
    if (result.data.status == 'success') {
      setCases(result.data.cases);
    }
  }, []);

  const handleCaseDelete = async (id) =>{
    let confirm = window.confirm('Are you sure you want to delete.');
    if(confirm){
      const result = await customAxios.delete(`case/delete/${id}`);
      if (result.data.status == 'success') {
        alert('Deleted Successfully');
      }
    }
  }

  return (
    <React.Fragment>
      <div class="container px-5 py-4 mx-auto">
        <div class="flex flex-col text-center w-full">
          <h1 class="sm:text-2xl text-left text-2xl font-medium title-font mb-1 text-gray-900">Manage Cases</h1>
          <p class="text-left text-xs text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
        </div>
      </div>
      <div className="flex flex-col p-10">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Needers Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Donation Required
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Content
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getCases.map((el) => (
                    <tr key={el.title}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <img class="w-40 object-cover object-center" src={el.imageUrl} alt="blog" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{el.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{el.needersName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{el.donationRequirement}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900" style={{ width: '280px !important', whiteSpace: 'normal' }}>{el.content}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a onClick={() => { handleCaseDelete(el.id) }} href="#" className="cursor-pointer text-white rounded-sm  bg-red-500 p-2 text-xs">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
