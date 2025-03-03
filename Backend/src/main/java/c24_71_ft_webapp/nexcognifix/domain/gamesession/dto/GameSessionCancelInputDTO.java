package c24_71_ft_webapp.nexcognifix.domain.gamesession.dto;


import jakarta.validation.constraints.NotNull;

public record GameSessionCancelInputDTO(
        @NotNull(message = "El campo de observación no puede estar vacío. Por favor rellene el campo")
        String observation
) {
}
