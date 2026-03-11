import { TeamEntry } from "./members";

export const execom24: TeamEntry[] = [
    // Faculty Advisors
    { id: "branch-counselor-24", memberId: "deepa-ak",          role: "Branch Counselor" },
    // Core SB
    { id: "chair-24",            memberId: "nandagopan-g",       role: "Chairperson" },
    { id: "vice-chair-24",       memberId: "geethu-s-santhosh",  role: "Vice Chairperson" },
    { id: "sec-24",              memberId: "alfy-joseph-kunjumon",role: "Secretary" },
    { id: "treasurer-24",        memberId: "sneha-bijee",        role: "Treasurer" },
    { id: "sub-treasurer-24",    memberId: "diya-das-sg",        role: "Sub Treasurer" },
    { id: "link-24",             memberId: "durgadas-dk",        role: "LINK Representative" },
    { id: "mdc-1-24",            memberId: "adithya-as",         role: "Membership Development Coordinator" },
    { id: "mdc-2-24",            memberId: "niyatha-suresh",     role: "Membership Development Coordinator" },
    { id: "tech-head-24",        memberId: "harisankar-prasad",  role: "Tech Head" },
    { id: "ecc-1-24",            memberId: "sreehari-s",         role: "ECC" },
    { id: "ecc-2-24",            memberId: "rizan-amani",        role: "ECC" },
    { id: "webmaster-24",        memberId: "amith-biju",         role: "Webmaster" },
    { id: "content-24",          memberId: "rosh-cheriyan",      role: "Content Lead" },
    { id: "pdc-24",              memberId: "liyana",             role: "PDC Lead" },
    { id: "ac-1-24",             memberId: "basil-joy",          role: "Activity Coordinator" },
    { id: "ac-2-24",             memberId: "archana-r-sethu",    role: "Activity Coordinator" },
    { id: "ac-3-24",             memberId: "eswar-dev-jd",       role: "Activity Coordinator" },
];

export const sbcTeams24: Record<string, TeamEntry[]> = {
    "cs": [
        { id: "cs-chair-24",  memberId: "rishyka-vinod-s",   role: "Chairperson" },
        { id: "cs-vice-24",   memberId: "janani-cm",         role: "Vice Chairperson" },
        { id: "cs-sec-24",    memberId: "yohann-chandy",     role: "Secretary" },
        { id: "cs-ai-24",     memberId: "athul-chacko",      role: "CS AI SIG Coordinator" },
        { id: "cs-wic-24",    memberId: "riya-mary-sajan",   role: "CS WIC" },
    ],
    "ras": [
        { id: "ras-chair-24", memberId: "nandini-a",         role: "Chairperson" },
        { id: "ras-vice-24",  memberId: "arun-a",            role: "Vice Chairperson" },
        { id: "ras-sec-24",   memberId: "devika-ar",         role: "Secretary" },
    ],
    "ias": [
        { id: "ias-chair-24", memberId: "hari-krishna-k",    role: "Chairperson" },
        { id: "ias-vice-24",  memberId: "aqeel-hussain",     role: "Vice Chairperson" },
        { id: "ias-sec-24",   memberId: "babitha-b",         role: "Secretary" },
    ],
    "pes": [
        { id: "pes-chair-24", memberId: "pranav-baburajan",  role: "Chairperson" },
        { id: "pes-vice-24",  memberId: "tariq-nazeer",      role: "Vice Chairperson" },
        { id: "pes-sec-24",   memberId: "fisa-fathima-feroze",role: "Secretary" },
        { id: "pes-wip-24",   memberId: "agraja-ss",         role: "Women in Power Coordinator" },
    ],
    "wie": [
        { id: "wie-chair-24", memberId: "devika-rajeev-p",   role: "Chairperson" },
        { id: "wie-vice-24",  memberId: "bhadra-m-balan",    role: "Vice Chairperson" },
        { id: "wie-sec-24",   memberId: "sonal-santhosh",    role: "Secretary" },
    ],
    "sight": [
        { id: "sight-chair-24",memberId: "sufail-s",         role: "Chairperson" },
        { id: "sight-vice-24", memberId: "sidharth-c",       role: "Vice Chairperson" },
        { id: "sight-sec-24",  memberId: "amal-irfan-n",     role: "Secretary" },
    ],
};
