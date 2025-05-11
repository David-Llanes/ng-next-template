import { QueryOptions } from '../models/query-options.model';

export abstract class QueryBuilder {
  abstract buildQuery<T>(options: QueryOptions<T>): string;
}
