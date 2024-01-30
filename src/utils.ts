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

// Type guard to check if the error is a DBError
function isDBError(error: unknown): error is DBError {
    return (error as DBError).value !== undefined;
}