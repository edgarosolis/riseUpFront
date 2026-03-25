import { Text } from '@react-pdf/renderer';

export const renderRegistered = (str, parentFontSize) => {
    if (!str || (!str.includes('®') && !str.includes('Ò'))) return str;
    const parts = str.split(/[®Ò]/);
    const supSize = parentFontSize ? parentFontSize * 0.45 : 7;
    return parts.map((part, i) => (
        i < parts.length - 1
            ? <Text key={i}>{part}<Text style={{ fontSize: supSize, verticalAlign: 'super' }}>®</Text> </Text>
            : <Text key={i}>{part}</Text>
    ));
};
