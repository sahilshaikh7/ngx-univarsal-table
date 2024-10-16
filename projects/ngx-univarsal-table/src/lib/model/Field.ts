export class Field {
    field: string;
    header: string;
    size: number; // Landscape

    //Non Mandatory
    sizeP?: number; // Portrait
    showColumn?: boolean;
    fieldType?:string = 'string';
    searchable?: boolean;
    filterList?:string[];
    filterRangeMin?:any;
    filterRangeMax?:any;
    sorting?: boolean = true;
    cellRenderer?: any;
    editable?: boolean;
    left?:any;
    field0?: string;
    field1?: string;
    field2?: string;
    utClass?: string
}
