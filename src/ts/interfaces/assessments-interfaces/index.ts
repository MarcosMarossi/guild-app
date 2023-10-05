export interface AssessmentRequest {
    name: string;
    comment: string;
    idFair: number;
    serialNumber: string;
}

export interface AssessmentResponse {
    name: string;
    comment: string;
    id: number;
}