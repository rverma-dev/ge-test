interface Column {
    name: string;
    type: string;
}

interface DBError {
    value: { number: number };
}

interface GeMetadata {
    tenant_id: number;
    ge_name: string;
    columns: Column[];
    indexes: Column[];
}