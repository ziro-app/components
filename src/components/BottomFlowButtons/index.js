import React from 'react'
import Button from '../Button'

const BottomFlowButtons = ({ next, nextTitle = 'próximo', previous, previousTitle = 'voltar', submit = false, submitting }) => {

    return (
        <div style={{ display: 'grid', gridTemplateColumns: next && previous ? '1fr 1fr' : '1fr', padding: '20px', gridGap: '20px', background: 'white' }}>
            {
                previous &&
                <Button
                    type='button'
                    template='light'
                    cta={previousTitle}
                    click={previous}
                    submitting={submitting}
                />
            }
            {
                next &&
                <Button
                    type={ submit ? 'submit' : 'button'}
                    cta={nextTitle}
                    click={next}
                    submitting={submitting}
                />
            }
        </div>
    )
}

export default BottomFlowButtons