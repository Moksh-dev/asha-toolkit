import type { Scene, Question } from "./types";

export const references = [
  {
    id: "unodc",
    org: "UNODC",
    title: "Understanding trafficking in persons",
    description:
      "The international framework, exploitation and the special protection of children.",
    url: "https://www.unodc.org/documents/human-trafficking/2020/UNODC_-_Training_Manual_on_TIP_-_SOM_for_MINUSMA_UNPOL.pdf",
  },
  {
    id: "ilo",
    org: "INTERNATIONAL LABOUR ORGANIZATION",
    title: "What is forced labour?",
    description:
      "How involuntary work and threats of penalties relate to forced labour.",
    url: "https://www.ilo.org/topics-and-sectors/forced-labour-modern-slavery-and-trafficking-persons/what-forced-labour",
  },
  {
    id: "unicef",
    org: "UNICEF",
    title: "Keeping children safe online",
    description:
      "Online exploitation, privacy and the role of supportive adults.",
    url: "https://www.unicef.org/protection/keeping-children-safe-online",
  },
  {
    id: "safeguarding",
    org: "UNITED NATIONS · OSRSG VAC",
    title: "Child safeguarding policy",
    description:
      "A reference for responding to concerns. Apply your host’s approved local procedures.",
    url: "https://violenceagainstchildren.un.org/sites/violenceagainstchildren.un.org/files/documents/child_safeguarding_policy_february_2024.pdf",
  },
];

export const knowledgeQuestions: Question[] = [
  {
    prompt: "Does trafficking always involve crossing a border?",
    options: [
      "Yes, movement is always required.",
      "No, exploitation can happen locally.",
    ],
    correct: 1,
    explanation:
      "Crossing a border is not required. Focus on exploitation and control, rather than a person’s location.",
  },
  {
    prompt:
      "An unfamiliar recruiter asks for your identity documents. What is a safer first step?",
    options: [
      "Send them to secure the offer.",
      "Verify independently and ask a trusted adult.",
    ],
    correct: 1,
    explanation:
      "Use contact details you find independently. A trusted adult can help check the organization and the terms.",
  },
  {
    prompt:
      "One concerning sign means a person is definitely being trafficked.",
    options: ["True.", "False. Look at context and seek trained help."],
    correct: 1,
    explanation:
      "Indicators raise questions; they are not proof. Avoid labels or accusations and refer concerns appropriately.",
  },
  {
    prompt:
      "A contact pressures you to share private photographs. What can you do?",
    options: [
      "Pause the conversation and seek trusted support.",
      "Keep it secret because you already replied.",
    ],
    correct: 0,
    explanation:
      "You can ask for help at any point, even if you have already shared something. The pressure is not your fault.",
  },
  {
    prompt: "A friend shares a worrying experience. How can you help?",
    options: [
      "Investigate the person yourself.",
      "Listen without blame and involve a safe, trained adult.",
    ],
    correct: 1,
    explanation:
      "Protect their privacy and connect them with appropriate support. Do not confront anyone or promise complete secrecy.",
  },
];

export const fictionalMessages = [
  {
    from: "New contact",
    text: "Hey! I can get you an amazing paid opportunity.",
  },
  {
    from: "New contact",
    text: "There’s only one place left. You need to decide today.",
  },
  {
    from: "New contact",
    text: "Keep it between us. No need to tell a trusted adult.",
  },
  {
    from: "New contact",
    text: "Send a photo of your ID first and I’ll share the details.",
  },
];

