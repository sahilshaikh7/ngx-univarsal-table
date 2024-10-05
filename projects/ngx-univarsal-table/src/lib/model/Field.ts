export class Field {
    field: string;
    header: string;

    //Non Mandatory
    showColumn?: boolean = true;
    sizeL?: number; // Landscape
    sizeP?: number; // Portrait
    date?: boolean | null;
    cellRenderer?: any;
    editable?: boolean;

    field0?: string;
    field1?: string;
    field2?: string;

    utClass?: string

}
