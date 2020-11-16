const translateStatus = (status) => {
    switch (status) {
        case "pre_authorized":
            return "Pré Autorizado";
        case "succeeded":
            return "Aprovado";
        case "approved":
            return "Aprovado";
        case "failed":
            return "Falhado";
        case "pending":
            return "Aprovação Pendente";
        default:
            return "Cancelado";
    }
};

export default translateStatus;
