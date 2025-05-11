import {
  ApiResponse,
  ApiResponseWithPagination,
} from '@domain/common/models/api-response.model';
import { ApiResponseDTO } from '../dto/api-response.dto';

export class ApiResponseMapper {
  static fromApiToDomain<T>(response: ApiResponseDTO<any>): ApiResponse<T> {
    return {
      result: response.result ?? null,
      success: response.success ?? false,
      message: response.message ?? '',
      errors: response.errors ?? [],
    };
  }

  static fromApiPaginatedToDomain<T>(
    response: ApiResponseDTO<any>
  ): ApiResponseWithPagination<T> {
    return {
      ...this.fromApiToDomain<T>(response),
      currentPage: response.pageNumber ?? 1,
      pageSize: response.numberRecords ?? 0,
      totalRecords: response.totalRecords ?? 0,
      startRecord: response.startRecord ?? 0,
      numberPages: response.numberPages ?? 1,
    };
  }
}
