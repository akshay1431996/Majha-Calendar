import { MonthInfo, CalendarEvent } from './types';

export const toMarathiDigits = (num: number | string): string => {
  const marathiMap = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return num
    .toString()
    .split('')
    .map((char) => (/\d/.test(char) ? marathiMap[parseInt(char)] : char))
    .join('');
};

export const WEEKDAYS = [
  { en: 'Sun', mr: 'रवि', color: 'text-red-600' },
  { en: 'Mon', mr: 'सोम', color: 'text-slate-900' },
  { en: 'Tue', mr: 'मंगळ', color: 'text-slate-900' },
  { en: 'Wed', mr: 'बुध', color: 'text-slate-900' },
  { en: 'Thu', mr: 'गुरू', color: 'text-slate-900' },
  { en: 'Fri', mr: 'शुक्र', color: 'text-slate-900' },
  { en: 'Sat', mr: 'शनि', color: 'text-slate-900' },
];

export const MONTH_NAMES: MonthInfo[] = [
  { name: 'जानेवारी', marathiName: 'पौष / माघ' },
  { name: 'फेब्रुवारी', marathiName: 'माघ / फाल्गुन' },
  { name: 'मार्च', marathiName: 'फाल्गुन / चैत्र' },
  { name: 'एप्रिल', marathiName: 'चैत्र / वैशाख' },
  { name: 'मे', marathiName: 'वैशाख / अधिक ज्येष्ठ' },
  { name: 'जून', marathiName: 'अधिक ज्येष्ठ / निज ज्येष्ठ' },
  { name: 'जुलै', marathiName: 'निज ज्येष्ठ / आषाढ' },
  { name: 'ऑगस्ट', marathiName: 'आषाढ / श्रावण' },
  { name: 'सप्टेंबर', marathiName: 'श्रावण / भाद्रपद' },
  { name: 'ऑक्टोबर', marathiName: 'भाद्रपद / अश्विन' },
  { name: 'नोव्हेंबर', marathiName: 'अश्विन / कार्तिक' },
  { name: 'डिसेंबर', marathiName: 'कार्तिक / मार्गशीर्ष' },
];

// Determine the Marathi Month Name based on 2026 transition dates
export const getMarathiMonthName = (monthIndex: number, day: number, year: number): string => {
  if (year !== 2026) return "";
  
  // Transition dates for 2026 (Day where next month starts)
  // Jan 19: Magh
  // Feb 18: Falgun
  // Mar 19: Chaitra
  // Apr 18: Vaishakh
  // May 17: Adhik Jyeshtha
  // Jun 16: Nija Jyeshtha
  // Jul 15: Ashadh
  // Aug 13: Shravan
  // Sep 12: Bhadrapad
  // Oct 10: Ashwin
  // Nov 10: Kartik
  // Dec 9: Margashirsha
  
  const transitions: Record<number, { day: number, prev: string, next: string }> = {
    0: { day: 19, prev: 'पौष', next: 'माघ' },
    1: { day: 18, prev: 'माघ', next: 'फाल्गुन' },
    2: { day: 19, prev: 'फाल्गुन', next: 'चैत्र' },
    3: { day: 18, prev: 'चैत्र', next: 'वैशाख' },
    4: { day: 17, prev: 'वैशाख', next: 'अ. ज्येष्ठ' }, // Adhik Jyeshtha
    5: { day: 16, prev: 'अ. ज्येष्ठ', next: 'नि. ज्येष्ठ' }, // Nija Jyeshtha
    6: { day: 15, prev: 'नि. ज्येष्ठ', next: 'आषाढ' },
    7: { day: 13, prev: 'आषाढ', next: 'श्रावण' },
    8: { day: 12, prev: 'श्रावण', next: 'भाद्रपद' },
    9: { day: 10, prev: 'भाद्रपद', next: 'अश्विन' },
    10: { day: 10, prev: 'अश्विन', next: 'कार्तिक' },
    11: { day: 9, prev: 'कार्तिक', next: 'मार्गशीर्ष' },
  };

  const t = transitions[monthIndex];
  if (!t) return "";
  
  return day < t.day ? t.prev : t.next;
};

