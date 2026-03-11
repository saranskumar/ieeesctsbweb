import json

events = [
    {
        'id': 'ensemble-4',
        'title': 'ENSEMBLE 4.0',
        'date': 'August 3, 2025',
        'time': '09:30 AM',
        'mode': 'Offline',
        'venue': 'Seminar Hall, SCTCE',
        'status': 'Completed',
        'description': 'The IEEE student branch of Sree Chitra Thirunal College of Engineering conducted Ensemble 4.0, featuring a grand inauguration, sharing of experiences by faculty advisors, an honoring ceremony, and networking sessions.',
        'image': '/placeholder.svg',
        'order': 13
    },
    {
        'id': 'aigenix-workshop',
        'title': 'DYUTHI 6.0: TRACK AIGENIX',
        'date': 'October 25, 2025',
        'time': '09:30 AM - 03:30 PM',
        'mode': 'Offline',
        'venue': 'Scientific Computing Lab, SCTCE',
        'status': 'Completed',
        'description': 'As part of DHYUTHI 6.0, AIGENIX introduced participants to the basics of agentic AI through a hands-on workshop, focusing on building simple autonomous AI systems that learn, adapt, and act.',
        'image': '/placeholder.svg',
        'chapterId': 'cs',
        'order': 14
    },
    {
        'id': 'incepta-track3',
        'title': 'INCEPTA : TRACK #3 COMPETITION',
        'date': 'October 26, 2025',
        'time': 'Full Day',
        'mode': 'Offline',
        'venue': 'CAD Lab',
        'status': 'Completed',
        'description': 'A Robo Soccer competition conducted as a follow-up event to the INCEPTA workshop organized by IEEE IAS and PES. It aimed to deliver a structured, hands-on technical learning experience.',
        'image': '/placeholder.svg',
        'chapterId': 'ias',
        'order': 15
    },
    {
        'id': 'reboot-ideathon',
        'title': 'ReBOOT - Ideathon',
        'date': 'March 14, 2025',
        'time': '3-Day Event',
        'mode': 'Online',
        'status': 'Completed',
        'description': 'An online Ideathon organized by IEEE IAS SCT SB focusing on disaster resilience and climate tech solutions for Kerala, encouraging tech-driven ideas for flood management and climate impact mitigation.',
        'image': '/placeholder.svg',
        'chapterId': 'ias',
        'order': 16
    },
    {
        'id': 'ai-gender-bias',
        'title': 'AI & Gender Bias - Panel Discussion',
        'date': 'March 12, 2025',
        'time': '7:30 PM - 8:30 PM',
        'mode': 'Online',
        'status': 'Completed',
        'description': 'An expert panel discussion on the topic of AI and gender bias, discussing how AI mirrors everyday gender biases and how to prevent them.',
        'image': '/placeholder.svg',
        'chapterId': 'comsoc',
        'order': 17
    },
    {
        'id': 'build-your-bot',
        'title': 'Build-Your-Bot Chatbot Workshop',
        'date': 'April 2, 2025',
        'time': '4:30 PM - 5:30 PM',
        'mode': 'Offline',
        'venue': 'Room No SJ 5',
        'status': 'Completed',
        'description': 'A two-day hands-on workshop led by industry interns to introduce the fundamentals of chatbot development and conversational AI.',
        'image': '/placeholder.svg',
        'chapterId': 'cs',
        'order': 18
    },
    {
        'id': 'code-sprint',
        'title': 'CODE SPRINT',
        'date': 'November 10, 2025',
        'time': '7:30 PM - 8:30 PM',
        'mode': 'Online',
        'status': 'Completed',
        'description': 'A dedicated session highlighting the importance of competitive programming, organized in collaboration with HackerRank.',
        'image': '/placeholder.svg',
        'chapterId': 'cs',
        'order': 19
    },
    {
        'id': 'codequeen',
        'title': 'CODEQUEEN - Quiz Competition',
        'date': 'March 11, 2025',
        'time': '12:40 PM - 1:00 PM',
        'mode': 'Online',
        'status': 'Completed',
        'description': 'An exhilarating online quiz competition tailored for first and second-year female students to sharpen their programming and problem-solving skills.',
        'image': '/placeholder.svg',
        'chapterId': 'cs',
        'order': 20
    },
    {
        'id': 'ink-her-nation',
        'title': 'INK-HER-NATION: AI Doodle Generation',
        'date': 'June 14, 2025',
        'time': '1-Week Event',
        'mode': 'Online',
        'status': 'Completed',
        'description': 'A vibrant AI doodle generation competition celebrating digital artistry and social advocacy under the theme Digital Utopia for Women.',
        'image': '/placeholder.svg',
        'chapterId': 'cs',
        'order': 21
    },
    {
        'id': 'skill-stack-1',
        'title': 'SKILL STACK #1: FULL STACK DEVELOPMENT',
        'date': 'July 22, 2025',
        'time': '10-Day Event',
        'mode': 'Hybrid',
        'status': 'Completed',
        'description': 'A 10-day intensive boot camp on full-stack web development focusing on practical, project-based learning through modern web development practices.',
        'image': '/placeholder.svg',
        'chapterId': 'cs',
        'order': 22
    },
    {
        'id': 'techspirations',
        'title': 'TECHSPIRATIONS - Writeup Competition',
        'date': 'July 9, 2025',
        'time': 'Online Submission',
        'mode': 'Online',
        'status': 'Completed',
        'description': 'An online write-up competition challenging students to explore the theme Life in 2100: A Future Reimagined for Women.',
        'image': '/placeholder.svg',
        'chapterId': 'cs',
        'order': 23
    },
    {
        'id': 'xcelerate',
        'title': 'XCELERATE',
        'date': 'September 9, 2025',
        'time': '20-Day Bootcamp',
        'mode': 'Online',
        'status': 'Completed',
        'description': 'A 20-day journey toward coding mastery serving as a definitive launchpad for students preparing for the IEEEXtreme programming marathon.',
        'image': '/placeholder.svg',
        'chapterId': 'cs',
        'order': 24
    },
    {
        'id': 'navigating-internships',
        'title': 'Navigating Internships',
        'date': 'April 21, 2025',
        'time': '8:00 PM - 9:00 PM',
        'mode': 'Online',
        'status': 'Completed',
        'description': 'A panel discussion to guide students through the process of finding and succeeding in internships across tech and research domains.',
        'image': '/placeholder.svg',
        'chapterId': 'cs',
        'order': 25
    },
    {
        'id': 'talentified-1',
        'title': 'TALENTIFIED 1.0',
        'date': 'August 26, 2025',
        'time': '4:30 PM - 6:00 PM',
        'mode': 'Offline',
        'venue': 'ASAP Hall',
        'status': 'Completed',
        'description': 'An event designed to foster collaboration and idea sharing among IEEE CS members through teamwork and presentations.',
        'image': '/placeholder.svg',
        'chapterId': 'cs',
        'order': 26
    },
    {
        'id': 'neurolink',
        'title': 'NEUROLINK - Talk Session',
        'date': 'June 27, 2025',
        'time': '8:00 PM - 9:30 PM',
        'mode': 'Online',
        'status': 'Completed',
        'description': 'An insightful talk session focused on Brain-Computer Interface (BCI) technology and its transformative role in the medical sector.',
        'image': '/placeholder.svg',
        'chapterId': 'ias',
        'order': 27
    }
]

with open("lib/data/events.ts", "r", encoding="utf-8") as f:
    text = f.read()

events_ts = ""
for ev in events:
    events_ts += "    {\n"
    for k, v in ev.items():
        if type(v) == int:
            events_ts += f'        {k}: {v},\n'
        else:
            events_ts += f'        {k}: "{v}",\n'
    events_ts += "    },\n"

if "];\n" in text:
    text = text.replace("];\n", ",\n" + events_ts + "];\n")
elif "];" in text:
    text = text.replace("];", ",\n" + events_ts + "];")

with open("lib/data/events.ts", "w", encoding="utf-8") as f:
    f.write(text)

print("Events appended successfully.")
