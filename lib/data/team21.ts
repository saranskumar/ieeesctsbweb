import { TeamEntry } from "./members";

export const execom21: TeamEntry[] = [
    // Faculty Advisors
    { id: "branch-counselor-21", memberId: "asha-s",              role: "Branch Counselor" },
    // Core SB
    { id: "chair-21",            memberId: "nikitha-susan-jose",   role: "Chairperson" },
    { id: "vice-chair-21",       memberId: "abhinav-ms",           role: "Vice Chairperson" },
    { id: "sec-21",              memberId: "govind-s-nath",        role: "Secretary" },
    { id: "joint-sec-21",        memberId: "pooja-ps",             role: "Joint Secretary" },
    { id: "treasurer-21",        memberId: "sivapriya-b",          role: "Treasurer" },
    { id: "sub-treasurer-21",    memberId: "salwa-firoz-cm",       role: "Sub Treasurer" },
    { id: "link-21",             memberId: "ananda-narayan",       role: "LINK Representative" },
    { id: "mdc-1-21",            memberId: "soni-p",               role: "Membership Development Coordinator" },
    { id: "ac-1-21",             memberId: "sharika-menon-r",      role: "Activity Coordinator" },
    { id: "ac-2-21",             memberId: "abila-antony-fernandez",role: "Activity Coordinator" },
    { id: "ac-3-21",             memberId: "vyshnavi-jayakumar-k", role: "Activity Coordinator" },
    { id: "ac-4-21",             memberId: "neelima-anilkumar",    role: "Activity Coordinator" },
];

export const sbcTeams21: Record<string, TeamEntry[]> = {
    "cs": [
        { id: "cs-chair-21",  memberId: "arsha-rs",          role: "Chairperson" },
        { id: "cs-sec-21",    memberId: "saranya-krishnan-m", role: "Secretary" },
    ],
    "ras": [
        { id: "ras-chair-21", memberId: "midhun-bm",          role: "Chairperson" },
        { id: "ras-sec-21",   memberId: "athul-jayakumar",    role: "Secretary" },
    ],
    "ias": [
        { id: "ias-chair-21", memberId: "abhijit-m",          role: "Chairperson" },
        { id: "ias-sec-21",   memberId: "akhil-manikandan",   role: "Secretary" },
    ],
    "pes": [
        { id: "pes-chair-21", memberId: "adith-gm",           role: "Chairperson" },
        { id: "pes-sec-21",   memberId: "nanda-kishore-p",    role: "Secretary" },
        { id: "pes-wip-21",   memberId: "anisha-khalam",      role: "Women In Power" },
    ],
    "wie": [
        { id: "wie-chair-21", memberId: "kaveri-ts",          role: "Chairperson" },
        { id: "wie-sec-21",   memberId: "akshara-bruno",      role: "Secretary" },
    ],
    "sight": [
        { id: "sight-chair-21",memberId: "neha-merin-jacob",  role: "Chairperson" },
        { id: "sight-sec-21",  memberId: "esther-b-susan",    role: "Secretary" },
    ],
};
