package c24_71_ft_webapp.nexcognifix.infrastructure.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.lang.reflect.Field;
import java.util.*;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /** Retorna el HttpStatus correspondiente a un código de error. */
    private HttpStatus getHttpStatusFromErrorCode(String errorCode) {
        return switch (errorCode) {
            case "CONFLICT" -> HttpStatus.CONFLICT; // 409
            case "ACCOUNT_NOT_CONFIRMED", "FORBIDDEN" -> HttpStatus.FORBIDDEN; // 403
            case "TOKEN_EXPIRED", "GONE" -> HttpStatus.GONE; // 410
            case "NOT_FOUND" -> HttpStatus.NOT_FOUND; // 404
            case "INVALID_CREDENTIALS", "UNAUTHORIZED" -> HttpStatus.UNAUTHORIZED; // 401
            case "SERVICE_UNAVAILABLE", "INTERNAL_SERVER_ERROR" -> HttpStatus.INTERNAL_SERVER_ERROR; // 500
            default -> HttpStatus.BAD_REQUEST; // 400
        };
    }

    /**  Manejo de excepciones de credenciales inválidas. */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
        HttpStatus status = getHttpStatusFromErrorCode("INVALID_CREDENTIALS");
        ErrorResponse errorResponse = new ErrorResponse("Las credenciales proporcionadas son incorrectas.");
        return ResponseEntity.status(status).body(errorResponse);
    }

    /** Manejo de excepciones personalizadas de la aplicación. */
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponse> handleAppException(AppException ex) {
        HttpStatus status = getHttpStatusFromErrorCode(ex.getErrorCode());
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage());
        return ResponseEntity.status(status).body(errorResponse);
    }



    /** Manejo de errores de formato JSON, incluyendo UUID inválido. */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        HttpStatus status = getHttpStatusFromErrorCode("BAD_REQUEST");

        // Extraer el mensaje específico de la excepción
        Throwable rootCause = ex.getMostSpecificCause();
        String message = "Formato de la solicitud inválido. Verifique los datos enviados.";

        String rootMessage = rootCause.getMessage();

        // Mensaje específico para UUID mal formado
        if (rootMessage.contains("UUID")) {
            message = "El formato del identificador UUID es inválido.";
        }

        ErrorResponse errorResponse = new ErrorResponse(message);
        return ResponseEntity.status(status).body(errorResponse);
    }

    /** Manejo de restricciones de validación en parámetros de métodos */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException exception) {
        return exception.getConstraintViolations().stream()
                .findFirst()
                .map(violation -> ResponseEntity.badRequest().body(new ErrorResponse(violation.getMessage())))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    /** Manejo de errores de validación de formulario (MethodArgumentNotValidException) */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {

        // Obtener la clase del DTO
        Class<?> dtoClass = Optional.ofNullable(exception.getBindingResult().getTarget())
                .map(Object::getClass)
                .orElse(null);

        // Si no se obtiene la clase, devolver el primer error sin ordenar
        if (dtoClass == null) {
            return exception.getFieldErrors().stream()
                    .findFirst()
                    .map(fieldError -> ResponseEntity.badRequest().body(new ErrorResponse(fieldError.getDefaultMessage())))
                    .orElseGet(() -> ResponseEntity.badRequest().build());
        }

        // Obtener el orden de los campos de la clase
        List<String> fieldPriorityOrder = getFieldOrder(dtoClass);

        // Ordenar los errores según el orden de los campos en el DTO
        return exception.getFieldErrors().stream()
                .min(Comparator.comparingInt(fieldError -> {
                    int index = fieldPriorityOrder.indexOf(fieldError.getField());
                    return index == -1 ? Integer.MAX_VALUE : index;
                }))
                .map(fieldError -> ResponseEntity.badRequest().body(new ErrorResponse(fieldError.getDefaultMessage())))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    /** Metodo que obtiene el orden de los campos de un DTO */
    private List<String> getFieldOrder(Class<?> dtoClass) {
        return Arrays.stream(dtoClass.getDeclaredFields())
                .map(Field::getName)
                .collect(Collectors.toList());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        if (ex.getRequiredType() == UUID.class) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("El ID proporcionado no es un UUID válido."));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Error en los parámetros de la URL."));
    }
}