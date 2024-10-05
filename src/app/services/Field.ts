export class Field {
    field: string;
    header: string;

    //Non Mandatory
    checked?: boolean;
    sizeL?: number; // Landscape
    sizeP?: number; // Portrait
    date?: boolean | null;
    cellRenderer?: any;
    editable?: boolean;
    utClass?: string
}
