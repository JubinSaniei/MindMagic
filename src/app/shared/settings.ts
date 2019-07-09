export class Settings {
    static getSettings(): ISettings {
        return { apiUrl: 'http://localhost:9001/api/' };
    }
}
export interface ISettings {
    apiUrl: string;
    // headerColor: string;
}
