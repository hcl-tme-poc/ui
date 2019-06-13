export interface ElegibilityCheckResponse {
    message: string;
    reasons?: {reasonName: string; reasonDescription: string}[];
}
