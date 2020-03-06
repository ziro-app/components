const translateMonth = month => {
    switch (month) {
        case 'Jan': return '01'
        case 'Feb': return '02'
        case 'Mar': return '03'
        case 'Apr': return '04'
        case 'May': return '05'
        case 'Jun': return '06'
        case 'Jul': return '07'
        case 'Aug': return '08'
        case 'Sep': return '09'
        case 'Oct': return '10'
        case 'Nov': return '11'
        case 'Dec': return '12'
    }
}

const formatDate = date =>
    `${date.toString().substr(8, 2)}/${translateMonth(date.toString().substr(4, 3))}/${date.getFullYear()}`

export default formatDate