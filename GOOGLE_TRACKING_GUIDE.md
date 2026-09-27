# Google Ads & Google Tag Tracking Rehberi — Aura Glow by Mürvet

Bu doküman, sitenizde aktif olan gelişmiş izleme, ilişkilendirme (*attribution*), Google Consent Mode v2 ve Google Ads optimizasyon altyapısını açıklar.

---

## 1. URL Exclusions (Google Ads Final URL Genişletmesi Hariç Tutmaları)

Google Ads arama veya Performance Max kampanyalarında **Final URL Expansion (Nihai URL Genişletmesi)** açık olduğunda, yapay zeka reklam trafiğini sitenizin herhangi bir sayfasına yönlendirebilir.

Reklam bütçenizin boşa gitmemesi ve dönüşüm odaklı kalması için **Google Ads panelinde şu URL Hariç Tutma (URL Exclusion) kurallarını mutlaka ekleyin**:

### 🚫 Google Ads Kampanya Ayarlarında Hariç Tutulacak URL Kuralları:
Google Ads Paneli ➔ İlgili Kampanya ➔ **Ayarlar (Settings)** ➔ **Nihai URL Genişletmesi (Final URL Expansion)** ➔ **URL'leri Hariç Tut (Exclude URLs)**:

| Kural Türü | Hariç Tutulacak Değer | Açıklama |
| :--- | :--- | :--- |
| **URL İçerir** | `/datenschutz` | Gizlilik Politikası (Reklam tıklaması almamalı) |
| **URL İçerir** | `/impressum` | Yasal Künye Sayfası |
| **URL İçerir** | `/agb` | Kullanım ve Randevu İptal Şartları |
| **URL İçerir** | `/widerruf` | Cayma Hakkı Sayfası |
| **URL İçerir** | `/ueber-uns` | Hakkımızda Sayfası (Doğrudan dönüşüm sayfası değildir) |
| **URL İçerir** | `/danke` | Teşekkür / Başarı Sayfası (Dönüşüm tetikleyici) |
| **URL Başlar** | `/admin` | Yönetim Paneli |
| **URL İçerir** | `careers` / `jobs` | İleride açılabilecek iş ilanları |

> **Web Sitesi Tarafındaki Önlem:** `/danke` sayfasında `<meta name="robots" content="noindex, nofollow" />` aktiftir.

---

## 2. Google Tag Manager (GTM) ve Google Tag Kurulumu

Sitede GTM için tam altyapı kurulmuştur. Tek yapmanız gereken Vercel veya `.env.local` ortam değişkenlerine konteyner ID'nizi eklemektir:

```env
# Google Tag Manager (Tavsiye Edilen)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# VEYA Doğrudan Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 🎯 GTM İçerisinde Dinlenebilecek Hazır DataLayer Olayları (*Events*):
GTM içinde kod yazmadan bu olayları Tetikleyici (Trigger) olarak seçebilirsiniz:

1. **`appointment_request`**: Randevu formu başarıyla gönderildiğinde tetiklenir.
   - Parametreler: `user_id`, `gclid`, `treatment_name`, `value: 50`, `currency: 'EUR'`, `user_data` (Hashed email & phone).
2. **`contact_submit`**: İletişim formu başarıyla gönderildiğinde tetiklenir.
   - Parametreler: `user_id`, `gclid`, `treatment_name: subject`, `value: 10`, `currency: 'EUR'`, `user_data`.
3. **`conversion`**: Genel dönüşüm etiketi.
4. **`contact_channel_click`**: Müşteri doğrudan arama, WhatsApp veya e-posta butonuna bastığında tetiklenir.
   - Parametreler: `channel: 'phone' | 'whatsapp' | 'email'`, `target`, `user_id`, `gclid`.
5. **`cta_click`**: Müşteri sayfadaki önemli aksiyon butonlarına bastığında tetiklenir (`cta_name`, `destination`, `user_id`).
6. **`consent_update`**: Google Consent Mode v2 onay durumu değiştiğinde tetiklenir.

---

## 3. First-Party Cookie ve Cihazlar Arası Tekil Kullanıcı ID (`user_id`)

- **Nasıl Çalışır?** Sitede her ziyaretçiye özel benzersiz bir `_auraglow_uid` tanımlanır.
- **1st-Party Cookie Dayanıklılığı:** 1 yıllık süreyle tarayıcının kendi birinci taraf çerezi (`SameSite=Lax; Secure`) ve `localStorage` içinde saklanır.
- **Cihazlar Arası Eşleştirme:** Kullanıcı telefondan girip form doldurursa ve daha sonra bilgisayardan da aynı e-posta veya telefonla form doldurursa, SHA-256 ile özetlenen müşteri bilgisi sayesinde Google Analytics ve Google Ads bu iki oturumu **aynı tekil kişi** olarak birleştirir.

---

## 4. Google Ads Enhanced Conversions (Gelişmiş Dönüşümler)

Form gönderildiğinde müşterinin girdiği:
- **E-posta adresi**
- **Telefon numarası**

Google'ın katı gizlilik standartlarına uygun olarak tarayıcı içinde anında **SHA-256 algoritmasıyla şifrelenir** (hash'lenir) ve dataLayer'a `user_data.email` ve `user_data.phone_number` olarak iletilir.
- Bu sayede Google Ads, çerezler silinse dahi Google hesabıyla eşleştirme yaparak reklam dönüşümünü **%100 doğrulukla** kaydeder.

---

## 5. Auto-tagging & GCLID Kaybolmama Koruması (*Anti-Redirect Loss*)

Kullanıcı reklamınıza tıkladığında URL'ye otomatik olarak `?gclid=...` eklenir. Sitede şu mekanizma aktiftir:
1. `captureAndPersistAttribution()` fonksiyonu URL'deki `gclid`, `gbraid`, `wbraid`, `fbclid` ve `utm_*` etiketlerini anında yakalar.
2. Bunları 90 gün geçerli birinci taraf `_auraglow_gclid` ve `_auraglow_attr` çerezine yazar.
3. Kullanıcı site içinde gezinse, yönlendirilse veya sayfayı yenilese dahi GCLID hafızada kalır ve form gönderildiğinde dönüşüm verisine iliştirilir.

---

## 6. Cross-Domain Linking (Alan Adları Arası Yolculuk Bağlama)

Müşteri sitenizdeki farklı alan adları arasında geçiş yaparsa oturumun kopmaması için Google Tag bağlayıcısı yapılandırılmıştır:
```javascript
gtag('set', 'linker', {
  'domains': ['auraglow.de', 'www.auraglow.de', 'auragl.vercel.app'],
  'accept_incoming': true
});
```

---

## 7. iframe Güvenlik Kuralı (*Don't Load Tags in iframe*)

Google'ın en önemli best-practice kuralı: **"Tag'leri asla iframe içinden çalıştırmayın."**
- Kod tabanımızda `window.self !== window.top` kontrolü bulunur.
- Site başka bir sitenin iframe'i içine gömülürse etiketlerin yetkisiz veya hatalı çalışması engellenir; etiketler her zaman yalnızca en üst pencere seviyesinde (*top-level window*) güvenle yürütülür.
