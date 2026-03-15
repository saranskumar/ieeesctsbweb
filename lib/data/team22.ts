import { TeamEntry } from "./members";

export const execom22: TeamEntry[] = [
    // Faculty Advisors
    { id: "branch-counselor-22", memberId: "asha-s",             role: "Branch Counselor" },
    // Core SB
    { id: "chair-22",            memberId: "govind-s-nath",       role: "Chairperson" },
    { id: "vice-chair-22",       memberId: "akshara-bruno",       role: "Vice Chairperson" },
    { id: "sec-22",              memberId: "jyothika-n",          role: "Secretary" },
    { id: "treasurer-22",        memberId: "salwa-firoz-khan",    role: "Treasurer" },
    { id: "sub-treasurer-22",    memberId: "janaki-devi-r",       role: "Sub Treasurer" },
    { id: "link-22",             memberId: "arundhathi-krishna",  role: "Link Representative" },
    { id: "mdc-1-22",            memberId: "ganga-mk",            role: "MD Coordinator" },
    { id: "mdc-2-22",            memberId: "amal-nath-m",         role: "MD Coordinator" },
    { id: "tech-head-22",        memberId: "sharron-mariam-varghese", role: "Tech Lead" },
    { id: "ecc-1-22",            memberId: "ns-hariram",          role: "ECC" },
    { id: "webmaster-22",        memberId: "benjamin-rojoy",      role: "Webmaster" },
    { id: "joint-webmaster-22",  memberId: "kalidas-vb",          role: "Joint Webmaster" },
    { id: "ac-1-22",             memberId: "athul-jayakumar",     role: "Activity Coordinator" },
    { id: "ac-2-22",             memberId: "esther-b-susan",      role: "Activity Coordinator" },
    { id: "ac-3-22",             memberId: "nithin-p",            role: "Activity Coordinator" },
];

export const sbcTeams22: Record<string, TeamEntry[]> = {
    "cs": [
        { id: "cs-chair-22",  memberId: "saranya-krishnan-m",  role: "CS Chairperson" },
        { id: "cs-sec-22",    memberId: "anoop-santhosh",       role: "CS Secretary" },
        { id: "cs-wic-22",    memberId: "jayalakshmi-jayakumar",role: "Women in Computing" },
    ],
    "ras": [
        { id: "ras-chair-22", memberId: "sarathkumar-ks",      role: "RAS Chairperson" },
        { id: "ras-sec-22",   memberId: "devika-ar",           role: "RAS Secretary" },
    ],
    "ias": [
        { id: "ias-chair-22", memberId: "akhil-manikandan",    role: "IAS Chairperson" },
        { id: "ias-sec-22",   memberId: "emey-teresa-abraham", role: "IAS Secretary" },
    ],
    "pes": [
        { id: "pes-chair-22", memberId: "nanda-kishore-p",     role: "PES Chairperson" },
        { id: "pes-sec-22",   memberId: "gayathri-s-warrier",  role: "PES Secretary" },
    ],
    "wie": [
        { id: "wie-chair-22", memberId: "soni-p",              role: "WIE Chairperson" },
        { id: "wie-sec-22",   memberId: "aparna-sl",           role: "WIE Secretary" },
    ],
    "sight": [
        { id: "sight-chair-22",memberId: "niranjan-k-warrier", role: "SIGHT Chairperson" },
        { id: "sight-sec-22",  memberId: "gowri-nandana-ar",   role: "SIGHT Secretary" },
    ],
};
