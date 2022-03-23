import { QueryResult } from "pg";

export default interface Model<Pool, Fields, Object> {
    pool: Pool;
    create: (fields: Fields) => Promise<QueryResult<Object>>;
    get: (id: string) => Promise<QueryResult<Object>>;
    update: (fields: Object) => Promise<QueryResult<Object>>;
    delete: (id: string) => Promise<QueryResult<Object>>;
}
