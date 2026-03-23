import { Text, View } from '@react-pdf/renderer'
import { stylesPDF } from '../PDF/Styles'
import { renderRegistered } from '../../utils/renderRegistered'

const BannerPDF = ({ title,subtitle, color, userName, completedAt }) => {
    const dateStr = completedAt ? new Date(completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    return (
    <View style={stylesPDF.heroBanner}>
        <View style={stylesPDF.LogoContainer}>
            <Text style={stylesPDF.bannerTitle}>{renderRegistered(title)}</Text>
            <Text style={stylesPDF.bannerSubtitle}>{subtitle}</Text>
            <Text style={stylesPDF.bannerText}>Prepared for: {userName}</Text>
            <Text style={stylesPDF.bannerText}>Date: {dateStr}</Text>
        </View>
    </View>
    )
}

export default BannerPDF