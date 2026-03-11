/**
 * =====================================================================
 * MEMBER REGISTRY  —  Frontend Database
 * =====================================================================
 * Single source of truth for every person's profile.
 * Key = canonical permanent ID (kebab-case full name).
 *
 * Team year files (team20 → team25) store ONLY:
 *   { id: "pes-chair-25", memberId: "fisa-fathima-feroze", role: "Chairperson" }
 *
 * Call getMember(memberId) anywhere to get the full profile.
 * Update details here → reflects everywhere automatically.
 * =====================================================================
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MemberProfile {
    id: string;
    name: string;
    image: string;
    department?: string;
    batch?: string;
    // Socials
    linkedin?: string;
    github?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
    email?: string;
    // Profile
    bio?: string;
    awards?: string[];
}

/**
 * A year-specific team slot.
 * Stores ONLY the position — all personal details come from getMember(memberId).
 */
export interface TeamEntry {
    /** Year-specific routing ID, e.g. "pes-chair-25" */
    id: string;
    /** Points to MemberProfile.id in this file */
    memberId: string;
    role: string;
}

// ---------------------------------------------------------------------------
// Registry helpers
// ---------------------------------------------------------------------------

/** Look up a member's full profile by their canonical ID. */
export function getMember(id: string): MemberProfile | undefined {
    return members[id];
}

/**
 * Resolve a TeamEntry into a full profile merged with the slot's role.
 * Falls back to a placeholder if the memberId is not found.
 */
export function resolveEntry(entry: TeamEntry): MemberProfile & { role: string; slotId: string } {
    const profile = getMember(entry.memberId) ?? {
        id: entry.memberId,
        name: entry.memberId,
        image: "/person.svg",
    };
    return { ...profile, role: entry.role, slotId: entry.id };
}

// ---------------------------------------------------------------------------
// Member Registry
// ---------------------------------------------------------------------------

