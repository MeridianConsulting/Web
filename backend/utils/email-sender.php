<?php
/**
 * EmailSender - Clase para envío de correos
 * MERIDIAN CONSULTING LTDA
 * 
 * Soporta:
 * - PHP mail() nativo (para localhost/servidor sin SMTP)
 * - PHPMailer (para servidores con SMTP)
 */

class EmailSender {
    
    /**
     * Enviar email de confirmación al cliente
     */
    public function sendConfirmationEmail($data) {
        $to = $data['to'];
        $name = $data['name'];
        
        $subject = '✅ Confirmación de Mensaje Recibido - MERIDIAN CONSULTING';
        
        $message = $this->getConfirmationTemplate($name);
        
        return $this->send($to, $subject, $message);
    }
    
    /**
     * Enviar email de notificación al administrador
     */
    public function sendNotificationEmail($data) {
        $to = EMAIL_ADMIN;
        
        $subject = '📧 Nuevo Mensaje de Contacto - ' . $data['name'];
        
        $message = $this->getNotificationTemplate($data);
        
        // Agregar Reply-To del usuario para responder directamente
        $replyTo = [
            'email' => $data['email'],
            'name' => $data['name']
        ];
        
        return $this->send($to, $subject, $message, $replyTo);
    }
    
    /**
     * Método principal de envío
     */
    private function send($to, $subject, $htmlMessage, $replyTo = null) {
        if (USE_SMTP && class_exists('PHPMailer\PHPMailer\PHPMailer')) {
            return $this->sendWithPHPMailer($to, $subject, $htmlMessage, $replyTo);
        } else {
            return $this->sendWithNativeMail($to, $subject, $htmlMessage, $replyTo);
        }
    }
    
    /**
     * Enviar con PHPMailer (SMTP)
     */
    private function sendWithPHPMailer($to, $subject, $htmlMessage, $replyTo = null) {
        try {
            require_once __DIR__ . '/../vendor/phpmailer/phpmailer/src/PHPMailer.php';
            require_once __DIR__ . '/../vendor/phpmailer/phpmailer/src/SMTP.php';
            require_once __DIR__ . '/../vendor/phpmailer/phpmailer/src/Exception.php';
            
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            
            // Configuración del servidor SMTP
            $mail->isSMTP();
            $mail->Host = SMTP_HOST;
            $mail->SMTPAuth = SMTP_AUTH;
            $mail->Username = SMTP_USERNAME;
            $mail->Password = SMTP_PASSWORD;
            $mail->SMTPSecure = SMTP_SECURE;
            $mail->Port = SMTP_PORT;
            $mail->CharSet = EMAIL_CHARSET;
            $mail->Timeout = EMAIL_TIMEOUT;
            
            // Remitente y destinatario
            $mail->setFrom(EMAIL_FROM, EMAIL_FROM_NAME);
            $mail->addAddress($to);
            
            // Reply-To (para responder directamente al usuario)
            if ($replyTo !== null && isset($replyTo['email'])) {
                $mail->addReplyTo($replyTo['email'], $replyTo['name'] ?? '');
            }
            
            // CC (opcional)
            if (!empty(EMAIL_ADMIN_CC)) {
                $mail->addCC(EMAIL_ADMIN_CC);
            }
            
            // Contenido
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $htmlMessage;
            $mail->AltBody = strip_tags($htmlMessage);
            
            $mail->send();
            return true;
            
        } catch (Exception $e) {
            error_log("Error PHPMailer: " . $mail->ErrorInfo);
            return false;
        }
    }
    
