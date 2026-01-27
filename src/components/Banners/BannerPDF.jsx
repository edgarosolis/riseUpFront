import { Text, View } from '@react-pdf/renderer'
import { stylesPDF } from '../PDF/Styles'

const BannerPDF = ({ title,subtitle, color }) => {
    return (
    <View style={stylesPDF.heroBanner}>        
        <View style={stylesPDF.LogoContainer}>
            <Text style={stylesPDF.bannerTitle}>{title}</Text>
            <Text style={stylesPDF.bannerSubtitle}>{subtitle}</Text>
            <Text style={stylesPDF.bannerText}>Prepared for: </Text>
            <Text style={stylesPDF.bannerText}>Date: </Text>
        </View>
    </View>
    )
}

export default BannerPDF