package c24_71_ft_webapp.nexcognifix.domain.professional;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record DataLoginProfessional(
        @Email
        @NotNull
        String email,

        @NotNull
        String password
) {
}