// Key events extracted from the 2026 calendar PDF
// Format: "MonthIndex-Day": Event
export const EVENTS_DATA: Record<string, CalendarEvent> = {
  // January (Month 0)
  "0-1": { title: "नवीन वर्ष / भगवानबाबा पुण्यतिथी", isHoliday: false },
  "0-2": { title: "अप्पा महाराज पुण्यतिथी", isHoliday: false },
  "0-3": { title: "सावित्रीबाई फुले जयंती", isHoliday: false },
  "0-6": { title: "पत्रकार दिन", isHoliday: false },
  "0-11": { title: "भाऊसाहेब महाराज पुण्यतिथी", isHoliday: false },
  "0-12": { title: "स्वामी विवेकानंद / जिजाऊ मासाहेब जयंती", isHoliday: false },
  "0-14": { title: "भोगि / षट्तिला एकादशी", isHoliday: false },
  "0-15": { title: "मकर संक्रांत", isHoliday: true },
  "0-16": { title: "महादेव महाराज पुण्यतिथी", isHoliday: false },
  "0-24": { title: "अंगारकी संकष्ट चतुर्थी", isHoliday: false, description: "चन्द्रोदय ०९:१६" },
  "0-26": { title: "प्रजासत्ताक दिन / रथसप्तमी", isHoliday: true },
  "0-29": { title: "जया एकादशी", isHoliday: false },
  "0-30": { title: "महात्मा गांधी पुण्यतिथी", isHoliday: false },

  // February (Month 1)
  "1-1": { title: "संत रोहिदास जयंती", isHoliday: false },
  "1-2": { title: "गोंदवलेकर महाराज पुण्यतिथी", isHoliday: false },
  "1-6": { title: "संकष्ट चतुर्थी", isHoliday: false, description: "चन्द्रोदय ०९:२७" },
  "1-13": { title: "विजया एकादशी", isHoliday: false },
  "1-15": { title: "प्रदोष", isHoliday: false },
  "1-16": { title: "महाशिवरात्री", isHoliday: true },
  "1-17": { title: "संत गाडगे महाराज पुण्यतिथी", isHoliday: false },
  "1-19": { title: "छ. शिवाजी महाराज जयंती", isHoliday: true },
  "1-23": { title: "संत गाडगे महाराज जयंती", isHoliday: false },
  "1-26": { title: "स्वातंत्र्यवीर सावरकर पुण्यतिथी", isHoliday: false },
  "1-27": { title: "आमलकी एकादशी / मराठी राजभाषा दिन", isHoliday: false },

  // March (Month 2)
  "2-1": { title: "काशिनाथ महाराज पुण्यतिथी", isHoliday: false },
  "2-3": { title: "होळी पौर्णिमा", isHoliday: true },
  "2-4": { title: "धुलिवंदन", isHoliday: true },
  "2-7": { title: "संकष्ट चतुर्थी", isHoliday: false, description: "चन्द्रोदय ०९:१६" },
  "2-8": { title: "जागतिक महिला दिन / संत तुकाराम बीज", isHoliday: false },
  "2-10": { title: "सावित्रीबाई फुले स्मृतीदिन", isHoliday: false },
  "2-12": { title: "यशवंतराव चव्हाण जयंती", isHoliday: false },
  "2-15": { title: "पापमोचनी एकादशी", isHoliday: false },
  "2-19": { title: "गुढीपाडवा (हिंदू नववर्ष)", isHoliday: true },
  "2-22": { title: "विनायक चतुर्थी", isHoliday: false },
  "2-27": { title: "श्री राम नवमी", isHoliday: true },
  "2-30": { title: "महावीर जयंती / कामदा एकादशी", isHoliday: true },
  "2-31": { title: "मेहेर बाबा पुण्यतिथी", isHoliday: false },

  // April (Month 3)
  "3-2": { title: "हनुमान जयंती", isHoliday: true },
  "3-5": { title: "संकष्ट चतुर्थी", isHoliday: false, description: "चन्द्रोदय ०९:४५" },
  "3-7": { title: "जागतिक आरोग्य दिन", isHoliday: false },
  "3-11": { title: "महात्मा फुले जयंती", isHoliday: false },
  "3-13": { title: "वरुथिनी एकादशी", isHoliday: false },
  "3-14": { title: "डॉ. बाबासाहेब आंबेडकर जयंती", isHoliday: true },
  "3-18": { title: "महर्षी कर्वे जयंती", isHoliday: false },
  "3-21": { title: "अक्षय्य तृतीया / बसवेश्वर जयंती", isHoliday: true },
  "3-23": { title: "विनायक चतुर्थी / छत्रपती शिवाजी महाराज पुण्यतिथी", isHoliday: false },
  "3-29": { title: "मोहिनी एकादशी", isHoliday: false },

  // May (Month 4)
  "4-1": { title: "महाराष्ट्र दिन / कामगार दिन", isHoliday: true },
  "4-5": { title: "संकष्ट चतुर्थी", isHoliday: false, description: "चन्द्रोदय १०:१६" },
  "4-8": { title: "रवींद्रनाथ टागोर जयंती", isHoliday: false },
  "4-13": { title: "अपरा एकादशी", isHoliday: false },
  "4-17": { title: "अधिक ज्येष्ठ मास प्रारंभ", isHoliday: false },
  "4-23": { title: "बुद्ध पौर्णिमा", isHoliday: true },
  "4-27": { title: "पंडित नेहरू पुण्यतिथी", isHoliday: false },
  "4-28": { title: "स्वातंत्र्यवीर सावरकर जयंती", isHoliday: false },
  "4-29": { title: "कमला एकादशी (अधिक)", isHoliday: false },
  "4-31": { title: "अहिल्यादेवी होळकर जयंती", isHoliday: false },

  // June (Month 5)
  "5-3": { title: "संकष्ट चतुर्थी", isHoliday: false, description: "चन्द्रोदय ०९:५०" },
  "5-5": { title: "जागतिक पर्यावरण दिन", isHoliday: false },
  "5-6": { title: "शिवराज्याभिषेक दिन", isHoliday: false },
  "5-11": { title: "कमला एकादशी (अधिक)", isHoliday: false },
  "5-12": { title: "साने गुरुजी पुण्यतिथी", isHoliday: false },
  "5-14": { title: "निज ज्येष्ठ मास प्रारंभ", isHoliday: false },
  "5-17": { title: "राजमाता जिजाऊ पुण्यतिथी", isHoliday: false },
  "5-18": { title: "राणी लक्ष्मीबाई पुण्यतिथी", isHoliday: false },
  "5-21": { title: "वटपौर्णिमा", isHoliday: false },
  "5-27": { title: "निर्जला एकादशी", isHoliday: false },

  // July (Month 6)
  "6-1": { title: "वसंतराव नाईक जयंती", isHoliday: false },
  "6-3": { title: "संकष्ट चतुर्थी", isHoliday: false, description: "चन्द्रोदय ०९:४९" },
  "6-11": { title: "योगिनी एकादशी", isHoliday: false },
  "6-26": { title: "आषाढी एकादशी (महाएकादशी)", isHoliday: true },
  "6-29": { title: "गुरुपौर्णिमा", isHoliday: false },

  // August (Month 7)
  "7-1": { title: "लोकमान्य टिळक पुण्यतिथी / अण्णाभाऊ साठे जयंती", isHoliday: false },
  "7-2": { title: "संकष्ट चतुर्थी", isHoliday: false, description: "चन्द्रोदय ०९:३३" },
  "7-8": { title: "कामिका एकादशी", isHoliday: false },
  "7-15": { title: "स्वातंत्र्य दिन", isHoliday: true },
  "7-16": { title: "पतेती (पारशी नववर्ष)", isHoliday: false },
  "7-17": { title: "नागपंचमी", isHoliday: true },
  "7-23": { title: "पुत्रदा एकादशी", isHoliday: false },
  "7-27": { title: "नारळी पौर्णिमा / रक्षाबंधन", isHoliday: true },
  "7-31": { title: "संकष्ट चतुर्थी", isHoliday: false, description: "चन्द्रोदय ०९:०८" },

  // September (Month 8)
  "8-4": { title: "श्रीकृष्ण जयंती (गोकुळाष्टमी)", isHoliday: true },
  "8-5": { title: "दहीहंडी / शिक्षक दिन", isHoliday: false },
  "8-7": { title: "अजा एकादशी", isHoliday: false },
  "8-14": { title: "श्री गणेश चतुर्थी", isHoliday: true },
  "8-16": { title: "ऋषी पंचमी", isHoliday: false },
  "8-17": { title: "गौरी आवाहन", isHoliday: false },
  "8-18": { title: "गौरी पूजन", isHoliday: false },
  "8-19": { title: "गौरी विसर्जन", isHoliday: false },
  "8-21": { title: "परिवर्तिनी एकादशी", isHoliday: false },
  "8-23": { title: "अनंत चतुर्दशी (गणेश विसर्जन)", isHoliday: true },
  "8-29": { title: "संकष्ट चतुर्थी", isHoliday: false, description: "चन्द्रोदय ०८:१७" },

  // October (Month 9)
  "9-2": { title: "महात्मा गांधी जयंती", isHoliday: true },
  "9-7": { title: "इंदिरा एकादशी", isHoliday: false },
  "9-10": { title: "घटस्थापना (नवरात्र आरंभ)", isHoliday: true },
  "9-17": { title: "सरस्वती आवाहन", isHoliday: false },
  "9-18": { title: "सरस्वती पूजन", isHoliday: false },
  "9-19": { title: "दुर्गाष्टमी", isHoliday: false },
  "9-20": { title: "दसरा (विजयादशमी)", isHoliday: true },
  "9-21": { title: "पाशांकुशा एकादशी", isHoliday: false },
  "9-26": { title: "कोजागिरी पौर्णिमा", isHoliday: false },
  "9-29": { title: "संकष्ट चतुर्थी", isHoliday: false, description: "चन्द्रोदय ०८:४३" },
  "9-31": { title: "राष्ट्रीय एकता दिवस (सरदार पटेल जयंती)", isHoliday: false },

  // November (Month 10)
  "10-5": { title: "रमा एकादशी", isHoliday: false },
  "10-8": { title: "नरक चतुर्दशी (दिवाळी)", isHoliday: true },
  "10-9": { title: "लक्ष्मीपूजन (दिवाळी)", isHoliday: true },
  "10-10": { title: "बलिप्रतिपदा / पाडवा (दिवाळी)", isHoliday: true },
  "10-11": { title: "भाऊबीज (दिवाळी)", isHoliday: true },
  "10-14": { title: "बाल दिन / पंडित नेहरू जयंती", isHoliday: false },
  "10-20": { title: "कार्तिकी एकादशी (प्रबोधिनी)", isHoliday: true },
  "10-24": { title: "गुरुनानक जयंती", isHoliday: true },
  "10-28": { title: "संकष्ट चतुर्थी / महात्मा फुले पुण्यतिथी", isHoliday: false, description: "चन्द्रोदय ०८:४५" },

  // December (Month 11)
  "11-3": { title: "जागतिक अपंग दिन", isHoliday: false },
  "11-5": { title: "उत्पत्ती एकादशी", isHoliday: false },
  "11-6": { title: "डॉ. आंबेडकर महापरिनिर्वाण दिन", isHoliday: false },
  "11-15": { title: "सर्दार पटेल पुण्यतिथी", isHoliday: false },
  "11-19": { title: "मोक्षदा एकादशी / गीता जयंती", isHoliday: false },
  "11-20": { title: "संत गाडगे महाराज पुण्यतिथी", isHoliday: false },
  "11-25": { title: "ख्रिसमस (नाताळ)", isHoliday: true },
  "11-27": { title: "संकष्ट चतुर्थी", isHoliday: false, description: "चन्द्रोदय ०८:५०" },
};

export const getEventForDay = (monthIndex: number, day: number, year: number): CalendarEvent | undefined => {
  // We only have hardcoded data for 2026
  if (year !== 2026) return undefined;
  return EVENTS_DATA[`${monthIndex}-${day}`];
};