export const schoolScenes: Scene[] = [
  {
    id: "s01",
    label: "WELCOME",
    title: "Awareness begins with understanding.",
    kind: "welcome",
    intro:
      "Together, we can learn to recognize exploitation, make safer decisions, and know where to turn for support.",
    points: [
      {
        title: "Project A.S.H.A.",
        text: "A youth-led initiative advancing human-trafficking prevention through education, advocacy, and community awareness.",
      },
    ],
    minutes: 1,
    notes: [
      "Introduce yourself and explain that this is an awareness session, not an investigation or a legal lesson.",
      "Identify the school safeguarding contact before starting. Tell students they may pass, pause or speak privately to a safe adult.",
    ],
  },
  {
    id: "s02",
    label: "OUR LEARNING JOURNEY",
    title: "What will we learn?",
    kind: "objectives",
    intro: "Four practical ideas to take beyond this classroom.",
    points: [
      {
        title: "Understand exploitation",
        text: "Learn what trafficking can involve, beyond stereotypes.",
      },
      {
        title: "Recognize concerns",
        text: "Notice patterns of pressure, secrecy and control.",
      },
      {
        title: "Make safer decisions",
        text: "Pause, check information and ask for support.",
      },
      {
        title: "Know where to turn",
        text: "Identify trusted people and appropriate services.",
      },
    ],
    minutes: 1,
    notes: [
      "Read the four goals. Invite students to think of a trusted adult without naming them publicly.",
      "Explain that questions are welcome; personal experiences do not need to be shared.",
    ],
  },
  {
    id: "s03",
    label: "UNDERSTAND",
    title: "What is human trafficking?",
    kind: "definition",
    intro:
      "Trafficking involves acts such as recruiting or harbouring a person for exploitation, using force, deception, coercion or abuse of vulnerability.",
    points: [
      {
        title: "Recruitment or harbouring",
        text: "A person may be approached, moved or kept somewhere.",
      },
      {
        title: "Control or deception",
        text: "Threats, false promises or misuse of power may be involved.",
      },
      {
        title: "Exploitation",
        text: "Someone benefits by taking advantage of another person.",
      },
    ],
    explanation:
      "These are possible elements, not a universal sequence. Under the UN Protocol, proof of these “means” is not required for child trafficking. National legal definitions vary.",
    source: "unodc",
    minutes: 2,
    notes: [
      "Use the diagram as a concept map, not a fixed story that everyone experiences.",
      "Keep examples non-graphic. Children require particular protection; refer legal questions to qualified local guidance.",
    ],
  },
  {
    id: "s04",
    label: "LOOK BEYOND STEREOTYPES",
    title: "It may look different than you expect.",
    kind: "compare",
    intro: "Common assumptions can make exploitation harder to recognize.",
    points: [
      {
        title: "“It is always a stranger.”",
        text: "A familiar person can misuse trust or authority.",
      },
      {
        title: "“It always starts with kidnapping.”",
        text: "A deceptive promise or pressure may be involved.",
      },
      {
        title: "“It happens across borders.”",
        text: "Exploitation may happen within a community.",
      },
      {
        title: "“You would always see a locked door.”",
        text: "Threats and dependence can restrict freedom too.",
      },
    ],
    minutes: 2,
    source: "unodc",
    notes: [
      "Read the assumption first, then the reality. Avoid asking students to identify people they suspect.",
      "Explain that appearances alone cannot tell us whether exploitation is taking place.",
    ],
  },
  {
    id: "s05",
    label: "UNDERSTAND EXPLOITATION",
    title: "Different forms. The same right to safety.",
    kind: "panels",
    intro:
      "Exploitation can happen in different settings. Everyone deserves dignity, protection and meaningful choice.",
    points: [
      {
        title: "Forced labour",
        text: "Work imposed through threats or penalties that a person has not freely chosen.",
      },
      {
        title: "Sexual exploitation",
        text: "Someone exploits another person through sexual activity for money or benefit.",
      },
      {
        title: "Domestic servitude",
        text: "A person is controlled and compelled to work in a household.",
      },
      {
        title: "Other exploitation",
        text: "People may be compelled to beg or carry out unlawful activities.",
      },
    ],
    minutes: 2,
    source: "ilo",
    notes: [
      "Keep descriptions brief and age-appropriate. Do not show graphic images.",
      "Different forms may overlap. Not every unfair work situation meets the legal definition of trafficking.",
    ],
  },
  {
    id: "s06",
    label: "MYTH OR REALITY? · 01",
    title: "Let’s question an assumption.",
    kind: "myth",
    intro: "Discuss the statement, then reveal the explanation.",
    statement: "Human trafficking always involves crossing a border.",
    reality: false,
    explanation:
      "Myth. Exploitation may occur without crossing any border. A person does not need to travel internationally to experience trafficking.",
    minutes: 1,
    notes: [
      "Invite a show of hands for myth or reality. Passing is always okay.",
      "Reveal the answer and emphasize local awareness, without creating fear of everyday situations.",
    ],
  },
  {
    id: "s07",
    label: "MYTH OR REALITY? · 02",
    title: "Trust can be misused.",
    kind: "myth",
    intro: "Knowing a person does not remove the need for healthy boundaries.",
    statement: "A person can be exploited by someone they already know.",
    reality: true,
    explanation:
      "Reality. A familiar person may misuse trust or authority. Responsibility always rests with the person causing harm.",
    minutes: 1,
    notes: [
      "Do not ask for examples from students’ personal lives.",
      "Explain that seeking help about someone familiar can be difficult, and support is still available.",
    ],
  },
  {
    id: "s08",
    label: "RECOGNIZE",
    title: "Notice patterns, not labels.",
    kind: "patterns",
    intro:
      "Fear, isolation and loss of freedom can warrant concern. No single sign proves trafficking.",
    points: [
      {
        title: "Fear or threats",
        text: "Someone seems afraid of consequences for themselves or others.",
      },
      {
        title: "Isolation",
        text: "Contact with friends, family or support is restricted.",
      },
      {
        title: "Restricted freedom",
        text: "Someone else controls movement, documents or earnings.",
      },
    ],
    explanation:
      "Consider the context. Share concerns with an appropriate trained adult instead of making accusations.",
    minutes: 2,
    notes: [
      "Avoid profiling by background, nationality, clothing or income.",
      "Ask: “What support might someone need?” rather than “Who looks like a victim?”",
    ],
  },
  {
    id: "s09",
    label: "ONLINE COMMUNICATION",
    title: "A message deserves a moment.",
    kind: "messages",
    intro:
      "This fictional conversation shows how excitement can turn into pressure. Advance each message together.",
    explanation:
      "An online identity can be deceptive. Requests for secrecy, urgency or private information are reasons to pause and ask for support.",
    source: "unicef",
    minutes: 2,
    notes: [
      "Advance messages one at a time. Ask students what changes as the conversation develops.",
      "Do not ask students to display real messages or share account details.",
    ],
  },
  {
    id: "s10",
    label: "PAUSE & CONSIDER",
    title: "Would you trust this?",
    kind: "choice",
    intro:
      "Someone you met online offers an exciting opportunity but insists that you keep it secret from trusted adults.",
    choices: [
      {
        text: "Agree immediately.",
        feedback:
          "Exciting opportunities can feel urgent. You can still pause, check the details and ask for support before taking another step.",
      },
      {
        text: "Share personal documents.",
        feedback:
          "Documents contain sensitive information. Hold off, verify the request independently and involve a trusted adult.",
      },
      {
        text: "Pause, verify independently, and speak with a trusted adult.",
        feedback:
          "This creates time and support to assess the offer. Secrecy and pressure are reasons for caution.",
        preferred: true,
      },
    ],
    minutes: 2,
    notes: [
      "Invite reasons before choosing. Explain that the activity is about options, not judging people.",
      "If a student has already shared information, reassure them that they can still ask for help.",
    ],
  },
  {
    id: "s11",
    label: "A FICTIONAL OPPORTUNITY",
    title: "An unexpected job offer.",
    kind: "job",
    intro:
      "A student is offered unusually attractive paid work. The employer gives no clear organization details or written terms.",
    points: [
      {
        title: "Check the organization",
        text: "Find its official contact details independently.",
      },
      {
        title: "Ask for written terms",
        text: "Understand the tasks, pay, hours and location.",
      },
      {
        title: "Bring in support",
        text: "Ask a trusted adult to help check before agreeing or travelling.",
      },
    ],
    minutes: 2,
    notes: [
      "Ask which details are missing. Good pay alone is not proof of exploitation.",
      "For students, local minimum-age and employment rules matter. A trusted adult should check these.",
    ],
  },
  {
    id: "s12",
    label: "UNDERSTAND PRESSURE",
    title: "Manipulation can happen gradually.",
    kind: "steps",
    intro:
      "A person may build trust before applying pressure. Recognizing a change can help someone seek support.",
    points: [
      {
        title: "A promise",
        text: "Attention, gifts or an opportunity build trust.",
      },
      { title: "A demand", text: "The person asks for secrecy or a favour." },
      {
        title: "More pressure",
        text: "Threats or guilt make saying no feel difficult.",
      },
    ],
    explanation:
      "This is an illustrative pattern, not a checklist. Being manipulated is never the fault of the person harmed.",
    minutes: 2,
    notes: [
      "Avoid suggesting every gift or friendship is suspicious.",
      "Explain that consent to an earlier interaction does not mean someone must agree to later demands.",
    ],
  },
  {
    id: "s13",
    label: "CHOOSE A PATH",
    title: "What happens next?",
    kind: "decision",
    intro:
      "A fictional recruiter asks a student to travel alone before sharing the workplace address. What could the student do next?",
    choices: [
      {
        text: "Verify with a trusted adult.",
        feedback:
          "A pause creates space to check the employer, address and terms using independent sources. If concerns remain, do not proceed.",
        preferred: true,
      },
      {
        text: "Proceed despite the missing details.",
        feedback:
          "The uncertainty remains. It is still possible to change direction, stop when safe and ask someone trusted for help.",
      },
    ],
    minutes: 2,
    notes: [
      "Select each path in turn if useful. Explain that either path can lead back to support.",
      "Do not describe a frightening consequence or suggest that harm is inevitable.",
    ],
  },
  {
    id: "s14",
    label: "PERSONAL INFORMATION",
    title: "Your privacy deserves protection.",
    kind: "privacy",
    intro:
      "Pause before sending sensitive information to an unverified contact. Once shared, control over it can be difficult to regain.",
    points: [
      {
        title: "Identity & location",
        text: "Home addresses, identity documents and live location.",
      },
      {
        title: "Accounts & access",
        text: "Passwords, sign-in codes and account recovery details.",
      },
      {
        title: "Private images",
        text: "Sensitive photographs and recordings.",
      },
    ],
    explanation:
      "Already shared something? You deserve help without blame. Ask a safe adult about account security and appropriate reporting.",
    minutes: 2,
    notes: [
      "Do not ask what students have shared or suggest they must show images.",
      "Never download, forward or copy sexual images involving children. Seek trained safeguarding advice.",
    ],
  },
  {
    id: "s15",
    label: "TAKE A SAFER STEP",
    title: "When something feels wrong.",
    kind: "actions",
    intro: "You do not need to be certain before asking for support.",
    points: [
      { title: "Pause", text: "Take time. You do not owe an immediate reply." },
      {
        title: "Move toward safety",
        text: "Leave or stop contact when safe. Avoid confrontation.",
      },
      {
        title: "Ask for help",
        text: "Speak with a trusted adult or safeguarding lead.",
      },
    ],
    explanation:
      "If safe, note relevant usernames, dates or messages with trained guidance. Do not put yourself at risk or copy harmful images. For immediate danger, use verified local emergency services.",
    minutes: 2,
    notes: [
      "Distinguish keeping useful details from gathering evidence or investigating.",
      "Tell students who the school safeguarding lead is and where they can find them after the session.",
    ],
  },
  {
    id: "s16",
    label: "YOU ARE NOT ALONE",
    title: "Build a circle of support.",
    kind: "network",
    intro:
      "Support can come from more than one place. If one person cannot help, another safe person or service may be able to.",
    points: [
      {
        title: "Trusted adults",
        text: "A safe caregiver, teacher or another trusted adult.",
      },
      {
        title: "School safeguarding team",
        text: "People responsible for responding to concerns.",
      },
      {
        title: "Appropriate local services",
        text: "Verified child protection and specialist support.",
      },
    ],
    minutes: 2,
    notes: [
      "Allow the network to assemble once, then leave it still.",
      "Recognize that home is not safe for everyone. Offer the safeguarding team as another route.",
    ],
  },
  {
    id: "s17",
    label: "SUPPORT SOMEONE ELSE",
    title: "Listen. Believe their need for support.",
    kind: "supporting",
    intro: "You do not need to solve everything to be a helpful friend.",
    points: [
      {
        title: "Listen without blame",
        text: "“Thank you for telling me. You deserve support.”",
      },
      {
        title: "Protect their privacy",
        text: "Do not share the story with peers or post it online.",
      },
      {
        title: "Connect with help",
        text: "Involve a safe, trained adult. Do not investigate.",
      },
    ],
    explanation:
      "Do not promise complete secrecy. Explain that a trusted adult may need to help keep them safe.",
    minutes: 2,
    notes: [
      "Avoid role-play that asks students to act as victims or perpetrators.",
      "Offer a simple supportive phrase and explain the difference between privacy and secrecy.",
    ],
  },
  {
    id: "s18",
    label: "KNOWLEDGE CHECK",
    title: "Let’s put it into practice.",
    kind: "quiz",
    intro:
      "Five questions. Take time to discuss; each answer comes with an explanation.",
    minutes: 4,
    notes: [
      "Use this as a conversation, not a test of students’ experiences or worth.",
      "Read explanations aloud. Revisit any idea that needs clarification.",
    ],
  },
  {
    id: "s19",
    label: "TAKE THESE WITH YOU",
    title: "Small steps. Shared responsibility.",
    kind: "recap",
    intro:
      "Prevention is a responsibility for communities and institutions. These ideas can help us take the next step.",
    points: [
      {
        title: "Stay informed.",
        text: "Learn from reliable, age-appropriate sources.",
      },
      { title: "Verify concerns.", text: "Pause and check independently." },
      {
        title: "Respect others.",
        text: "Protect dignity, privacy and choice.",
      },
      { title: "Seek support.", text: "You do not have to work it out alone." },
    ],
    minutes: 1,
    notes: [
      "Invite students to remember one idea without sharing a personal experience.",
      "Repeat that exploitation is the responsibility of those causing harm, not those targeted.",
    ],
  },
  {
    id: "s20",
    label: "AWARENESS · SAFETY · HOPE · ACTION",
    title: "Awareness is the beginning of action.",
    kind: "closing",
    intro:
      "Take one idea with you. Make space for a conversation. Help build a community where asking for support feels possible.",
    explanation:
      "If today raised a concern, speak privately with your school safeguarding lead or another safe, trusted adult.",
    minutes: 1,
    notes: [
      "Thank the group and repeat the verified local support route.",
      "Remain available with the designated safeguarding adult. Never invite public disclosures as a closing activity.",
    ],
  },
];

