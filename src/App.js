import React from 'react';
import Web3 from 'web3';
import './App.css';
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient('http://localhost:5001')

function App() {
  return (
    <div className="App">
     <div className="AppContent">
       <MyApp></MyApp>
     </div>
    </div>
  )
}

function MyApp(){

const[buffer, setBuffer]=React.useState(null)
const[hash, setHash]= React.useState("Py6zqPf14D6zFh6mVFLeTqEmditMrYZZcvd5eQuq7FtKbk")


async function captureFile (event) {
  event.preventDefault()
  const file = event.target.files[0]
  const fileReader = new window.FileReader()
  
  fileReader.readAsArrayBuffer(file)
    fileReader.onloadend = () => {
    setBuffer(Buffer(fileReader.result))
    console.log(buffer)
  }
}


async function onSubmit (event) {
  event.preventDefault()
  let filehash = "0x000"
  for await (const res of ipfs.add(buffer)) {
    console.log(res)
    filehash = res.path
  }
  setHash(filehash)
  console.log('Ipfs:', filehash)
  console.log(hash) 
}
 return(
 <div className="container-fluid mt-5">
 <div className="row">
   <main role="main" className="col-lg-12 d-flex text-center">
     <div className="content mr-auto ml-auto">
       <img src={`http://localhost:8080/ipfs/${hash}`} />
       <p>&nbsp;</p>
       <h2>Change File</h2>
       <form onSubmit={onSubmit} >
         <input type='file' onChange={captureFile} />
         <input type='submit' />
       </form>
     </div>
   </main>
 </div>
</div>)
}

export default App;
