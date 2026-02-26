import { Text, View } from "@react-pdf/renderer";
import { stylesPDF } from "../PDF/Styles";

const ReportResultsPDF = ({ reportInfo }) => {
  if (!reportInfo || !Array.isArray(reportInfo) || reportInfo.length === 0) return null;

  const sphere = reportInfo.find(r => r.section === "s1");
  const fiveFold = reportInfo.find(r => r.section === "s2");
  const biblicalDna = reportInfo.find(r => r.section === "s3");

  return (
    <View style={stylesPDF.resultsRow} wrap={false}>
      {sphere && <View style={stylesPDF.resultBlock}>
        <Text style={[stylesPDF.resultLabel, { color: "#D4AF37" }]}>
          Sphere:
        </Text>
        <Text style={stylesPDF.resultValue}>
          {sphere.content?.title || "N/A"}
        </Text>
      </View>}

      {fiveFold && <View style={stylesPDF.resultBlock}>
        <Text style={[stylesPDF.resultLabel, { color: "#F4C542" }]}>
          5-Fold Leaning:
        </Text>
        <Text style={stylesPDF.resultValue}>
          {fiveFold.content?.title || "N/A"}
        </Text>
      </View>}

      {biblicalDna && <View style={stylesPDF.resultBlock}>
        <Text style={[stylesPDF.resultLabel, { color: "#FFC700" }]}>
          Biblical DNA:
        </Text>
        <Text style={stylesPDF.resultValue}>
          {biblicalDna.content?.title || "N/A"}
        </Text>
      </View>}
    </View>
  );
};

export default ReportResultsPDF;