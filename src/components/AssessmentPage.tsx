import { motion } from "motion/react";
import {
  ClipboardList,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Heart,
  ChevronRight,
  Settings as SettingsIcon,
  CalendarClock,
  Upload,
  LineChart,
  Users,
  ListTodo,
  BookOpen,
  Eye,
  MessageSquare,
  Lightbulb,
  Video,
  Download,
  GraduationCap,
  Check
} from "lucide-react";
import { PageContainer } from "./ui/PageContainer";
import { PageHeader } from "./ui/PageHeader";
import { PageIcon } from "./ui/PageIcon";
import { SectionLabel } from "./ui/SectionLabel";
import { SectionTitle } from "./ui/SectionTitle";
import { SectionDescription } from "./ui/SectionDescription";
import { TimelineStep } from "./ui/TimelineStep";
import { AreaItem } from "./ui/AreaItem";
import { HeroQuoteCard } from "./ui/HeroQuoteCard";
import { HeroActionCard } from "./ui/HeroActionCard";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { ActionLink } from "./ui/ActionLink";
import { TimelineItem } from "./ui/TimelineItem";
import { LockerItem } from "./ui/LockerItem";
import { useCurrentChild } from "../context/ChildContext";
import { useLocker } from "../context/LockerContext";
import { useNavigate } from "react-router-dom";
import React from "react";
import { isDiagnosticPathway, usesAssessmentCard, usesCompletedAssessmentReport, getChildSessionStatus, getSessionDate } from "../lib/childStatus";
import { DEFAULT_CLINICIAN_NAME, DEFAULT_CLINICIAN_SHORT_NAME } from "../lib/clinicalProvider";

import clinicalReportImg from "../assets/images/clinical_report_placeholder_1783000795444.jpg";

