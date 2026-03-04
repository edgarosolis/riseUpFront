import { Text, View } from "@react-pdf/renderer"
import { stylesPDF } from "../PDF/Styles"
import { Html } from "react-pdf-html"

const ResultsPDF = ({sectionColor,title,currentSection,noMargin}) => {
    const formattedContent = currentSection?.content?.content?.replace(/\n/g, '<br>') || '';
    return (
        <View wrap={false} style={[
          { borderRadius: 8, overflow: 'hidden' },
          noMargin ? {} : { marginHorizontal: 30, marginVertical: 8 }
        ]}>
          <View style={{ backgroundColor: sectionColor, paddingHorizontal: 16, paddingVertical: 10 }}>
            <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 'bold' }}>{title}</Text>
            <Text style={{ fontSize: 17, color: '#FFFFFF', fontWeight: 'bold', marginTop: 2 }}>{currentSection?.content.title}</Text>
          </View>
          <View style={{ backgroundColor: '#FFF8E1', paddingHorizontal: 16, paddingVertical: 10 }}>
            <Html style={[stylesPDF.normalText, { color: '#333', marginTop: 0 }]}>
                {formattedContent}
            </Html>
          </View>
        </View>
    )
}

export default ResultsPDF