import React, { useEffect, useState } from 'react';
import {Page, Font, Text, Image, Document, StyleSheet, View} from "@react-pdf/renderer";
import {ProductService} from '../services/productService';


const styles = StyleSheet.create({
    table: { 
        display: "table", 
        width: "auto", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0,
        marginTop:5
      }, 
      tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableCol: { 
        width: "25%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableCell: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 10 
      },
      h1:{
        textAlign:"center",

      },
    });
/* Font.register({
    family: 'Rubik',
    src: '/fonts/Rubik-Regular.ttf'
}); */

Font.register({ family: 'Rubik', src: "http://fonts.gstatic.com/s/rubik/v3/4sMyW_teKWHB3K8Hm-Il6A.ttf" });

const PDFFile = (props) =>{

    useEffect ( () => {
        ttGetProducts();
        console.log('PDF WRONG!!!!');
        console.log(props.products);
    },[props.products]);

    const [ prods, setProds] = useState();

    const ttGetProducts =async () => {
        let products = await ProductService.getProducts();
        console.log(products);
        setProds(products.data);
    }
return(
    <Document>
    <Page style={styles.body}>
        <Text style={styles.h1}>הצעת מחיר עבור </Text>
      <View style={styles.table}> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>שם המוצר</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>תמונה</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>מיקום</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>צבע</Text> 
          </View>  
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>מחיר</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>כמות</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>סה"כ</Text> 
          </View> 
        </View>
      {prods && prods.map((prod, i) => (
        <View style={styles.tableRow}> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{prod.name}</Text> 
        </View> 
        <View style={styles.tableCol}> 
        <Image style={styles.tableCell} src={prod.image} />
        </View> 
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{prod.location}</Text> 
        </View>
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{prod.color}</Text> 
        </View>
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{prod.price}</Text> 
        </View> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{prod.quantity}</Text> 
        </View> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{(prod.price)*(prod.quantity)}</Text> 
        </View>  
      </View> 
      ))}
    </View>
  </Page>
</Document>
   
)

};

export default PDFFile;