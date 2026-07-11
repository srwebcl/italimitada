import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    border: '20px solid #52525B', 
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    borderBottom: '2px solid #00D02C',
    paddingBottom: 20
  },
  logoPlaceholder: {
    fontSize: 24,
    color: '#52525B',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: '#00D02C',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 14,
    color: '#52525B',
    lineHeight: 2,
  },
  dataRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dataLabel: {
    width: 200,
    fontWeight: 'bold',
    color: '#3f3f46',
  },
  dataValue: {
    flex: 1,
    borderBottom: '1px solid #e4e4e7',
    color: '#000000',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTop: '2px solid #52525B',
    paddingTop: 15,
  },
  qrContainer: {
    width: 100,
    alignItems: 'center'
  },
  qrImage: {
    width: 70,
    height: 70,
    marginBottom: 5
  },
  codeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#00D02C'
  },
  disclaimer: {
    fontSize: 9,
    color: '#71717a',
    textAlign: 'right',
    width: '70%'
  }
});

interface CertificateData {
  welderName: string;
  welderRut: string;
  process: string;
  issueDate: string;
  expiryDate: string;
  validationCode: string;
  qrBase64: string;
  logoBase64: string;
}

export const CertificateTemplate = ({ data }: { data: CertificateData }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.headerContainer}>
        {data.logoBase64 ? (
          <Image src={data.logoBase64} style={{ width: 160, height: 43 }} />
        ) : (
          <Text style={styles.logoPlaceholder}>ITA LIMITADA</Text>
        )}
        <Text style={{ fontSize: 12, color: '#71717a' }}>Ingeniería NDT y Servicios Integrales</Text>
      </View>
      
      <Text style={styles.title}>Certificado de Calificación de Soldador</Text>
      
      <View style={styles.content}>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Nombre Completo:</Text>
          <Text style={styles.dataValue}>{data.welderName}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>RUT:</Text>
          <Text style={styles.dataValue}>{data.welderRut}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Proceso Calificado:</Text>
          <Text style={styles.dataValue}>{data.process}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Fecha de Emisión:</Text>
          <Text style={styles.dataValue}>{data.issueDate}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Válido Hasta:</Text>
          <Text style={styles.dataValue}>{data.expiryDate}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.qrContainer}>
          <Image src={data.qrBase64} style={styles.qrImage} />
          <Text style={styles.codeText}>Código: {data.validationCode}</Text>
        </View>
        <Text style={styles.disclaimer}>
          Este documento certifica que el soldador ha sido calificado cumpliendo rigurosamente con los estándares y normativas internacionales AWS D1.1, ASME IX y API 1104. Documento auditable vía portal oficial ITA Limitada.
        </Text>
      </View>
    </Page>
  </Document>
);
