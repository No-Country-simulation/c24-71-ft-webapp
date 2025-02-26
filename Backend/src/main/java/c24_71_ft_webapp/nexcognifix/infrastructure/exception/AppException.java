package c24_71_ft_webapp.nexcognifix.infrastructure.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AppException extends RuntimeException{
    private final String message;
    private final String errorCode;
}
