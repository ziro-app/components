import { fontSizeSmall, primaryColor, grayColor1, fontTitle, gradient } from '@ziro/theme'

export const container = {
    display: 'grid',
    gridRowGap: '15px',
    padding: '0 20px',
    margin: '30px 0'
  },
  imageStyle = {
    objectFit: 'cover',
    width: '100%',
  },
  infoCard = {
    display: 'grid',
    gridTemplateColumns: '100px 1fr',
    borderRadius: '5px',
    background: 'white',
    boxShadow: 'rgba(34, 34, 34, 0.3) 0px 5px 10px -1px'
  },
  infoCardInfo = {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    gridTemplateRows: '1fr auto',
    textAlign: 'center',
    padding: '20px',
    gridRowGap: '20px'
  },
  infoCardLabel = {
    fontSize: '1.4rem',
    color: grayColor1
  },
  editCardContainer = {
    display: 'grid',
    borderRadius: '5px',
    background: 'white',
    boxShadow: 'rgba(34, 34, 34, 0.3) 0px 5px 10px -1px'
  },
  editCardInfo = {
    display: 'grid',
    padding: '20px',
    gridRowGap: '20px'
  },
  priceBlock = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridColumnGap: '70px',
    alignItems: 'center'
  },
  priceLabel = {
    fontFamily: fontTitle,
    fontSize: '1.5rem'
  },
  description = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  stock = {
    display: 'grid'
  },
  stockGrid = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr'
  },
  stockLabel = {
    fontSize: fontSizeSmall
  },
  stockQty = {
    justifySelf: 'end',
    fontSize: fontSizeSmall
  },
  editCardInputs = {
    display: 'grid',
    padding: '10px 0 0'
  },
  button = {
    display: 'block',
    WebkitAppearance: 'none',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    MozAppearance: 'none',
    outline: 'none',
    cursor: 'pointer',
    width: '100%',
    padding: '8px 0px',
    border: 'none',
    borderRadius: '20px',
    fontFamily: fontTitle,
    fontSize: '1.5rem',
    color: '#FFF',
    textAlign: 'center',
    background: gradient,
    boxShadow: `0px 3px 12px -3px rgba(34,34,34,0.65)`
  },
  image = waitingInfoCard => ({
      objectFit: 'cover',
      width: '100%',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: waitingInfoCard ? 'none' : '5px',
      borderBottomLeftRadius: waitingInfoCard ? '5px' : 'none',
  }),
  summary = {
    display: 'grid',
    gridRowGap: '10px',
    borderTop: `2px solid ${primaryColor}`,
    margin: '30px 0 25px',
    padding: '15px 0 0'
  },
  saleSummary = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
  },
  summaryCardContainer = {
    display: 'grid',
    gridTemplateColumns: '100px 1fr',
    padding: '0 0 20px',
    borderRadius: '5px',
    background: 'white',
    boxShadow: 'rgba(34, 34, 34, 0.3) 0px 5px 10px -1px'
  },
  summaryCardInfo = {
    display: 'grid',
    padding: '20px 20px 0',
    gridRowGap: '20px'
  },
  summaryBlock = {
    display: 'grid',
    alignItems: 'center'
  },
  total = {
    fontFamily: fontTitle
  },
  priceTotal = {
    fontFamily: fontTitle,
    textAlign: 'end'
  },
  card = {
    display: 'grid',
    padding: '10px',
    gridGap: '10px',
    borderRadius: '5px',
    boxShadow: 'rgba(34, 34, 34, 0.3) 0px 5px 10px -1px',
    background: 'white',
  },
  cardHeader = {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'space-between',
    padding: '0px 10px',
    alignItems: 'center',
  },
  cardContent = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '10px',
    alignItems: 'center',
    borderTop: '1px solid #F0F0F0',
    borderBottom: '1px solid #F0F0F0',
    padding: '10px 0px',
  },
  cardRequests = {
    display: 'grid',
    gridGap: '10px',
    alignItems: 'center',
    borderTop: '1px solid #F0F0F0',
    borderBottom: '1px solid #F0F0F0',
    padding: '10px 0px',
  },
  title = {
    textAlign: 'start',
    fontSize: 12,
  },
  requestRow = {
    display: 'grid',
    gridTemplateColumns: '1.6fr 2.8fr 1.5fr',
    gridGap: '5px',
  };
