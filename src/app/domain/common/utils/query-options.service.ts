import { Injectable } from '@angular/core';
import { QueryOptions, QueryOptionsFilter } from '../models/query-options.model';

@Injectable({
  providedIn: 'root',
})
export class QueryOptionsService {
  buildQuery<T>(options: QueryOptions<T>): string {
    const queryParams: string[] = [];

    if (options.page && options.skip !== undefined && options.take !== undefined) {
      const calculatedSkip = (options.page! - 1) * options.take!;

      if (calculatedSkip !== options.skip) {
        throw Error('Query "page" and "skip" do not reference the same value.');
      }
    }

    if (options.page && options.take !== undefined) {
      const skip = (options.page! - 1) * options.take!;

      queryParams.push(`skip=${skip}`);
    } else if (options.skip !== undefined) {
      queryParams.push(`skip=${options.skip}`);
    }

    if (options.take !== undefined) {
      queryParams.push(`take=${options.take}`);
    }

    if (options.requireTotalCount) {
      queryParams.push(`requireTotalCount=${options.requireTotalCount}`);
    }

    if (options.filters && options.filters.length > 0) {
      // Builds the encoded string from the filters
      const filterParam = encodeURIComponent(this.buildFilterString<T>(options.filters));
      queryParams.push(`filter=${filterParam}`);
    }

    if (options.sort && options.sort.length === 1) {
      const sortParam = encodeURIComponent(JSON.stringify(options.sort));
      queryParams.push(`sort=${sortParam}`);
    }

    return queryParams.join('&');
  }

  private buildFilterString<T>(filter: QueryOptionsFilter<T>): string {
    if (Array.isArray(filter)) {
      // If it's an array, process each element recursively
      const filterExpressions = filter.map(f => this.buildFilterString(f));
      return `[${filterExpressions.join(',')}]`;
    } else if (typeof filter === 'string') {
      // It's a logical operator
      return `"${filter}"`;
    } else {
      // It's a filter (field, operator, value)
      return `[${JSON.stringify(filter.field)},${JSON.stringify(filter.operator)},${JSON.stringify(filter.value)}]`;
    }
  }
}
