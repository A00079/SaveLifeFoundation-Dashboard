import React, { useState } from 'react';
import { TextBox } from "../../../../components";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

const AddOffers = () => {
    const [imageFilePreview, setImageFilePreview] = React.useState('');
    const [imageFile, setImageFile] = React.useState('');
    const [input, setInput] = useState({});
    const [state, setState] = React.useState({
        istop: true,
    });

    const handleImageChange = (event) => {
        setImageFilePreview(URL.createObjectURL(event.target.files[0]));
        setImageFile(event.target.files[0]);
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };


    const handleOfferSave = () => {
        let casesData = input;
        casesData['imagefile'] = imageFile;

        var bodyFormData = new FormData();
        bodyFormData.append('title', casesData.title);
        bodyFormData.append('imageUrl', imageFile);
        bodyFormData.append('donationRequirement', casesData.donationRequirement);
        bodyFormData.append('needersName', casesData.needersName);
        bodyFormData.append('content', casesData.content);
        bodyFormData.append('rate', casesData.rate);
        bodyFormData.append('current', casesData.current);
        bodyFormData.append('disease', casesData.disease);


        axios({
            method: "POST",
            url: "https://savelifefoundation.org.in/api/v1/case/add",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);
                alert('Case Saved Successfully');
                setImageFilePreview(false);
                setImageFile('');
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    return (
        <React.Fragment>
            <section class="text-gray-600 body-font bg-white h-full">
                <div class="container px-5 py-4 mx-auto">
                    <div class="flex flex-col text-left w-full">
                        <h1 class="text-lg font-medium title-font text-gray-600 pl-3">Add New Offers</h1>
                    </div>

                    <div className="text-right px-2 mb-4 space-x-4">
                        <Button variant="contained" color="secondary">
                            Cancle
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => handleOfferSave()}>
                            Save
                        </Button>
                    </div>
                    <div className='border-b border-gray-300 mx-2'></div>
                    <div className="grid grid-cols-12 gap-4 px-2">
                        <div className="col-span-4 w-full">
                            <div className="w-full">

                                <div class="overflow-hidden relative w-48 mt-7">
                                    <div class="rounded-lg h-full overflow-hidden w-full mb-5">
                                        {
                                            !!imageFilePreview ?
                                                <img alt="content" class="object-cover object-center mx-auto w-16 pt-5" src={imageFilePreview} />
                                                : ""
                                        }
                                    </div>
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
                        </div>
                        <div className="col-span-4 w-full space-y-5 mt-5">
                            <div className="w-full">
                                <TextBox
                                    type="text"
                                    svgCode="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    required={true}
                                    orientation="vertical"
                                    name="title"
                                    placeHolder="Title Name"
                                    isLabel={true}
                                    label="Title Name"
                                    value={input.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full">
                                <TextBox
                                    type="text"
                                    required={true}
                                    orientation="vertical"
                                    name="needersName"
                                    placeHolder="Needers Name"
                                    isLabel={true}
                                    label="Needers Namee"
                                    value={input.needersName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <TextBox
                                type="text"
                                required={true}
                                orientation="vertical"
                                name="disease"
                                placeHolder="disease"
                                isLabel={true}
                                label="disease"
                                value={input.disease}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-span-4 w-full space-y-5 mt-5">
                            <TextBox
                                type="text"
                                required={true}
                                orientation="vertical"
                                name="donationRequirement"
                                placeHolder="Donation Required"
                                isLabel={true}
                                label="Donation Required"
                                value={input.donationRequirement}
                                onChange={handleInputChange}
                            />
                            <TextBox
                                type="text"
                                required={true}
                                orientation="vertical"
                                name="current"
                                placeHolder="Current"
                                isLabel={true}
                                label="Current"
                                value={input.current}
                                onChange={handleInputChange}
                            />
                            <TextBox
                                type="text"
                                required={true}
                                orientation="vertical"
                                name="rate"
                                placeHolder="Rate"
                                isLabel={true}
                                label="Rate"
                                value={input.rate}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        <div className="col-span-12 w-full space-y-5 mt-5">
                            <div className="w-full">
                                <TextBox
                                    type="text"
                                    svgCode="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    required={true}
                                    orientation="vertical"
                                    name="content"
                                    placeHolder="Content"
                                    isLabel={true}
                                    label="Content"
                                    value={input.content}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default AddOffers;