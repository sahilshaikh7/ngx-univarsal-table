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
    utClass?: string
}
