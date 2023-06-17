import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, map, of, tap, throwError } from "rxjs";
import { Status } from "src/types";

@Injectable()
export class ExceptionsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
            .pipe(
                map(res => ({ status: Status.Success, data: res })),
                catchError((err) => throwError(new BadRequestException({ staus: Status.Fail, data: err })))
            )
    }
}