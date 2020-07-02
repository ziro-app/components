import { fontTitle, primaryColor, secondaryColor } from '@ziro/theme';

export const container = blockGap => ({
    display: 'grid',
    gridRowGap: blockGap ? blockGap : '40px',
    color: primaryColor,
  }),
  infoBlock = {
    display: 'grid',
    gridRowGap: '12px',
  },
  headerStyle = centerTitle => ({
    textAlign: centerTitle ? 'center' : 'left',
    fontFamily: fontTitle,
    textTransform: 'uppercase',
    fontSize: '1.5rem',
    background: `linear-gradient(transparent 90%, rgba(34,34,34,1) 100%)`,
  }),
  dot = {
    fontSize: '21px',
    color: secondaryColor,
  },
  bodyStyle = {
    display: 'grid',
    gridRowGap: '6px',
  },
  info = {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridColumnGap: '10px',
    textAlign: 'end',
  },
  titleStyle = {
    maxWidth: '350px',
    fontFamily: fontTitle,
    fontSize: '1.5rem',
    textAlign: 'start',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  contentStyle = color => ({
    maxWidth: '350px',
    fontSize: '1.5rem',
    fontWeight: color ? '500' : '400',
    color: color ? color : primaryColor,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  });
