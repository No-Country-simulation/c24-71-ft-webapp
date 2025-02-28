package c24_71_ft_webapp.nexcognifix.infrastructure.email;

import c24_71_ft_webapp.nexcognifix.domain.gamesession.GameSession;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.enums.GameStatus;
import c24_71_ft_webapp.nexcognifix.infrastructure.exception.AppException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @Value("${spring.mail.username}")
    private String fromEmail;


    // Envía un correo de sesión de juego.
    public void sendGameSessionEmail(GameSession gameSession) {
        String gameSessionUrl = frontendUrl + "/game-session/" + gameSession.getIdSession();

        // Convertir reglas en una lista HTML
        String gameRulesList = convertRulesToHtmlList(gameSession.getBoardGame().getRules());

        String emailContent = loadTemplate("game_session_email.html")
                .replace("{GAME_SESSION_URL}", gameSessionUrl)
                .replace("{PATIENT_NAME}", gameSession.getPatient().getName())
                .replace("{PROFESSIONAL_NAME}", gameSession.getPatient().getProfessional().getName())
                .replace("{GAME_NAME}", gameSession.getBoardGame().getName())
                .replace("{GAME_DESCRIPTION}", gameSession.getBoardGame().getDescription())
                .replace("{GAME_RULES}", gameRulesList);

        String subject = "Nueva sesión de juego creada para ti en NexCognitive";

        sendEmail(gameSession.getPatient().getEmail(), subject, emailContent);
    }


    // Envía un correo con el resultado de un juego.
    public void sendGameResultEmail(GameSession gameSession) {

        String gameSessionUrl = frontendUrl + "/game-result/" + gameSession.getIdSession();

        String emailContent = loadTemplate("game_result_email.html")
                .replace("{RESULTS_URL}", gameSessionUrl)
                .replace("{PATIENT_NAME}", gameSession.getPatient().getName())
                .replace("{GAME_NAME}", gameSession.getBoardGame().getName())
                .replace("{GAME_DESCRIPTION}", gameSession.getBoardGame().getDescription())
                .replace("{ESTIMATED_ATTEMPTS}", String.valueOf(gameSession.getEstimatedAttempts()))
                .replace("{ATTEMPTS_MADE}", gameSession.getAttemptsMade() > 0 ? String.valueOf(gameSession.getAttemptsMade()) : "N/A")
                .replace("{ESTIMATED_TIME}", formatSecondsToMinutes(gameSession.getEstimatedTime()))
                .replace("{TIME_PLAYED}", gameSession.getTimePlayed() > 0 ? formatSecondsToMinutes(gameSession.getTimePlayed()) : "N/A")
                .replace("{STATUS}", translateStatus(gameSession.getStatus()))
                .replace("{OBSERVATION}", Objects.requireNonNullElse(gameSession.getObservation(), "No hay observaciones."));

        String subject = "Resultados de la Sesión de " + gameSession.getPatient().getName();

        sendEmail(gameSession.getPatient().getProfessional().getEmail(), subject, emailContent);
    }


    // Metodo genérico para enviar correos.
    private void sendEmail(String recipientEmail, String subject, String content) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(content, true);

            mailSender.send(message);

        } catch (MailException | MessagingException e) {
            System.err.println("Error al enviar el correo: " + e.getMessage());
            throw new AppException("Error al enviar el email. Intenta más tarde.", "SERVICE_UNAVAILABLE");
        }
    }

    // Carga un archivo de plantilla desde el sistema de archivos.
    private String loadTemplate(String fileName) {
        try {
            String filePath = "src/main/resources/templates/" + fileName;
            return new String(Files.readAllBytes(Paths.get(filePath)));
        } catch (IOException e) {
            throw new RuntimeException("No se pudo cargar la plantilla de correo: " + fileName, e);
        }
    }

    // Metodo para convertir las reglas en una lista HTML
    private String convertRulesToHtmlList(String rules) {
        String[] rulesArray = rules.split("\\d+\\. ");
        StringBuilder htmlList = new StringBuilder("<ul>");

        for (String rule : rulesArray) {
            if (!rule.trim().isEmpty()) {
                htmlList.append("<li>").append(rule.trim()).append("</li>");
            }
        }

        htmlList.append("</ul>");
        return htmlList.toString();
    }

    public static String formatSecondsToMinutes(int seconds) {
        int minutes = seconds / 60;
        int remainingSeconds = seconds % 60;
        return String.format("%02d:%02d", minutes, remainingSeconds);
    }

    public static String translateStatus(GameStatus status) {
        switch (status) {
            case PENDING: return "Pendiente";
            case IN_PROGRESS: return "En progreso";
            case COMPLETED: return "Completado";
            case CANCELED: return "Cancelado";
            default: return "Desconocido";
        }
    }
}
