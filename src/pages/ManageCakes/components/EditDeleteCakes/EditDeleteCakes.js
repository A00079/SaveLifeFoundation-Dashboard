import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';
import customAxios from "../../../../utils/interceptor";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function EditDeleteCake() {
  const [getCases, setCases] = useState([]);
  const [input, setInput] = useState({});

  const [editCaseData, setEditCaseData] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [imageFilePreview, setImageFilePreview] = React.useState('');
  const [imageFile, setImageFile] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditCaseData = (data) => {
    console.log('data', data);
    setEditCaseData(data);
    handleClickOpen();
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect( () => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const result = await customAxios.get(`case/allcases`);
    if (result.data.status == 'success') {
      setCases(result.data.cases);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleImageChange = (event) => {
    setImageFilePreview(URL.createObjectURL(event.target.files[0]));
    setImageFile(event.target.files[0]);
  }
  const handleCaseDelete = async (id) => {
    let confirm = window.confirm('Are you sure you want to delete.');
    if (confirm) {
      const result = await customAxios.delete(`case/delete/${id}`);
      if (result.data.status == 'success') {
        alert('Deleted Successfully');
      }
    }
  }

  const handleSave = () => {
    let casesData = input;
    casesData['imagefile'] = !!imageFile ? imageFile : editCaseData.imageUrl;

    var bodyFormData = new FormData();
    bodyFormData.append('title', !!casesData.title ? casesData.title : editCaseData.title);
    bodyFormData.append('imageUrl', casesData.imagefile);
    bodyFormData.append('donationRequirement', !!casesData.donationRequirement ? casesData.donationRequirement : editCaseData.donationRequirement);
    bodyFormData.append('needersName', !!casesData.needersName ? casesData.needersName : editCaseData.needersName);
    bodyFormData.append('content', !!casesData.content ? casesData.content : editCaseData.content);
    bodyFormData.append('rate', !!casesData.rate ? casesData.rate : editCaseData.rate);
    bodyFormData.append('current', !!casesData.current ? casesData.current : editCaseData.current);
    bodyFormData.append('disease', !!casesData.disease ? casesData.disease : editCaseData.disease);

    axios({
      method: "PATCH",
      url: `https://savelifefoundation.org.in/api/v1/case/edit/${editCaseData.id}`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert('Case Saved Successfully');
        setImageFilePreview(false);
        setImageFile('');
        handleClose();
        fetchCases();
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  return (
    <React.Fragment>
      <div class="container px-5 py-4 mx-auto">
        <div class="flex flex-col text-center w-full">
          <h1 class="sm:text-2xl text-left text-2xl font-medium title-font mb-1 text-gray-900">Manage Cases</h1>
          <p class="text-left text-xs text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
        </div>
      </div>
      <div className="flex flex-col p-10 px-0">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-2">
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
                      Current
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Disease
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
                          <img class="w-28 object-cover object-center" src={el.imageUrl} alt="blog" />
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
                        <div className="text-sm text-gray-900">{el.current}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{el.rate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{el.disease}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900" style={{ width: '280px !important', whiteSpace: 'normal' }}>{el.content}</div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <a onClick={() => handleEditCaseData(el)} className="cursor-pointer text-white rounded-sm  bg-green-500 p-2 text-xs">
                          EDIT
                        </a>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <a onClick={() => { handleCaseDelete(el.id) }} href="#" className="cursor-pointer text-white rounded-sm  bg-red-500 p-2 text-xs">
                          DELETE
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
      {
        !!editCaseData ?
          <div>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Edit Case"}</DialogTitle>
              <DialogContent>
                <div className='w-full'>
                  <div className='w-full'>
                    {
                      !!imageFilePreview ?
                        <img key={imageFilePreview} class="w-full object-cover object-center" src={imageFilePreview} alt="blog" />
                        : <img key={editCaseData.imageUrl} class="w-full object-cover object-center" src={editCaseData.imageUrl} alt="blog" />
                    }
                    <div className='relative'>
                      <button class="bg-blue-500 hover:bg-blue-light text-white font-bold py-2 px-4 w-full inline-flex items-center">
                        <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                        </svg>
                        <span class="ml-2">Upload Offer Image</span>
                      </button>
                      <input
                        class="cursor-pointer bottom-0 absolute block py-2 px-4 w-full opacity-0 pin-r pin-t"
                        type="file"
                        name="documents[]"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e)}
                      />
                    </div>
                  </div>
                  <div >
                    <div className='flex flex-row mt-5 space-x-4 justify-between items-center'>
                      <TextField
                        autoComplete="Title"
                        name="title"
                        variant="outlined"
                        fullWidth
                        id="Title"
                        key={editCaseData.title}
                        label="Title"
                        autoFocus
                        onChange={handleInputChange}
                        defaultValue={(input.title) ? input.title : editCaseData.title}
                      />
                      <TextField
                        autoComplete="Needers name"
                        name="needersName"
                        variant="outlined"
                        fullWidth
                        id="needersName"
                        key={editCaseData.needersName}
                        label="Needers Name"
                        autoFocus
                        onChange={handleInputChange}
                        defaultValue={(input.needersName) ? input.needersName : editCaseData.needersName}
                      />
                    </div>
                    <div className='flex flex-row mt-5 space-x-4 justify-between items-center'>
                      <TextField
                        autoComplete="donationRequirement"
                        name="donationRequirement"
                        variant="outlined"
                        fullWidth
                        id="donationRequirement"
                        key={editCaseData.donationRequirement}
                        label="Donation Requirement"
                        autoFocus
                        onChange={handleInputChange}
                        defaultValue={(input.donationRequirement) ? input.donationRequirement : editCaseData.donationRequirement}
                      />
                      <TextField
                        autoComplete="current"
                        name="current"
                        variant="outlined"
                        fullWidth
                        id="current"
                        key={editCaseData.current}
                        label="Current"
                        autoFocus
                        onChange={handleInputChange}
                        defaultValue={(input.current) ? input.current : editCaseData.current}
                      />
                    </div>
                    <div className='flex flex-row mt-5 space-x-4 justify-between items-center'>
                      <TextField
                        autoComplete="Rate"
                        name="rate"
                        variant="outlined"
                        fullWidth
                        id="rate"
                        key={editCaseData.rate}
                        label="Rate"
                        autoFocus
                        onChange={handleInputChange}
                        defaultValue={(input.rate) ? input.rate : editCaseData.rate}
                      />
                      <TextField
                        autoComplete="disease"
                        name="disease"
                        variant="outlined"
                        fullWidth
                        id="disease"
                        key={editCaseData.disease}
                        label="Disease"
                        autoFocus
                        onChange={handleInputChange}
                        defaultValue={(input.disease) ? input.disease : editCaseData.disease}
                      />
                    </div>
                    <div className='w-full mt-5'>
                      <TextField
                        autoComplete="content"
                        name="content"
                        variant="outlined"
                        fullWidth
                        id="content"
                        key={editCaseData.content}
                        label="Content"
                        autoFocus
                        onChange={handleInputChange}
                        defaultValue={(input.content) ? input.content : editCaseData.content}
                      />
                    </div>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleSave()}>Save</Button>
              </DialogActions>
            </Dialog>
          </div>
          : ""
      }

    </React.Fragment>
  )
}
