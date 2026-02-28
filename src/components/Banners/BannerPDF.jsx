import { Text, View } from '@react-pdf/renderer'
import { stylesPDF } from '../PDF/Styles'

const BannerPDF = ({ title,subtitle, color, userName, completedAt }) => {
    const dateStr = completedAt ? new Date(completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    return (
    <View style={stylesPDF.heroBanner}>
        <View style={stylesPDF.LogoContainer}>
            <Text style={stylesPDF.bannerTitle}>{title}</Text>
            <Text style={stylesPDF.bannerSubtitle}>{subtitle}</Text>
            <Text style={stylesPDF.bannerText}>Prepared for: {userName}</Text>
            <Text style={stylesPDF.bannerText}>Date: {dateStr}</Text>
        </View>
    </View>
    )
}

export default BannerPDF