export const members: Record<string, MemberProfile> = {

    // ── Faculty ─────────────────────────────────────────────────────────────

    "deepa-ak": {
        id: "deepa-ak",
        name: "Deepa A K",
        image: "/person.svg",
    },
    "sandhya-l": {
        id: "sandhya-l",
        name: "Sandhya L",
        image: "/person.svg",
    },
    "lakshmi-vs": {
        id: "lakshmi-vs",
        name: "Dr. Lakshmi V S",
        image: "/person.svg",
    },
    "rejimol-robinson": {
        id: "rejimol-robinson",
        name: "Rejimol Robinson R R",
        image: "/person.svg",
    },
    "sajith-sethu": {
        id: "sajith-sethu",
        name: "Sajith Sethu",
        image: "/person.svg",
    },
    "baji-k": {
        id: "baji-k",
        name: "Baji K",
        image: "/person.svg",
    },
    "asha-s": {
        id: "asha-s",
        name: "Mrs Asha S",
        image: "/person.svg",
    },
    "bobby-philp": {
        id: "bobby-philp",
        name: "Dr. Bobby Philp",
        image: "/person.svg",
    },
    "soniya-b": {
        id: "soniya-b",
        name: "Dr. Soniya B",
        image: "/person.svg",
    },
    "kutty-maalu-vk": {
        id: "kutty-maalu-vk",
        name: "Mrs. Kutty Maalu V K",
        image: "/person.svg",
    },
    "chithrakumar-vk": {
        id: "chithrakumar-vk",
        name: "Dr. Chithrakumar V K",
        image: "/person.svg",
    },

    // ── 2025 ────────────────────────────────────────────────────────────────

    "alfy-joseph-kunjumon": {
        id: "alfy-joseph-kunjumon",
        name: "Alfy Joseph Kunjumon",
        image: "/members/alfy-joseph-kunjumon.jpeg",
        batch: "2026",
    },
    "sneha-bijee": {
        id: "sneha-bijee",
        name: "Sneha Bijee",
        image: "/members/sneha-bijee.jpeg",
        batch: "2026",
    },
    "niyatha-suresh": {
        id: "niyatha-suresh",
        name: "Niyatha Suresh",
        image: "/members/niyatha-suresh.jpeg",
        batch: "2026",
    },
    "janani-cm": {
        id: "janani-cm",
        name: "Janani C M",
        image: "/members/janani-cm.jpg",
        batch: "2026",
    },
    "revathy-ps": {
        id: "revathy-ps",
        name: "Revathy P S",
        image: "/members/revathy-ps.jpg",
        batch: "2026",
    },
    "diya-das-sg": {
        id: "diya-das-sg",
        name: "Diya Das S G",
        image: "/members/diya-das-sg.jpg",
        batch: "2026",
    },
    "dona-sebastian": {
        id: "dona-sebastian",
        name: "Dona Sebastian",
        image: "/members/dona-sebastian.jpg",
        batch: "2026",
    },
    "aadhithya-ag": {
        id: "aadhithya-ag",
        name: "Aadhithya A G",
        image: "/members/aadhithya-ag.jpg",
        batch: "2026",
    },
    "ciril-jose": {
        id: "ciril-jose",
        name: "Ciril Jose",
        image: "/members/ciril-jose.jpg",
        batch: "2026",
    },
    "abhijith-pv": {
        id: "abhijith-pv",
        name: "Abhijith P V",
        image: "/members/abhijith-pv.jpg",
        batch: "2026",
    },
    "harisankar-prasad": {
        id: "harisankar-prasad",
        name: "Harisankar Prasad",
        image: "/members/harisankar-prasad.jpeg",
        batch: "2026",
    },
    "anaswara-paul": {
        id: "anaswara-paul",
        name: "Anaswara Paul",
        image: "/members/anaswara-paul.png",
        batch: "2026",
    },
    "adithya-cj": {
        id: "adithya-cj",
        name: "Adithya C J",
        image: "/members/adithya-cj.jpg",
        batch: "2026",
    },
    "vishnudev-r": {
        id: "vishnudev-r",
        name: "Vishnudev R",
        image: "/members/vishnudev-r.jpeg",
        batch: "2026",
    },
    "ron": {
        id: "ron",
        name: "Ron",
        image: "/members/ron.jpg",
        batch: "2026",
    },
    "yohann-chandy": {
        id: "yohann-chandy",
        name: "Yohann Chandy",
        image: "/members/yohann-chandy.jpg",
        batch: "2026",
    },
    "athul-chacko": {
        id: "athul-chacko",
        name: "Athul Chacko",
        image: "/members/athul-chacko.jpeg",
        batch: "2026",
    },
    "chinmayi-bs": {
        id: "chinmayi-bs",
        name: "Chinmayi B S",
        image: "/members/chinmayi-bs.jpg",
        batch: "2027",
    },
    "nandana-rajesh": {
        id: "nandana-rajesh",
        name: "Nandana Rajesh",
        image: "/members/nandana-rajesh.jpg",
        batch: "2027",
    },
    "saran-s-kumar": {
        id: "saran-s-kumar",
        name: "Saran S Kumar",
        image: "/members/saran-s-kumar.jpg",
        batch: "2027",
    },
    "riya-mary-sajan": {
        id: "riya-mary-sajan",
        name: "Riya Mary Sajan",
        image: "/members/riya-mary-sajan.jpg",
        batch: "2026",
    },
    "adithya-as": {
        id: "adithya-as",
        name: "Adithya A S",
        image: "/members/adithya-as.jpg",
        batch: "2026",
    },
    "sabari-nath": {
        id: "sabari-nath",
        name: "Sabari Nath",
        image: "/members/sabari-nath.png",
        batch: "2027",
    },
    "arun-aravindakshan": {
        id: "arun-aravindakshan",
        name: "Arun Aravindakshan",
        image: "/members/arun-aravindakshan.jpg",
        batch: "2026",
    },
    "durgadas-dk": {
        id: "durgadas-dk",
        name: "Durgadas D K",
        image: "/members/durgadas-dk.jpg",
        batch: "2026",
    },
    "fida-fathima-shine": {
        id: "fida-fathima-shine",
        name: "Fida Fathima Shine",
        image: "/members/fida-fathima-shine.jpg",
        batch: "2027",
    },
    "aqeel-hussain": {
        id: "aqeel-hussain",
        name: "Aqeel Hussain",
        image: "/members/aqeel-hussain.jpeg",
        batch: "2026",
    },
    "babitha-b": {
        id: "babitha-b",
        name: "Babitha B",
        image: "/members/babitha-b.jpg",
        batch: "2027",
    },
    "parthasarathy-a": {
        id: "parthasarathy-a",
        name: "Parthasarathy A",
        image: "/members/parthasarathy-a.jpeg",
        batch: "2027",
    },
    "fisa-fathima-feroze": {
        id: "fisa-fathima-feroze",
        name: "Fisa Fathima Feroze",
        image: "/members/fisa-fathima-feroze.jpg",
        batch: "2026",
    },
    "devanarayan-s": {
        id: "devanarayan-s",
        name: "Devanarayan S",
        image: "/members/devanarayan-s.jpeg",
        batch: "2026",
    },
    "abhinand-s-nath": {
        id: "abhinand-s-nath",
        name: "Abhinand S Nath",
        image: "/members/abhinand-s-nath.jpg",
        batch: "2027",
    },
    "archana-r-sethu": {
        id: "archana-r-sethu",
        name: "Archana R Sethu",
        image: "/members/archana-r-sethu.png",
        batch: "2026",
    },
    "meghna-j-pai": {
        id: "meghna-j-pai",
        name: "Meghna J Pai",
        image: "/members/meghna-j-pai.jpeg",
        batch: "2026",
    },
    "aakash-anand": {
        id: "aakash-anand",
        name: "Aakash Anand",
        image: "/members/aakash-anand.png",
        batch: "2027",
    },
    "mahreen-zuraiq": {
        id: "mahreen-zuraiq",
        name: "Mahreen Zuraiq",
        image: "/members/mahreen-zuraiq.jpg",
        batch: "2027",
    },
    "fathima-meera": {
        id: "fathima-meera",
        name: "Fathima Meera",
        image: "/members/fathima-meera.jpg",
        batch: "2027",
    },
    "rizan-amani": {
        id: "rizan-amani",
        name: "Rizan Amani",
        image: "/members/rizan-amani.jpg",
        batch: "2026",
    },
    "eswar-dev-jd": {
        id: "eswar-dev-jd",
        name: "Eswar Dev J D",
        image: "/members/eswar-dev-jd.jpeg",
        batch: "2026",
    },
    "shahnas-m": {
        id: "shahnas-m",
        name: "Shahnas M",
        image: "/members/shahnas-m.jpeg",
        batch: "2027",
    },
    "basil-joy": {
        id: "basil-joy",
        name: "Basil Joy",
        image: "/members/basil-joy.jpg",
        batch: "2026",
    },
    "agraja-ss": {
        id: "agraja-ss",
        name: "Agraja S S",
        image: "/members/agraja-ss.jpg",
        batch: "2026",
    },
    "sonal-santhosh": {
        id: "sonal-santhosh",
        name: "Sonal Santhosh",
        image: "/members/sonal-santhosh.jpg",
        batch: "2026",
    },
    "bhagavathy-an": {
        id: "bhagavathy-an",
        name: "Bhagavathy A N",
        image: "/members/bhagavathy-an.jpg",
        batch: "2027",
    },

    // ── 2024 ────────────────────────────────────────────────────────────────

    "nandagopan-g": {
        id: "nandagopan-g",
        name: "Nandagopan G",
        image: "/person.svg",
        batch: "2025",
    },
    "geethu-s-santhosh": {
        id: "geethu-s-santhosh",
        name: "Geethu S Santhosh",
        image: "/person.svg",
        batch: "2025",
    },
    "amith-biju": {
        id: "amith-biju",
        name: "Amith Biju",
        image: "/person.svg",
        batch: "2025",
    },
    "rosh-cheriyan": {
        id: "rosh-cheriyan",
        name: "Rosh Cheriyan",
        image: "/person.svg",
        batch: "2025",
    },
    "liyana": {
        id: "liyana",
        name: "Liyana",
        image: "/person.svg",
        batch: "2025",
    },
    "sreehari-s": {
        id: "sreehari-s",
        name: "Sreehari S",
        image: "/person.svg",
        batch: "2025",
    },
    "rishyka-vinod-s": {
        id: "rishyka-vinod-s",
        name: "Rishyka Vinod S",
        image: "/person.svg",
        batch: "2025",
    },
    "nandini-a": {
        id: "nandini-a",
        name: "Nandini A",
        image: "/person.svg",
        batch: "2025",
    },
    "hari-krishna-k": {
        id: "hari-krishna-k",
        name: "Hari Krishna K",
        image: "/person.svg",
        batch: "2025",
    },
    "pranav-baburajan": {
        id: "pranav-baburajan",
        name: "Pranav Baburajan",
        image: "/person.svg",
        batch: "2025",
    },
    "tariq-nazeer": {
        id: "tariq-nazeer",
        name: "Tariq Nazeer",
        image: "/person.svg",
        batch: "2025",
    },
    "devika-rajeev-p": {
        id: "devika-rajeev-p",
        name: "Devika Rajeev P",
        image: "/person.svg",
        batch: "2025",
    },
    "bhadra-m-balan": {
        id: "bhadra-m-balan",
        name: "Bhadra M Balan",
        image: "/person.svg",
        batch: "2025",
    },
    "sufail-s": {
        id: "sufail-s",
        name: "Sufail S",
        image: "/person.svg",
        batch: "2025",
    },
    "sidharth-c": {
        id: "sidharth-c",
        name: "Sidharth C",
        image: "/person.svg",
        batch: "2025",
    },
    "amal-irfan-n": {
        id: "amal-irfan-n",
        name: "Amal Irfan N",
        image: "/person.svg",
        batch: "2025",
    },
    "devika-ar": {
        id: "devika-ar",
        name: "Devika A R",
        image: "/person.svg",
        batch: "2025",
    },
    "arun-a": {
        id: "arun-a",
        name: "Arun A",
        image: "/person.svg",
        batch: "2025",
    },

    // ── 2023 ────────────────────────────────────────────────────────────────

    "ajith-rt": {
        id: "ajith-rt",
        name: "Ajith RT",
        image: "/person.svg",
        batch: "2024",
    },
    "aleena-linson": {
        id: "aleena-linson",
        name: "Aleena Linson",
        image: "/person.svg",
        batch: "2024",
    },
    "vishnupriya": {
        id: "vishnupriya",
        name: "VishnuPriya",
        image: "/person.svg",
        batch: "2024",
    },
    "niranjana-sr": {
        id: "niranjana-sr",
        name: "Niranjana SR",
        image: "/person.svg",
        batch: "2024",
    },
    "fahadh-pn": {
        id: "fahadh-pn",
        name: "Fahadh P N",
        image: "/person.svg",
        batch: "2024",
    },
    "nandana-nair": {
        id: "nandana-nair",
        name: "Nandana Nair",
        image: "/person.svg",
        batch: "2024",
    },
    "afsal-ts": {
        id: "afsal-ts",
        name: "Afsal TS",
        image: "/person.svg",
        batch: "2024",
    },
    "sreedhar-ks": {
        id: "sreedhar-ks",
        name: "Sreedhar K S",
        image: "/person.svg",
        batch: "2024",
    },
    "praful-george": {
        id: "praful-george",
        name: "Praful George",
        image: "/person.svg",
        batch: "2024",
    },
    "gayathri": {
        id: "gayathri",
        name: "Gayathri",
        image: "/person.svg",
        batch: "2024",
    },
    "krishna": {
        id: "krishna",
        name: "Krishna",
        image: "/person.svg",
        batch: "2024",
    },
    "tapasvi-amruthlal": {
        id: "tapasvi-amruthlal",
        name: "Tapasvi Amruthlal",
        image: "/person.svg",
        batch: "2024",
    },
    "donal-mathew": {
        id: "donal-mathew",
        name: "Donal Mathew",
        image: "/person.svg",
        batch: "2024",
    },
    "abhinand-m": {
        id: "abhinand-m",
        name: "Abhinand M",
        image: "/person.svg",
        batch: "2024",
    },
    "m-nandini": {
        id: "m-nandini",
        name: "M Nandini",
        image: "/person.svg",
        batch: "2024",
    },
    "aswin-lal": {
        id: "aswin-lal",
        name: "Aswin Lal",
        image: "/person.svg",
        batch: "2024",
    },
    "al-imtiyas": {
        id: "al-imtiyas",
        name: "Al Imtiyas",
        image: "/person.svg",
        batch: "2024",
    },
    "nevin": {
        id: "nevin",
        name: "Nevin",
        image: "/person.svg",
        batch: "2024",
    },
    "vidhu": {
        id: "vidhu",
        name: "Vidhu",
        image: "/person.svg",
        batch: "2024",
    },
    "abhijith-raj-b": {
        id: "abhijith-raj-b",
        name: "Abhijith Raj B",
        image: "/person.svg",
        batch: "2024",
    },
    "sreerag": {
        id: "sreerag",
        name: "Sreerag",
        image: "/person.svg",
        batch: "2024",
    },
    "hari-cs": {
        id: "hari-cs",
        name: "Hari",
        image: "/person.svg",
        batch: "2024",
    },
    "devabadhra": {
        id: "devabadhra",
        name: "DevaBadhra",
        image: "/person.svg",
        batch: "2024",
    },
    "priya-piyuse": {
        id: "priya-piyuse",
        name: "Priya Piyuse",
        image: "/person.svg",
        batch: "2024",
    },
    "helen-sara-alex": {
        id: "helen-sara-alex",
        name: "Helen Sara Alex",
        image: "/person.svg",
        batch: "2024",
    },
    "aniz-pn": {
        id: "aniz-pn",
        name: "Aniz P N",
        image: "/person.svg",
        batch: "2024",
    },
    "anirudh-s-nair": {
        id: "anirudh-s-nair",
        name: "Anirudh S Nair",
        image: "/person.svg",
        batch: "2024",
    },
    "akshay-sathya": {
        id: "akshay-sathya",
        name: "Akshay Sathya",
        image: "/person.svg",
        batch: "2024",
    },

    // ── 2022 ────────────────────────────────────────────────────────────────

    "govind-s-nath": {
        id: "govind-s-nath",
        name: "Govind S Nath",
        image: "/person.svg",
        batch: "2023",
    },
    "akshara-bruno": {
        id: "akshara-bruno",
        name: "Akshara Bruno",
        image: "/person.svg",
        batch: "2023",
    },
    "jyothika-n": {
        id: "jyothika-n",
        name: "Jyothika N",
        image: "/person.svg",
        batch: "2023",
    },
    "salwa-firoz-khan": {
        id: "salwa-firoz-khan",
        name: "Salwa Firoz Khan",
        image: "/person.svg",
        batch: "2023",
    },
    "janaki-devi-r": {
        id: "janaki-devi-r",
        name: "Janaki Devi R",
        image: "/person.svg",
        batch: "2023",
    },
    "arundhathi-krishna": {
        id: "arundhathi-krishna",
        name: "Arundhathi Krishna",
        image: "/person.svg",
        batch: "2023",
    },
    "ganga-mk": {
        id: "ganga-mk",
        name: "Ganga M K",
        image: "/person.svg",
        batch: "2023",
    },
    "amal-nath-m": {
        id: "amal-nath-m",
        name: "Amal Nath M",
        image: "/person.svg",
        batch: "2023",
    },
    "sharron-mariam-varghese": {
        id: "sharron-mariam-varghese",
        name: "Sharron Mariam Varghese",
        image: "/person.svg",
        batch: "2023",
    },
    "ns-hariram": {
        id: "ns-hariram",
        name: "N S Hariram",
        image: "/person.svg",
        batch: "2023",
    },
    "benjamin-rojoy": {
        id: "benjamin-rojoy",
        name: "Benjamin Rojoy",
        image: "/person.svg",
        batch: "2023",
    },
    "kalidas-vb": {
        id: "kalidas-vb",
        name: "Kalidas V B",
        image: "/person.svg",
        batch: "2023",
    },
    "athul-jayakumar": {
        id: "athul-jayakumar",
        name: "Athul Jayakumar",
        image: "/person.svg",
        batch: "2023",
    },
    "esther-b-susan": {
        id: "esther-b-susan",
        name: "Esther B Susan",
        image: "/person.svg",
        batch: "2023",
    },
    "nithin-p": {
        id: "nithin-p",
        name: "Nithin P",
        image: "/person.svg",
        batch: "2023",
    },
    "saranya-krishnan-m": {
        id: "saranya-krishnan-m",
        name: "Saranya Krishnan M",
        image: "/person.svg",
        batch: "2023",
    },
    "anoop-santhosh": {
        id: "anoop-santhosh",
        name: "Anoop Santhosh",
        image: "/person.svg",
        batch: "2023",
    },
    "jayalakshmi-jayakumar": {
        id: "jayalakshmi-jayakumar",
        name: "Jayalakshmi Jayakumar",
        image: "/person.svg",
        batch: "2023",
    },
    "sarathkumar-ks": {
        id: "sarathkumar-ks",
        name: "Sarathkumar K S",
        image: "/person.svg",
        batch: "2023",
    },
    "akhil-manikandan": {
        id: "akhil-manikandan",
        name: "Akhil Manikandan",
        image: "/person.svg",
        batch: "2023",
    },
    "emey-teresa-abraham": {
        id: "emey-teresa-abraham",
        name: "Emey Teresa Abraham",
        image: "/person.svg",
        batch: "2023",
    },
    "nanda-kishore-p": {
        id: "nanda-kishore-p",
        name: "Nanda Kishore P",
        image: "/person.svg",
        batch: "2023",
    },
    "gayathri-s-warrier": {
        id: "gayathri-s-warrier",
        name: "Gayathri S Warrier",
        image: "/person.svg",
        batch: "2023",
    },
    "soni-p": {
        id: "soni-p",
        name: "Soni P",
        image: "/person.svg",
        batch: "2023",
    },
    "aparna-sl": {
        id: "aparna-sl",
        name: "Aparna SL",
        image: "/person.svg",
        batch: "2023",
    },
    "niranjan-k-warrier": {
        id: "niranjan-k-warrier",
        name: "Niranjan K Warrier",
        image: "/person.svg",
        batch: "2023",
    },
    "gowri-nandana-ar": {
        id: "gowri-nandana-ar",
        name: "Gowri Nandana A R",
        image: "/person.svg",
        batch: "2023",
    },

    // ── 2021 ────────────────────────────────────────────────────────────────

    "nikitha-susan-jose": {
        id: "nikitha-susan-jose",
        name: "Nikitha Susan Jose",
        image: "/person.svg",
        batch: "2022",
    },
    "abhinav-ms": {
        id: "abhinav-ms",
        name: "Abhinav MS",
        image: "/person.svg",
        batch: "2022",
    },
    "pooja-ps": {
        id: "pooja-ps",
        name: "Pooja P S",
        image: "/person.svg",
        batch: "2022",
    },
    "sivapriya-b": {
        id: "sivapriya-b",
        name: "Sivapriya B",
        image: "/person.svg",
        batch: "2022",
    },
    "salwa-firoz-cm": {
        id: "salwa-firoz-cm",
        name: "Salwa Firoz C M",
        image: "/person.svg",
        batch: "2022",
    },
    "ananda-narayan": {
        id: "ananda-narayan",
        name: "Ananda Narayan",
        image: "/person.svg",
        batch: "2022",
    },
    "sharika-menon-r": {
        id: "sharika-menon-r",
        name: "Sharika Menon R",
        image: "/person.svg",
        batch: "2022",
    },
    "abila-antony-fernandez": {
        id: "abila-antony-fernandez",
        name: "Abila Antony Fernandez",
        image: "/person.svg",
        batch: "2022",
    },
    "vyshnavi-jayakumar-k": {
        id: "vyshnavi-jayakumar-k",
        name: "Vyshnavi Jayakumar K",
        image: "/person.svg",
        batch: "2022",
    },
    "neelima-anilkumar": {
        id: "neelima-anilkumar",
        name: "Neelima Anilkumar",
        image: "/person.svg",
        batch: "2022",
    },
    "arsha-rs": {
        id: "arsha-rs",
        name: "Arsha R S",
        image: "/person.svg",
        batch: "2022",
    },
    "midhun-bm": {
        id: "midhun-bm",
        name: "Midhun B M",
        image: "/person.svg",
        batch: "2022",
    },
    "abhijit-m": {
        id: "abhijit-m",
        name: "Abhijit M",
        image: "/person.svg",
        batch: "2022",
    },
    "adith-gm": {
        id: "adith-gm",
        name: "Adith G M",
        image: "/person.svg",
        batch: "2022",
    },
    "anisha-khalam": {
        id: "anisha-khalam",
        name: "Anisha Khalam",
        image: "/person.svg",
        batch: "2022",
    },
    "kaveri-ts": {
        id: "kaveri-ts",
        name: "Kaveri T S",
        image: "/person.svg",
        batch: "2022",
    },
    "neha-merin-jacob": {
        id: "neha-merin-jacob",
        name: "Neha Merin Jacob",
        image: "/person.svg",
        batch: "2022",
    },

    // ── 2020 ────────────────────────────────────────────────────────────────

    "vivek-menon": {
        id: "vivek-menon",
        name: "Vivek Menon",
        image: "/person.svg",
        batch: "2021",
    },
    "arjun-saseendran": {
        id: "arjun-saseendran",
        name: "Arjun Saseendran",
        image: "/person.svg",
        batch: "2021",
    },
    "naveen-jo-sajan": {
        id: "naveen-jo-sajan",
        name: "Naveen Jo Sajan",
        image: "/person.svg",
        batch: "2021",
    },
    "neetha-j": {
        id: "neetha-j",
        name: "Neetha J",
        image: "/person.svg",
        batch: "2021",
    },
    "g-h-giri": {
        id: "g-h-giri",
        name: "G H Giri",
        image: "/person.svg",
        batch: "2021",
    },
    "hari-govind-s": {
        id: "hari-govind-s",
        name: "Hari Govind S",
        image: "/person.svg",
        batch: "2021",
    },
    "sreelekshmi-s": {
        id: "sreelekshmi-s",
        name: "Sreelekshmi S",
        image: "/person.svg",
        batch: "2021",
    },
    "sidharth-s": {
        id: "sidharth-s",
        name: "Sidharth S",
        image: "/person.svg",
        batch: "2021",
    },
    "jayakrishnan": {
        id: "jayakrishnan",
        name: "Jayakrishnan",
        image: "/person.svg",
        batch: "2021",
    },
    "sreeved-krishna": {
        id: "sreeved-krishna",
        name: "Sreeved Krishna",
        image: "/person.svg",
        batch: "2021",
    },
    "sharan-p": {
        id: "sharan-p",
        name: "Sharan P",
        image: "/person.svg",
        batch: "2021",
    },
    "ashna-satheesh": {
        id: "ashna-satheesh",
        name: "Ashna Satheesh",
        image: "/person.svg",
        batch: "2021",
    },
    "aishwarya-r": {
        id: "aishwarya-r",
        name: "Aishwarya R",
        image: "/person.svg",
        batch: "2021",
    },
    "varun-g": {
        id: "varun-g",
        name: "Varun G",
        image: "/person.svg",
        batch: "2021",
    },
    "abish-vijayan": {
        id: "abish-vijayan",
        name: "Abish Vijayan",
        image: "/person.svg",
        batch: "2021",
    },
    "harikrishnan-g": {
        id: "harikrishnan-g",
        name: "Harikrishnan G",
        image: "/person.svg",
        batch: "2021",
    },
    "niyasuddin-mohamed": {
        id: "niyasuddin-mohamed",
        name: "Niyasudhin Mohamed",
        image: "/person.svg",
        batch: "2021",
    },
    "rakshantha-as": {
        id: "rakshantha-as",
        name: "Rakshantha A S",
        image: "/person.svg",
        batch: "2021",
    },
    "gowri-rajesh": {
        id: "gowri-rajesh",
        name: "Gowri Rajesh",
        image: "/person.svg",
        batch: "2021",
    },
    "saadhvi-gs": {
        id: "saadhvi-gs",
        name: "Saadhvi G S",
        image: "/person.svg",
        batch: "2021",
    },
    "midhin-murali": {
        id: "midhin-murali",
        name: "Midhin Murali",
        image: "/person.svg",
        batch: "2021",
    },
    "parvathy-as": {
        id: "parvathy-as",
        name: "Parvathy A S",
        image: "/person.svg",
        batch: "2021",
    },
    "sharika-menon": {
        id: "sharika-menon",
        name: "Sharika Menon",
        image: "/person.svg",
        batch: "2021",
    },

};
