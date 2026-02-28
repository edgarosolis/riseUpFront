import { Text, View } from "@react-pdf/renderer"
import { stylesPDF } from "../PDF/Styles"
import { Html } from "react-pdf-html"

const ResultsPDF = ({sectionColor,title,currentSection}) => {
    return (
        <View style={[stylesPDF.cardContainer,{backgroundColor:sectionColor}]}>
          <View style={stylesPDF.textColumn}>
            <Text style={[stylesPDF.titleText,{color:"white"}]}>{title}</Text>
            <Text style={[stylesPDF.titleText,{color:currentSection?.section==="s1"?"black":currentSection?.section==="s3"?"#F4C542":"white"}]}>{currentSection?.content.title}</Text>
            <Html style={[stylesPDF.normalText,{color:currentSection?.section==="s1"?"black":"white"}]}>
                {currentSection?.content?.content}
            </Html>
          </View>          
        </View>
    )
}

export default ResultsPDF