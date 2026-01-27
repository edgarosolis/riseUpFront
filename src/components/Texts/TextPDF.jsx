import { View } from "@react-pdf/renderer"
import { stylesPDF } from "../PDF/Styles"
import Html from 'react-pdf-html';

const TextPDF = ({text}) => {
  return (
    <View style={stylesPDF.textView}>
        <Html style={stylesPDF.normalText}>{text}</Html>
    </View>
  )
}

export default TextPDF