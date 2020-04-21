import React from 'react'
import PropTypes from 'prop-types'
import { container, content, header } from './styles'
import { SellerAndChargeRow } from '../SellerAndChargeRow'
import { InstallmentOptions } from './installmentOptions'

const Summary = ({ charge, maxInstallments, seller, misc, cartItem }) => {
    return (
        <div style={container}>
            <SellerAndChargeRow seller={seller} charge={charge}/>
            {cartItem && (
                <div>
                {Object.entries(cartItem.products).map(([productId,product], index) =>
                    product.requestedQuantities && Object.values(product.requestedQuantities).length ? (
                    <div key={productId} style={{ display: 'grid' }}>
                        <label>{`Peça ${index + 1}`}</label>
                        <div style={{ display: 'grid', padding: '10px' }}>
                        {Object.entries(product.requestedQuantities).map(([key, qty]) => (
                            <div key={key} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
                            <label style={{ fontSize: 12 }}>{`${key}:`}</label>
                            <label style={{ fontSize: 12 }}>{qty}</label>
                            </div>
                        ))}
                        </div>
                    </div>
                    ) : null,
                )}
                </div>
            )}
            <h1 style={header}>Parcelamento</h1>
            <InstallmentOptions charge={charge} maxInstallments={maxInstallments}/>
            {
                misc &&
                <>
                    <h1 style={header}>{misc.title}</h1>
                    <div style={content}>{misc.text}</div>
                </>
            }
		</div>
    )
}

Summary.propTypes = {
    seller: PropTypes.string.isRequired,
    charge: PropTypes.string.isRequired,
    maxInstallments: PropTypes.string.isRequired,
    misc: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })
}

export default Summary