import { Image, Text, View } from "@react-pdf/renderer";
import { stylesPDF } from "../PDF/Styles";
import { Html } from "react-pdf-html";
import Section1 from '../../assets/images/Section1.png'
import Section2 from '../../assets/images/Section2.png'
import Section3 from '../../assets/images/Section3.png'

const SectionReportBannerPDF = ({ sectionColor, index, title, subtitle, intro, image, id }) => {
  const images = {
    s1: Section1,
    s2: Section2,
    s3: Section3
  };

  return (
  <View style={stylesPDF.sectionWrapper} wrap={false}> 
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <View style={stylesPDF.sectionTextColumn}>
            <Text style={[stylesPDF.sectionNumber, { color: sectionColor }]}>
                SECTION {index + 1}:
            </Text>
            <Text style={stylesPDF.title}>
                {title}
            </Text>
            {subtitle && (
                <Text style={[stylesPDF.title, { fontSize: 15, color: '#555555', marginTop: 2 }]}>
                    {subtitle}
                </Text>
            )}
        </View>

        <View style={stylesPDF.sectionImageColumn}>
            {image && images[id] && (
                <Image 
                    src={images[id]} 
                    style={stylesPDF.sectionImage} 
                />
            )}
        </View>
    </View> 
    <View style={{ marginTop: 5, width: '100%' }}>
        <Html style={stylesPDF.normalText}>
            {intro?.replace(/[®Ò]/g, '<sup style="font-size:8px">®</sup>') || ''}
        </Html>
    </View>
  </View>
  );
};
  
  export default SectionReportBannerPDF;