export const volunteerScenes: Scene[] = [
  {
    id: "v01",
    label: "FACILITATOR ORIENTATION",
    title: "Make awareness a shared experience.",
    kind: "welcome",
    intro:
      "A practical workshop for A.S.H.A. volunteers, built around conversation, safer choices and clear support pathways.",
    points: [
      {
        title: "Before the room fills",
        text: "Confirm the host’s safeguarding lead, a quiet space and the process for responding to a concern.",
      },
    ],
    minutes: 2,
    notes: [
      "Introduce your role and the host safeguarding contact. Establish a way to step out without explanation.",
      "Open facilitator tools for timings and notes. Keep them collapsed when projecting to the audience.",
    ],
  },
  {
    id: "v02",
    label: "MISSION & SCOPE",
    title: "Education. Advocacy. Community awareness.",
    kind: "objectives",
    intro:
      "Project A.S.H.A. is a youth-led initiative focused on trafficking prevention through awareness and education.",
    points: [
      {
        title: "Make ideas understandable",
        text: "Use clear language and relevant, non-graphic examples.",
      },
      {
        title: "Build safer conversations",
        text: "Listen with dignity and respect differences.",
      },
      {
        title: "Connect to trained support",
        text: "Use the host’s approved referral pathway.",
      },
    ],
    explanation:
      "This workshop provides education. Volunteers do not determine legal status, provide specialist care or conduct investigations.",
    minutes: 2,
    notes: [
      "Describe the actual educational mission without claims about rescue work, partnerships or outcomes.",
      "Make the boundaries of the volunteer role explicit.",
    ],
  },
  {
    id: "v03",
    label: "OBJECTIVES & EXPECTATIONS",
    title: "What would a useful session give you?",
    kind: "objectives",
    intro:
      "Invite general learning goals. Nobody needs to explain why they are here.",
    points: [
      {
        title: "A clearer understanding",
        text: "Distinguish exploitation from common stereotypes.",
      },
      {
        title: "Practical decision skills",
        text: "Recognize pressure and verify unfamiliar opportunities.",
      },
      {
        title: "A supportive response",
        text: "Know how to listen and refer a concern.",
      },
      {
        title: "A local next step",
        text: "Leave with a verified support pathway.",
      },
    ],
    minutes: 2,
    notes: [
      "Ask for one-word learning hopes or offer a quiet reflection.",
      "Adapt vocabulary to the audience and offer the option to pass throughout.",
    ],
  },
  {
    id: "v04",
    label: "GROUP AGREEMENT",
    title: "A respectful space starts with us.",
    kind: "agreement",
    intro: "Read these agreements together before discussing the subject.",
    points: [
      {
        title: "Participation is a choice",
        text: "Pass, take a break or ask a question without explaining.",
      },
      {
        title: "Discuss ideas, not personal histories",
        text: "Do not name real people or ask others to disclose.",
      },
      {
        title: "Respect privacy and boundaries",
        text: "No recording or sharing another person’s story.",
      },
      {
        title: "Know the limits of confidentiality",
        text: "A safeguarding concern may need trained support.",
      },
    ],
    minutes: 2,
    notes: [
      "Ask if anything would help people participate safely. Do not promise that everything stays in the room.",
      "State how a participant can speak privately with the host safeguarding lead.",
    ],
  },
  {
    id: "v05",
    label: "SHARED UNDERSTANDING",
    title: "Understand trafficking and exploitation.",
    kind: "definition",
    intro:
      "The international framework connects an act, such as recruitment, with exploitative purpose and means such as coercion or deception.",
    points: [
      {
        title: "An act",
        text: "For example, recruitment, transfer or harbouring.",
      },
      {
        title: "A means",
        text: "For example, force, deception or abuse of vulnerability.",
      },
      {
        title: "An exploitative purpose",
        text: "For example, forced labour or sexual exploitation.",
      },
    ],
    explanation:
      "For children under the UN Protocol, the “means” element need not be established. Local definitions and duties differ. This diagram is not a sequence or legal assessment.",
    source: "unodc",
    minutes: 3,
    notes: [
      "Separate international education from jurisdiction-specific advice.",
      "Explain that movement is not always required, and that forms of exploitation may overlap.",
    ],
  },
  {
    id: "v06",
    label: "MISCONCEPTIONS & DEFINITIONS",
    title: "Let context challenge the stereotype.",
    kind: "compare",
    intro:
      "Careful language helps us recognize concerns without making assumptions about people.",
    points: [
      {
        title: "“Only strangers exploit people.”",
        text: "Trust and authority can be misused by known people.",
      },
      {
        title: "“A person agreed, so it cannot be exploitation.”",
        text: "Deception or threats can undermine meaningful choice.",
      },
      {
        title: "“Unfair work always means trafficking.”",
        text: "Related harms have distinct legal definitions.",
      },
    ],
    source: "ilo",
    minutes: 2,
    notes: [
      "Avoid treating consent as a simple yes-or-no history. Circumstances and coercion matter.",
      "If asked to classify a real situation, refer to the safeguarding lead rather than diagnosing it publicly.",
    ],
  },
  {
    id: "v07",
    label: "AUDIENCE ACTIVITY · MYTH OR REALITY",
    title: "Make room to change your mind.",
    kind: "myth",
    intro:
      "Invite a show of hands or a verbal group response. Recording anonymous totals is optional.",
    statement: "Human trafficking always involves crossing a border.",
    reality: false,
    explanation:
      "Myth. Exploitation can happen without international travel. Ask what this changes about how we think of prevention.",
    minutes: 3,
    notes: [
      "Allow a quiet thinking moment before voting. Use the tally controls only for aggregate counts.",
      "Reveal the explanation, invite a general reflection and avoid identifying individual answers.",
    ],
  },
  {
    id: "v08",
    label: "COERCION, DECEPTION & VULNERABILITY",
    title: "Pressure can narrow someone’s options.",
    kind: "steps",
    intro:
      "An unmet need can be exploited through a false promise, followed by dependence or threats.",
    points: [
      {
        title: "An opportunity is promised",
        text: "Work, shelter, belonging or support may be offered.",
      },
      {
        title: "Conditions change",
        text: "Debts, secrecy or restrictions may be introduced.",
      },
      {
        title: "Leaving feels difficult",
        text: "Threats or dependence may limit available choices.",
      },
    ],
    explanation:
      "This is an illustrative pattern. Vulnerability is shaped by circumstances; it is never a fault or a personal identity.",
    minutes: 3,
    notes: [
      "Ask what institutions could change to increase safe options.",
      "Do not ask “Why didn’t they leave?” Discuss barriers and support instead.",
    ],
  },
  {
    id: "v09",
    label: "ONLINE RECRUITMENT",
    title: "Notice when connection becomes control.",
    kind: "messages",
    intro:
      "Advance this fictional exchange. Invite the group to notice urgency, secrecy and requests for information.",
    explanation:
      "A supportive response preserves dignity. Someone who has already replied or shared information can still ask for help.",
    source: "unicef",
    minutes: 3,
    notes: [
      "Pause after each message: “What would you want to check?”",
      "Never request screenshots of participants’ real messages or ask them to show private accounts.",
    ],
  },
  {
    id: "v10",
    label: "FICTIONAL CASE STUDY",
    title: "An offer with missing details.",
    kind: "job",
    intro:
      "Alex receives a paid-work offer through an unfamiliar account. The pay is high, the start date is tomorrow, and the employer will not share written terms.",
    points: [
      {
        title: "What do we know?",
        text: "There is an offer, urgency and missing information.",
      },
      {
        title: "What do we need to check?",
        text: "The employer, workplace, duties, pay and terms.",
      },
      {
        title: "Who can support Alex?",
        text: "A trusted adult and the host’s safeguarding team.",
      },
    ],
    minutes: 4,
    notes: [
      "Give pairs a minute to identify missing details. Ask them to discuss Alex, not their own experiences.",
      "Explain that concern is a reason to check, not proof of a crime.",
    ],
  },
  {
    id: "v11",
    label: "AUDIENCE ACTIVITY · DECISION PATH",
    title: "Identify a safer next step.",
    kind: "decision",
    intro:
      "Alex is asked to travel before receiving an address or written terms. Explore two possible next steps.",
    choices: [
      {
        text: "Pause and verify independently.",
        feedback:
          "Alex can ask a trusted person to help check the organization and terms. A genuine offer should allow questions and time.",
        preferred: true,
      },
      {
        text: "Travel before checking the details.",
        feedback:
          "The information gap remains. Alex can still stop when safe, contact support and reconsider. Support is available without blame.",
      },
    ],
    minutes: 3,
    notes: [
      "Invite the group to explain each path. Use optional tallies for the two choices.",
      "Bring both paths back to constructive support. Do not portray harm as punishment for a choice.",
    ],
  },
  {
    id: "v12",
    label: "INDICATORS, NOT ACCUSATIONS",
    title: "Observe carefully. Respond appropriately.",
    kind: "patterns",
    intro:
      "Potential indicators need context and trained assessment. A single observation cannot establish trafficking.",
    points: [
      {
        title: "Restrictions",
        text: "Control over communication, movement, documents or pay.",
      },
      {
        title: "Fear",
        text: "Threats, intimidation or fear of another person.",
      },
      {
        title: "Isolation",
        text: "Limited access to independent advice or support.",
      },
    ],
    explanation:
      "Record factual concerns through approved procedures. Do not profile, label, confront or investigate people.",
    minutes: 2,
    notes: [
      "Contrast an observation with an assumption: “Someone holds their documents” does not explain why.",
      "Discuss how to report a concern through the host’s policy.",
    ],
  },
  {
    id: "v13",
    label: "AUDIENCE ACTIVITY · SITUATIONS",
    title: "Different settings. Thoughtful responses.",
    kind: "carousel",
    intro:
      "Explore three fictional situations. For each, discuss the concern, what remains unknown, and an appropriate next step.",
    points: [
      {
        title: "Online",
        text: "An account offers a modelling opportunity but demands secrecy and identity documents. Pause contact, check independently and seek trusted support.",
      },
      {
        title: "Workplace",
        text: "A worker says someone keeps their pay and they are afraid to leave. Listen privately, avoid confrontation and use trained local support.",
      },
      {
        title: "Community",
        text: "A young person has become isolated and seems fearful of an adult. Avoid assumptions; share factual concerns with the safeguarding lead.",
      },
    ],
    minutes: 4,
    notes: [
      "Use the situation controls to move at the group’s pace.",
      "Ask the same three questions each time: concern, unknown information and appropriate support.",
    ],
  },
  {
    id: "v14",
    label: "SUPPORT WITHOUT BLAME",
    title: "Dignity is part of the response.",
    kind: "supporting",
    intro:
      "People may face barriers that are not visible to others. Start with care, rather than judgment.",
    points: [
      {
        title: "Listen respectfully",
        text: "Use open, calm language and avoid interrogating.",
      },
      {
        title: "Offer choices where possible",
        text: "Explain your role and the support you can seek.",
      },
      {
        title: "Keep responsibility clear",
        text: "The person causing harm is responsible for it.",
      },
    ],
    explanation:
      "Avoid “Why did you go?” or “Why didn’t you leave?” A useful response is: “You deserve support. Let’s involve someone trained to help.”",
    minutes: 2,
    notes: [
      "Discuss language without acting out traumatic experiences.",
      "Do not promise a specific outcome or make decisions outside your safeguarding responsibilities.",
    ],
  },
  {
    id: "v15",
    label: "FACILITATED DISCUSSION",
    title: "What makes it easier to ask for help?",
    kind: "discussion",
    intro:
      "Think about an imaginary school or community. What could make a person feel safe enough to seek support?",
    points: [
      { title: "Think", text: "Take a quiet moment. Passing is welcome." },
      {
        title: "Discuss",
        text: "Consider language, access, privacy and trusted people.",
      },
      {
        title: "Share an idea",
        text: "Suggest one change an institution could make.",
      },
    ],
    explanation:
      "Keep discussion general. Do not ask anyone to describe a personal experience or identify another person.",
    minutes: 4,
    notes: [
      "Offer pairs, small groups or silent reflection based on the setting.",
      "If the conversation becomes personal, pause it gently and offer the approved private support route.",
    ],
  },
  {
    id: "v16",
    label: "PRIVACY & SAFEGUARDING",
    title: "Protect information. Explain the limits.",
    kind: "privacy",
    intro:
      "Collect the minimum needed through approved safeguarding procedures. Quiz activities never need names or personal disclosures.",
    points: [
      {
        title: "Group activities",
        text: "Use only optional anonymous aggregate counts.",
      },
      {
        title: "A private concern",
        text: "Share only with appropriate people through secure host procedures.",
      },
      {
        title: "Clear boundaries",
        text: "Do not promise absolute confidentiality.",
      },
    ],
    explanation:
      "This toolkit’s session summary contains counts and activity progress only. Do not enter a participant’s story, contact details or identity into it.",
    minutes: 2,
    notes: [
      "Explain why a concern may need to be shared with trained staff.",
      "Follow the institution’s secure recordkeeping rules; this app is not a safeguarding record system.",
    ],
  },
  {
    id: "v17",
    label: "RESPONDING TO A DISCLOSURE",
    title: "Stay calm. Listen. Connect to help.",
    kind: "protocol",
    intro:
      "If a participant shares a concern, respond with care and follow the host institution’s safeguarding procedure.",
    points: [
      {
        title: "Listen without pressure",
        text: "Thank them. Do not probe or ask them to repeat it publicly.",
      },
      {
        title: "Explain what happens next",
        text: "Do not promise secrecy. Seek appropriately trained assistance.",
      },
      {
        title: "Follow approved procedures",
        text: "Contact the safeguarding lead and use secure reporting routes.",
      },
      {
        title: "Stay within your role",
        text: "Do not investigate independently or confront anyone.",
      },
    ],
    source: "safeguarding",
    explanation:
      "If there is immediate danger, use verified local emergency procedures. A volunteer should not manage an urgent concern alone.",
    minutes: 3,
    notes: [
      "Read this protocol before delivering any workshop.",
      "Do not invite disclosures as an activity. Where safe, explain who will receive the concern and why.",
      "Local reporting duties vary. The host must confirm them and arrange trained cover in advance.",
    ],
  },
  {
    id: "v18",
    label: "LOCAL SUPPORT PATHWAYS",
    title: "Make the next step clear and local.",
    kind: "local",
    intro:
      "Before presenting, confirm the host’s support pathway. Share it verbally and on an approved local handout.",
    points: [
      {
        title: "Host safeguarding lead",
        text: "Confirm who is available today and how participants can find them.",
      },
      {
        title: "Local specialist support",
        text: "Check service scope, eligibility, language and opening hours.",
      },
      {
        title: "Urgent assistance",
        text: "Verify the official local emergency route and host procedure.",
      },
    ],
    explanation:
      "Do not copy unverified contact numbers or imply an affiliation. The resources page includes an offline preparation checklist.",
    minutes: 2,
    notes: [
      "Do not display a contact that has not been checked for this location and audience.",
      "Do not use anonymous quiz tallies to identify anyone needing support. Offer a private route to all participants.",
    ],
  },
  {
    id: "v19",
    label: "KNOWLEDGE & REFLECTION",
    title: "What will you carry forward?",
    kind: "quiz",
    intro:
      "Use five questions to revisit key ideas. Then invite one general reflection or a quiet moment.",
    minutes: 5,
    notes: [
      "Read explanations even when the audience selects the preferred answer.",
      "Frame results as teaching feedback, not a measure of participant safety or a diagnostic assessment.",
    ],
  },
  {
    id: "v20",
    label: "WORKSHOP CLOSING",
    title: "A safer community begins with connection.",
    kind: "closing",
    intro:
      "Keep learning. Protect dignity. Make support easier to find. Thank you for being part of the conversation.",
    explanation:
      "Repeat the verified local support pathway. An optional session summary is available in facilitator tools; it stays on this device unless you choose to export it.",
    minutes: 2,
    notes: [
      "Close with the local support route and remain with the designated safeguarding adult.",
      "Review only aggregate totals. Delete local session data when it is no longer needed.",
    ],
  },
];
