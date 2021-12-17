export interface LoadOptions {
    id?: string;
    props?: { [key: string]: any };
    element?: any;
    children?: LoadOptions[];
}

export interface ReplaceOptions {
    [key: string]: LoadOptions;
}
