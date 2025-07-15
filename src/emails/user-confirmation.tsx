import { Html, Body, Container, Text, Preview, Heading, Hr, Section, Button } from "@react-email/components"

interface UserConfirmationEmailProps {
  formType: string
  userName: string
}

export default function UserConfirmationEmail({ formType, userName }: UserConfirmationEmailProps) {
  const firstName = userName.split(" ")[0]

  return (
    <Html>
      <Preview>Thank you for your {formType.toLowerCase()} submission - Stratum Tech</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.header}>Stratum Tech</Heading>

          <Section style={styles.heroSection}>
            <Heading as="h2" style={styles.heroText}>
              Thank You, {firstName}!
            </Heading>
            <Text style={styles.heroSubtext}>We've received your {formType.toLowerCase()} submission</Text>
          </Section>

          <Text style={styles.text}>Dear {userName},</Text>

          <Text style={styles.text}>
            Thank you for submitting your {formType.toLowerCase()} through our website. We appreciate your interest in
            Stratum Tech.
          </Text>

          <Text style={styles.text}>
            <strong>What happens next?</strong>
          </Text>

          <Text style={styles.text}>
            Our team will review your submission and get back to you within 24 hours. You can expect:
          </Text>

          <Section style={styles.listSection}>
            <Text style={styles.listItem}>• A personalized response from our team</Text>
            <Text style={styles.listItem}>• Additional information about your inquiry</Text>
            <Text style={styles.listItem}>• Answers to any questions you may have</Text>
          </Section>

          <Text style={styles.text}>
            If you have any urgent questions, please don't hesitate to contact us directly:
          </Text>

          <Section style={styles.contactSection}>
            <Text style={styles.contactItem}>📞 Phone: +250 788 123 456</Text>
            <Text style={styles.contactItem}>✉️ Email: Stratum.tech.ltd@gmail.com</Text>
          </Section>

          <Section style={styles.ctaSection}>
            <Button style={styles.ctaButton} href="https://stratumtech.com">
              Visit Our Website
            </Button>
          </Section>

          <Hr style={styles.divider} />

          <Text style={styles.footer}>
            Thank you for choosing Stratum Tech for your construction needs. We look forward to creating an exceptional
            experience for you!
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  body: {
    backgroundColor: "#f6f6f6",
    fontFamily: "Arial, sans-serif",
    padding: "20px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "30px",
    maxWidth: "600px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  header: {
    color: "#001934",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "0 0 25px",
  },
  heroSection: {
    backgroundColor: "#001934",
    padding: "30px 20px",
    borderRadius: "6px",
    margin: "20px 0",
    textAlign: "center" as const,
  },
  heroText: {
    color: "#B8860B",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 0 10px",
  },
  heroSubtext: {
    color: "#ffffff",
    fontSize: "16px",
    margin: "0",
  },
  text: {
    color: "#333",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "16px 0",
  },
  listSection: {
    margin: "20px 0",
    paddingLeft: "20px",
  },
  listItem: {
    color: "#333",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "8px 0",
  },
  contactSection: {
    backgroundColor: "#f9f9f9",
    padding: "15px 20px",
    borderRadius: "6px",
    margin: "20px 0",
  },
  contactItem: {
    color: "#333",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "8px 0",
  },
  ctaSection: {
    textAlign: "center" as const,
    margin: "30px 0",
  },
  ctaButton: {
    backgroundColor: "#B8860B",
    color: "#ffffff",
    padding: "12px 30px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "4px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
  },
  divider: {
    borderColor: "#e6e6e6",
    margin: "25px 0",
  },
  footer: {
    color: "#666",
    fontSize: "14px",
    textAlign: "center" as const,
    margin: "20px 0 0",
    lineHeight: "20px",
  },
}
