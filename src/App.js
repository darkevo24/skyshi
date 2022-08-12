import { useEffect,useState } from 'react';
import './App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { add, init, remove } from './redux/listSlice';
import trash from "./assets/images/trash.png"
import deleteIcon from "./assets/images/delete-icon.png"

function App() {
  const [del,setDel] = useState("");
  const [id,setId] = useState("");
  const dispatch = useDispatch();
  const list = useSelector(function(state){
    return state.list.list;
  })
  useEffect(function(){
    axios.get("https://todo.api.devcode.gethired.id/activity-groups").then(function(res){
      dispatch(init(res.data.data));
    }).catch(function(error){
      console.log(error);
    })
  },[]);

  function Tambah(){
    axios.post("https://todo.api.devcode.gethired.id/activity-groups",{
      title: "coba 1",
      email: "yoga+1@skyshi.io",
      _comment: "email digunakan untuk membedakan list data yang digunakan antar aplikasi"
    }).then(function(res){
      console.log("data berhasil ditambahkan",res.data);
      dispatch(add({
        title: "coba 1",
        email: "yoga+1@skyshi.io",
        _comment: "email digunakan untuk membedakan list data yang digunakan antar aplikasi"
      }))
    }).catch(function(error){
      console.log("push error",error);
    })
  }

  function Delete(data,id){
    setDel(data);
    setId(id)
    document.getElementById("delete").classList.remove("hidden");
  }

  function Batal(){
    document.getElementById("delete").classList.add("hidden");
  }

  function Hapus(){
    axios.delete("https://todo.api.devcode.gethired.id/activity-groups/" + id).then(function(){
      console.log("deleted");
    }).catch(function(error){
      console.log('delete error',error);
    });
    dispatch(remove(id));
    document.getElementById("delete").classList.add("hidden");
  }
  return (
    <div style={{ fontFamily : 'Poppins' }}>
      <div style={{ height:"105px",background : "#16ABF8",boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <div className=' flex items-center justify-center w-full h-full'>
          <div className='w-3/4'>
            <p style={{ fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '24px',
                        lineHeight: '36px',
                        textTransform: 'uppercase' }}
                        className=" text-white">To Do List App</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop:"43px" }} className=' flex items-center justify-center w-full h-full'>
          <div className='w-3/4'>
            <div className=' flex items-center relative '>
              <div className='flex items-center h-full '>
              <p style={{ fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '36px',
                        lineHeight: '54px',
                        color : "#111111" }}
                        className="">Activity</p>
              </div>
            <div onClick={Tambah} style={{ width: '159px',
                          height: '54px',
                          background : "#16ABF8",
                          borderRadius: '45px',
                          fontStyle: 'normal',
                          fontWeight: 600,
                          fontSize: '18px',
                          lineHeight: '27px',
                       }}
                       className=" text-white absolute right-0 flex items-center justify-center cursor-pointer hover:opacity-80">+ Tambah</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop:"55px" }} className=' flex items-center justify-center w-full h-full'>
          <div className='w-3/4'>
        <div className=' lg:grid gap-5 grid-cols-4'>
          {list.map(function(data){
            return (
              <div style={{ width: '235px',
                            height: '234px',
                            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
                            borderRadius: '12px', }} 
                            className='bg-white relative'>
                <p style={{
                          fontStyle: 'normal',
                          fontWeight: 700,
                          fontSize: '18px',
                          lineHeight: '27px',
                          color : "#111111" }}
                          className="m-5">{data.title}</p>
                <div className='absolute bottom-0 w-full'>
                  <div className=' relative flex items-center m-5'>
                  <p className=''>12 Agustus 2022</p>
                  <img onClick={function(){Delete(data.title,data.id)}} className='cursor-pointer hover:opacity-75 absolute right-0' src={trash}></img>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        </div>
          </div>

          <div id="delete" style={{ transform: 'translate(-50%, -50%) ',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '12px',
                        width: '490px',
                        height: '355px'
                        }} className=' hidden flex flex-col items-center bg-white fixed left-1/2 top-1/2 p-10'>
              <img src={deleteIcon}></img>
              <p style={{ 
                          fontStyle: 'normal',
                          fontWeight: 500,
                          fontSize: '18px',
                          lineHeight: '150%',
                          color : "#111111" }}
                          className=" text-center mt-12">Apakah anda yakin menghapus activity
“{del}”?</p>
                <div className=' flex items-center' style={{ marginTop:"46px" }}>
                  <div onClick={Batal} style={{ width: '150px',
                                height: '54px',
                                background: '#F4F4F4',
                                borderRadius: '45px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                fontSize: '18px',
                                lineHeight: '27px',
                                color : "#4A4A4A"
                               }}
                               className="flex justify-center items-center cursor-pointer hover:opacity-80">
                                Batal
                               </div>
                <div onClick={Hapus} style={{ width: '150px',
                                height: '54px',
                                background: '#ED4C5C',
                                borderRadius: '45px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                fontSize: '18px',
                                lineHeight: '27px',
                                color : "#FFFFFF"
                               }}
                               className="ml-10 flex justify-center items-center cursor-pointer hover:opacity-80">
                                Hapus
                               </div>
                </div>
          </div>

    </div>
  );
}

export default App;
