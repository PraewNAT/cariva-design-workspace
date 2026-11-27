// Screen states and the demo content copied from the Figma frames. Mock data only.

export const screens = ["idle", "recording", "paused", "stopped", "playback", "generating", "result", "saving", "saved", "closing"] as const;
export type Screen = typeof screens[number];

export const feedbackStates = ["none", "open", "sent"] as const;
export type FeedbackState = typeof feedbackStates[number];

/** Demo timings in milliseconds. Only "saved" comes from a Figma annotation (shown for 3 seconds); the others are placeholders. */
export const demoDelay = { generating: 3000, saving: 2000, saved: 3000, closing: 2000 } as const;

export const sections = ["CC (Chief Complaint)", "HPI (History of Present Illness)", "Physical Examination"];

export const note = {
  complaint: ["แน่นหน้าอก 2 ชั่วโมงก่อนมาโรงพยาบาล"],
  history: [
    "A 58-year-old male with underlying HT, DM type 2 and DLP, on regular medication (amlodipine 10 mg OD, metformin 1000 mg BID, atorvastatin 40 mg HS).",
    "2 hours PTA, while climbing stairs, patient developed sudden onset of chest tightness at the retrosternal area, pain score 7/10, radiating to the left arm and jaw, lasting approximately 20 minutes. Associated with diaphoresis and mild dyspnea. Symptoms partially relieved with rest.",
    "Denies palpitation, syncope, fever, cough.",
    "Similar episodes occurred twice in the past 2 weeks upon exertion, each lasting less than 5 minutes, resolved spontaneously, not previously evaluated.",
    "Smoking: 20 pack-years, still smoking. Alcohol: occasional.",
    "Family history: father had MI at age 60.",
    "Drug allergy: NKDA.",
  ],
  examination: [
    "V/S: BT 36.8°C, PR 102/min, RR 22/min, BP 156/94 mmHg, SpO₂ 96% RA",
    "GA: A Thai male, alert, diaphoretic, mild distress",
    "HEENT: Not pale, anicteric sclerae",
    "Neck: No JVD, no carotid bruit",
    "Heart: Regular rhythm, normal S1S2, no murmur, no S3/S4",
    "Lungs: Fine crepitation at both lower lung fields, no wheezing",
    "Abdomen: Soft, not tender, no guarding",
    "Extremities: No pitting edema, peripheral pulses 2+ all extremities, capillary refill < 2 sec",
    "Neuro: Grossly intact",
  ],
};

export const noteText = [
  `${sections[0]}:`, ...note.complaint, "",
  `${sections[1]}:`, ...note.history, "",
  `${sections[2]}:`, ...note.examination.map(line => `- ${line}`),
].join("\n");
