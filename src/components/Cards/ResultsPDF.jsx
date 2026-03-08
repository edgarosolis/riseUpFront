import { Text, View } from "@react-pdf/renderer"

const ResultsPDF = ({sectionColor,title,currentSection,noMargin}) => {
    const rawContent = currentSection?.content?.content || '';
    const paragraphs = rawContent.split(/\n+/).filter(p => p.trim());
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
            {paragraphs.map((p, i) => (
              <Text key={i} style={{ fontSize: 11.5, lineHeight: 1.25, color: '#333', marginTop: i > 0 ? 8 : 0 }}>{p.trim()}</Text>
            ))}
          </View>
        </View>
    )
}

export default ResultsPDF