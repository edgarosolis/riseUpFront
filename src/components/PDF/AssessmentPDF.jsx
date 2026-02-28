import { Document,Image,Link,Page, Text, View } from '@react-pdf/renderer';
import BannerPDF from '../Banners/BannerPDF';
import TextPDF from '../Texts/TextPDF';
import MiniBannerPDF from '../Banners/MiniBannerPDF';
import LeaderReportPDF from '../Cards/LeaderReportPDF';
import SectionReportBannerPDF from '../Banners/SectionReportBannerPDF';
import ResultsPDF from '../Cards/ResultsPDF';
import SectionTablePDF from '../Tables/SectionTablePDF';
import ReportResultsPDF from '../Texts/ReportResultsPDF';
import RiseUpLogo from '../../assets/images/RiseUpLogo.png';
import { stylesPDF } from './Styles';
import { Font } from '@react-pdf/renderer';

Font.registerHyphenationCallback(word => [word]);

const PageFooter = () => (
    <Text
        style={stylesPDF.pageNumber}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        fixed
    />
);

const AssessmentPDF = ({ data, sections, userName, is360 }) => {

    const reviewerReport = data.reviewerReport;
    const reviewerCount = data.reviewerCount || 0;
    const getReviewerSection = (key) => reviewerReport?.find(r => r.section === key) || null;

    return (
    <Document>
        <Page style={{ paddingBottom: 25 }}>
            <BannerPDF title={"Kingdom Calling Assessment"} subtitle={is360 ? "360 REPORT" : "SELF-ASSESSMENT REPORT"} userName={userName} completedAt={data.submission?.completedAt || data.submission?.updatedAt}/>
            <MiniBannerPDF title={"Embracing the Wonder of You"} color={"#F4C542"} center={true} titleSize="2.0"/>
            <TextPDF text={`<b>Dear ${userName},</b><br><br>${!is360 ? 'This self-assessment report reflects how you answered questions about yourself.<br><br>' : ''}Welcome to your Kingdom Calling Assessment Report. This is a tool designed not to define you, but to reveal who you are and the leader for the Kingdom you are called to be. This is not just data. <b>This is discovery.</b><br><br>Our prayer is that this report will stir something in your soul and serve as a prophetic guide into who God has uniquely made you to be as a Kingdom leader.<br><br>You were made to rise up. Jesus said, "You did not choose me, but I chose you and appointed you so that you might go and bear fruit — fruit that will last" (John 15:16). This report is part of His invitation to walk boldly in the good works He prepared in advance for you (Ephesians. 2:10).`}/>
            {!is360 && (
                <View>
                    <TextPDF text={`If you are interested, we also offer a 360-degree assessment where you can invite others to confidentially answer the same questions about you from their perspectives.`}/>
                    <View style={{ marginHorizontal: 45, marginTop: 5 }}>
                        <Link src="https://www.theriseupculture.com/kingdom-calling" style={{ textDecoration: 'none' }}>
                            <View style={[stylesPDF.buttonBox, { backgroundColor: '#D4AF37', alignSelf: 'flex-start' }]}>
                                <Text style={stylesPDF.buttonText}>{"> More Details"}</Text>
                            </View>
                        </Link>
                    </View>
                </View>
            )}
            <PageFooter />
        </Page>
        <Page style={{ paddingBottom: 25 }}>
            <MiniBannerPDF title={"Your Result"} color={"#383838"}/>
            <ReportResultsPDF reportInfo={data.report}/>
            {is360 && reviewerReport && reviewerReport.length > 0 && (
                <View>
                    <Text style={{ fontSize: 12, fontWeight: "bold", textAlign: "center", marginBottom: 6 }}>
                        Reviewer Feedback ({reviewerCount} reviewer{reviewerCount !== 1 ? "s" : ""})
                    </Text>
                    <ReportResultsPDF reportInfo={reviewerReport}/>
                </View>
            )}
            <MiniBannerPDF title={"Understanding the Report"} color={"#383838"}/>
            <TextPDF text={`The Kingdom Calling Assessment explores three layers of your God-designed leadership:
            <br>
            <br>
            <b>1. Your Sphere</b> – Where God has designed you to show up and lead.
            <br>
            <b>2. Your Five-Fold Personality</b> – How Jesus expresses His heart through you (apostolic, prophetic, evangelistic, shepherd, or teacher personalities).
            <br>
            <b>3. Your Biblical DNA</b> – The values, instincts, and anointing that shape your Kingdom expression and impact.
            <br>
            These are not labels to wear, but lenses to look through — helping you interpret your life, leadership, and legacy with clarity and confidence.`}/>
            <MiniBannerPDF title={"How to Use This Report"} color={"#383838"}/>
            <TextPDF text={`Before you analyze, pause. Invite the Holy Spirit into this moment.<br><br>Consider praying: "Lord, You know me better than I know myself. Speak through these insights. Confirm what's true. Challenge what's misaligned. Reveal what You see in me."
            <br>
            <br>
            As you read through each section, consider:
            <br>
            <br>
            · How does this resonate with your lived experience?
            <br>
            <br>
            · What are the invitations in this season?
            <br>
            <br>
            · Who can you process this with — a pastor, mentor, or trusted leader?
            <br>
            <br>
            · Are there any confirmations that have already come in prayer or community?
            <br>
            <br>
            Let's dive in.`}/>
            <PageFooter />
        </Page>
        {
            sections.map((s,i)=>{
                const displayTitle = s.customId === 's1' ? s.title.replace('Sphere', 'Sphere(s)') : s.title;
                return (
                <Page key={i} style={{ paddingBottom: 25 }}>
                    <MiniBannerPDF title={""} color={s.color}/>
                    <SectionReportBannerPDF id={s.customId} sectionColor={s.color} index={i} title={displayTitle} intro={s.report.intro} image={s.image}/>
                    <ResultsPDF sectionColor={s?.color} title={displayTitle} currentSection={data.report.find(cs=>cs.section === s.customId)}/>
                    {is360 && getReviewerSection(s.customId) && (
                        <ResultsPDF sectionColor={s?.color} title={`Reviewer Perspective: ${displayTitle}`} currentSection={getReviewerSection(s.customId)}/>
                    )}
                    {
                        s.report.hasTable &&
                        <SectionTablePDF tableInfo={s.report.tableInfo}/>
                    }
                    {
                        s.report.questions.length > 0 && (
                            <View break={s.report.hasTable}>
                                {s.report.questions.map((q,qi)=>(
                                    <View key={qi} wrap={false}>
                                        <TextPDF text={`<b>${q.text}</b>
                                        <br>
                                        ${(data.submission.answers.find(a=>a.customId === q.customId))?.value || "" }
                                        `}/>
                                    </View>
                                ))}
                            </View>
                        )
                    }
                    <PageFooter />
                </Page>
                );
            })
        }
        <Page style={{ paddingBottom: 25 }}>
            <MiniBannerPDF title={""} color={"#6E5600"}/>
            <SectionReportBannerPDF sectionColor={"#6E5600"} index={3} title={"The Wonder of You (FIVE-FOLD PERSONALITY + BIBLICAL DNA)"}
            intro={`This final layer integrates core Biblical leadership values with your unique wiring.<br><br>The Wonder of You is the fusion point of your <b>Five-Fold Personality</b>, and <b>Biblical DNA</b>. When these two align, they form a prophetic narrative of the type of Kingdom leader you're becoming. This isn't just a snapshot of where you are today — it's a glimpse into the redemptive future God is inviting you to walk into. Your Destiny Line gives you language for your leadership identity, clarifies how you uniquely impact others, and helps you discern how to steward your influence for the glory of God.`}/>
            <ResultsPDF sectionColor={"#6E5600"} title={'The Wonder of You'} currentSection={data.report.find(cs=>cs.section === 'r1')}/>
            {is360 && getReviewerSection("r1") && (
                <ResultsPDF sectionColor={"#6E5600"} title={"Reviewer Perspective: The Wonder of You"} currentSection={getReviewerSection("r1")}/>
            )}
            <PageFooter />
        </Page>
        <Page style={{ paddingBottom: 25 }}>
            <MiniBannerPDF title={"Next Steps: A Spiritual Response"} color={"#383838"}/>
            <TextPDF text={`The Kingdom Calling Assessment is the beginning of a conversation with God, not the end of one. Set aside time in the coming days to do the following:
            <br>
            <br>
            <b>ASK. LISTEN. DISCERN.</b>
            <br>
            <br>
            Spend time with the Lord and ask Him to speak into your calling and to embrace the wonder of you.
            <br>
            <br>
            <b>PRAY FOR CONFIRMATION</b>
            <br>
            <br>
            "Lord, confirm what's true. I surrender what doesn't reflect You. Align me with heaven's assignment."
            <br>
            <br>
            <b>JOURNAL WITH THE HOLY SPIRIT</b>
            <br>
            <br>
            · "Jesus, how do You see me showing up in this season?"
            <br>
            <br>
            · "What are You developing in me right now?"
            <br>
            <br>
            · "What scares or excites me about what I'm seeing?"
            <br>
            <br>
            · "Who should I invite into my journey to help me grow?"
            <br>
            <br>
            <b>INVITE WISE COUNSEL</b>
            <br>
            <br>
            "Plans fail for lack of counsel, but with many advisers they succeed." — Proverbs 15:22 Bring this report to someone who knows you well and is grounded in God's Word. Let them speak life, caution, and direction over what they see.
            <br>
            <br>
            YOUR ACTIVATION CHALLENGE</b>
            <br>
            <br>
            Before you move forward:
            <br>
            <br>
            <b>Circle</b> 2–3 key phrases in your report that stand out to you.
            <br>
            <br>
            <b>Write</b> a 3-sentence summary of how you believe God is calling you to lead in this season.
            <br>
            <br>
            ${(data.submission.answers.find(a=>a.customId === "ntq1"))?.value || "" }
            <br>
            <br>
            <b>Document</b> one action you can take this week that aligns with what you're discovering.
            <br>
            <br>
            ${(data.submission.answers.find(a=>a.customId === "ntq2"))?.value || "" }
            `}/>
            <PageFooter />
        </Page>
        <Page style={{ paddingBottom: 25 }}>
            <MiniBannerPDF title={"You Are A Leader"} subtitle={"Now Step into It"} color={"#383838"}/>
            <TextPDF text={`<b>Your Kingdom Calling Report is not an endpoint. It is an invitation.</b><br><br>You now have language for the wonder of how God uniquely designed you. The next step is learning how to live it out with confidence, clarity, and purpose within the Body of Christ.
            <br>
            <br>
            <b>Choose the next step that fits where you are right now:</b>`}/>
            <LeaderReportPDF title="Deepen Your Understanding" info="Read our eBook, Understanding Your Kingdom Calling Report, to learn how your Sphere of Influence, Biblical DNA, and 5-Fold Personality work together and how God may be inviting you to serve and lead within your local church." button={true} buttonText={"E-Book"} buttonLink="https://www.theriseupculture.com/kingdom-calling" cardColor="#D4AF37" titleColor="white" buttonColor="secondary"/>
            <LeaderReportPDF title="Go Deeper in Activation" info="Take the Kingdom Calling Course to explore your calling in a more personal and practical way, with teaching, reflection, and activation steps designed to help you move from insight to action." button={true} buttonText={"Course"} buttonLink="https://www.theriseupculture.com/kingdom-calling" cardColor="#D4AF37" titleColor="white" buttonColor="secondary"/>
            <LeaderReportPDF title="Get Personal Support" info="Book a Calling Coach Session with The Rise Up Culture Team if you would like to walk through your results one-on-one and gain clarity on what obedience and faithfulness look like in this season." button={true} buttonText={"Book"} buttonLink="https://www.theriseupculture.com/kingdom-calling" cardColor="#D4AF37" titleColor="white" buttonColor="secondary"/>
            <LeaderReportPDF title="Keep Growing as a Leader" info="We also recommend You Are A Leader by Drew East as your next read, a powerful reminder that leadership begins with identity and surrender, not position." button={true} buttonText={"Read"} buttonLink="https://www.theriseupculture.com/course/you-are-a-leader-pdf" cardColor="#D4AF37" titleColor="white" buttonColor="secondary"/>
            <PageFooter />
        </Page>
        <Page style={{ paddingBottom: 25 }}>
            <TextPDF text={`You do not have to do everything at once. Take one faithful step at www.theriseupculture.com`}/>
            <LeaderReportPDF title="YOUR NEXT STEP" info="Take our "Calling Course" or request a Coaching session to go over your results" cardColor="#000000" titleColor="#F4C542" infoColor="white" button={true} buttonText={"Course"} buttonLink={""} buttonColor="primary"/>
            {/* <LeaderReportPDF title="YOUR NEXT READ" info="So, You're a Leader… Now What? (coming soon by Drew East)." cardColor="#000000" titleColor="#F4C542" infoColor="white"/> */}
            <TextPDF text={`The best leaders aren't the loudest in the room. They're the ones who know who they are, walk with Jesus, and say "yes" to the call. That's you.`}/>
            <TextPDF text={`<b>Welcome to the adventure. The world will never be the same.</b>`}/>
            <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                <Image src={RiseUpLogo} style={{ width: 120 }} />
                <Link src="https://www.theriseupculture.com" style={{ color: '#000', fontSize: 12, fontWeight: 'bold', marginTop: 6, textDecoration: 'none' }}>www.theriseupculture.com</Link>
            </View>
            <PageFooter />
        </Page>
    </Document>
  )
}

export default AssessmentPDF
