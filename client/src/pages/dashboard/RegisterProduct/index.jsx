import React, { useState } from 'react';
import API from "./../../../redux/api";
import { useNavigate } from 'react-router';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

const RegisterProduct = () => {
  const navigate = useNavigate();

  // set local form fields
  const [productName, setProductName] = useState("");
  const [ISSN, setISSN] = useState("");
  const [totalPackage, setTotalPackage] = useState("");
  const [SKU, setSKU] = useState("");

  // local error
  const [error, setError] = useState(null);

  const registerProduct = async () => {
    const manufacturerName = "MedScan";

    const issn = Number(ISSN);
    const totalPackages = Number(totalPackage);
    const sku = Number(SKU);

    const manufacturerInformation = {
        manufacturerName
    };
    const productInformation = {
      productName,
      issn
    };
    const packageInformation = {
      totalPackages,
      sku
    };

    console.log({
      manufacturerInformation,
      productInformation,
      packageInformation
    });

    const response = await API.post("/create", 
      {
        manufacturerInformation,
        productInformation,
        packageInformation
      }
    );
    const data = await response.data;

    console.log({data});

    if (data.status === "success" && data.message === "Product information added to blockchain.") {
      navigate(`/dashboard/products/ipr/${data.hash}`, { state: { ipr: data.ipr } });
    } else {
      alert(data.status);
      setError(data.message);
    }
  };

  return (
    <div>
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
  );
};

export default RegisterProduct;
