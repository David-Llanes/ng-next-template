import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Logger } from '@domain/common/interfaces/logger.abstract';
import {
  ApiResponse,
  ApiResponseWithPagination,
} from '@domain/common/models/api-response.model';
import { ApiResponseMapper } from '@infrastructure/common/mappers/api-response.mapper';

@Injectable({
  providedIn: 'root',
})
export class ApiErrorHandlerService {
  private logger = inject(Logger);

  handleError<T>(error: HttpErrorResponse): Observable<ApiResponse<T>> {
    if (error.error && error.error.success === false) {
      this.logger.log('HANDLE ERROR CAUGHT THIS ApiResponseDTO:', error.error);

      const response = ApiResponseMapper.fromApiToDomain<T>(error.error);

      this.logger.warn('⚠️ Business error from backend:', {
        url: error.url,
        response,
      });

      this.logger.log('HANDLE ERROR RETURNED THIS DOMAIN ENTITY:', response);

      return of(response); // Returns an ApiResponse<T>.
    } else {
      return this.handleErrorHard(error);
    }
  }

  handlePaginatedError<T>(
    error: HttpErrorResponse
  ): Observable<ApiResponseWithPagination<T>> {
    if (error.error && error.error.success === false) {
      this.logger.log('HANDLE PAGINATED ERROR CAUGHT THIS ApiResponseDTO:', error.error);

      const response = ApiResponseMapper.fromApiPaginatedToDomain<T>(error.error);

      this.logger.warn('⚠️ Business error from backend:', {
        url: error.url,
        response,
      });

      this.logger.log('HANDLE PAGINATED ERROR RETURNED THIS DOMAIN ENTITY:', response);

      return of(response); // Returns an ApiResponseWithPagination<T>.
    } else {
      return this.handleErrorHard(error);
    }
  }

  handleErrorHard(error: any): Observable<never> {
    this.logger.error('💥 Critical error when making request:', {
      url: error?.url,
      status: error?.status,
      message: error?.message,
      error,
    });

    // Throws an error that the component or use-case can catch.
    return throwError(() => new Error('Communication error with the server.'));
  }
}
