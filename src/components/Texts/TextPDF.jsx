import { View } from "@react-pdf/renderer"
import { stylesPDF } from "../PDF/Styles"
import Html from 'react-pdf-html';

const TextPDF = ({text}) => {
  const processed = text?.replace(/[®Ò]/g, '<sup style="font-size:8px">®</sup>') || '';
  return (
    <View style={stylesPDF.textView}>
        <Html style={stylesPDF.normalText}>{processed}</Html>
    </View>
  )
}

export default TextPDF