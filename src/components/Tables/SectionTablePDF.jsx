import { Text, View } from "@react-pdf/renderer";
import { stylesPDF } from "../PDF/Styles";
import { Font } from '@react-pdf/renderer';

Font.registerHyphenationCallback(word => [word]);


const SectionTablePDF = ({ tableInfo }) => {
  return (
    <View style={stylesPDF.tableContainer} wrap={false}>
      {/* HEADER DE LA TABLA */}
      <View style={stylesPDF.tableRow}>
        <View style={[stylesPDF.tableHeader, stylesPDF.col3]}>
          <Text style={stylesPDF.headerText}>Sphere</Text>
        </View>
        <View style={[stylesPDF.tableHeader, stylesPDF.col9]}>
          <Text style={stylesPDF.headerText}>Definition</Text>
        </View>
      </View>

      {/* FILAS DE LA TABLA */}
      {tableInfo?.map((row, i) => (
        <View key={i} style={stylesPDF.tableRow}>
          <View style={[stylesPDF.tableCell, stylesPDF.col3]}>
            <Text style={[stylesPDF.rowText, { fontWeight: 'bold' }]}>
              {row.sphere}
            </Text>
          </View>
          <View style={[stylesPDF.tableCell, stylesPDF.col9]}>
            <Text style={stylesPDF.rowText}>{row.definition}</Text>
          </View>
        </View>
      ))}

      {/* FOOTER DE LA TABLA */}
      <View style={stylesPDF.col12}>
        <Text style={[stylesPDF.footerText, { fontWeight: 'bold' }]}>
          Your dominant sphere helps answer:
        </Text>
        <Text style={[stylesPDF.footerText, { marginTop: 10 }]}>
          • Where are you most fruitful in leadership?
        </Text>
        <Text style={stylesPDF.footerText}>
          • Where does your presence bring the most impact?
        </Text>
      </View>
    </View>
  );
};

export default SectionTablePDF;