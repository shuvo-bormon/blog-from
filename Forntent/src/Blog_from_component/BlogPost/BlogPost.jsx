import { useEffect, useState } from "react";
import axios from "axios";
const BlogPost = () => {
  const [inputField, setinputField] = useState({
    tittle: "",
    description: "",
    admin: "",
  });
  const [allblog, setallblog] = useState([]);
  const [realTime, setrealTime] = useState(false);
  const [updateId, setupdateId] = useState(null);

  const handleInput = (event) => {
    const { id, value } = event.target;
    setinputField({ ...inputField, [id]: value });
  };

  const handleSubmit = () => {
    const { tittle, description, admin } = inputField;
    axios
      .post("http://localhost:4000/createblog", {
        tittle: tittle,
        description: description,
        admin: admin,
      })
      .then((response) => {
        setinputField(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setrealTime(!realTime);
        setinputField({
          tittle: "",
          description: "",
          admin: "",
        });
      });
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getallblog");

        setallblog(response?.data?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllData();
  }, [realTime]);

  const handleDelet = async (item) => {
    try {
      const deletedata = await axios.delete(
        "http://localhost:4000/deleteblog/" + item._id
      );
      console.log(deletedata);
    } catch (error) {
      console.log(error);
    } finally {
      setrealTime(!realTime);
    }
  };

  const handleEdit = async (item) => {
    const { _id, tittle, description, admin } = item;
    console.log(_id, tittle, description, admin);
    setinputField({
      ...inputField,
      tittle: tittle ? tittle : "",
      description: description ? description : "",
      admin: admin ? admin : "",
      update: true,
    });
    setupdateId(_id);
  };

  const handleUpdate = async () => {
    try {
      const updateData = await axios.patch(
        "http://localhost:4000/updateblog/" + updateId,
        {
          tittle: inputField.tittle && inputField.tittle,
          description: inputField.description && inputField.description,
          admin: inputField.admin && inputField.admin,
        }
      );
      console.log(updateData);
    } catch (error) {
      console.log(error);
    } finally {
      setrealTime(!realTime);
      setupdateId(null);
      setinputField({

        tittle: "",
    description: "",
    admin: "",

      })
    }
  };

  return (
    <>
      <div>
        <div className="flex bg-[#512da8] w-[1320px] h-[90vh] shadow-2xl rounded-xl">
          <div className="w-[45%] h-[700px] bg-[#fff] rounded-r-[170px] rounded-l-xl">
            <div className="flex flex-col h-full items-center pt-[170px]">
              <h1 className="text-3xl font-bold  mb-4">Create Your Post</h1>
              <input
                className="w-[300px] items-center flex justify-center pl-[10px] pr-[15px] pt-[15px] pb-[15px]
         m-[8px] bg-[#eee] outline-none rounded-xl"
                type="text"
                value={inputField.tittle}
                placeholder="Tittle"
                id="tittle"
                onChange={handleInput}
              />
              <input
                className="w-[300px] h-[150px]  flex  pl-[10px] pr-[15px] pt-[15px] pb-[15px]
         m-[8px] bg-[#eee] outline-none rounded-xl"
                type="text"
                value={inputField.description}
                placeholder="Description"
                id="description"
                onChange={handleInput}
              />
              <input
                className="w-[300px] items-center flex justify-center pl-[10px] pr-[15px] pt-[15px] pb-[15px]
         m-[8px] bg-[#eee] outline-none rounded-xl"
                type="text"
                placeholder="Admin"
                value={inputField.admin}
                id="admin"
                onChange={handleInput}
              />

              {inputField.update === true ? (
                <button
                  className="px-16 py-3 rounded-xl bg-green-700 text-white font-semibold mt-3"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              ) : (
                <button
                  className="px-16 py-3 rounded-xl bg-blue-700 text-white font-semibold mt-3"
                  onClick={handleSubmit}
                >
                  Post
                </button>
              )}
            </div>
          </div>
          <div className="w-[50%] px-[120px] py-10 overflow-y-scroll">
            <div>
              {allblog?.map((item, i) => (
                <div className="text-[#fff]" key={i}>
                  <h1 className="text-3xl font-bold">
                    Tittle: <span className="font-semibold">{item.tittle}</span>
                  </h1>
                  <p className="text-2xl font-semibold">
                    Description:{" "}
                    <span className="font-normal text-[#eee] text-[22px]">
                      {item.description}
                    </span>
                  </p>
                  <h2>
                    Admin: <span> {item.admin}</span>
                  </h2>
                  <div className="flex mt-3 mb-5">
                    <button
                      className="flex items-center rounded-md px-[20px] py-[8px] border-[1px] border-[#eee] text-[#eee] font-semibold mr-5"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className=" rounded-md px-[20px] py-[8px] border-[1px] border-[#eee] text-[#eee] font-semibold"
                      onClick={() => handleDelet(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
