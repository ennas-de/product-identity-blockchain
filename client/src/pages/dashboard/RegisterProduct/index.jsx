import React, { useEffect, useState } from 'react'
import API from "./../../../redux/api"
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Button, FormControl, FormGroup } from 'react-bootstrap'

const RegisterProduct = () => {
  const navigate = useNavigate()

  // set local form fields
  // const [manufacturerName, setManufacturerName] = useState()
  const [productName, setProductName] = useState("")
  const [ISSN, setISSN] = useState()
  const [totalPackage, setTotalPackage] = useState()
  const [SKU, setSKU] = useState()

  // local error
  const [error, setError] = useState(null)



  // fetch producer's information 
  // useEffect(() => {
  //   const getProducerDetails = async () => {
  //     const response = await API.get("")
  //     const data = await response.data
  //     setManufacturerName(data)
  //   }

  //   getProducerDetails()
  // }, [])

  const registerProduct = async () => {
    const manufacturerName = "MedScan"

    const issn = Number(ISSN)
    const totalPackages = Number(totalPackage)
    const sku = Number(SKU)

    const manufacturerInformation = {
        manufacturerName
    }
    const productInformation = {
      productName,
      issn
    }
    const packageInformation = {
      totalPackages,
      sku
    }

    console.log({
      manufacturerInformation,
      productInformation,
      packageInformation
    })


    const response = await API.post("/create", 
      {
        manufacturerInformation,
        productInformation,
        packageInformation
      }
    )
    const data = await response.data

    // console.log({response})
    console.log({data})

    if (data.status === "success" && data.message === "Product information added to blockchain.") {
      console.log("hash:", data.hash)
      console.log("ipr:", data.ipr)
      localStorage.setItem("ipr", JSON.stringify(data.ipr))
      localStorage.setItem("hash", JSON.stringify(data.hash))
      navigate(`/dashboard/products/ipr/${data.hash}`)
    } else {
      alert(data.status)
      setError(data.message)
    }
  }

  // console.log({
  //   productName,
  //   ISSN,
  //   totalPackages,
  //   SKU
  // })

  return (
    <div>
      {/* <Link to="/dashboard/home">Home</Link> */}
      <h3>Register New Product To Blockchain</h3>

      <br />

      <div>
        {error}
      </div>

      <div>
        <FormGroup>
          <FormControl
            input="text"
            placeholder='Product name'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            input="number"
            placeholder='ISSN Number'
            value={ISSN}
            onChange={(e) => setISSN(e.target.value)}
            style={{marginTop: "0.5rem"}}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            input="number"
            placeholder='Number of Packaging'
            value={totalPackage}
            onChange={(e) => setTotalPackage(e.target.value)}
            style={{marginTop: "0.5rem"}}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            input="number"
            placeholder='SKU'
            value={SKU}
            onChange={(e) => setSKU(e.target.value)}
            style={{marginTop: "0.5rem"}}
          />
        </FormGroup>
        <div>
          <Button
            variant="danger"
            onClick={registerProduct}
            style={{marginTop: "0.5rem"}}
          >Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default RegisterProduct 

// https://medscan-root-node.onrender.com/api/create

// {
//   "manufacturerInformation": {
//       "manufacturerName": "MedScan"
//   },
//   "productInformation": {
//       "productName": "IPR",
//       "issn": 12345
//   },
//   "packageInformation": {
//       "totalPackages": 2,
//       "sku": 10
//   }
// }