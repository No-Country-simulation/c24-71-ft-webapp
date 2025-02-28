package c24_71_ft_webapp.nexcognifix.infrastructure.validation.evennumber;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EvenNumberValidator implements ConstraintValidator<EvenNumber, Integer> {
    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        return value == null || value % 2 == 0;
    }
}
