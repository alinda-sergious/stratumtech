import { Html, Body, Container, Text, Preview, Heading, Hr, Section } from "@react-email/components"

interface AdminNotificationEmailProps {
  formType: string
  formData: Record<string, any>
  submittedAt: string
}

export default function AdminNotificationEmail({ formType, formData, submittedAt }: AdminNotificationEmailProps) {
  return (
    <Html>
      <Preview>
        New {formType} submission from {formData.name || formData.fullName}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.header}>Stratum Tech</Heading>
          <Heading as="h2" style={styles.subheader}>
            New {formType} Submission
          </Heading>

          <Text style={styles.text}>
            You have received a new {formType.toLowerCase()} submission from{" "}
            <strong>{formData.name || formData.fullName}</strong>.
          </Text>

          <Section style={styles.detailsSection}>
            <Heading as="h3" style={styles.sectionHeader}>
              Submission Details:
            </Heading>

            {Object.entries(formData).map(([key, value]) => {
              // Skip empty values or complex objects
              if (!value || typeof value === "object") return null

              // Format key for display
              const formattedKey = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
                .replace(/([a-z])([A-Z])/g, "$1 $2")

              return (
                <Text key={key} style={styles.detail}>
                  <strong>{formattedKey}:</strong> {value.toString()}
                </Text>
              )
            })}

            <Text style={styles.timestamp}>Submitted on: {submittedAt}</Text>
          </Section>

          <Hr style={styles.divider} />

          <Text style={styles.footer}>
            This is an automated message from your Stratum Tech website. Please respond to the customer promptly.
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
    margin: "0 0 15px",
  },
  subheader: {
    color: "#B8860B",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "0 0 30px",
  },
  text: {
    color: "#333",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "16px 0",
  },
  detailsSection: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "6px",
    margin: "20px 0",
  },
  sectionHeader: {
    color: "#001934",
    fontSize: "18px",
    margin: "0 0 15px",
  },
  detail: {
    color: "#333",
    fontSize: "15px",
    lineHeight: "22px",
    margin: "8px 0",
  },
  timestamp: {
    color: "#666",
    fontSize: "14px",
    fontStyle: "italic",
    marginTop: "20px",
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
  },
}
