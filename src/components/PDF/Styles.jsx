import { StyleSheet } from "@react-pdf/renderer";

export const stylesPDF = StyleSheet.create({
  page: { 
      paddingTop: 30, 
      paddingBottom: 30, 
      paddingHorizontal: 50,
      fontFamily:"Tahoma"
  },
  heroBanner: {
      width: "100%",
      height: 250,
      backgroundColor: "#383838", // azul de fondo
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 35,
  },
  bannerTitle: {
      fontSize: 30,
      color: 'white',
      fontWeight: 600,
      marginBottom: "10px"
  },
  bannerTitle2: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
  },
  bannerSubtitle: {
      fontSize: 20,
      color: '#F4C542',        
      fontWeight: 400,
      marginBottom: "20px"
  },
  bannerSubtitle2: {
      fontSize: 12,
      color: '#F4C542',        
      fontWeight: 400,
      marginTop: 4,
  },
  bannerText: {
      fontSize: 15,
      color: 'white',        
      fontWeight: 400,
  },
  LogoContainer:{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center"
  },
  textView:{
      paddingTop: 10,
      paddingBottom: 30,
      paddingHorizontal: 45,
  },
  bannerMiniContainer: {
      paddingHorizontal:45,
      paddingVertical: 20,
      width: '100%',
      justifyContent:"center",
      marginBottom:5,
  },
  normalText:{
      fontSize:11.5,
      fontWeight:400,
      flexShrink: 1,
      marginTop:20,
      lineHeight:1.3
  },
  cardContainer: {
      marginHorizontal: 30,
      marginVertical:10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', 
      borderRadius: 5
  },
  textColumn: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {        
    fontSize: 10,
    lineHeight: 1.4,
  },
  buttonBox: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 8,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  linkText:{
    textDecoration:"none",
    color:"white"
  },
  sectionWrapper: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 50,
    backgroundColor: '#FFC7001A',
    marginBottom: 10,
  },
  sectionNumber: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },
  intro: {
    marginTop: 10,
  },
  tableContainer: {
    marginHorizontal: 40,
    marginVertical: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF', // Para separar filas si el fondo es igual
  },
  tableHeader: {
    backgroundColor: '#F4C542',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableCell: {
    backgroundColor: '#FFC7001A', // Tu color backSections.main
    padding: 15,
    justifyContent: 'center',
  },
  col3: {
    width: '25%',
  },
  col9: {
    width: '75%',
  },
  col12: {
    width: '100%',
    backgroundColor: '#FFC7001A',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  rowText: {
    fontSize: 10,
    color: '#333',
  },
  footerText: {
    fontSize: 11,
    marginTop: 5,
  },
  resultsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingVertical: 30,
    paddingHorizontal: 40,
    marginVertical: 10,
  },
  resultBlock: {
    flexDirection: "column",
    alignItems: "center", // Centra el texto dentro de cada bloque
    width: "30%", // Reparte el espacio equitativamente
  },
  resultLabel: {
    fontSize: 14, // Equivalente a un h4 pequeño en PDF
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  resultValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#383838",
    textAlign: "center",
  }
})