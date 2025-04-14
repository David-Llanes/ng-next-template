import { ApiResponseDTO } from '../dto/api-response.dto';
import { ApiResponse, ApiResponseWithPagination } from '../models/api-response.model';

export class ApiResponseMapper {
  static fromWrapper<T>(response: ApiResponseDTO<any>): ApiResponse<T> {
    return {
      result: response.result ?? null,
      success: response.success ?? false,
      message: response.message ?? '',
      errors: response.errors ?? [],
    };
  }

  static fromPaginatedWrapper<T>(
    response: ApiResponseDTO<any>
  ): ApiResponseWithPagination<T> {
    return {
      ...this.fromWrapper<T>(response),
      currentPage: response.pageNumber ?? 1,
      pageSize: response.numberRecords ?? 0,
      totalRecords: response.totalRecords ?? 0,
      startRecord: response.startRecord ?? 0,
      numberPages: response.numberPages ?? 1,
    };
  }
}
