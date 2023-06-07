import React, { useState } from 'react';
import "./Home.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';
import { Link, } from 'react-router-dom';


const Home = () => {
    const userName = localStorage.getItem("username")
    const token = localStorage.getItem("accessToken")
    const [categoryPost, setCategoryPost] = useState({
        title: "",
        Authorization: ""
    })
    const [statusAddInfo, setStatusAddInfo] = useState(false)
    const [statusTodo, setStatusTodo] = useState("")
    const [listData, setListData] = useState([])
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const [smallCategoryPost, setSmallCategoryPost] = useState({
        category: "",
        description: "",
        title: "",
    })
    const [listTodo, setListTodo] = useState()
    const [dataListTodo, setDataListTodo] = useState([])
    const handleChange = (e) => {
        const { value } = e.target
        setCategoryPost({
            ...categoryPost,
            title: value
        })
    }
    const [isEdit, setIsEdit] = useState("")
    const [editData, setEditData] = useState({
        title: "",
        description: "",
        category: "",
    })
    // Phần category
    const handleAdd = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/category", categoryPost, config)

            if (res.data.message) {
                axios.get("http://localhost:3001/api/category", config)
                    .then(res2 => {
                        console.log(res2);
                        setListData(res2.data.categorys)
                        console.log(listData);

                    })
            }
        } catch (err) {
            console.log(err);
            if (err.message) {


            }
        }

        //  Phần todo bên trong category
    }
    const add_info = (id) => {
        setStatusAddInfo(id)
        setSmallCategoryPost({
            ...smallCategoryPost,
            category: id + ""
        })
        console.log(listData);
    }

    const handleChangeSmallCategoryInfo = (e) => {
        const { value } = e.target;
        setSmallCategoryPost({
            ...smallCategoryPost,
            description: value + ""
        })

    }
    const handleChangeSmallCategoryTitle = (e) => {
        const { value } = e.target;
        setSmallCategoryPost({
            ...smallCategoryPost,
            title: value + "",
        })
    }
    const handleSave = (id) => {

        console.log(smallCategoryPost);
        axios.post(`http://localhost:3001/api/todos`, smallCategoryPost, config)
            .then(res => {
                axios.get(`http://localhost:3001/api/todos/${id}`, config)
                    .then(res2 => {
                        console.log(res2);
                        setStatusAddInfo(false)
                        setDataListTodo(res2.data.Todos)
                        console.log(dataListTodo);

                        for (let i = 0; i <= dataListTodo.length; i++) {
                            Array.isArray(dataListTodo[i]) ?
                                dataListTodo[i].concat(dataListTodo) : null
                        }
                        console.log(dataListTodo);

                        setStatusTodo(id)
                    })
            })
    }

    const handleCancel = () => {
        setStatusAddInfo(false)
    }

    // phần trong todoList
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/todos/${id}`, config)
            .then(res => {
                console.log(res);
                const newTodo = dataListTodo.filter(item => item._id !== id)
                setDataListTodo(newTodo)
            })
    }

    const handleEdit = (id) => {
        const newTodo = dataListTodo.filter(item => item._id === id)
        console.log(newTodo);
        setIsEdit(id)
        setEditData({
            ...editData,
            category: id + "",
        })
    }

    const handleChangeEditTitle = (e) => {
        const { value } = e.target;
        setEditData({
            ...editData,
            title: value,
        })
    }

    const handleChangeEditDescription = (e) => {
        const { value } = e.target;
        setEditData({
            ...editData,
            description: value,
        })
    }

    const handleAddEdit = (id) => {
        if (editData.title || editData.description === "") {
            setIsEdit("")
            axios.put(`http://localhost:3001/api/todos/${editData.category}`, editData, config)
                .then(res => {
                    axios.get(`http://localhost:3001/api/todos/${id}`, config)
                        .then(res2 => {
                            setDataListTodo(res2.data.Todos)
                            for (let i = 0; i <= dataListTodo.length; i++) {
                                Array.isArray(dataListTodo[i]) ?
                                    dataListTodo[i].concat(dataListTodo[i + 1]) : null
                            }
                            setIsEdit("")
                        })
                })
        } else {
            setIsEdit("")
        }

    }
    return (
        <div>
            <head>
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
                <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
            </head>
            <div className='header'>
                <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"></img>
                <h1 className='name'>Todo App</h1>
                <div className='divUsername'>
                    {
                        userName == null ?
                        <>
                            <Link to={"/signup"}>
                                <button className='noAccount'>Don't have account? SignUp</button>
                            </Link> 
                        </> :
                            <span className='username'>{userName}</span>
                    }
                </div>
            </div>
            <div className="container">
                <div className="add_category">
                    <button className="button-73" onClick={handleAdd}>Add your category</button>
                </div>
                <div className="type_category">

                    <input onChange={handleChange} className='category_input' placeholder='Type your category' type='text'></input>
                </div>

                <div className='category_container'>
                    {listData.map((item, index) => (
                        <ul>
                            <li className='category' key={index}>
                                <div className="categoryHeader">
                                    <h4>{item.title}</h4>
                                </div>
                                <div className="more_category">
                                    <div >
                                        <button class="button-56" role="button" onClick={() => add_info(item._id)}>+</button>
                                    </div>
                                </div>

                                <div className="value_category">
                                    {statusAddInfo === item._id ? <>
                                        <div className="small_category">
                                            <input type='text' className='small_category' onChange={handleChangeSmallCategoryTitle}></input>
                                        </div>
                                        <div className="info_small_category">
                                            <textarea type="text" placeholder='Mô tả' onChange={handleChangeSmallCategoryInfo}></textarea>
                                        </div>
                                        <div className="button_info_small_category">
                                            <button className='save' onClick={() => handleSave(item._id)}>Save</button>
                                            <button className='cancel' onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </> :
                                        <>
                                            {statusTodo === item._id && statusAddInfo === false ?
                                                <div className="listTodo">

                                                    {dataListTodo.map(item2 => (
                                                        <>
                                                            <div>
                                                                {item2.category === statusTodo ?
                                                                    <>
                                                                        {isEdit === item2._id ? <>
                                                                            <table>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <input onChange={handleChangeEditTitle} type="text" placeholder={item2.title} className='editTitle'></input>
                                                                                        </td>
                                                                                        <td>
                                                                                            <input onChange={handleChangeEditDescription} type='text' placeholder={item2.description} className='editDescription'></input>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div className="buttonListTodo">
                                                                                                <button onClick={() => handleDelete(item2._id)} className="btn btn-primary a-btn-slide-text">
                                                                                                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                                                                                    <span><strong>Delete</strong></span>
                                                                                                </button>
                                                                                                <button onClick={() => handleAddEdit(item._id)} href="#" class="btn btn-primary a-btn-slide-text">
                                                                                                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                                                                                    <span><strong>Add</strong></span>
                                                                                                </button>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </> :
                                                                            <>
                                                                                <table>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <span>{item2.title}</span>
                                                                                            </td>
                                                                                            <td>
                                                                                                <span>{item2.description}</span>
                                                                                            </td>
                                                                                            <td>

                                                                                                <div className="buttonListTodo">
                                                                                                    <button onClick={() => handleDelete(item2._id)} className="btn btn-primary a-btn-slide-text">
                                                                                                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                                                                                        <span><strong>Delete</strong></span>
                                                                                                    </button>
                                                                                                    <button onClick={() => handleEdit(item2._id)} className="btn btn-primary a-btn-slide-text">
                                                                                                        <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                                                                                        <span><strong>Edit</strong></span>
                                                                                                    </button>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </>
                                                                        }

                                                                    </> : null}
                                                            </div>

                                                        </>
                                                    ))}
                                                </div>
                                                : null}
                                        </>
                                    }
                                </div>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </div >
    );
}
export default Home;
