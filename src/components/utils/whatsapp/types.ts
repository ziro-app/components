type LeadRegisteredOptions<R extends string|string[]> = {
    recipients: R
    template_name: "lead-registered"
    template_parameters: {
        name: string
        whats: string
    }
}
type AntifraudTrouble<R extends string|string[]> = {
    recipients: R
    template_name: "antifraud-trouble"
    template_parameters: {
        razao: string
    }
}
export type WhatsappOptions<R extends string|string[]> = LeadRegisteredOptions<R>|AntifraudTrouble<R>