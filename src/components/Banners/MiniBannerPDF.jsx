import { stylesPDF } from '../PDF/Styles'
import { Text, View } from '@react-pdf/renderer'

const MiniBannerPDF = ({ title, subtitle, color, center=false, titleSize="1.7" }) => {    

    const dynamicFontSize = parseFloat(titleSize) * 14;

    return (
    <View style={[stylesPDF.bannerMiniContainer, { backgroundColor: color, alignItems: center ? "center" : "flex-start" }]}>
        <Text style={[stylesPDF.bannerTitle2,{fontSize: dynamicFontSize}]}>{title}</Text>
        {
            subtitle &&
            <Text style={[stylesPDF.bannerSubtitle2,{ textAlign: center ? "center" : "left" }]}>{subtitle}</Text>
        }
    </View>
    )
}

export default MiniBannerPDF