<?php
/**
 * PROTOCORE CONTACT FORMULIER
 * 
 * Dit PHP script verwerkt het contact formulier en verstuurt emails.
 * Upload dit bestand samen met je andere bestanden naar Strato.
 * 
 * BELANGRIJK: Pas het email adres hieronder aan naar jouw email!
 */

// ==========================================
// CONFIGURATIE - PAS DIT AAN!
// ==========================================

// Jouw email adres waar berichten naartoe gaan
$to_email = "info@protocore.nl";

// Onderwerp van de email
$email_subject = "Nieuw bericht van Protocore website";

// Bedankt pagina (laat leeg om terug te gaan naar homepage)
$redirect_url = "index.html#contact";

// ==========================================
// VERWERK FORMULIER
// ==========================================

// Check of formulier is verzonden
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Haal gegevens op en maak ze veilig
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = strip_tags(trim($_POST["message"]));
    
    // Validatie
    $errors = array();
    
    if (empty($name)) {
        $errors[] = "Naam is verplicht.";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Een geldig email adres is verplicht.";
    }
    
    if (empty($message)) {
        $errors[] = "Bericht is verplicht.";
    }
    
    // Als er geen fouten zijn, verstuur email
    if (empty($errors)) {
        
        // Maak email content
        $email_content = "Nieuw bericht van de Protocore website\n\n";
        $email_content .= "================================\n\n";
        $email_content .= "Naam: $name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Telefoon: $phone\n\n";
        $email_content .= "Bericht:\n";
        $email_content .= "$message\n\n";
        $email_content .= "================================\n";
        $email_content .= "Verzonden op: " . date('d-m-Y H:i:s') . "\n";
        
        // Email headers
        $email_headers = "From: $name <$email>\r\n";
        $email_headers .= "Reply-To: $email\r\n";
        $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Verstuur email
        if (mail($to_email, $email_subject, $email_content, $email_headers)) {
            // Success! Redirect naar bedank pagina
            header("Location: $redirect_url?success=1");
            exit;
        } else {
            $errors[] = "Er ging iets mis bij het versturen. Probeer het opnieuw.";
        }
        
    }
    
    // Als er fouten zijn, toon ze
    if (!empty($errors)) {
        echo "<!DOCTYPE html>\n";
        echo "<html lang='nl'>\n";
        echo "<head>\n";
        echo "    <meta charset='UTF-8'>\n";
        echo "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n";
        echo "    <title>Fout - Protocore</title>\n";
        echo "    <style>\n";
        echo "        body { font-family: Arial, sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; }\n";
        echo "        .error { background: #fee; border: 2px solid #c00; padding: 20px; border-radius: 10px; }\n";
        echo "        h2 { color: #c00; }\n";
        echo "        a { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px; }\n";
        echo "    </style>\n";
        echo "</head>\n";
        echo "<body>\n";
        echo "    <div class='error'>\n";
        echo "        <h2>Er zijn enkele problemen:</h2>\n";
        echo "        <ul>\n";
        foreach ($errors as $error) {
            echo "            <li>$error</li>\n";
        }
        echo "        </ul>\n";
        echo "    </div>\n";
        echo "    <a href='index.html#contact'>← Terug naar website</a>\n";
        echo "</body>\n";
        echo "</html>\n";
        exit;
    }
    
} else {
    // Als iemand direct naar dit bestand gaat
    header("Location: index.html");
    exit;
}
?>

