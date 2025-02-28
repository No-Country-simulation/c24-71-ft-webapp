package c24_71_ft_webapp.nexcognifix.infrastructure.validation.evennumber;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = EvenNumberValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface EvenNumber {
    String message() default "El número debe ser par";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}