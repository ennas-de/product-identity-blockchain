import React from 'react'

const IPR = () => {
  const hash = JSON.parse(localStorage.getItem("hash"))
  const ipr = JSON.parse(localStorage.getItem("ipr"))

  console.log({hash, ipr})

  const ProdIpr = ({productIpr, index}) => (
     <p style={{marginLeft: "10px"}}>Product {index+1} IPR: {productIpr}</p>
  )

  return (
    <div style={{overflow: scroll}}>
      <h3 style={{fontWeight: "bold"}}>Product Code: {hash}</h3>
      <br />
      <div>
        <p style={{marginBottom: "20px"}}>Packages & Products Internationalized Packages Records:</p>
        <hr />
        {
          ipr.map((pkg, index) => (
            <div key={pkg.packageIpr} style={{marginBottom: "2rem"}}>
              <p style={{fontWeight: "bold"}}>Package {index+1} IPR: {pkg.packageIpr}</p>
              {
                pkg.productIpr.map((prdIpr, index) => (
                  <ProdIpr productIpr={prdIpr} index={index} key={index} />
                ))
              }
              <hr />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default IPR
