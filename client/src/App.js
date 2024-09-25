import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


function App() {
  const[visible, setVisible] = useState(false);

  return (
    <div className="App">
      {/* <Toaster position='top-left'/>
      <Toaster position='top-center'/>
      <Toaster position='top-right'/>
      <Toaster position='bottom-left'/>
      <Toaster position='bottom-center'/>
      <Toaster position='bottom-right'/> */}
      <input type={visible? 'text': 'password'} /> 
      <button onClick={()=> setVisible(!visible)}>
        {visible? <FaEye /> : <FaEyeSlash/>}
      </button>

      {/* <button onClick={()=> toast.success("success")}>
      success
      </button>
      <button onClick={()=> toast.error("fail")}>
        fail
      </button> */}

    </div>
  );
}

export default App;
