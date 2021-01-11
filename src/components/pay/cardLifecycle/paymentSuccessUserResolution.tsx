import React from 'react'

export const paymentSuccessUserResolution = (seller) => {
  return (
    <>
            <label>&nbsp;Na sua fatura virá uma compra do Rio de Janeiro, com os possíveis nomes:</label>
            <div style={{display: "flex", justifyContent: 'center'}}>
                <div style={{
                    textAlign: 'left',
                    maxWidth: '250px',
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    <label>▪️ Zp *{seller}</label><br />
                    <label>▪️ ZP+PARC</label><br />
                    <label>▪️ SUB</label>
                </div>
            </div>
        </>
  )
}