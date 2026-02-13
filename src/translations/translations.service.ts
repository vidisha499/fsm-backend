// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class TranslationsService {}

import { Injectable } from '@nestjs/common';

@Injectable()
export class TranslationsService {
  // This is your master dictionary
  private readonly translations = {
    en: {
      "ATTENDANCE": {
        "TITLE": "Beat Attendance",
        "SUBTITLE": "Panna Site Operation",
        "LIVE": "Live",
        "CAPTURE_ID": "Capture ID",
        "LIVE_TRACKING": "Live Tracking",
        "RANGER": "Ranger",
        "REGION": "Region",
        "DETECTED_GEOFENCE": "Detected Geofence",
        "ENTRY": "ENTRY",
        "EXIT": "EXIT",
        "MARK_BUTTON": "MARK ATTENDANCE",
        "GPS_NOTICE": "GPS TRACKING ACTIVE. SYSTEM IS LOGGING: {{address}}"
      }
    },
    mr: {
      "ATTENDANCE": {
        "TITLE": "बीट हजेरी",
        "SUBTITLE": "पन्ना साइट ऑपरेशन",
        "LIVE": "थेट",
        "CAPTURE_ID": "ओळखपत्र कॅप्चर करा",
        "LIVE_TRACKING": "थेट ट्रॅकिंग",
        "RANGER": "रेंजर",
        "REGION": "प्रादेशिक क्षेत्र",
        "DETECTED_GEOFENCE": "ओळखले गेलेले जिओफेन्स",
        "ENTRY": "प्रवेश",
        "EXIT": "बाहेर",
        "MARK_BUTTON": "हजेरी नोंदवा",
        "GPS_NOTICE": "GPS ट्रॅकिंग सक्रिय आहे. सिस्टम नोंदणी करत आहे: {{address}}"
      }
    }
  };

  getTranslationByLang(lang: string) {
    // Returns requested language, or English if it doesn't exist
    return this.translations[lang] || this.translations['en'];
  }
}