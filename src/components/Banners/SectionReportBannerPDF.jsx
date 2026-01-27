import { Image, Text, View } from "@react-pdf/renderer";
import { stylesPDF } from "../PDF/Styles";
import { Html } from "react-pdf-html";
import Section1 from '../../assets/images/Section1.png'
import Section2 from '../../assets/images/Section2.png'
import Section3 from '../../assets/images/Section3.png'

const SectionReportBannerPDF = ({ sectionColor, index, title, intro, image, id }) => {

    return (
      <View style={stylesPDF.sectionWrapper} wrap={false}>
        <View style={stylesPDF.sectionTextColumn}>
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
        <View style={stylesPDF.sectionImageColumn}>
          {image && (
            <>
            {
              id === "s1" &&
            <Image 
              src={Section1} 
              style={stylesPDF.sectionImage} 
            />
            }
            {
              id === "s2" &&
            <Image 
              src={Section2} 
              style={stylesPDF.sectionImage} 
            />
            }
            {
              id === "s3" &&
            <Image 
              src={Section3} 
              style={stylesPDF.sectionImage} 
            />
            }
            </>
          )}
        </View>
      </View>
    );
  };
  
  export default SectionReportBannerPDF;