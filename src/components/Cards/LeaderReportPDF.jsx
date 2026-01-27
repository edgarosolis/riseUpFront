import { Text, View, Link } from "@react-pdf/renderer"
import { stylesPDF } from "../PDF/Styles"

const LeaderReportPDF = ({title,info,button=false,buttonText,buttonLink,cardColor,titleColor,buttonColor,infoColor="black"}) => {
  return (
    <View style={[stylesPDF.cardContainer,{backgroundColor:cardColor}]}>
      {/* Sección de texto */}
      <View style={stylesPDF.textColumn}>
        <Text style={[stylesPDF.titleText,{color:titleColor}]}>{title}</Text>
        <Text style={[stylesPDF.infoText,{color:infoColor}]}>{info}</Text>
      </View>

      {/* Renderizado condicional del botón */}
      {button && (
        <View style={[stylesPDF.buttonBox,{backgroundColor:buttonColor}]}>
            <Link style={stylesPDF.linkText} src={buttonLink}>
                <Text style={stylesPDF.buttonText}>
                    {buttonText}
                </Text>
            </Link>
        </View>
      )}
    </View>
  )
}

export default LeaderReportPDF