import { CreateBuyer } from "./types";

export const createBuyerParser: CreateBuyer.Request.Parser = ({
    fname: first_name,
    lname: last_name,
    cpf: taxpayer_id,
    email,
    endereco: line1,
    bairro: neighborhood,
    cidade: city,
    estado: state,
    cep: postal_code,
}) => ({
    first_name,
    last_name,
    taxpayer_id,
    email,
    address: { line1, neighborhood, city, state, postal_code, country_code: "BR" },
});
