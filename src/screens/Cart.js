import React from 'react'
// import trash from "../trash.svg"
// import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3' style={{color:"white"}}>The Cart is Empty!</div>
      </div>
    )
  }
  const handleRemove = (index)=>{
    console.log(index)
    dispatch({type:"REMOVE",index:index})
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/OrderData`,{
    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userEmail,
        order_data: data,
        order_date: new Date().toDateString(),
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, product) => total + product.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Image</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              {/* <th scope='col' >Price</th> */}
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr >
                <th scope='row'style={{color:"white"}} >{index + 1}</th>
                <td style={{color:"white"}}>{product.name}</td>
                <td ><img src={product.img}  style={{ height:"60px",width:"100px",objectFit:"fill"}} ></img></td>
                <td style={{color:"white"}}>{product.qty}</td>
                <td style={{ color: "white" }}>{(product.size) !== 0 ? product.size: "NA" }</td>

                <td style={{color:"white"}}>{product.price}</td>
                <td style={{color:"white"}} ><button type="button" className="btn p-0"><img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAe1BMVEWxl/wZMVRnQdm1mv8AJ0SGeMYPLU4GK0pbWJS0mv1/cr2KeshhOde5nf9eNdZ9XOOpjvighPOOcOuGZ+eTde55V+EAHzeXeu9zUN6BYeRrRttwTN2kifadgPKahuBlYKE/RnipkvM2QW5QUopwZ66UgtYiNVtWKdNJTYF4i/orAAADHElEQVRoge3Z23aiMBQG4NRQcCsEDCBHUdva9v2fcAISrQ47YWAzV/1vylri16wYNjkwprJLgJEGdqLoScgOxDirRajxZEeNRyLVuKyJbcZE3l9AHJHjftlfBAW5zcrVgnjl9xcQktuQikjj1INFkaLWV9Q2g0LoZ6egb3kssisaxfS4FNeSArWkxxMhg+7ikNHjB5HW3U+aUtNtSt/3WRgW5GVLBaIiz1kQBAvYKgpexP0NTfiPUNPN9kcaUp4fXe9H3ON8/dYNQeO8PMRpgpl9xC8bnZP7iLun20eXSTr/3js6T7bSbx/t3yfo/NV5FofjvP67zj+8cbj3MQFfsuWMv9/73JBJfd4+OK8jMvWB4qMyzR6nT7Y3a2s2Rt0wNedHx7XEMVQZqFnS6sPzc76xDnUPbznUgiVdDoO4faibBnke9vjgtIhf7Phg3YKiyqvKr1jaRg53y3OlHcAHhznsCj9LsoStVHxkHdrsbfi+GfyiWocGAHDFkcni2Y6fh/H6q/vb4diEzo4Pf49Fdjyw48iULfqKNC6QdWhg/0Gx+aDo2tu1HMM/bfgnhvuHG47cEbz99fJ8jPuG4WVmw/nzW/8v/IQ8oFBJjZfDd6iXkQ3HXkOQxlZ8bcPXGB4WGs+RYc6PlrLoYRUXilDjKXKLdXqBTisgTjWOrf2tBR0t55B0mzktjm2JzMHLHvex5Tnf2vAthu9EpFC1FvWxzTl+seHoHBfylVqHSinRjT/e2IYiPiXimZQM2qKOxY6jX2Umt8vZhg+/K0bGbL+4c2xuwV/mLLxsBR0t56PwNzOOlvNRuLmgu6dZuLmgu+9zcL42PqIeVs7H4Vvj+9/BSsvInAxN906zaMbP3x6a7/Pc/YXgYTPkYWOEYoOMeqn1m0Wz4J4osLx70S2xnQsZ8wt0qTjTrgs1b2knFyVt70Rt8oiJLrQ4yFhFxvpfUdrtT3mdssg21Hv/kFw3Q9oeF+Qnuf3xrWkFPR0/JHec/EikP3rqFrk1+TFxfG85/Ulu8Z9wcpuFgcZXtlsn4LeWY4vc6YE7Xi1wTNySfwBiqzOMLN3YOgAAAABJRU5ErkJggg==" } height={"30px"} width={"30px"} alt="delete" onClick={() => {dispatch({type: "REMOVE", index: index})}}></img></button> </td></tr>
                   
            ))}
          </tbody>
        </table>
        </div>
        <div><h1 className='fs-2' style={{color:"white"}}>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' style={{color:"white"}} onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>
   </div>
  )
}