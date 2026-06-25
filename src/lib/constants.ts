export const ASSETS = {
  aegisLogo: "/assets/aegis-logo.png",
  cyberAsap: "/assets/cyber-asap.png",
  universityManchester: "/assets/university-manchester.png",
  universitySheffield: "/assets/university-sheffield.png",
  teamBernardo: "/assets/team-bernardo.jpg",
  teamBehzad: "/assets/team-behzad.jpg",
  teamBhavish: "/assets/team-bhavish.jpg",
} as const;

export const TAGLINE = "Compliance without Compromise";
export const CONTACT_EMAIL = "b.mohee@sheffield.ac.uk";
export const CYBERASAP_URL = "https://www.cyberasap.co.uk/";
export const SITE_URL = "https://aegis-proof.vercel.app";
export const FORMSPREE_FORM_ID =
  import.meta.env.VITE_FORMSPREE_FORM_ID ?? "xdarkzpd";

export const PARTNER_LOGO_SURFACE =
  "flex items-center justify-center rounded-xl border border-[#d8dee8] bg-[#f3f5f9] shadow-[0_4px_24px_rgba(0,0,0,0.14)]";

export const PARTNER_LOGO_BOX_FULL = "h-[128px] w-full px-5";
export const PARTNER_LOGO_BOX_COMPACT = "h-[72px] w-[240px] shrink-0 px-4";

export const NAV_LINKS = [
  { href: "#problem", label: "Problem" },
  { href: "#platforms", label: "Platforms" },
  { href: "#technology", label: "Technology" },
  { href: "#compare", label: "Compare" },
  { href: "#metrics", label: "Metrics" },
  { href: "#faq", label: "FAQ" },
  { href: "#leadership", label: "Team" },
  { href: "#contact", label: "Contact" },
] as const;

export const TEAM_MEMBERS = [
  {
    role: "Lead Principal Investigator (Lead PI)",
    name: "Dr. Bernardo Magri",
    photo: ASSETS.teamBernardo,
    linkedin: "https://www.linkedin.com/in/bernardo-magri-9636a5213/",
    bio: "Senior Lecturer in Cryptography at the University of Manchester. Specialises in advanced cryptographic primitives and multi-party computation.",
    tags: ["MPC", "Cryptographic Primitives", "U. Manchester"],
  },
  {
    role: "Co-Principal Investigator (Co-PI)",
    name: "Dr. Behzad Abdolmaleki",
    photo: ASSETS.teamBehzad,
    linkedin: "https://www.linkedin.com/in/behzad-abdolmaleki-0384472b7/",
    bio: "Assistant Professor in Cybersecurity at the University of Sheffield. Specialises in zero-knowledge proofs and zk-SNARK circuit infrastructure.",
    tags: ["zk-SNARKs", "ZK Proofs", "U. Sheffield"],
  },
  {
    role: "Research Assistant",
    name: "Bhavish Mohee",
    photo: ASSETS.teamBhavish,
    linkedin: "https://www.linkedin.com/in/bhavish-mohee/",
    bio: "Master's in Cybersecurity & AI from the University of Sheffield with 4+ years of professional development experience; transitions into the core commercial development team driving the production API implementation.",
    tags: ["Software Engineering", "API Implementation", "U. Sheffield"],
  },
] as const;