export default function AssessmentPage() {
  const { currentChild } = useCurrentChild();
  const { files } = useLocker();
  const navigate = useNavigate();

  const [openSection, setOpenSection] = React.useState<string | null>("questionnaire");
  const [resultTab, setResultTab] = React.useState<"likely" | "unlikely" | "explore">("likely");

  const isDiagnostic = isDiagnosticPathway(currentChild);
  const showAssessmentPathwayCard = usesAssessmentCard(currentChild);
  const isDiagnosticActive = isDiagnostic;
  const isNavigatorActive = !isDiagnostic;
  
  const sessionStatus = getChildSessionStatus(currentChild);
  const isBooked = sessionStatus === "booked";
  const isCancelled = sessionStatus === "cancelled";

  const sessionDate = getSessionDate(currentChild, "long");
  const sessionTime = currentChild.intake?.sessionTime || "4:00 pm";

  const completedSections = currentChild.intake?.completedQuestionnaireSections || [];
  const questionnaireProgress = Math.round((completedSections.length / 8) * 100);

  const handleBookClick = () => {
    navigate('/setup?step=5&directSession=1');
  };

  const steps = [
    {
      num: "01",
      title: "Clinical Registration",
      desc: "Profile registered on the Diagnostic Assessment pathway, securing clinical slots.",
      status: "completed",
    },
    {
      num: "02",
      title: "Developmental Questionnaire",
      desc: "Parent-completed diagnostic questionnaires covering learning, attention, sleep, and emotional health.",
      status: questionnaireProgress === 100 ? "completed" : "active",
    },
    {
      num: "03",
      title: "In-Depth Telehealth Assessment",
      desc: "A 60-minute developmental review with our specialized child clinician to discuss findings and observations.",
      status: isBooked ? "completed" : "pending",
    },
    {
      num: "04",
      title: "Clinical Formulation & Plan",
      desc: "Establish clinical benchmarks, customized co-regulation structures, and classroom accommodations.",
      status: "locked",
    },
  ];

  if (usesCompletedAssessmentReport(currentChild)) {
    // Custom assessment page for Noah showing completed assessment session, assessment, and doc upload with report ready.
    // Comment: Representing completed status for Noah where assessment session, assessment, and doc upload are completed and report is ready. Show the hero white card with light green card.
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        className="pt-16 pb-24"
      >
        <PageContainer>
          <div className="space-y-16">
            <PageHeader
              kicker="Diagnostic Assessment"
              title="Noah's assessment is complete."
              description={
                <SectionDescription>
                  All preparatory steps, telehealth sessions, and document uploads have been completed. {DEFAULT_CLINICIAN_NAME} has finalized Noah's clinical formulation and diagnostic report.
                </SectionDescription>
              }
            />

            {/* Comment: Representing completed status for Noah where assessment session, assessment, and doc upload are completed and report is ready. Show the hero white card with light green card. */}
            <HeroQuoteCard
              kicker="Diagnostic Outcome"
              quote="Noah's clinical formulation and diagnostic report are fully finalized and ready for review."
              showQuotes={false}
              className="bg-white"
              evidenceLevel={3}
              evidenceText="Report Completed"
              evidenceVariant="green"
              rightNode={
                <HeroActionCard
                  icon={<FileText className="w-[22px] h-[22px] stroke-[1.7] text-[var(--color-thread-mid-green)]" />}
                  title="Download Report"
                  subtitle="PDF · 4.2 MB"
                  className="bg-[var(--color-thread-light-green)] text-[var(--style-light-surface-text)] w-[190px] rounded-tl-[28px] hover:bg-[var(--color-thread-light-green)]/90 cursor-pointer"
                  onClick={() => window.open(clinicalReportImg, '_blank')}
                />
              }
            />



            {/* AREAS OF FOCUS */}
            <div className="space-y-4 pt-10 border-t border-black/5">
              <div>
                <SectionLabel>Areas of focus</SectionLabel>
                <SectionTitle>Assessed clinical domains</SectionTitle>
                <SectionDescription>
                  {DEFAULT_CLINICIAN_NAME}'s clinical findings across key developmental domains. Click each domain to view observations and supportive next steps.
                </SectionDescription>
              </div>

              <div className="border-y border-black/10 mt-8">
                <AreaItem
                  title="Executive function"
                  impact="High impact on school engagement"
                  status="NOT MET"
                  isCollapsible={true}
                  description={
                    <div className="space-y-4 mt-3 max-w-[62ch]">
                      <p className="text-[0.96rem] text-[var(--color-thread-gray)] leading-relaxed font-sans">
                        Sustained attention and working memory present significant challenges in structured environments. Noah struggles with initiating tasks independently and managing distractions.
                      </p>
                      <div className="bg-white p-5 rounded-none rounded-tr-[36px] text-[0.88rem] space-y-4 font-sans text-slate-700">
                        <div className="flex gap-3">
                          <Eye className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Clinical Observation</span> 
                            Fidgets or leaves seat during tasks requiring sustained mental effort.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Parent Input</span> 
                            Requires frequent prompts to complete multi-step routines at home.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Lightbulb className="w-4 h-4 text-[var(--color-thread-mid-green)] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Recommendation</span> 
                            Introduce visual checklists and structured breaks during school tasks.
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  sources={["12 observations", "7 extracts", "5 verbatim", "8 behavioural"]}
                />

                <AreaItem
                  title="Emotional regulation"
                  impact="Moderate impact during transitions"
                  status="MET"
                  isCollapsible={true}
                  description={
                    <div className="space-y-4 mt-3 max-w-[62ch]">
                      <p className="text-[0.96rem] text-[var(--color-thread-gray)] leading-relaxed font-sans">
                        Strong emotional awareness, but gets overwhelmed when fatigue sets in. Noah benefits from clear, predictable routines to ease transition anxiety.
                      </p>
                      <div className="bg-white p-5 rounded-none rounded-tr-[36px] text-[0.88rem] space-y-4 font-sans text-slate-700">
                        <div className="flex gap-3">
                          <Eye className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Clinical Observation</span> 
                            Warm and generally cooperative, but shuts down or displays high frustration when tasks feel too complex.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Parent Input</span> 
                            Meltdowns are common after school due to sensory and cognitive overload.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Lightbulb className="w-4 h-4 text-[var(--color-thread-mid-green)] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Recommendation</span> 
                            Establish an after-school quiet reset routine with low cognitive demand.
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  sources={["12 observations", "7 extracts"]}
                />

                <AreaItem
                  title="Sensory processing"
                  impact="Low-to-moderate impact"
                  status="MET"
                  isCollapsible={true}
                  description={
                    <div className="space-y-4 mt-3 max-w-[62ch]">
                      <p className="text-[0.96rem] text-[var(--color-thread-gray)] leading-relaxed font-sans">
                        Responds well to calm, quiet environments. Noah shows high sensitivity to sudden loud auditory environments or overlapping noises.
                      </p>
                      <div className="bg-white p-5 rounded-none rounded-tr-[36px] text-[0.88rem] space-y-4 font-sans text-slate-700">
                        <div className="flex gap-3">
                          <Eye className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Clinical Observation</span> 
                            Observed covering ears in loud or busy shared areas.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Lightbulb className="w-4 h-4 text-[var(--color-thread-mid-green)] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Recommendation</span> 
                            Allow noise-cancelling headphones during independent classroom work time.
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  sources={["12 observations", "5 verbatim"]}
                />

                <AreaItem
                  title="Social participation"
                  impact="Positive asset"
                  status="MET"
                  isCollapsible={true}
                  description={
                    <div className="space-y-4 mt-3 max-w-[62ch]">
                      <p className="text-[0.96rem] text-[var(--color-thread-gray)] leading-relaxed font-sans">
                        Noah is imaginative, friendly, and eager to connect. He enjoys playing with peers, though occasional conflicts arise during structured team games.
                      </p>
                      <div className="bg-white p-5 rounded-none rounded-tr-[36px] text-[0.88rem] space-y-4 font-sans text-slate-700">
                        <div className="flex gap-3">
                          <Eye className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Clinical Observation</span> 
                            Demonstrates high social motivation and friendly cooperative play in one-on-one activities.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Lightbulb className="w-4 h-4 text-[var(--color-thread-mid-green)] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Recommendation</span> 
                            Encourage unstructured playground play and structured small-group activities with familiar peer mentors.
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  sources={["12 observations", "5 verbatim"]}
                />

                <AreaItem
                  title="Communication"
                  impact="Steady developmental track"
                  status="MET"
                  isCollapsible={true}
                  description={
                    <div className="space-y-4 mt-3 max-w-[62ch]">
                      <p className="text-[0.96rem] text-[var(--color-thread-gray)] leading-relaxed font-sans">
                        Noah expresses his needs clearly and has a rich vocabulary, but can become quiet or non-verbal when experiencing emotional or sensory overload.
                      </p>
                      <div className="bg-white p-5 rounded-none rounded-tr-[36px] text-[0.88rem] space-y-4 font-sans text-slate-700">
                        <div className="flex gap-3">
                          <Eye className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Clinical Observation</span> 
                            Articulate, descriptive, and highly expressive in low-stress one-on-one dialogues.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Lightbulb className="w-4 h-4 text-[var(--color-thread-mid-green)] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Recommendation</span> 
                            Provide options for non-verbal signaling (e.g., green/yellow/red emotion cards) when overwhelmed.
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  sources={["12 observations", "8 behavioural"]}
                />

                <AreaItem
                  title="Sleep"
                  impact="Supports cognitive stamina"
                  status="MET"
                  isCollapsible={true}
                  description={
                    <div className="space-y-4 mt-3 max-w-[62ch]">
                      <p className="text-[0.96rem] text-[var(--color-thread-gray)] leading-relaxed font-sans">
                        Occasional restlessness during bedtime transitions, but generally achieves high-quality sleep which supports daytime regulation.
                      </p>
                      <div className="bg-white p-5 rounded-none rounded-tr-[36px] text-[0.88rem] space-y-4 font-sans text-slate-700">
                        <div className="flex gap-3">
                          <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Parent Input</span> 
                            Bedtime routine is stable, though transition to wind-down requires active support.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Lightbulb className="w-4 h-4 text-[var(--color-thread-mid-green)] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Recommendation</span> 
                            Maintain a strict screen-free boundary 60 minutes before bed.
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  sources={["7 extracts"]}
                />

                <AreaItem
                  title="School participation"
                  impact="Requires supportive structuring"
                  status="NOT MET"
                  isCollapsible={true}
                  description={
                    <div className="space-y-4 mt-3 max-w-[62ch]">
                      <p className="text-[0.96rem] text-[var(--color-thread-gray)] leading-relaxed font-sans">
                        Highly engaged during active discussions or hands-on tasks, but school performance and stamina decline during silent, structured independent desk tasks.
                      </p>
                      <div className="bg-white p-5 rounded-none rounded-tr-[36px] text-[0.88rem] space-y-4 font-sans text-slate-700">
                        <div className="flex gap-3">
                          <Eye className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Teacher Observation</span> 
                            Needs visual reminders to stay on task; can distract others when losing focus.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Lightbulb className="w-4 h-4 text-[var(--color-thread-mid-green)] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Recommendation</span> 
                            Position Noah near the front of the classroom and deliver instructions in simplified, sequential steps.
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  sources={["5 verbatim", "8 behavioural"]}
                />

                <AreaItem
                  title="Physical wellbeing"
                  impact="Strong developmental asset"
                  status="MET"
                  isCollapsible={true}
                  description={
                    <div className="space-y-4 mt-3 max-w-[62ch]">
                      <p className="text-[0.96rem] text-[var(--color-thread-gray)] leading-relaxed font-sans">
                        Noah has excellent gross motor skills, stamina, and enjoys active outdoor running, climbing, and physical sports.
                      </p>
                      <div className="bg-white p-5 rounded-none rounded-tr-[36px] text-[0.88rem] space-y-4 font-sans text-slate-700">
                        <div className="flex gap-3">
                          <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Parent Input</span> 
                            Active physical play is a major source of joy and co-regulation.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Lightbulb className="w-4 h-4 text-[var(--color-thread-mid-green)] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 block mb-0.5">Recommendation</span> 
                            Integrate short movement breaks or active play opportunities to aid concentration.
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  sources={["7 extracts"]}
                />
              </div>
            </div>
          </div>
        </PageContainer>
      </motion.div>
    );
  }

  if (showAssessmentPathwayCard) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        className="pt-16 pb-24"
      >
        <PageContainer>
          <div className="space-y-16">
            <PageHeader
              kicker="Diagnostic Assessment"
              title={`${currentChild.name}'s assessment.`}
              description={
                <SectionDescription>
                  Manage preparation, tracking, and clinical details for {currentChild.name}'s assessment pathway.
                </SectionDescription>
              }
            />

            <HeroQuoteCard
              kicker="A clear result"
              quote="We determine whether ADHD is likely, unlikely, or there is more to explore - and tell you exactly what to do next."
              showQuotes={false}
              className="bg-white"
              rightNode={
                <HeroActionCard
                  icon={<Stethoscope className="w-[22px] h-[22px] stroke-[1.7]" />}
                  title="Clinical outcome"
                  subtitle="Download sample"
                  onClick={() => window.open(clinicalReportImg, '_blank')}
                />
              }
            />

            {/* OUR RESULT */}
            <div>
              <SectionLabel>
                OUR RESULT
              </SectionLabel>
              <SectionTitle>
                A clear answer, designed to guide decisions.
              </SectionTitle>

              <div className="mt-8 flex flex-col font-sans">
                <TimelineItem
                  title="ADHD likely"
                  meta="Clear pathways for school support and treatment options"
                  content="If the clinical formulation determines ADHD is likely, we provide immediate, actionable pathways. This includes custom letter templates for school adjustments, GP-focused diagnostic documentation to support medical decisions, and play-based co-regulation structures to support your child at home."
                  isFirst={true}
                  active={true}
                  isCollapsible={true}
                  hideMetrics={true}
                />
                <TimelineItem
                  title="ADHD unlikely"
                  meta="Investigating alternative developmental or environmental factors"
                  content="If ADHD is ruled unlikely, our clinical assessment doesn't stop there. We provide a detailed analysis of other observed domains (like sleep fatigue, school transition sensitivity, or physical wellbeing) to help you understand what other factors might be at play, and which specialists or resources to consult next."
                  isCollapsible={true}
                  hideMetrics={true}
                />
                <TimelineItem
                  title="More to explore"
                  meta="Targeted guidance for further clinical investigation"
                  content="When the presentation is complex or requires multi-disciplinary input, we identify exactly what needs deeper exploration. You receive structured observation logs and school coordination summaries to share with speech therapists, occupational therapists, or pediatricians to fast-track their diagnostic work."
                  isCollapsible={true}
                  hideMetrics={true}
                />
                <div className="border-b border-black/10" />
              </div>
            </div>

            {/* YOUR REPORT */}
            <div>
              <SectionLabel>
                YOUR REPORT
              </SectionLabel>
              <SectionTitle>
                More than a diagnosis. <br />A clear, usable picture.
              </SectionTitle>
              <SectionDescription>
                Your Threadline report is written in plain language and designed to guide your next step - not just label your child.
              </SectionDescription>

              <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 pt-6 font-sans">
                <LockerItem
                  icon={<CheckCircle2 className="w-[19px] h-[19px] stroke-[1.8]" />}
                  title="Clear next steps"
                  description="Practical guidance for what to do next: at home, at school, and with your GP."
                  cornerClass="rounded-tl-[32px]"
                />
                <LockerItem
                  icon={<Stethoscope className="w-[19px] h-[19px] stroke-[1.8]" />}
                  title="Support for your GP"
                  description="A structured report designed to support clinical conversations and referral decisions."
                  cornerClass="rounded-tr-[32px]"
                />
                <LockerItem
                  icon={<GraduationCap className="w-[19px] h-[19px] stroke-[1.8]" />}
                  title="Support for school"
                  description="A clear summary you can share with your child's school to guide appropriate support."
                  cornerClass="rounded-br-[32px]"
                />
              </div>
            </div>

            {/* YOUR CARE OPTIONS */}
            <div id="care-options-section" className="space-y-6 pt-6">
              <div id="care-options-header" className="space-y-2">
                <SectionLabel>Your Care Options</SectionLabel>
                <SectionTitle>Diagnostic Assessment</SectionTitle>
                <SectionDescription>
                  For families seeking answers.
                </SectionDescription>
              </div>

              <div id="care-options-grid" className="max-w-4xl font-sans">
                {/* Left Card: Diagnostic Assessment */}
                <Card id="care-option-diagnostic" className="bg-white border border-black/5 rounded-2xl shadow-none w-full">
                  <div className="p-6 sm:p-7.5">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
                      {/* Left Column: Description */}
                      <div className="flex-1 space-y-4">
                        <p className="text-[0.92rem] leading-relaxed text-[var(--color-thread-gray)]">
                          A comprehensive assessment to understand your child&apos;s strengths and challenges, and whether a neurodevelopmental condition may explain what you&apos;re seeing.
                        </p>
                      </div>

                      {/* Right Column: Points */}
                      <div className="flex-1 border-t md:border-t-0 md:border-l border-black/5 pt-6 md:pt-0 md:pl-10">
                        <ul className="space-y-2.5 pt-1">
                          {[
                            'Comprehensive multidisciplinary assessment',
                            'Personalised report',
                            'Clear recommendations',
                            'Access to Navigator',
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-[0.9rem] text-[var(--color-thread-dark-slate)] leading-snug">
                              <Check className="w-[15px] h-[15px] text-[var(--color-thread-mid-green)] mt-0.5 flex-shrink-0 stroke-[2.5]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-7 pt-6 border-t border-black/5 flex w-full items-center justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
                      {isDiagnosticActive ? (
                        <div className="flex items-center justify-end w-full">
                          <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)] rounded-full text-[0.85rem] font-semibold">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Current plan</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-baseline font-serif">
                            <span className="text-2xl sm:text-[1.85rem] font-normal text-[var(--color-thread-heading)] leading-none tracking-tight">$1,850</span>
                            <span className="text-[0.82rem] text-[var(--color-thread-gray)] ml-2.5 font-normal font-sans">One-off</span>
                          </div>
                          <Button id="learn-more-diagnostic" variant="mint" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                            Learn more
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </PageContainer>
      </motion.div>
    );
  }

  const childFiles = files.filter(f => f.childId === currentChild.id || f.childName === currentChild.name);
  const documentCount = childFiles.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className="pt-16 pb-16"
    >
      <PageContainer>
        <div className="space-y-16">
          <PageHeader
            kicker="Diagnostic Assessment"
            title={`${currentChild.name}'s assessment.`}
            description={
              <SectionDescription>
                Manage preparation, tracking, and clinical details for {currentChild.name}'s assessment pathway.
              </SectionDescription>
            }
          />

          {/* TOP PANEL: BOOKING STATUS CARD */}
          <HeroQuoteCard
            kicker="A clear result"
            quote="We determine whether ADHD is likely, unlikely, or there is more to explore - and tell you exactly what to do next."
            showQuotes={false}
            rightNode={
              <HeroActionCard
                icon={<Stethoscope className="w-[22px] h-[22px] stroke-[1.7]" />}
                title="Clinical outcome"
                subtitle="Download sample"
                onClick={() => window.open(clinicalReportImg, '_blank')}
              />
            }
          />

          {/* PREPARATION CHECKLIST SECTION */}
          <div className="space-y-6">
            <div>
              <SectionLabel>Preparation Checklist</SectionLabel>
              <SectionTitle>Prepare for {currentChild.name}'s Session</SectionTitle>
              <SectionDescription>
                Completing these key developmental milestones provides {DEFAULT_CLINICIAN_SHORT_NAME} with the rich context needed to construct {currentChild.name}'s clinical formulation.
              </SectionDescription>
            </div>

            <div className="relative mt-8">
              {/* Vertical Line */}
              <div className="absolute left-[11px] top-3.5 bottom-5 w-[2px] bg-black/10" />

              <div className="space-y-8">
                <TimelineStep
                  done={questionnaireProgress === 100}
                  active={questionnaireProgress > 0 && questionnaireProgress < 100}
                  todo={questionnaireProgress === 0}
                  title="Clinical Questionnaire"
                  meta={questionnaireProgress === 100 
                    ? "All 8 developmental sections complete" 
                    : `${completedSections.length} of 8 sections complete`}
                  metaTag={questionnaireProgress === 100 ? "Completed" : "In Progress"}
                  description={
                    <div className="space-y-4 pt-1">
                      <p className="text-sm text-slate-600 leading-relaxed font-sans">
                        The questionnaire maps out primary developmental areas including focus, sleep, school transitions, and co-regulation patterns, allowing {DEFAULT_CLINICIAN_SHORT_NAME} to compile a rich diagnostic overview.
                      </p>
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-sans">
                          <span className="font-medium">Questionnaire Progress</span>
                          <span className="font-semibold">{questionnaireProgress}% Done</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-5">
                          <div 
                            className="bg-[var(--color-thread-mid-green)] h-full transition-all duration-500 rounded-full"
                            style={{ width: `${questionnaireProgress}%` }}
                          />
                        </div>
                        <Button
                          variant="mint"
                          onClick={() => navigate("/setup?step=2")}
                          className="text-xs h-9 px-4 font-semibold rounded-full inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>{questionnaireProgress === 100 ? "Review Answers" : "Continue Questionnaire"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  }
                />

                <TimelineStep
                  active={isBooked}
                  todo={!isBooked}
                  title="Clinician-led Session"
                  meta={isBooked 
                    ? `Scheduled with ${DEFAULT_CLINICIAN_NAME} for ${sessionDate}` 
                    : "Telehealth clinical consultation to be scheduled"}
                  metaTag={isBooked ? "Scheduled" : "Needs Booking"}
                  description={
                    <div className="space-y-4 pt-1">
                      <p className="text-sm text-slate-600 leading-relaxed font-sans">
                        A comprehensive 60-minute developmental review conducted over secure telehealth. We will review the completed clinical questionnaires, developmental benchmarks, and map out supportive classroom adjustments and home-based co-regulation structures.
                      </p>
                      
                      {isBooked ? (
                        <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3.5 font-sans mt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                            <div>
                              <span className="text-slate-400 block uppercase font-bold tracking-wider text-[10px] mb-1">Clinician</span>
                              <span className="font-semibold text-slate-800">{DEFAULT_CLINICIAN_NAME}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block uppercase font-bold tracking-wider text-[10px] mb-1">Date & Time</span>
                              <span className="font-semibold text-slate-800">{sessionDate} at {sessionTime}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block uppercase font-bold tracking-wider text-[10px] mb-1">Method</span>
                              <span className="font-semibold text-slate-800">Secure Telehealth Video</span>
                            </div>
                          </div>
                          <div className="pt-2 flex flex-wrap gap-3">
                            <Button
                              variant="mint"
                              onClick={() => alert("Telehealth video session is active. Please join using the clinician invitation link.")}
                              className="text-xs h-9 px-4 font-semibold rounded-full cursor-pointer"
                            >
                              Join Video Call
                            </Button>
                            <Button
                              variant="slate"
                              onClick={() => navigate("/setup?step=5&directSession=1")}
                              className="text-xs h-9 px-4 font-semibold rounded-full border-black/10 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                            >
                              Reschedule Session
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2">
                          <Button
                            variant="mint"
                            onClick={() => navigate("/setup?step=5&directSession=1")}
                            className="text-xs h-9 px-4 font-semibold rounded-full inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Schedule Telehealth Session</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      )}
                    </div>
                  }
                />

                <TimelineStep
                  done={documentCount > 0}
                  todo={documentCount === 0}
                  title="Document Upload"
                  meta={documentCount > 0 
                    ? `${documentCount} file${documentCount === 1 ? '' : 's'} shared in secure locker` 
                    : "Upload supporting school or medical letters"}
                  metaTag={documentCount > 0 ? "Shared" : "Pending"}
                  description={
                    <div className="space-y-4 pt-1">
                      <p className="text-sm text-slate-600 leading-relaxed font-sans">
                        Sharing previous reports, GP letters, school term summaries, or occupational therapy feedback helps compile a holistic co-regulation picture. Every document is protected with AES-256 end-to-end encryption in your secure Locker.
                      </p>

                      {documentCount > 0 && (
                        <div className="space-y-2 max-w-md mt-2">
                          <span className="text-slate-400 block uppercase font-bold tracking-wider text-[10px] mb-2 font-sans">Shared Documents ({documentCount})</span>
                          {childFiles.map((file, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50 px-3 py-2.5 rounded-xl border border-black/5 font-sans">
                              <FileText className="w-4 h-4 text-[var(--color-thread-mid-green)] shrink-0" />
                              <span className="font-medium truncate">{file.name}</span>
                              <span className="text-slate-400 text-[10px] ml-auto shrink-0">{file.date}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-2">
                        <Button
                          variant="mint"
                          onClick={() => navigate("/documents")}
                          className="text-xs h-9 px-4 font-semibold rounded-full inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>{documentCount > 0 ? "Manage Documents Locker" : "Go to Documents Manager"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          </div>

          {["Tom", "Ava", "Maya", "Liam"].includes(currentChild.name) && (
            <Card className="p-8 border border-black/5 bg-white flex flex-col items-center justify-center text-center mt-6">
              <p className="text-slate-600 font-medium font-sans">
                Diagnostic assessment banner placeholder
              </p>
            </Card>
          )}
        </div>
      </PageContainer>
    </motion.div>
  );
}
