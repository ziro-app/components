export const errors = ({ title, message, illustration },openCamera) => ({
    NO_PHOTO: {
        title: 'Nenhuma foto',
        message: 'Para continuar é necessário tirar uma foto'
    },
    START: {
        title,
        message,
        illustration,
        firstButtonAction: openCamera
    }
})