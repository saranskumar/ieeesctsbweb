import { TeamEntry } from "./members";

export const execom25: TeamEntry[] = [
    // Faculty Advisors
    { id: "branch-counselor-25", memberId: "deepa-ak",              role: "Branch Counselor (PES, SIGHT)" },
    { id: "ras-advisor-25",      memberId: "sandhya-l",             role: "RAS Advisor" },
    { id: "wie-comsoc-advisor-25",memberId: "lakshmi-vs",           role: "WIE & ComSoc Advisor" },
    { id: "cs-advisor-25",       memberId: "rejimol-robinson",      role: "CS Advisor" },
    { id: "ias-advisor-25",      memberId: "sajith-sethu",          role: "IAS Advisor" },
    { id: "embs-advisor-25",     memberId: "baji-k",                role: "EMBS Advisor" },
    // Core SB
    { id: "chair-25",            memberId: "alfy-joseph-kunjumon",  role: "Chairperson" },
    { id: "vice-chair-25",       memberId: "sneha-bijee",           role: "Vice Chairperson" },
    { id: "sec-25",              memberId: "niyatha-suresh",        role: "Secretary" },
    { id: "link-25",             memberId: "janani-cm",             role: "Link Representative" },
    { id: "treasurer-25",        memberId: "revathy-ps",            role: "Treasurer" },
    { id: "sub-treasurer-25",    memberId: "diya-das-sg",           role: "Sub Treasurer" },
    { id: "webmaster-25",        memberId: "dona-sebastian",        role: "Webmaster" },
    { id: "ac-25",               memberId: "aadhithya-ag",          role: "Activity Coordinator" },
    // Extended
    { id: "tech-lead-25",        memberId: "ciril-jose",            role: "Tech Lead" },
    { id: "ecc-1-25",            memberId: "abhijith-pv",           role: "ECC" },
    { id: "ecc-2-25",            memberId: "harisankar-prasad",     role: "ECC" },
    { id: "pdc-25",              memberId: "anaswara-paul",         role: "PDC Lead" },
    { id: "content-25",          memberId: "adithya-cj",            role: "Content Lead" },
    { id: "mdc-1-25",            memberId: "vishnudev-r",           role: "MD Coordinator" },
    { id: "mdc-2-25",            memberId: "ron",           role: "MD Coordinator" },
];

export const sbcTeams25: Record<string, TeamEntry[]> = {
    "cs": [
        { id: "cs-chair-25",  memberId: "yohann-chandy",    role: "Chairperson" },
        { id: "cs-vice-25",   memberId: "athul-chacko",     role: "Vice Chairperson" },
        { id: "cs-sec-25",    memberId: "chinmayi-bs",      role: "Secretary" },
        { id: "cs-wic-25",    memberId: "nandana-rajesh",   role: "Women in Computing" },
        { id: "cs-ai-25",     memberId: "saran-s-kumar",    role: "AI SIG Coordinator" },
    ],
    "embs": [
        { id: "embs-chair-25",memberId: "riya-mary-sajan",  role: "Chairperson" },
        { id: "embs-vice-25", memberId: "adithya-as",       role: "Vice Chairperson" },
        { id: "embs-sec-25",  memberId: "sabari-nath",      role: "Secretary" },
    ],
    "ras": [
        { id: "ras-chair-25", memberId: "arun-aravindakshan",role: "Chairperson" },
        { id: "ras-vice-25",  memberId: "durgadas-dk",      role: "Vice Chairperson" },
        { id: "ras-sec-25",   memberId: "fida-fathima-shine",role: "Secretary" },
    ],
    "ias": [
        { id: "ias-chair-25", memberId: "aqeel-hussain",    role: "Chairperson" },
        { id: "ias-vice-25",  memberId: "babitha-b",        role: "Vice Chairperson" },
        { id: "ias-sec-25",   memberId: "parthasarathy-a",  role: "Secretary" },
    ],
    "pes": [
        { id: "pes-chair-25", memberId: "fisa-fathima-feroze",role: "Chairperson" },
        { id: "pes-vice-25",  memberId: "devanarayan-s",    role: "Vice Chairperson" },
        { id: "pes-sec-25",   memberId: "abhinand-s-nath",  role: "Secretary" },
        { id: "pes-wip-25",   memberId: "archana-r-sethu",  role: "Women In Power" },
    ],
    "comsoc": [
        { id: "comsoc-chair-25",memberId: "meghna-j-pai",   role: "Chairperson" },
        { id: "comsoc-vice-25", memberId: "aakash-anand",   role: "Vice Chairperson" },
        { id: "comsoc-sec-25",  memberId: "mahreen-zuraiq", role: "Secretary" },
        { id: "comsoc-wice-25", memberId: "fathima-meera",  role: "WICE" },
    ],
    "sight": [
        { id: "sight-chair-25", memberId: "rizan-amani",    role: "SIGHT Chair" },
        { id: "sight-vice-25",  memberId: "eswar-dev-jd",   role: "SIGHT Vice-Chair" },
        { id: "sight-sec-25",   memberId: "shahnas-m",      role: "SIGHT Secretary" },
        { id: "sight-project-25",memberId: "basil-joy",     role: "Project Head" },
    ],
    "wie": [
        { id: "wie-chair-25",   memberId: "agraja-ss",      role: "WIE Chair" },
        { id: "wie-vice-25",    memberId: "sonal-santhosh", role: "WIE Vice-Chair" },
        { id: "wie-sec-25",     memberId: "bhagavathy-an",  role: "Secretary" },
    ],
};
