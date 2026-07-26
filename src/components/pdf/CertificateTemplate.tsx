import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    borderBottom: '2px solid #00D02C',
    paddingBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
  logo: {
    width: 120,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottom: '1px solid #eeeeee',
    paddingBottom: 10,
  },
  label: {
    width: 160,
    fontSize: 12,
    color: '#666666',
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: '#1a1a1a',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingTop: 20,
    borderTop: '1px solid #eeeeee',
  },
  qrContainer: {
    width: 100,
    height: 100,
  },
  validationInfo: {
    flex: 1,
    marginRight: 20,
    justifyContent: 'center',
  },
  validationText: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2,
  },
  validationLink: {
    fontSize: 10,
    color: '#00D02C',
    marginTop: 5,
  }
});

interface CertificateData {
  welderName: string;
  welderRut: string;
  company: string;
  certificateNumber: string;
  qualificationType: string;
  issueDate: string;
  expiryDate: string;
  validationCode: string;
  status: string;
  qrBase64: string;
  logoBase64: string;
}

export const CertificateTemplate = ({ data }: { data: CertificateData }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Informe de Calificación</Text>
        </View>
        <View>
          {data.logoBase64 ? (
             <Image style={styles.logo} src={data.logoBase64} />
          ) : (
             <Text style={styles.title}>ITA LIMITADA</Text>
          )}
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Nombre Completo:</Text>
          <Text style={styles.value}>{data.welderName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>RUT del Soldador:</Text>
          <Text style={styles.value}>{data.welderRut}</Text>
        </View>
        {data.company && data.company !== 'Independiente' && (
          <View style={styles.row}>
            <Text style={styles.label}>Empresa:</Text>
            <Text style={styles.value}>{data.company}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>N°. de Certificado:</Text>
          <Text style={styles.value}>{data.certificateNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tipo de Calificación:</Text>
          <Text style={styles.value}>{data.qualificationType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha de Emisión:</Text>
          <Text style={styles.value}>{data.issueDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha de Caducidad:</Text>
          <Text style={styles.value}>{data.expiryDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Estado Actual:</Text>
          <Text style={styles.value}>{data.status}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.validationInfo}>
          <Text style={styles.validationText}>Este documento es validable públicamente.</Text>
          <Text style={styles.validationText}>Escanee el código QR o visite www.italimitada.cl/certificados</Text>
          <Text style={styles.validationLink}>Código: {data.validationCode}</Text>
        </View>
        <Image style={styles.qrContainer} src={data.qrBase64} />
      </View>
    </Page>
  </Document>
);
