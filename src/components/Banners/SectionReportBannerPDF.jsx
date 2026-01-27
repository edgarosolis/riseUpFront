import { Text, View } from "@react-pdf/renderer";
import { stylesPDF } from "../PDF/Styles";
import { Html } from "react-pdf-html";

const SectionReportBannerPDF = ({ sectionColor, index, title, intro }) => {

    return (
      <View style={stylesPDF.sectionWrapper} wrap={false}>
        <Text style={[stylesPDF.sectionNumber, { color: sectionColor }]}>
          SECTION {index + 1}:
        </Text>
        <Text style={stylesPDF.title}>
          {title}
        </Text>
        <View style={stylesPDF.intro}>
        <Html style={stylesPDF.normalText}>
          {intro}
        </Html>
        </View>
      </View>
    );
  };
  
  export default SectionReportBannerPDF;