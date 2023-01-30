import React, { useEffect } from 'react';
import {Page, Text, Image, Document, StyleSheet, View} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    table: {
      width: '100%',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      borderTop: '1px solid #EEE',
      paddingTop: 8,
      paddingBottom: 8,
    },
    header: {
      borderTop: 'none',
    },
    bold: {
      fontWeight: 'bold',
    },
    // So Declarative and unDRY 👌
    row1: {
      width: '27%',
    },
    row2: {
      width: '15%',
    },
    row3: {
      width: '15%',
    },
    row4: {
      width: '20%',
    },
    row5: {
      width: '27%',
    },
  })
const PDFFile = (props) =>{
    
return(
    <Document>
    <View style={styles.table}>
    <View style={[styles.row, styles.bold, styles.header]}>
      <Text style={styles.row1}>שם המוצר</Text>
      <Text style={styles.row2}>חברה </Text>
      <Text style={styles.row3}>צבע</Text>
      <Text style={styles.row4}>תמונה</Text>
      <Text style={styles.row5}>כמות</Text>
      <Text style={styles.row6}>מחיר</Text>
      <Text style={styles.row7}>סה"כ</Text>
      <Text style={styles.row8}>כמות</Text>
    </View>
    {props.products.map((prod, i) => (
      <View key={i} style={styles.row} wrap={false}>
       {/*  <Text style={styles.row1}>
          <Text style={styles.bold}>{prod.name}</Text>, {row.firstName}
        </Text> */}
        <Text style={styles.row2}>{prod.name}</Text>
        <Text style={styles.row3}>{prod.company}</Text>
        <Text style={styles.row5}>{prod.color}</Text>
        <Text style={styles.row5}>
            <Image src={`http://localhost:8182/data/uploads/${prod.catalogNumber}.png`} alt={prod.name}></Image>
        </Text>
        <Text style={styles.row5}>{prod.quantity}</Text>
        <Text style={styles.row5}>{prod.price}</Text>
        <Text style={styles.row5}>{prod.price*prod.quantity}</Text>
        
      </View>
    ))}
  </View>
  </Document>

)

};

export default PDFFile;