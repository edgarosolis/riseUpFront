import { Text, View } from "@react-pdf/renderer";
import { stylesPDF } from "../PDF/Styles";

const ReportResultsPDF = ({ reportInfo }) => {
  if (!reportInfo || reportInfo.length < 3) return null;

  return (
    <View style={stylesPDF.resultsRow} wrap={false}>
      {/* Bloque 1: Sphere */}
      <View style={stylesPDF.resultBlock}>
        <Text style={[stylesPDF.resultLabel, { color: "#D4AF37" }]}>
          Sphere:
        </Text>
        <Text style={stylesPDF.resultValue}>
          {reportInfo[0]?.keyUsed || "N/A"}
        </Text>
      </View>

      {/* Bloque 2: 5-Fold Leaning */}
      <View style={stylesPDF.resultBlock}>
        <Text style={[stylesPDF.resultLabel, { color: "#F4C542" }]}>
          5-Fold Leaning:
        </Text>
        <Text style={stylesPDF.resultValue}>
          {reportInfo[1]?.keyUsed || "N/A"}
        </Text>
      </View>

      {/* Bloque 3: Biblical DNA */}
      <View style={stylesPDF.resultBlock}>
        <Text style={[stylesPDF.resultLabel, { color: "#FFC700" }]}>
          Biblical DNA:
        </Text>
        <Text style={stylesPDF.resultValue}>
          {reportInfo[2]?.keyUsed || "N/A"}
        </Text>
      </View>
    </View>
  );
};

export default ReportResultsPDF;