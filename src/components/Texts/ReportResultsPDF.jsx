import { Text, View } from "@react-pdf/renderer";
import { stylesPDF } from "../PDF/Styles";

const cardColors = {
  sphere: "#FFC700",
  fiveFold: "#CDA310",
  dna: "#907000",
};

const ReportResultsPDF = ({ reportInfo, title }) => {
  if (!reportInfo || !Array.isArray(reportInfo) || reportInfo.length === 0) return null;

  const sphere = reportInfo.find(r => r.section === "s1");
  const fiveFold = reportInfo.find(r => r.section === "s2");
  const biblicalDna = reportInfo.find(r => r.section === "s3");

  const cards = [
    { data: sphere, label: "Sphere:", color: cardColors.sphere },
    { data: fiveFold, label: "5-Fold Leaning:", color: cardColors.fiveFold },
    { data: biblicalDna, label: "Biblical DNA:", color: cardColors.dna },
  ].filter(c => c.data);

  return (
    <View style={stylesPDF.resultsContainer} wrap={false}>
      {title && (
        <Text style={stylesPDF.resultsTitle}>{title}</Text>
      )}
      <View style={stylesPDF.resultsRow}>
        {cards.map((card, i) => (
          <View key={i} style={stylesPDF.resultCard}>
            <View style={[stylesPDF.resultPill, { backgroundColor: card.color }]}>
              <Text style={stylesPDF.resultPillText}>{card.label}</Text>
            </View>
            <Text style={stylesPDF.resultValue}>
              {card.data.content?.title || "N/A"}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ReportResultsPDF;