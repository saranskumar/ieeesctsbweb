import { TeamEntry } from "./members";

export const execom23: TeamEntry[] = [
    // Faculty Advisors
    { id: "branch-counselor-23", memberId: "deepa-ak",          role: "Branch Counselor" },
    // Core SB
    { id: "chair-23",            memberId: "ajith-rt",           role: "Chairperson" },
    { id: "vice-chair-23",       memberId: "aleena-linson",      role: "Vice Chairperson" },
    { id: "sec-23",              memberId: "nandagopan-g",       role: "Secretary" },
    { id: "treasurer-23",        memberId: "vishnupriya",        role: "Treasurer" },
    { id: "sub-treasurer-23",    memberId: "niranjana-sr",       role: "Sub Treasurer" },
    { id: "link-23",             memberId: "sufail-s",           role: "Link Representative" },
    { id: "mdc-1-23",            memberId: "alfy-joseph-kunjumon",role: "MD Coordinator" },
    { id: "mdc-2-23",            memberId: "devika-rajeev-p",   role: "MD Coordinator" },
    { id: "tech-head-23",        memberId: "fahadh-pn",          role: "Tech Lead" },
    { id: "ecc-1-23",            memberId: "nandana-nair",       role: "ECC" },
    { id: "ecc-2-23",            memberId: "afsal-ts",           role: "ECC" },
    { id: "webmaster-23",        memberId: "sreedhar-ks",        role: "Webmaster" },
    { id: "ac-1-23",             memberId: "praful-george",      role: "Activity Coordinator" },
    { id: "ac-2-23",             memberId: "gayathri",           role: "Activity Coordinator" },
];

export const sbcTeams23: Record<string, TeamEntry[]> = {
    "cs": [
        { id: "cs-chair-23",  memberId: "krishna",           role: "CS Chairperson" },
        { id: "cs-vice-23",   memberId: "tapasvi-amruthlal", role: "CS Vice Chairperson" },
        { id: "cs-sec-23",    memberId: "donal-mathew",      role: "CS Secretary" },
        { id: "cs-ai-23",     memberId: "abhinand-m",        role: "AI SIG Coordinator" },
        { id: "cs-wic-23",    memberId: "m-nandini",         role: "Women in Computing" },
    ],
    "ras": [
        { id: "ras-chair-23", memberId: "aswin-lal",         role: "RAS Chairperson" },
        { id: "ras-vice-23",  memberId: "al-imtiyas",        role: "RAS Vice Chairperson" },
        { id: "ras-sec-23",   memberId: "nevin",             role: "RAS Secretary" },
    ],
    "ias": [
        { id: "ias-chair-23", memberId: "vidhu",             role: "IAS Chairperson" },
        { id: "ias-vice-23",  memberId: "abhijith-raj-b",    role: "IAS Vice Chairperson" },
        { id: "ias-sec-23",   memberId: "pranav-baburajan",  role: "IAS Secretary" },
    ],
    "pes": [
        { id: "pes-chair-23", memberId: "sreerag",           role: "PES Chairperson" },
        { id: "pes-sec-23",   memberId: "hari-cs",           role: "PES Secretary" },
    ],
    "wie": [
        { id: "wie-chair-23", memberId: "devabadhra",        role: "WIE Chairperson" },
        { id: "wie-vice-23",  memberId: "priya-piyuse",      role: "WIE Vice Chairperson" },
        { id: "wie-sec-23",   memberId: "helen-sara-alex",   role: "WIE Secretary" },
    ],
    "sight": [
        { id: "sight-chair-23",memberId: "aniz-pn",          role: "SIGHT Chairperson" },
        { id: "sight-vice-23", memberId: "anirudh-s-nair",   role: "SIGHT Vice Chairperson" },
        { id: "sight-sec-23",  memberId: "akshay-sathya",    role: "SIGHT Secretary" },
    ],
};
