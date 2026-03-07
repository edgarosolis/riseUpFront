import { Fragment } from 'react';
import { Document,Image,Link,Page, Text, View } from '@react-pdf/renderer';
import BannerPDF from '../Banners/BannerPDF';
import TextPDF from '../Texts/TextPDF';
import MiniBannerPDF from '../Banners/MiniBannerPDF';
import LeaderReportPDF from '../Cards/LeaderReportPDF';
import SectionReportBannerPDF from '../Banners/SectionReportBannerPDF';
import ResultsPDF from '../Cards/ResultsPDF';
import SectionTablePDF from '../Tables/SectionTablePDF';
import ReportResultsPDF, { ReportResultsSideBySidePDF } from '../Texts/ReportResultsPDF';
import RiseUpLogo from '../../assets/images/RiseUpLogo.png';
import Section1 from '../../assets/images/Section1.png';
import Section2 from '../../assets/images/Section2.png';
import Section3 from '../../assets/images/Section3.png';
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

const BgLogo = () => (
    <View style={{ position: 'absolute', bottom: 35, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ opacity: 0.15 }}>
            <Image src={RiseUpLogo} style={{ width: 65, height: 65 }} />
        </View>
    </View>
);

const AssessmentPDF = ({ data, sections, userName, is360 }) => {

    const reviewerReport = data.reviewerReport;
    const reviewerCount = data.reviewerCount || 0;
    const getReviewerSection = (key) => reviewerReport?.find(r => r.section === key) || null;

    return (
    <Document>
        {/* PAGE: Intro */}
        <Page style={{ paddingBottom: 25 }}>
            <BgLogo />
            <BannerPDF title={"Kingdom Calling Assessment"} subtitle={is360 ? "360-DEGREE REPORT" : "SELF-ASSESSMENT REPORT"} userName={userName} completedAt={data.submission?.completedAt || data.submission?.updatedAt}/>
            <MiniBannerPDF title={"Embracing the Wonder of You"} color={"#F4C542"} center={true} titleSize="2.0"/>
            <TextPDF text={`<b>Dear ${userName},</b><br><br>Welcome to your Kingdom Calling Assessment Report. This is a tool designed not to define you, but to reveal who you are and the leader for the Kingdom you are called to be. This is not just data. <b>This is discovery.</b>${!is360 ? '<br><br>This self-assessment report reflects how you answered questions about yourself.' : ''}<br><br>Our prayer is that this report will stir something in your soul and serve as a prophetic guide into who God has uniquely made you to be as a Kingdom leader.<br><br>You were made to rise up. Jesus said, "You did not choose me, but I chose you and appointed you so that you might go and bear fruit — fruit that will last" (John 15:16). This report is part of His invitation to walk boldly in the good works He prepared in advance for you (Ephesians. 2:10).${is360 ? '<br><br>You have courageously asked for others to share how they see you in terms of what Sphere you thrive in, what Five-Fold personality shows up most often for you, and what Biblical DNA that most see in you. It is always good to pursue outside feedback, counsel, and advice. Review your results to gain insights that will help you uncover and unleash your calling!<br><br>The real gold in your calling comes from personal reflection in a prayerful conversation with your Creator.' : ''}`}/>
            {!is360 && (
                <View style={{ marginHorizontal: 45, marginTop: 15, backgroundColor: '#FFF8E1', borderRadius: 6, padding: 18, borderLeftWidth: 4, borderLeftColor: '#D4AF37' }}>
                    <Text style={{ fontSize: 11.5, lineHeight: 1.25, color: '#333' }}>
                        If you are interested, we also offer a 360-degree assessment where you can invite others to confidentially answer the same questions about you from their perspectives.
                    </Text>
                    <Link src="https://www.theriseupculture.com/kingdom-calling" style={{ textDecoration: 'none', marginTop: 10 }}>
                        <View style={[stylesPDF.buttonBox, { backgroundColor: '#D4AF37', alignSelf: 'flex-start', marginLeft: 0 }]}>
                            <Text style={stylesPDF.buttonText}>{"> More Details"}</Text>
                        </View>
                    </Link>
                </View>
            )}
            <PageFooter />
        </Page>

        {/* PAGE: Results */}
        <Page style={{ paddingBottom: 25 }}>
            <BgLogo />
            <MiniBannerPDF title={is360 ? "Your Results" : "Your Result"} color={"#383838"}/>
            {is360 && reviewerReport && reviewerReport.length > 0 ? (
                <ReportResultsSideBySidePDF selfReport={data.report} reviewerReport={reviewerReport}/>
            ) : (
                <ReportResultsPDF reportInfo={data.report}/>
            )}
            {is360 && (
                <View style={{ backgroundColor: '#FFF8E1', paddingHorizontal: 50, paddingBottom: 25, paddingTop: 15 }}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 10, paddingVertical: 22, paddingHorizontal: 28, borderWidth: 1, borderColor: '#E8DFC0' }}>
                        <Text style={{ fontSize: 13, lineHeight: 1.6, color: '#333', textAlign: 'center', fontWeight: 'bold' }}>
                            This overview of your results reflects how you see yourself and how others see you. Throughout the report, we will encourage you to pray and reflect to get the most out of this experience.
                        </Text>
                        <Text style={{ fontSize: 13, lineHeight: 1.6, color: '#333', textAlign: 'center', marginTop: 10 }}>
                            At the end of the report, we offer additional resources for your journey.
                        </Text>
                    </View>
                </View>
            )}
            <PageFooter />
        </Page>

        {/* PAGE: Understanding + How to Use */}
        <Page style={{ paddingBottom: 25 }}>
            <BgLogo />
            <MiniBannerPDF title={"Understanding the Report"} color={"#383838"}/>
            <TextPDF text={`The Kingdom Calling Assessment explores three layers of your God-designed leadership:`}/>
            <View style={{ paddingHorizontal: 45 }}>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <Text style={{ fontSize: 11.5, fontWeight: 'bold', lineHeight: 1.25, width: 20 }}>1.</Text>
                    <Text style={{ fontSize: 11.5, flex: 1, lineHeight: 1.25 }}>
                        <Text style={{ fontWeight: 'bold' }}>Your Sphere</Text> – Where God has designed you to show up and lead.
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <Text style={{ fontSize: 11.5, fontWeight: 'bold', lineHeight: 1.25, width: 20 }}>2.</Text>
                    <Text style={{ fontSize: 11.5, flex: 1, lineHeight: 1.25 }}>
                        <Text style={{ fontWeight: 'bold' }}>Your Five-Fold Personality</Text> – How Jesus expresses His heart through you (apostolic, prophetic, evangelistic, shepherd, or teacher personalities).
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <Text style={{ fontSize: 11.5, fontWeight: 'bold', lineHeight: 1.25, width: 20 }}>3.</Text>
                    <Text style={{ fontSize: 11.5, flex: 1, lineHeight: 1.25 }}>
                        <Text style={{ fontWeight: 'bold' }}>Your Biblical DNA</Text> – The values, instincts, and anointing that shape your Kingdom expression and impact.
                    </Text>
                </View>
            </View>
            <TextPDF text={`These are not labels to wear, but lenses to look through — helping you interpret your life, leadership, and legacy with clarity and confidence.`}/>
            <MiniBannerPDF title={"How to Use This Report"} color={"#383838"}/>
            <TextPDF text={`Before you analyze, pause. Invite the Holy Spirit into this moment.<br><br>Consider praying: "Lord, You know me better than I know myself. Speak through these insights. Confirm what's true. Challenge what's misaligned. Reveal what You see in me."
            <br>
            <br>
            As you read through each section, consider:
            <br>
            <br>
            · How does this resonate with your lived experience?
            <br>
            · What are the invitations in this season?
            <br>
            · Who can you process this with — a pastor, mentor, or trusted leader?
            <br>
            · Are there any confirmations that have already come in prayer or community?
            <br>
            <br>
            Let's dive in.`}/>
            <PageFooter />
        </Page>

        {/* PAGES: Sections */}
        {
            sections.map((s,i)=>{
                const displayTitle = s.customId === 's1' ? s.title.replace('Sphere', 'Sphere(s)') : s.title;
                const getUserTitle360 = () => s.customId === 's1' ? "Where you see yourself:" : "How you see yourself:";
                const getReviewerTitle360 = () => s.customId === 's1' ? "Where others see you:" : "How others see you:";
                const getReflectionTitle = () => {
                    if (s.customId === 's1') return 'Your Sphere(s) Reflection';
                    if (s.customId === 's2') return 'Your Five-Fold Personality Reflection';
                    if (s.customId === 's3') return 'Your Biblical DNA Reflection';
                    return 'Your Reflection';
                };
                const sectionImages = { s1: Section1, s2: Section2, s3: Section3 };
                const currentResult = data.report.find(cs=>cs.section === s.customId);

                if (!is360) {
                    return (
                    <Fragment key={i}>
                        <Page style={{ paddingBottom: 25 }}>
                            <BgLogo />
                            <MiniBannerPDF title={""} color={s.color}/>
                            <SectionReportBannerPDF id={s.customId} sectionColor={s.color} index={i} title={displayTitle} intro={s.report.intro} image={s.image}/>
                            <ResultsPDF sectionColor={s?.color} title={displayTitle} currentSection={currentResult}/>
                            {
                                s.report.hasTable &&
                                <SectionTablePDF tableInfo={s.report.tableInfo}/>
                            }
                            <PageFooter />
                        </Page>
                        {s.report.questions.length > 0 && (
                            <Page style={{ paddingBottom: 25 }}>
                                <BgLogo />
                                <View style={[stylesPDF.bannerMiniContainer, { backgroundColor: s.color, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[stylesPDF.bannerTitle2, { fontSize: 23.8 }]}>{getReflectionTitle()}</Text>
                                        <Text style={{ fontSize: 13, color: 'white', fontWeight: 'bold', marginTop: 6 }}>{currentResult?.content?.title || ''}</Text>
                                    </View>
                                    {sectionImages[s.customId] && (
                                        <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#FFF8E1', justifyContent: 'center', alignItems: 'center', marginLeft: 15 }}>
                                            <Image src={sectionImages[s.customId]} style={{ width: 50, objectFit: 'contain' }} />
                                        </View>
                                    )}
                                </View>
                                {s.report.questions.map((q,qi)=>(
                                    <View key={qi}>
                                        <TextPDF text={`<b>${q.text}</b>
                                        <br>
                                        ${(data.submission.answers.find(a=>a.customId === q.customId))?.value || "" }
                                        `}/>
                                    </View>
                                ))}
                                <PageFooter />
                            </Page>
                        )}
                    </Fragment>
                    );
                }

                const reviewerResult = getReviewerSection(s.customId);

                const questionsToExclude360 = {
                    s1: [
                        "When and where do you feel most alive",
                        "What environments seem to draw out your natural influence",
                        "What dreams or nudges keep coming up",
                    ],
                    s2: [
                        "How do people experience transformation",
                        "Is there a part of your leadership style",
                    ],
                };
                const excludeList = questionsToExclude360[s.customId] || [];
                const filteredQuestions = s.report.questions.filter(q => !excludeList.some(ex => q.text?.includes(ex)));

                return (
                <Fragment key={i}>
                    {/* Section intro page - always has white space */}
                    <Page style={{ paddingBottom: 25 }}>
                        <BgLogo />
                        <MiniBannerPDF title={""} color={s.color}/>
                        <SectionReportBannerPDF id={s.customId} sectionColor={s.color} index={i} title={displayTitle} intro={s.report.intro} image={s.image}/>
                        {
                            s.report.hasTable &&
                            <SectionTablePDF tableInfo={s.report.tableInfo}/>
                        }
                        <PageFooter />
                    </Page>
                    {/* Reflection page - content heavy, no logo to avoid overflow */}
                    {(filteredQuestions.length > 0 || reviewerResult) && (
                        <Page style={{ paddingBottom: 25 }}>
                            <View style={[stylesPDF.bannerMiniContainer, { backgroundColor: s.color, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[stylesPDF.bannerTitle2, { fontSize: 23.8 }]}>{getReflectionTitle()}</Text>
                                </View>
                                {sectionImages[s.customId] && (
                                    <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#FFF8E1', justifyContent: 'center', alignItems: 'center', marginLeft: 15 }}>
                                        <Image src={sectionImages[s.customId]} style={{ width: 50, objectFit: 'contain' }} />
                                    </View>
                                )}
                            </View>
                            {reviewerResult ? (
                                <View style={{ flexDirection: 'row', marginHorizontal: 25, marginVertical: 8, gap: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <ResultsPDF sectionColor={s?.color} title={getUserTitle360()} currentSection={currentResult} noMargin />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <ResultsPDF sectionColor={s?.color} title={getReviewerTitle360()} currentSection={reviewerResult} noMargin />
                                    </View>
                                </View>
                            ) : (
                                <ResultsPDF sectionColor={s?.color} title={getUserTitle360()} currentSection={currentResult}/>
                            )}
                            <TextPDF text={`<b>What resonates most when you review how you see yourself and how others see you?</b>
                            <br>
                            ${(data.submission.answers.find(a=>a.customId === `${s.customId}-reflect-1`))?.value || "" }
                            `}/>
                            <TextPDF text={`<b>If others see you differently, what insights can you gain?</b>
                            <br>
                            ${(data.submission.answers.find(a=>a.customId === `${s.customId}-reflect-2`))?.value || "" }
                            `}/>
                            {s.customId === 's1' && (
                                <TextPDF text={`<b>What dreams or nudges keep coming up when you pray about where God wants to use you?</b>
                                <br>
                                ${(data.submission.answers.find(a=>a.customId === `${s.customId}-reflect-3`))?.value || "" }
                                `}/>
                            )}
                            {filteredQuestions.map((q,qi)=>(
                                <View key={qi}>
                                    <TextPDF text={`<b>${q.text}</b>
                                    <br>
                                    ${(data.submission.answers.find(a=>a.customId === q.customId))?.value || "" }
                                    `}/>
                                </View>
                            ))}
                            <PageFooter />
                        </Page>
                    )}
                </Fragment>
                );
            })
        }

        {/* PAGE: Wonder of You */}
        <Page style={{ paddingBottom: 25 }}>
            <BgLogo />
            <MiniBannerPDF title={""} color={"#6E5600"}/>
            <SectionReportBannerPDF sectionColor={"#6E5600"} index={3} title={"The Wonder of You"} subtitle={"(FIVE-FOLD PERSONALITY + BIBLICAL DNA)"}
            intro={`This final layer integrates core Biblical leadership values with your unique wiring.<br><br>The Wonder of You is the fusion point of your <b>Five-Fold Personality</b>, and <b>Biblical DNA</b>. When these two align, they form a prophetic narrative of the type of Kingdom leader you're becoming. This isn't just a snapshot of where you are today — it's a glimpse into the redemptive future God is inviting you to walk into. Your Destiny Line gives you language for your leadership identity, clarifies how you uniquely impact others, and helps you discern how to steward your influence for the glory of God.`}/>
            {is360 && getReviewerSection("r1") ? (
                <View style={{ flexDirection: 'row', marginHorizontal: 25, marginVertical: 8, gap: 10 }}>
                    <View style={{ flex: 1 }}>
                        <ResultsPDF sectionColor={"#6E5600"} title={"How do you see yourself:"} currentSection={data.report.find(cs=>cs.section === 'r1')} noMargin />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ResultsPDF sectionColor={"#6E5600"} title={"How others see you:"} currentSection={getReviewerSection("r1")} noMargin />
                    </View>
                </View>
            ) : (
                <ResultsPDF sectionColor={"#6E5600"} title={is360 ? "How do you see yourself:" : "The Wonder of You"} currentSection={data.report.find(cs=>cs.section === 'r1')}/>
            )}
            {is360 && (
                <TextPDF text={`<b>Wonder of You Reflection: As you read the descriptions above, highlight what resonates most for you and summarize it here.</b>
                <br>
                ${(data.submission.answers.find(a=>a.customId === "r1-reflect-1"))?.value || "" }
                `}/>
            )}
            <PageFooter />
        </Page>

        {/* PAGE: Next Steps */}
        <Page style={{ paddingBottom: 25 }}>
            <BgLogo />
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

        {/* PAGE: Resources */}
        <Page style={{ paddingBottom: 25 }}>
            <BgLogo />
            <MiniBannerPDF title={"You Are A Leader"} subtitle={"Now Step into It"} color={"#383838"}/>
            <TextPDF text={`<b>Your Kingdom Calling Report is not an endpoint. It is an invitation.</b><br><br>You now have language for the wonder of how God uniquely designed you. The next step is learning how to live it out with confidence, clarity, and purpose within the Body of Christ.<br><br><b>Choose the next step that fits where you are right now:</b>`}/>
            <LeaderReportPDF title="Deepen Your Understanding" info="Read our eBook, Understanding Your Kingdom Calling Report, to learn how your Sphere of Influence, Biblical DNA, and 5-Fold Personality work together and how God may be inviting you to serve and lead within your local church." cardColor="#D4AF37" titleColor="white" infoColor="white" button={true} buttonText={"E-Book"} buttonLink="https://www.theriseupculture.com/course/understanding-your-kingdom-calling-pdf" buttonColor="secondary"/>
            <LeaderReportPDF title="Go Deeper in Activation" info="Take the Kingdom Calling Course to explore your calling in a more personal and practical way, with teaching, reflection, and activation steps designed to help you move from insight to action." cardColor="#D4AF37" titleColor="white" infoColor="white" button={true} buttonText={"Course"} buttonLink="https://www.theriseupculture.com/course/your-kingdom-calling" buttonColor="secondary"/>
            <LeaderReportPDF title="Get Personal Support" info="Book a Calling Coach Session with The Rise Up Culture Team if you would like to walk through your results one-on-one and gain clarity on what obedience and faithfulness look like in this season." cardColor="#D4AF37" titleColor="white" infoColor="white" button={true} buttonText={"Book"} buttonLink="https://www.theriseupculture.com/course/kingdom-calling-coaching" buttonColor="secondary"/>
            <LeaderReportPDF title="Keep Growing as a Leader" info="We also recommend You Are A Leader by Drew East as your next read, a powerful reminder that leadership begins with identity and surrender, not position." cardColor="#D4AF37" titleColor="white" infoColor="white" button={true} buttonText={"Read"} buttonLink="https://www.theriseupculture.com/course/you-are-a-leader-pdf" buttonColor="secondary"/>
            <PageFooter />
        </Page>

        {/* PAGE: Closing */}
        <Page style={{ paddingBottom: 25 }}>
            <BgLogo />
            <TextPDF text={`You do not have to do everything at once. Take one faithful step at www.theriseupculture.com`}/>
            <LeaderReportPDF title="YOUR NEXT STEP" info={'Take our "Calling Course" or request a Coaching session to go over your results'} cardColor="#000000" titleColor="#F4C542" infoColor="white" button={true} buttonText={"Course"} buttonLink="https://www.theriseupculture.com/course/your-kingdom-calling" buttonColor="primary"/>
            <TextPDF text={`The best leaders aren't the loudest in the room. They're the ones who know who they are, walk with Jesus, and say "yes" to the call. That's you.<br><br><b>Welcome to the adventure. The world will never be the same.</b>`}/>
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