    /**
     * Enviar con mail() nativo de PHP
     */
    private function sendWithNativeMail($to, $subject, $htmlMessage, $replyTo = null) {
        try {
            // Headers
            $headers = "MIME-Version: 1.0\r\n";
            $headers .= "Content-type: text/html; charset=" . EMAIL_CHARSET . "\r\n";
            $headers .= "From: " . EMAIL_FROM_NAME . " <" . EMAIL_FROM . ">\r\n";
            
            // Reply-To (para responder directamente al usuario)
            if ($replyTo !== null && isset($replyTo['email'])) {
                $replyToName = isset($replyTo['name']) ? $replyTo['name'] : '';
                $headers .= "Reply-To: " . $replyToName . " <" . $replyTo['email'] . ">\r\n";
            } else {
                $headers .= "Reply-To: " . EMAIL_FROM . "\r\n";
            }
            
            $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
            $headers .= "X-Priority: 3\r\n";
            
            // Enviar
            $success = mail($to, $subject, $htmlMessage, $headers);
            
            return $success;
            
        } catch (Exception $e) {
            error_log("Error mail(): " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Plantilla de confirmación para el cliente
     */
    private function getConfirmationTemplate($name) {
        return <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Mensaje</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0a3eb1 0%, #0d6efd 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                                MERIDIAN CONSULTING
                            </h1>
                            <p style="margin: 10px 0 0; color: #f4d35e; font-size: 14px; letter-spacing: 1px;">
                                CONSULTORÍA ESPECIALIZADA
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px; color: #0a3eb1; font-size: 24px;">
                                ¡Hola, {$name}!
                            </h2>
                            <p style="margin: 0 0 15px; color: #333333; font-size: 16px; line-height: 1.6;">
                                Hemos recibido tu mensaje correctamente. Gracias por contactar a <strong>MERIDIAN CONSULTING LTDA</strong>.
                            </p>
                            <p style="margin: 0 0 15px; color: #333333; font-size: 16px; line-height: 1.6;">
                                Nuestro equipo revisará tu solicitud y te responderemos lo antes posible, generalmente en un plazo de <strong>24 a 48 horas</strong> hábiles.
                            </p>
                            
                            <!-- Info Box -->
                            <div style="background-color: #f8f9fa; border-left: 4px solid #0a3eb1; padding: 20px; margin: 25px 0; border-radius: 4px;">
                                <p style="margin: 0; color: #555555; font-size: 14px; line-height: 1.6;">
                                    💡 <strong>¿Necesitas atención urgente?</strong><br>
                                    Puedes contactarnos directamente por WhatsApp al <strong>+57 313 817 4050</strong>
                                </p>
                            </div>
                            
                            <p style="margin: 25px 0 0; color: #666666; font-size: 14px;">
                                Atentamente,<br>
                                <strong style="color: #0a3eb1;">Equipo MERIDIAN CONSULTING LTDA</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">
                                📧 contacto@meridianltda.com | 📱 +57 313 817 4050
                            </p>
                            <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">
                                🌐 <a href="https://meridianltda.com" style="color: #0a3eb1; text-decoration: none;">www.meridianltda.com</a>
                            </p>
                            <p style="margin: 15px 0 0; color: #999999; font-size: 12px;">
                                © 2025 MERIDIAN CONSULTING LTDA. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
    }
    
    /**
     * Plantilla de notificación para el administrador
     */
    private function getNotificationTemplate($data) {
        $name = $data['name'];
        $email = $data['email'];
        $phone = $data['phone'];
        $company = $data['company'];
        $service = $data['service'];
        $message = nl2br(htmlspecialchars($data['message']));
        
        return <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Mensaje de Contacto</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px;">
                                📧 Nuevo Mensaje de Contacto
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="margin: 0 0 20px; color: #0a3eb1; font-size: 20px;">
                                Información del Cliente
                            </h2>
                            
                            <!-- Info Table -->
                            <table width="100%" cellpadding="10" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 4px; margin-bottom: 20px;">
                                <tr style="background-color: #f8f9fa;">
                                    <td style="font-weight: 600; color: #555; width: 30%;">Nombre:</td>
                                    <td style="color: #333;">{$name}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 600; color: #555;">Email:</td>
                                    <td style="color: #0a3eb1;"><a href="mailto:{$email}" style="color: #0a3eb1; text-decoration: none;">{$email}</a></td>
                                </tr>
                                <tr style="background-color: #f8f9fa;">
                                    <td style="font-weight: 600; color: #555;">Teléfono:</td>
                                    <td style="color: #333;"><a href="tel:{$phone}" style="color: #333; text-decoration: none;">{$phone}</a></td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 600; color: #555;">Empresa:</td>
                                    <td style="color: #333;">{$company}</td>
                                </tr>
                                <tr style="background-color: #f8f9fa;">
                                    <td style="font-weight: 600; color: #555;">Servicio:</td>
                                    <td style="color: #333;">{$service}</td>
                                </tr>
                            </table>
                            
                            <h3 style="margin: 25px 0 15px; color: #0a3eb1; font-size: 18px;">
                                Mensaje:
                            </h3>
                            <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #0a3eb1; border-radius: 4px;">
                                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6;">
                                    {$message}
                                </p>
                            </div>
                            
                            <!-- Actions -->
                            <div style="margin-top: 30px; text-align: center;">
                                <a href="mailto:{$email}" style="display: inline-block; background: linear-gradient(135deg, #0a3eb1, #0d6efd); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; margin: 5px;">
                                    📧 Responder por Email
                                </a>
                                <a href="https://wa.me/{$phone}" style="display: inline-block; background: linear-gradient(135deg, #25D366, #128C7E); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; margin: 5px;">
                                    💬 Responder por WhatsApp
                                </a>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                Este correo fue generado automáticamente por el formulario de contacto<br>
                                MERIDIAN CONSULTING LTDA - Sistema de Gestión de Contactos
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
    }
}

