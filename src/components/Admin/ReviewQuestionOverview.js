import React, { useRef, useState, useEffect } from "react";
import "./Toptags.css";
import AdminSidebar from './Sidebar';
import axios from "axios";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import API_URL from '../../apiConfig'


const ReviewQuesitonOverview = () => {
    const [ans, ansSet] = useState(null)
    const [data, dataSet] = useState(null)
    const editorRef = useRef(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await axios.get(`http://localhost:3001/api/question/getById/${id}`)
            dataSet(response)
        }

        fetchMyAPI()

    }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

        axios.post(`${API_URL}/api/tag/addTag`, {
          name: tag,
          description: desc
      })
      .then(res => {
           
          setTagsuccess(true);
          console.log("tagsuccess",tagsuccess)

      })
      .catch(err => {
          console.log(err)
      })
  }


    function getNumberOfDays(start) {
        const date1 = new Date(start);
        const date2 = new Date();
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = date2.getTime() - date1.getTime();
        const diffInDays = Math.round(diffInTime / oneDay);

        if (diffInDays < 1) {
            return "today";
        }
        if (diffInDays < 2) {
            return "yesterday";
        }

        return diffInDays + " days ago";
    }

    return (
        <>
               <div className="containers">
       <AdminSidebar />
    
   
    <div className="containerside">
            <div className="flex flex-wrap ml mr-[2%] overflow-hidden">
                <div className="grid grid-cols-12 border-b border-gray-300 mt-[3%]">
                    <div className="text-4xl text-[#3B4045] col-span-9">
                        {data?.data.question.title}
                    </div>

                    <div className="flex">
                        <div className="font-light text-[#3B4045]">Asked</div>
                        <div className="font-normal ml-2 flex-none">{getNumberOfDays(data?.data.question.createdAt)}</div>
                        <div className="font-light ml-2 text-[#3B4045]">Modified</div>
                        <div className="font-normal ml-2">{getNumberOfDays(data?.data.question.updatedAt)}</div>

                    </div>
                </div>
                <div className="grid grid-cols-12 mt-1 mr-[10%]">

                    <div className="text-left font-normal col-span-7 text-lg">
                        {parse(String(data?.data.question.body))}
                        <div className="flex mt-5 flex-wrap gap-2 overflow-auto">
                            {data?.data.question.tags.map(tag => (
                                <button className="bg-[#E1ECF4] text-[#39739F] text-sm font-light py-2 px-2 rounded">
                                    {tag.name}
                                </button>
                            ))}
                        </div> </div> </div> </div>

            <br></br>

            <button className="addTagButton" onClick={handleSubmit}>Approve Quesiton</button>
            
            <br></br>
            </div>
    </div>

        </>
    );
};

export default ReviewQuesitonOverview;
