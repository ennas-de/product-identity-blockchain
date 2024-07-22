import React from 'react';
import { useLocation } from 'react-router-dom';

const IPR = () => {
  const { state } = useLocation();
  const hash = window.location.pathname.split("/").pop();

  if (!state || !state.ipr) {
    return <div>Loading...</div>; // Or any other loading/error message
  }

  const { ipr } = state;

  console.log({ hash, ipr });

  const ProdIpr = ({ productIpr, index }) => (
    <p style={{ marginLeft: "10px" }}>Product {index + 1} IPR: {productIpr}</p>
  );

  return (
    <div style={{ overflow: "scroll" }}>
      <h3 style={{ fontWeight: "bold" }}>Product Code: {hash}</h3>
      <br />
      <div>
        <p style={{ marginBottom: "20px" }}>Packages & Products Internationalized Packages Records:</p>
        <hr />
        {
          ipr?.map((pkg, index) => (
            <div key={pkg.packageIpr} style={{ marginBottom: "2rem" }}>
              <p style={{ fontWeight: "bold" }}>Package {index + 1} IPR: {pkg.packageIpr}</p>
              {
                pkg.productIpr.map((prdIpr, idx) => (
                  <ProdIpr productIpr={prdIpr} index={idx} key={idx} />
                ))
              }
              <hr />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default IPR;
