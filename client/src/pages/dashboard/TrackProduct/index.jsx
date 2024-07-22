//// hash search working

import React, { useEffect, useState } from 'react';
import API from "./../../../redux/api";
import { Button, FormControl, FormGroup } from 'react-bootstrap';

const TrackProduct = () => {
  const [id, setId] = useState("");
  const [productData, setProductData] = useState();
  const [IPR, setIPR] = useState();

  const trackProduct = async () => {
    const response = await API.get(`/blocks/scan/${id}`);
    const data = await response.data;

    if (data.success === true && data.message === "Product information fetched") {
      setProductData(data.data.data);
      setIPR(data.data.ipr);
      console.log({IPR});
    }
  };

  const ProdIpr = ({ productIpr, index }) => (
    <p style={{ marginLeft: "10px" }}>Product {index + 1} IPR: {productIpr}</p>
  );

  return (
    <div>
      <h3>Track for a product on the Blockchain: {productData?.productInformation?.productName}</h3>
      <br />
      <div>
        <FormGroup>
          <FormControl
            input="text"
            placeholder='Enter IPR code...'
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </FormGroup>
        <div>
          <Button
            variant="danger"
            onClick={trackProduct}
            style={{ marginTop: "0.5rem" }}
          >
            Track
          </Button>
        </div>
      </div>
      <br />
      <hr />
      
      {productData ? (
        <div>
          <h3 style={{ fontWeight: "bold" }}>Product Details:</h3>
          <br />
          <div>
            <p style={{ marginBottom: "20px" }}>Manufacturer: {productData.manufacturerInformation?.manufacturerName}</p>
            <p style={{ marginBottom: "20px" }}>Product Name: {productData.productInformation?.productName}</p>
            <p style={{ marginBottom: "20px" }}>Number of Packages: {productData.packageInformation?.totalPackages}</p>
            <p style={{ marginBottom: "20px" }}>Total Number of Product: {productData.packageInformation?.sku}</p>
            <p style={{ marginBottom: "20px" }}>Product ISSN: {productData.productInformation?.issn}</p>
            <hr />

            <p style={{ marginBottom: "20px" }}>Product IPR Details: </p>
            {IPR.length > 1 ? (
              IPR.map((pkg, index) => (
                <div key={pkg.packageIpr} style={{ marginBottom: "2rem" }}>
                  <p style={{ fontWeight: "bold" }}>Package {index + 1} IPR: {pkg.packageIpr}</p>
                  {pkg.productIpr.map((prdIpr, index) => (
                    <ProdIpr productIpr={prdIpr} index={index} key={prdIpr + index} />
                  ))}
                  <hr />
                </div>
              ))) : (
                <>
                  {
                    IPR?.packageIpr?.length > 1 ? (
                      IPR?.packageIpr?.map((pkg, index) => (
                      <div key={pkg?.packageIpr} style={{marginBottom: "2rem"}}>
                        <p style={{fontWeight: "bold"}}>Package {index+1} IPR: {pkg?.packageIpr}</p>
                        {
                          pkg?.productIpr?.map((prdIpr, index) => (
                            <ProdIpr productIpr={prdIpr} index={index} key={prdIpr+index} />
                          ))
                        }
                        <hr />
                      </div>
                    ))
                    ) : (
                      <div>
                        <p style={{fontWeight: "bold"}}>Package IPR: {IPR?.packageIpr}</p>
                        {
                          IPR?.productIpr?.length > 0 ? (
                            <>
                            {
                              IPR?.productIpr?.map((prodIpr, index) => (
                                <ProdIpr productIpr={prodIpr} index={index} key={prodIpr+index}/>
                              ))
                            }
                            </>
                          ) : (
                            <p>Product IPR: {IPR?.productIpr}</p>
                          )
                        }
                      </div>
                    )
                }
                </>
              )
            //   <div>
            //   <p style={{ fontWeight: "bold" }}>Package IPR: {IPR[0]?.packageIpr}</p>
            //   {IPR[0]?.productIpr.length > 0 ? (
            //     IPR[0]?.productIpr.map((prodIpr, index) => (
            //       <ProdIpr productIpr={prodIpr} index={index} key={prodIpr + index} />
            //     ))
            //   ) : (
            //     <p>Product IPR: {IPR[0]?.productIpr}</p>
            //   )}
            // </div>
            }
{
                // IPR?.packageIpr?.length > 1 ? (
                //   IPR?.packageIpr?.map((pkg, index) => (
                //   <div key={pkg?.packageIpr} style={{marginBottom: "2rem"}}>
                //     <p style={{fontWeight: "bold"}}>Package {index+1} IPR: {pkg?.packageIpr}</p>
                //     {
                //       pkg?.productIpr?.map((prdIpr, index) => (
                //         <ProdIpr productIpr={prdIpr} index={index} key={prdIpr+index} />
                //       ))
                //     }
                //     <hr />
                //   </div>
                // ))
                // ) : (
                //   <div>
                //     <p style={{fontWeight: "bold"}}>Package IPR: {IPR?.packageIpr}</p>
                //     {
                //       IPR?.productIpr?.length > 0 ? (
                //         <>
                //         {
                //           IPR?.productIpr?.map((prodIpr, index) => (
                //             <ProdIpr productIpr={prodIpr} index={index} key={prodIpr+index}/>
                //           ))
                //         }
                //         </>
                //       ) : (
                //         <p>Product IPR: {IPR?.productIpr}</p>
                //       )
                //     }
                //   </div>
                // )

                // console.log("ipr:", IPR)
                // IPR?.map((pkg, index) => (
                //   <div key={pkg.packageIpr} style={{marginBottom: "2rem"}}>
                //     <p style={{fontWeight: "bold"}}>Package {index+1} IPR: {pkg.packageIpr}</p>
                //     {
                //       pkg.productIpr.map((prdIpr, index) => (
                //         <ProdIpr productIpr={prdIpr} index={index} key={index} />
                //       ))
                //     }
                //     <hr />
                //   </div>
                // ))
              }
          </div>
        </div>
      ) : (
        <div>No product details...</div>
      )}
    </div>
  );
}

export default TrackProduct;
