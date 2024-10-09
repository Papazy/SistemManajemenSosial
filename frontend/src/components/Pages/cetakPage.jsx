import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Gaya untuk PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderColor: '#bfbfbf',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#f2f2f2",
    padding: 5,
  },
  tableCol: {
    width: "10%",
    borderStyle: "solid",
    borderColor: '#bfbfbf',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
  },
  tableCellHeader: {
    margin: "auto",
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
  },
  header: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    marginBottom: 10,
    fontSize: 12,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: "row",
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  footerCol: {
    width: "45%",
  }
});

// Komponen untuk membuat dokumen PDF
const MyDocument = ({ data, header, footer }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      {/* Judul Laporan */}
      <Text style={styles.title}>Rekap Data {header.title} </Text>

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text>KABUPATEN </Text>
          <Text>: {header.kabupaten}</Text>
        </View>
        <View>
          <Text style={styles.headerRow}>KECAMATAN </Text>
          <Text>: {header.kecamatan}</Text>
        </View>
      </View>
      
      {/* Tabel Data */}
      <View style={styles.table}>
        {/* Header Table */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Gampong</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>ADK</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>AY_AP_AYP</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>AT</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>ABH</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>AJ</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>ABT</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>AKTK</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>PRSE</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>KTK</Text>
          </View>
          {/* Tambahkan header untuk kolom lainnya sesuai data */}
        </View>

        {/* Isi Tabel */}
        {data.map((item) => (
          <View style={styles.tableRow} key={item._id}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.gampong}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.ADK}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.AY_AP_AYP}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.AT}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.ABH}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.AJ}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.ABT}</Text>
            </View> 
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.AKTK}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.PRSE}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.KTK}</Text>
            </View>
            {/* Tambahkan kolom lainnya sesuai data */}
          </View>
        ))}
      </View>

       {/* Footer */}
       <View style={styles.footer}>
        <Text>Footer Data Kategori Sosial</Text>
        {Object.entries(footer).map(([key, value]) => (
          <View style={styles.footerRow} key={key}>
            <Text style={styles.footerCol}>{key}</Text>
            <Text style={styles.footerCol}>{value}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default MyDocument;
