export const biometryResponseTemplate = {
    isIdentical: true,
    confidence: 98.09,
    success: true,
    compared: true,
    faceCount: {
        img1: 1,
        img2: 1,
    },
};

export type Response = typeof biometryResponseTemplate;
export type TypeCheck = (obj: any) => obj is Response;
