/* Souriyo — metye ak dekò pou pòtrè IA yo (menm lis ak fonksyon sèvè a) */
window.PROFS_DECORS = (() => {
const PROFS = [
  { k: 'comptable', e: '📊', fr: ['Comptable', 'Comptable'], ht: ['Kontab', 'Kontab'], en: ['Accountant', 'Accountant'], attire: 'a sharp tailored business suit, holding a tablet with financial charts' },
  { k: 'gestionnaire', e: '🗂️', fr: ['Gestionnaire', 'Gestionnaire'], ht: ['Jesyonè', 'Jesyonè'], en: ['Manager', 'Manager'], attire: 'smart business attire with a blazer, confident executive look' },
  { k: 'medecin', e: '🩺', fr: ['Médecin', 'Médecin'], ht: ['Doktè', 'Doktè'], en: ['Doctor', 'Doctor'], attire: 'a clean white doctor’s coat over professional clothes, a stethoscope around the neck' },
  { k: 'infirmier', e: '💉', fr: ['Infirmier', 'Infirmière'], ht: ['Enfimye', 'Enfimyè'], en: ['Nurse', 'Nurse'], attire: 'neat navy medical scrubs with a name badge' },
  { k: 'professeur', e: '📚', fr: ['Professeur', 'Professeure'], ht: ['Pwofesè', 'Pwofesè'], en: ['Teacher', 'Teacher'], attire: 'smart-casual teacher outfit, holding a book, a blurred classroom chalkboard behind' },
  { k: 'avocat', e: '⚖️', fr: ['Avocat', 'Avocate'], ht: ['Avoka', 'Avoka'], en: ['Lawyer', 'Lawyer'], attire: 'a dark formal suit, holding a leather folder, elegant law office look' },
  { k: 'ingenieur', e: '🏗️', fr: ['Ingénieur', 'Ingénieure'], ht: ['Enjenyè', 'Enjenyè'], en: ['Engineer', 'Engineer'], attire: 'a smart shirt with a white safety helmet held under the arm and rolled blueprints' },
  { k: 'architecte', e: '📐', fr: ['Architecte', 'Architecte'], ht: ['Achitèk', 'Achitèk'], en: ['Architect', 'Architect'], attire: 'modern creative professional outfit, holding an architectural model' },
  { k: 'developpeur', e: '💻', fr: ['Développeur', 'Développeuse'], ht: ['Devlopè', 'Devlopèz'], en: ['Software developer', 'Software developer'], attire: 'smart-casual tech outfit, laptop in hand, modern tech office' },
  { k: 'entrepreneur', e: '🚀', fr: ['Entrepreneur', 'Entrepreneure'], ht: ['Antreprenè', 'Antreprenèz'], en: ['Entrepreneur', 'Entrepreneur'], attire: 'stylish modern business outfit, confident founder look' },
  { k: 'banquier', e: '🏦', fr: ['Banquier', 'Banquière'], ht: ['Bankye', 'Bankyè'], en: ['Banker', 'Banker'], attire: 'a classic formal suit with a tie or elegant blouse, bank office' },
  { k: 'pharmacien', e: '💊', fr: ['Pharmacien', 'Pharmacienne'], ht: ['Famasyen', 'Famasyèn'], en: ['Pharmacist', 'Pharmacist'], attire: 'a white pharmacist coat, shelves of medicine softly blurred behind' },
  { k: 'agronome', e: '🌱', fr: ['Agronome', 'Agronome'], ht: ['Agwonòm', 'Agwonòm'], en: ['Agronomist', 'Agronomist'], attire: 'a practical field shirt, holding a tablet, green fields blurred behind' },
  { k: 'journaliste', e: '🎙️', fr: ['Journaliste', 'Journaliste'], ht: ['Jounalis', 'Jounalis'], en: ['Journalist', 'Journalist'], attire: 'smart outfit, holding a microphone, studio lights blurred behind' },
  { k: 'pilote', e: '✈️', fr: ['Pilote de ligne', 'Pilote de ligne'], ht: ['Pilòt avyon', 'Pilòt avyon'], en: ['Airline pilot', 'Airline pilot'], attire: 'an airline pilot uniform with epaulettes and a captain hat' },
  { k: 'diplomate', e: '🌍', fr: ['Diplomate', 'Diplomate'], ht: ['Diplomat', 'Diplomat'], en: ['Diplomat', 'Diplomat'], attire: 'an elegant formal suit, flags softly blurred behind' },
  { k: 'juge', e: '🔨', fr: ['Juge', 'Juge'], ht: ['Jij', 'Jij'], en: ['Judge', 'Judge'], attire: 'a black judge’s robe over a white collar, a courtroom softly blurred behind' },
  { k: 'notaire', e: '🖋️', fr: ['Notaire', 'Notaire'], ht: ['Notè', 'Notè'], en: ['Notary', 'Notary'], attire: 'an elegant dark suit, holding a fountain pen and an official document, classic notary office' },
  { k: 'economiste', e: '📈', fr: ['Économiste', 'Économiste'], ht: ['Ekonomis', 'Ekonomis'], en: ['Economist', 'Economist'], attire: 'smart business attire, economic charts on a screen softly blurred behind' },
  { k: 'psychologue', e: '🧠', fr: ['Psychologue', 'Psychologue'], ht: ['Sikològ', 'Sikològ'], en: ['Psychologist', 'Psychologist'], attire: 'warm smart-casual professional outfit, calm counselling office with plants softly blurred behind' },
  { k: 'chef', e: '👨‍🍳', fr: ['Chef cuisinier', 'Cheffe cuisinière'], ht: ['Chèf kizin', 'Chèf kizin'], en: ['Chef', 'Chef'], attire: 'a crisp white chef’s jacket and toque, a professional restaurant kitchen softly blurred behind' },
  { k: 'designer', e: '🎨', fr: ['Designer graphique', 'Designer graphique'], ht: ['Designè grafik', 'Designè grafik'], en: ['Graphic designer', 'Graphic designer'], attire: 'a stylish creative outfit, holding a drawing tablet, colorful creative studio softly blurred behind' },
  { k: 'policier', e: '👮', fr: ['Officier de police', 'Officière de police'], ht: ['Ofisye lapolis', 'Ofisye lapolis'], en: ['Police officer', 'Police officer'], attire: 'a generic dark blue police officer uniform WITHOUT any real country insignia, badge text or flag' },
  { k: 'militaire', e: '🎖️', fr: ['Militaire', 'Militaire'], ht: ['Sòlda', 'Sòlda'], en: ['Soldier', 'Soldier'], attire: 'a generic military dress uniform WITHOUT any real country insignia, flag or rank of a real army' },
  { k: 'dentiste', e: '🦷', fr: ['Dentiste', 'Dentiste'], ht: ['Dantis', 'Dantis'], en: ['Dentist', 'Dentist'], attire: 'a clean white dental coat, a modern dental clinic softly blurred behind' },
  { k: 'veterinaire', e: '🐾', fr: ['Vétérinaire', 'Vétérinaire'], ht: ['Veterinè', 'Veterinè'], en: ['Veterinarian', 'Veterinarian'], attire: 'veterinary scrubs with a stethoscope, gently holding a calm puppy' },
  { k: 'musicien', e: '🎷', fr: ['Musicien', 'Musicienne'], ht: ['Mizisyen', 'Mizisyèn'], en: ['Musician', 'Musician'], attire: 'an elegant stage outfit, holding a saxophone, warm concert stage lights softly blurred behind' },
  { k: 'data', e: '🤖', fr: ['Analyste de données / IA', 'Analyste de données / IA'], ht: ['Analis done / IA', 'Analis done / IA'], en: ['Data & AI analyst', 'Data & AI analyst'], attire: 'smart-casual tech outfit, laptop in hand, data dashboards on screens softly blurred behind' },
];
const DECORS = [
  { k: 'studio', e: '📸', fr: 'Studio', ht: 'Estidyo', en: 'Studio', bg: 'a seamless soft grey-blue studio background with professional three-point lighting' },
  { k: 'bureau', e: '🏢', fr: 'Bureau moderne', ht: 'Biwo modèn', en: 'Modern office', bg: 'a bright modern office, softly blurred (shallow depth of field)' },
  { k: 'metier', e: '✨', fr: 'Lieu du métier', ht: 'Kote metye a', en: 'Workplace', bg: 'the typical workplace of this profession, softly blurred (shallow depth of field)' },
];
return { PROFS, DECORS };
})();
