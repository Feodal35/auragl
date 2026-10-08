"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  DollarSign,
  Image as ImageIcon,
  FolderOpen,
  Palette,
  CalendarDays,
  MessageSquare,
  Settings,
  Globe,
  ShieldCheck,
  Search,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Lightbulb,
  Star,
} from "lucide-react";

interface GuideSection {
  id: string;
  icon: any;
  href: string;
  category: string;
  categoryTr: string;
  titleDe: string;
  titleTr: string;
  badgeDe: string;
  badgeTr: string;
  summaryDe: string;
  summaryTr: string;
  purposeDe: string;
  purposeTr: string;
  stepsDe: string[];
  stepsTr: string[];
  tipsDe: string[];
  tipsTr: string[];
}

const guideSections: GuideSection[] = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    category: "Übersicht",
    categoryTr: "Genel Bakış",
    titleDe: "1. Studio Dashboard (Übersicht & Kennzahlen)",
    titleTr: "1. Kontrol Paneli (Genel Bakış & İstatistikler)",
    badgeDe: "Startseite",
    badgeTr: "Başlangıç",
    summaryDe: "Zentrale Schaltstelle mit Echtzeit-Kennzahlen, neuen Anfragen und Schnellzugriffen.",
    summaryTr: "Yeni talepleri, okunmamış mesajları ve stüdyo durumunu anlık gösteren ana kumanda merkezi.",
    purposeDe: "Schneller Überblick über offene Terminanfragen, neue Nachrichten, aktive Behandlungen und Galeriebilder ohne langes Suchen.",
    purposeTr: "Stüdyonuzun güncel durumunu, yeni gelen müşteri randevularını ve okunmamış mesajları tek bir ekranda hızlıca görmek.",
    stepsDe: [
      "Obere 4 Kacheln prüfen: Hier sehen Sie die Anzahl der neuen Terminanfragen ('neu' in Gelb), eingegangene Nachrichten, aktive Behandlungen und Fotos.",
      "Schnellzugriff nutzen: Mit einem Klick auf die 4 Aktionskarten (Behandlung anlegen, Preise pflegen, Hintergründe ändern, Texte anpassen) springen Sie direkt zum Ziel.",
      "Tabelle 'Aktuelle Terminanfragen': Zeigt die neuesten Kunden mit Name, Telefonnummer, Wunschbehandlung und Termin. Über 'Bearbeiten' gelangen Sie direkt zur vollständigen Anfrage.",
    ],
    stepsTr: [
      "Üstteki 4 bilgi kutusunu kontrol edin: Yeni gelen randevu taleplerini ('neu' sarı rozetiyle), yeni mesajları, aktif tedavi ve fotoğraf sayısını anında görün.",
      "Hızlı erişim butonlarını kullanın: 'Behandlung anlegen' (Tedavi ekle), 'Preise pflegen' (Fiyatları düzenle) gibi kısayollarla istediğiniz ekrana tek tıkla gidin.",
      "En son randevu tablosu: Müşterinin adını, telefonunu, seçtiği bakımı ve talep ettiği tarihi gösterir. 'Bearbeiten' (Düzenle) linkiyle doğrudan randevu detayına geçebilirsiniz.",
    ],
    tipsDe: [
      "Tipp: Prüfen Sie das Dashboard morgens und abends kurz auf neue Einträge.",
      "Alle Zahlen basieren auf echten Datenbank-Einträgen in Echtzeit.",
    ],
    tipsTr: [
      "İpucu: Güne başlarken ve gün sonunda kontrol panelini kontrol ederek yeni müşteri taleplerini kaçırmayın.",
      "Tüm sayılar ve veriler doğrudan gerçek veritabanınızdan anlık olarak çekilir.",
    ],
  },
  {
    id: "inhalte",
    icon: FileText,
    href: "/admin/inhalte",
    category: "CMS",
    categoryTr: "İçerik Yönetimi",
    titleDe: "2. Inhalte & Texte verwalten (CMS)",
    titleTr: "2. İçerikler ve Metinler (CMS Metin Yönetimi)",
    badgeDe: "Website-Texte",
    badgeTr: "Site Metinleri",
    summaryDe: "Texte, Slogans, Beschreibungen und Mürvets Biografie ohne Programmieraufwand ändern.",
    summaryTr: "Ana sayfadaki başlıklar, Mürvet hanımın biyografisi ve tanıtım yazılarını kod yazmadan değiştirin.",
    purposeDe: "Pflege aller redaktionellen Texte der Website, um Angebote, Vorstellungen und Qualitätssiegel aktuell zu halten.",
    purposeTr: "Sitenizdeki tüm tanıtım metinlerini, hizmet açıklamalarını ve stüdyo vizyonunu güncel tutmak.",
    stepsDe: [
      "Menüpunkt 'Inhalte' aufrufen.",
      "Den gewünschten Textabschnitt auswählen (z. B. Hero-Slogan, Über Mürvet, Qualitätsversprechen).",
      "Den Text im Eingabefeld nach Wunsch anpassen oder erweitern.",
      "Unten auf 'Änderungen speichern' klicken. Die Website aktualisiert die Texte sofort.",
    ],
    stepsTr: [
      "Sol menüden 'İçerikler & Metinler' (Inhalte) sekmesine tıklayın.",
      "Düzenlemek istediğiniz metin kutusunu bulun (Örn: Ana Sayfa Başlığı, Mürvet Hakkında Biyografi, Neden Biz?).",
      "Kutuya yeni cümlenizi veya paragrafınızı yazın.",
      "Sayfanın altındaki 'Kaydet' butonuna basın. Web sitenizde yeni metinler hemen aktif hale gelir.",
    ],
    tipsDe: [
      "Tipp: Halten Sie Texte prägnant, kundenorientiert und betonen Sie Hygiene und Wohlfühlatmosphäre.",
    ],
    tipsTr: [
      "İpucu: Metinlerin müşteriye güven veren, sıcak ve profesyonel bir tonda olmasına dikkat edin.",
    ],
  },
  {
    id: "leistungen",
    icon: Sparkles,
    href: "/admin/leistungen",
    category: "Services",
    categoryTr: "Hizmetler",
    titleDe: "3. Behandlungen & Dienstleistungen anlegen",
    titleTr: "3. Hizmetler & Tedaviler (Behandlungen)",
    badgeDe: "Kernangebot",
    badgeTr: "Ana Hizmetler",
    summaryDe: "Behandlungen erstellen, bearbeiten, Dauer festlegen und aktivieren oder pausieren.",
    summaryTr: "Yeni tedaviler ekleyin, açıklama ve süre belirleyin, istediğiniz zaman aktif/pasif yapın.",
    purposeDe: "Strukturierte Verwaltung des Behandlungskatalogs (Wimpernlifting, Browlifting, Microneedling, etc.).",
    purposeTr: "Stüdyoda uygulanan tüm güzellik işlemlerini ve detaylarını düzenli bir katalog olarak yönetmek.",
    stepsDe: [
      "Auf 'Behandlung anlegen' klicken, um ein neues Angebot hinzuzufügen.",
      "Titel, Kategorie (z. B. Wimpern & Brauen, Gesichtsbehandlungen), Dauer in Minuten (z. B. 60 min) und Beschreibung eingeben.",
      "Bestehende Behandlungen über 'Bearbeiten' anpassen.",
      "Mit dem Schalter 'Aktiv / Inaktiv' können Behandlungen vorübergehend von der Website ausgeblendet werden, ohne sie zu löschen.",
    ],
    stepsTr: [
      "Yeni bir işlem eklemek için 'Neue Behandlung' (Yeni Tedavi Ekle) butonuna tıklayın.",
      "Başlık (Örn: Lash Lifting Deluxe), kategori, süre (Örn: 60 dk) ve detaylı açıklama girin.",
      "Mevcut tedavileri 'Bearbeiten' (Düzenle) butonuyla dilediğiniz zaman güncelleyin.",
      "Geçici olarak sunmadığınız bir hizmeti silmek yerine 'Aktiv / Inaktiv' anahtarıyla siteden gizleyebilirsiniz.",
    ],
    tipsDe: [
      "Tipp: Geben Sie realistische Behandlungszeiten an, damit Kunden ihren Besuch optimal planen können.",
    ],
    tipsTr: [
      "İpucu: Gerçekçi işlem süreleri belirtmek müşterilerin randevularını planlamasını kolaylaştırır.",
    ],
  },
  {
    id: "preise",
    icon: DollarSign,
    href: "/admin/preise",
    category: "Preise",
    categoryTr: "Fiyatlandırma",
    titleDe: "4. Preise & Pakete pflegen (PAngV-konform)",
    titleTr: "4. Fiyat Listesi & Paketler (PAngV Uyumluluğu)",
    badgeDe: "Rechtskonform",
    badgeTr: "Yasal Uyumluluk",
    summaryDe: "Preise und Kombipakete flexibel anpassen – transparent und nach deutscher PAngV.",
    summaryTr: "Hizmet ve paket fiyatlarını belirleyin; Alman Fiyat Belirtme Yönetmeliği'ne tam uyumludur.",
    purposeDe: "Einhaltung der deutschen Preisangabenverordnung (PAngV) mit vollständigen Endpreisen inklusive gesetzlicher Mehrwertsteuer.",
    purposeTr: "Fiyatları şeffaf bir şekilde listelemek ve Alman tüketici yasalarına (PAngV) uygun olarak KDV dahil göstermek.",
    stepsDe: [
      "In der Preisübersicht die gewünschte Kategorie oder Behandlung auswählen.",
      "Den Betrag in Euro eintragen (z. B. 59,00 €).",
      "Kombi-Angebote oder Kennenlern-Preise eintragen.",
      "Auf 'Preise speichern' klicken. Die Preisliste auf der Website aktualisiert sich umgehend.",
    ],
    stepsTr: [
      "Fiyat listesinden değiştirmek istediğiniz tedaviyi veya paketi bulun.",
      "Yeni fiyatı Euro (€) olarak girin (Örn: 59,00 €).",
      "Kombine paket veya özel fırsat fiyatlarını ekleyin.",
      "'Kaydet' butonuna basın. Sitedeki /preise sayfası anında güncellenir.",
    ],
    tipsDe: [
      "Wichtig: Geben Sie stets Endpreise an. Ein Hinweis auf Mehrwertsteuerbefreiung (§ 19 UStG) oder inkl. MwSt. wird automatisch rechtssicher angezeigt.",
    ],
    tipsTr: [
      "Yasal Uyarı: Fiyatların daima nihai fiyat (Endpreis) olmasına dikkat edin. Sitede gerekli yasal KDV ve tüketici dipnotu otomatik yer alır.",
    ],
  },
  {
    id: "bewertungen",
    icon: Star,
    href: "/admin/bewertungen",
    category: "Social Proof",
    categoryTr: "Müşteri Yorumları",
    titleDe: "5. Kundenstimmen & Bewertungen verwalten",
    titleTr: "5. Müşteri Yorumları & Değerlendirmeleri Yönetme",
    badgeDe: "Live-Feedback",
    badgeTr: "Canlı Görünüm",
    summaryDe: "Echte Kundenerfahrungen, Bewertungen und Sterne auf der Startseite anpassen.",
    summaryTr: "Ana sayfada görünen gerçek müşteri yorumlarını, yıldız puanlarını ve doğrulanmış rozetleri yönetin.",
    purposeDe: "Stärkung des Kundenvertrauens durch verifizierte Erfahrungsberichte mit 100% sofortiger Synchronisation.",
    purposeTr: "Müşteri güvenini artırmak için doğrulanmış referansları anında ana sayfaya yansıtmak.",
    stepsDe: [
      "Über 'Neue Bewertung anlegen' neue Kundenstimmen hinzufügen.",
      "Name, Wohnort/Region, Behandlung, Bewertungstext und Sterne (1-5) eintragen.",
      "Mit 'Aktiv / Inaktiv' festlegen, welche Bewertungen aktuell auf der Startseite sichtbar sind.",
      "Änderungen werden dank dynamischer Revalidierung sofort live auf der Startseite übernommen.",
    ],
    stepsTr: [
      "'Yeni Yorum Ekle' butonuyla yeni müşteri yorumları ekleyin.",
      "Müşteri adı, şehir/konum, alınan hizmet, yorum metni ve yıldız puanını (1-5) belirleyin.",
      "'Aktif / Pasif' butonuyla hangi yorumların ana sayfada yayınlanacağını anında seçin.",
      "Kaydettiğiniz tüm değişiklikler anında canlı sitede güncellenir.",
    ],
    tipsDe: [
      "Tipp: 4 bis 6 aussagekräftige Bewertungen mit verifiziertem Besuch erhöhen die Konversionsrate von Neukunden spürbar.",
    ],
    tipsTr: [
      "İpucu: Doğrulanmış rozetli 4-6 nitelikli yorum yeni müşterilerin randevu alma oranını belirgin şekilde artırır.",
    ],
  },
  {
    id: "galerie",
    icon: ImageIcon,
    href: "/admin/galerie",
    category: "Medien",
    categoryTr: "Görsel Medya",
    titleDe: "5. Vorher-Nachher Galerie verwalten",
    titleTr: "5. Öncesi / Sonrası Galerisi (Vorher / Nachher)",
    badgeDe: "Ergebnisse",
    badgeTr: "Uygulama Sonuçları",
    summaryDe: "Erfolgreiche Behandlungen präsentieren: Vorher-Nachher Bilder hochladen und ordnen.",
    summaryTr: "Müşterilerinize yaptığınız başarılı uygulamaların öncesi/sonrası fotoğraflarını yükleyin.",
    purposeDe: "Schafft maximales Vertrauen bei Neukunden durch authentische Ergebnisbilder Ihrer Arbeit.",
    purposeTr: "Yeni müşterilerinize gerçek ve kaliteli sonuçları göstererek güven ve randevu dönüşümünü artırmak.",
    stepsDe: [
      "Auf 'Neues Bild hochladen' klicken.",
      "Bilddatei auswählen (JPG, PNG oder WebP).",
      "Titel und passende Kategorie (z. B. Wimpernlifting, Gesichtsbehandlung) auswählen.",
      "Das Bild wird automatisch für Bestnoten bei Google PageSpeed in das WebP-Format konvertiert.",
    ],
    stepsTr: [
      "'Neues Bild hochladen' (Yeni Fotoğraf Yükle) butonuna tıklayın.",
      "Telefon veya bilgisayarınızdan net bir fotoğraf seçin.",
      "Kategori (Wimpernlifting, Microneedling vb.) ve kısa bir başlık ekleyin.",
      "Sistem fotoğrafı otomatik olarak sıkıştırıp ultra hızlı WebP formatına çevirir.",
    ],
    tipsDe: [
      "Tipp: Gute, schattenfreie Beleuchtung und Nahaufnahmen erzielen die größte Wirkung bei Interessenten.",
    ],
    tipsTr: [
      "İpucu: Doğal ışıkta çekilmiş, gölgesiz yakın çekimler müşteriler üzerinde en yüksek etkiyi bırakır.",
    ],
  },
  {
    id: "medien",
    icon: FolderOpen,
    href: "/admin/medien",
    category: "Medien",
    categoryTr: "Dosya Yönetimi",
    titleDe: "6. Mediathek & Dateimanager",
    titleTr: "6. Medya Kütüphanesi & Dosya Yöneticisi",
    badgeDe: "Zentraler Speicher",
    badgeTr: "Merkezi Depo",
    summaryDe: "Alle Logos, Banner, Zertifikate und Hintergrundbilder an einem zentralen Ort verwalten.",
    summaryTr: "Sitedeki tüm logolar, banner'lar, sertifikalar ve arka planları tek bir havuzda yönetin.",
    purposeDe: "Zentrale Verwaltung aller Mediendateien ohne doppelte Uploads oder Speicherplatzverschwendung.",
    purposeTr: "Tüm medya dosyalarını tek bir yerden yönetmek, bağlantılarını kopyalamak ve düzenli tutmak.",
    stepsDe: [
      "Dateien per Drag-and-Drop in den Upload-Bereich ziehen oder 'Datei auswählen' klicken.",
      "Hochgeladene Dateien ansehen, umbenennen oder nicht mehr benötigte Bilder löschen.",
      "Die Bild-URL kann mit einem Klick kopiert werden, um sie in Inhalten zu verknüpfen.",
    ],
    stepsTr: [
      "Dosyaları sürükleyip bırakarak veya 'Dosya Seç'e basarak yükleyin.",
      "Yüklenen resimleri listeleyin, gereksiz eski fotoğrafları silin.",
      "Görsel bağlantısını (URL) tek tıkla kopyalayıp dilediğiniz yerde kullanabilirsiniz.",
    ],
    tipsDe: [
      "Tipp: Nutzen Sie aussagekräftige Dateinamen (z. B. 'murvet-wimpernlifting-stuttgart.webp') für besseres Google-Ranking.",
    ],
    tipsTr: [
      "İpucu: Dosya isimlerini anlaşılır koymanız (Örn: 'murvet-wimpernlifting-stuttgart.webp') Google görsel aramalarında öne çıkmanızı sağlar.",
    ],
  },
  {
    id: "design",
    icon: Palette,
    href: "/admin/design",
    category: "Optik",
    categoryTr: "Görsel Tasarım",
    titleDe: "7. Design, Farben & Hero-Hintergründe",
    titleTr: "7. Tasarım, Renkler & Hero Arka Planı",
    badgeDe: "Markenidentität",
    badgeTr: "Marka Görünümü",
    summaryDe: "Das visuelle Erscheinungsbild der Startseite, Hero-Hintergründe und Studio-Atmosphäre anpassen.",
    summaryTr: "Ana sayfa ekranındaki büyük arka plan fotoğrafını ve stüdyo atmosferini kolayca değiştirin.",
    purposeDe: "Saisonal oder nach Renovierungen das Erscheinungsbild der Website auf Knopfdruck anpassen.",
    purposeTr: "Mevsimsel veya yenilik dönemlerinde sitenizin ana vitrin görselini zahmetsizce güncellemek.",
    stepsDe: [
      "Hero-Hintergrundbild-Sektion öffnen.",
      "Aus der Mediathek ein neues hochauflösendes Studio-Bild auswählen oder hochladen.",
      "Auf 'Design-Einstellungen speichern' klicken.",
      "Die Startseite übernimmt den neuen Hintergrund sofort mit sanftem Parallax-Effekt.",
    ],
    stepsTr: [
      "Hero Arka Planı bölümünü açın.",
      "Medya kütüphanesinden veya bilgisayarınızdan kaliteli bir stüdyo fotoğrafı seçin.",
      "'Tasarımı Kaydet' butonuna basın.",
      "Ana sayfanız yeni arka plan fotoğrafıyla modern ve şık bir şekilde güncellenir.",
    ],
    tipsDe: [
      "Tipp: Wählen Sie ruhige Bilder, damit der Text im Vordergrund für mobile Besucher gut lesbar bleibt.",
    ],
    tipsTr: [
      "İpucu: Yazıların telefondan rahat okunabilmesi için çok kalabalık olmayan, zarif fotoğraflar tercih edin.",
    ],
  },
  {
    id: "anfragen",
    icon: CalendarDays,
    href: "/admin/anfragen",
    category: "Termine",
    categoryTr: "Randevular",
    titleDe: "8. Terminanfragen & Buchungen verwalten",
    titleTr: "8. Randevu Talepleri Yönetimi (Terminanfragen)",
    badgeDe: "Kundenkontakt",
    badgeTr: "Müşteri İletişimi",
    summaryDe: "Eingehende Buchungsanfragen einsehen, Status pflegen und Kunden per Telefon/WhatsApp kontaktieren.",
    summaryTr: "Online formdan gelen randevu başvurularını listeleyin, durumunu güncelleyin ve müşteriyi arayın.",
    purposeDe: "Zentraler Posteingang für Terminwünsche Ihrer Kundinnen mit vollständigen Kontaktdaten.",
    purposeTr: "Web sitesinden randevu almak isteyen müşterilerin taleplerini kaçırmadan hızlıca karşılamak.",
    stepsDe: [
      "Tabelle aller Anfragen prüfen. Sortiert nach Datum (neueste zuerst).",
      "Auf eine Anfrage klicken, um Details wie Wunschbehandlung, Bemerkungen und Wunschzeit zu sehen.",
      "Den Kunden direkt über die Telefonnummer anrufen oder per WhatsApp kontaktieren.",
      "Den Status ändern: 'neu' ➔ 'bestätigt' ➔ 'erledigt' (oder 'storniert' falls verhindert).",
    ],
    stepsTr: [
      "Gelen randevu listesini kontrol edin (en yeniden en eskiye sıralıdır).",
      "Talep üzerine tıklayarak müşterinin notunu, istediği saati ve tedaviyi inceleyin.",
      "Müşteriyi kayıtlı telefon numarasından doğrudan arayın veya WhatsApp'tan mesaj atarak randevuyu kesinleştirin.",
      "Durumu açılır listeden güncelleyin: 'neu' (yeni) ➔ 'bestätigt' (onaylandı) ➔ 'erledigt' (tamamlandı).",
    ],
    tipsDe: [
      "Goldene Regel: Je schneller Sie auf eine Anfrage antworten, desto höher ist die Buchungs- und Abschlussquote!",
    ],
    tipsTr: [
      "Altın Kural: Randevu talebine ilk 1 saat içinde geri dönüş yapmak müşteri sadakatini ve katılım oranını çok artırır.",
    ],
  },
  {
    id: "nachrichten",
    icon: MessageSquare,
    href: "/admin/nachrichten",
    category: "Kommunikation",
    categoryTr: "İletişim",
    titleDe: "9. Kontakt-Nachrichten & E-Mails",
    titleTr: "9. İletişim Mesajları & E-postalar",
    badgeDe: "Postfach",
    badgeTr: "Gelen Kutusu",
    summaryDe: "Nachrichten aus dem allgemeinen Kontaktformular lesen, beantworten und archivieren.",
    summaryTr: "İletişim formundan gönderilen soruları, iş tekliflerini ve danışma mesajlarını inceleyin.",
    purposeDe: "Strukturierter Eingang für allgemeine Anfragen abseits von reinen Terminen.",
    purposeTr: "Fiyat soran, stüdyo adresi danışan veya özel istek bildiren müşterilerin mesajlarını organize etmek.",
    stepsDe: [
      "In der Nachrichtenliste neue Nachrichten auswählen.",
      "Die Kundenanfrage und E-Mail-Adresse/Telefonnummer einsehen.",
      "Über Ihr E-Mail-Programm oder Telefon direkt antworten.",
      "Nach Erledigung auf 'Als gelesen markieren' setzen oder archivieren.",
    ],
    stepsTr: [
      "Gelen mesaj listesinden ilgili mesaja tıklayın.",
      "Müşterinin sorusunu ve iletişim bilgilerini okuyun.",
      "Müşteriye telefonla veya e-posta ile yanıt verin.",
      "İşiniz bittiğinde mesajı 'Okundu' olarak işaretleyip arşivleyin.",
    ],
    tipsDe: [
      "Tipp: Löschen Sie Anfragen nicht sofort, um bei Rückfragen des Kunden den Verlauf griffbereit zu haben.",
    ],
    tipsTr: [
      "İpucu: Eski mesajları hemen silmemek, geçmişte sorulan sorulara referans vermek açısından faydalıdır.",
    ],
  },
  {
    id: "einstellungen",
    icon: Settings,
    href: "/admin/einstellungen",
    category: "Studio",
    categoryTr: "Stüdyo Ayarları",
    titleDe: "10. Öffnungszeiten, Telefon & Studio-Daten",
    titleTr: "10. Çalışma Saatleri, İletişim & Stüdyo Ayarları",
    badgeDe: "Stammdaten",
    badgeTr: "Temel Bilgiler",
    summaryDe: "Öffnungszeiten, WhatsApp-Nummer, Adresse und geschäftliche Angaben pflegen.",
    summaryTr: "Çalışma saatleri, WhatsApp hattı, adres ve resmi stüdyo bilgilerini tek yerden yönetin.",
    purposeDe: "Zentrale Steuerung aller Kontaktdaten, die im Footer, auf der Kontaktseite und bei Google angezeigt werden.",
    purposeTr: "Sitenin alt bilgi (Footer), iletişim sayfası ve Google harita bilgilerini güncel tutmak.",
    stepsDe: [
      "Wochentage von Montag bis Samstag durchgehen: Öffnungszeiten (z. B. 09:00 - 18:00 Uhr) eintragen oder Ruhetage auf 'Geschlossen' setzen.",
      "Telefonnummer, WhatsApp-Direktlink und E-Mail-Adresse prüfen.",
      "Studioadresse und Anfahrtsnotizen aktualisieren.",
      "Auf 'Einstellungen speichern' klicken. Die Änderungen wirken sich sofort auf die gesamte Website aus.",
    ],
    stepsTr: [
      "Pazartesi'den Cumartesi'ye günleri kontrol edin: Açılış-kapanış saatlerini yazın (Örn: 09:00 - 18:00) veya kapalı günleri 'Geschlossen' yapın.",
      "Telefon, WhatsApp numarası ve e-posta adresini doğrulayın.",
      "Adres ve yol tarifi notlarını kontrol edin.",
      "'Ayarları Kaydet' butonuna basın. Değişiklikler sitedeki tüm sayfalara otomatik olarak yansır.",
    ],
    tipsDe: [
      "Wichtig: Ändern Sie vor Urlaubszeiten oder Feiertagen rechtzeitig Ihre Öffnungszeiten, um Missverständnisse zu vermeiden.",
    ],
    tipsTr: [
      "Önemli: Tatil veya bayram dönemlerinde çalışma saatlerinizi önceden güncelleyerek müşterilerinizin kapıda kalmasını önleyin.",
    ],
  },
  {
    id: "seo",
    icon: Globe,
    href: "/admin/seo",
    category: "Marketing",
    categoryTr: "Pazarlama & SEO",
    titleDe: "11. Google SEO & Meta-Informationen",
    titleTr: "11. Google SEO & Arama Motoru Ayarları",
    badgeDe: "Google Ranking",
    badgeTr: "Google Sıralaması",
    summaryDe: "Suchmaschinen-Titel, Meta-Beschreibungen und Tracking-Tags für maximale Sichtbarkeit optimieren.",
    summaryTr: "Google'da ilk sıralarda çıkmak için sayfa başlıkları, açıklamaları ve takip kodlarını yönetin.",
    purposeDe: "Sorgt dafür, dass Kunden Ihr Kosmetikstudio bei Google, Google Maps und KI-Suchmaschinen (Perplexity, ChatGPT) sofort finden.",
    purposeTr: "Stüdyonuzun Google, Google Haritalar ve yapay zeka aramalarında en üst sıralarda çıkmasını sağlamak.",
    stepsDe: [
      "Meta-Titel (Title Tag): Prägnanten Titel mit Hauptbegriffen eintragen (z. B. 'Aura Glow by Mürvet | Wimpernlifting & Kosmetik in Fellbach').",
      "Meta-Beschreibung (Description): Einladenden 1-2 Satz Text formulieren, der Suchende zum Klick animiert.",
      "Google Search Console & Tag Manager IDs hinterlegen.",
      "Auf 'SEO-Einstellungen speichern' klicken.",
    ],
    stepsTr: [
      "Site Başlığı (Title): Müşterilerin arattığı kelimeleri içeren başlık belirleyin (Örn: 'Aura Glow by Mürvet | Wimpernlifting & Kosmetik').",
      "Meta Açıklaması (Description): Google aramalarında çıkan 1-2 cümlelik davetkar stüdyo tanıtımı yazın.",
      "Google Search Console ve Tag Manager doğrulama kodlarını girin.",
      "'SEO Ayarlarını Kaydet' butonuna basın.",
    ],
    tipsDe: [
      "Tipp: Halten Sie den Meta-Titel unter 60 Zeichen und die Beschreibung unter 155 Zeichen, damit Google nichts abschneidet.",
    ],
    tipsTr: [
      "İpucu: Başlığın 60 karakteri, açıklamanın 155 karakteri geçmemesine özen gösterin; böylece Google yazıları tam gösterir.",
    ],
  },
  {
    id: "sicherheit",
    icon: ShieldCheck,
    href: "/admin",
    category: "Sicherheit",
    categoryTr: "Güvenlik & İpuçları",
    titleDe: "12. Wichtige Tipps, Sicherheit & Abmelden",
    titleTr: "12. Önemli Güvenlik Kuralları & Çıkış Yapma",
    badgeDe: "Sicherheit",
    badgeTr: "Güvenlik",
    summaryDe: "Richtig speichern, Passwort-Sicherheit und ordnungsgemäßes Abmelden.",
    summaryTr: "Doğru kayıt alışkanlığı, şifre güvenliği ve oturumu güvenle kapatma adımları.",
    purposeDe: "Schutz Ihrer Kundendaten und Vermeidung von unbeabsichtigten Datenverlusten.",
    purposeTr: "Müşteri bilgilerini korumak ve yaptığınız değişikliklerin kaybolmasını engellemek.",
    stepsDe: [
      "Immer 'Speichern' klicken: Wenn Sie ein Formular bearbeiten, vor dem Seitenwechsel immer auf die Speicher-Schaltfläche drücken.",
      "Mobiles Arbeiten: Das Admin-Menü funktioniert vollautomatisch auf Smartphones und Tablets. Über das Burger-Menü oben rechts erreichen Sie alle Punkte.",
      "Sicheres Abmelden: Nach getaner Arbeit unten links in der Seitenleiste auf 'Abmelden' (rotes Symbol) klicken, besonders wenn Sie geteilte Computer nutzen.",
    ],
    stepsTr: [
      "Daima 'Kaydet' butonuna basın: Bir sayfada düzenleme yaptıktan sonra başka menüye geçmeden önce mutlaka 'Speichern / Kaydet' butonuna tıklayın.",
      "Telefondan Kolay Kullanım: Yönetim paneli akıllı telefon ve tabletlerle %100 uyumludur. Sağ üstteki menü butonundan istediğiniz bölüme geçebilirsiniz.",
      "Güvenli Çıkış: İşiniz bittiğinde sol alt köşedeki kırmızı 'Çıkış Yap' (Abmelden) butonuna basarak oturumu sonlandırın.",
    ],
    tipsDe: [
      "Tipp: Geben Sie Ihre Admin-Zugangsdaten niemals an Dritte weiter. Ändern Sie das Passwort regelmäßig.",
    ],
    tipsTr: [
      "İpucu: Yönetici şifrenizi kimseyle paylaşmayın. Ortak bilgisayarlardan giriş yaptıysanız mutlaka çıkış yapın.",
    ],
  },
];

export default function AdminGuideClient() {
  const { adminLang, setAdminLang, isTr } = useAdminLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredSections = guideSections.filter((sec) => {
    const textToSearch = isTr
      ? `${sec.titleTr} ${sec.summaryTr} ${sec.purposeTr} ${sec.categoryTr}`.toLowerCase()
      : `${sec.titleDe} ${sec.summaryDe} ${sec.purposeDe} ${sec.category}`.toLowerCase();
    const matchesSearch = textToSearch.includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === "all" ||
      sec.category.toLowerCase() === selectedCategory.toLowerCase() ||
      sec.categoryTr.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header Card */}
      <div className="bg-white border border-[#E8D6C5] rounded-[1px] p-6 sm:p-8 shadow-luxury-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8D6C5]/60 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#844C36] font-semibold bg-[#844C36]/10 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {isTr ? "Kullanım Kılavuzu & Yardım" : "Handbuch & Leitfaden"}
              </span>
            </div>
            <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#392D29]">
              {isTr
                ? "Admin Menüsü Nasıl Kullanılır?"
                : "Wie benutzt man das Admin-Menü?"}
            </h1>
            <p className="text-xs sm:text-sm text-[#756A63] font-light mt-1">
              {isTr
                ? "Aura Glow yönetim panelindeki tüm menülerin, sayfaların ve özelliklerin adım adım kullanım rehberi."
                : "Schritt-für-Schritt Anleitung für alle Bereiche, Menüpunkte und Funktionen der Aura Glow Verwaltung."}
            </p>
          </div>

          {/* Guide Language Switcher */}
          <div className="shrink-0 flex items-center gap-2 bg-[#FAF6F1] border border-[#E8D6C5] p-1.5 rounded-[2px]">
            <span className="text-xs text-[#756A63] font-medium pl-1">
              {isTr ? "Rehber Dili:" : "Anleitung:"}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setAdminLang("de")}
                className={`px-3 py-1 text-xs font-bold rounded-[1px] transition-all ${
                  !isTr
                    ? "bg-[#844C36] text-white shadow-xs"
                    : "text-[#756A63] hover:text-[#392D29]"
                }`}
              >
                Deutsch
              </button>
              <button
                type="button"
                onClick={() => setAdminLang("tr")}
                className={`px-3 py-1 text-xs font-bold rounded-[1px] transition-all ${
                  isTr
                    ? "bg-[#844C36] text-white shadow-xs"
                    : "text-[#756A63] hover:text-[#392D29]"
                }`}
              >
                Türkçe
              </button>
            </div>
          </div>
        </div>

        {/* Quick Highlights / Welcome Note */}
        <div className="bg-[#FAF6F1] border border-[#E8D6C5]/70 p-4 rounded-[1px] flex items-start gap-3 text-xs text-[#5C524C]">
          <Lightbulb className="w-5 h-5 text-[#844C36] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#392D29] block mb-0.5">
              {isTr ? "Hızlı Başlangıç Notu:" : "Schnellstart-Hinweis:"}
            </span>
            <p className="leading-relaxed">
              {isTr
                ? "Aura Glow paneli stüdyonuzu kolayca yönetmeniz için tasarlandı. Sol menüden (veya mobilde sağ üst menüden) istediğiniz bölüme tıklayabilir, Türkçe ve Almanca dilleri arasında dilediğiniz an geçiş yapabilirsiniz. Aşağıdaki bölümlere tıklayarak detaylı rehberi okuyabilirsiniz."
                : "Das Aura Glow Verwaltungssystem wurde für einfache und fehlerfreie Bedienung entwickelt. Über die linke Menüleiste (am Smartphone über das Menü oben) erreichen Sie alle 11 Kernbereiche. Unten finden Sie für jeden Menüpunkt eine detaillierte Schritt-für-Schritt-Anleitung."}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#756A63] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isTr
                ? "Bölüm ara... (örn: Randevu, Fiyat, Fotoğraf, Hizmet, Saatler, Şifre)"
                : "Bereich suchen... (z. B. Termine, Preise, Galerie, Öffnungszeiten, SEO)"
            }
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF6F1]/50 border border-[#E8D6C5] rounded-[1px] text-xs text-[#392D29] placeholder:text-[#756A63]/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#844C36]"
          />
        </div>
      </div>

      {/* Guide Cards Grid */}
      <div className="space-y-4">
        {filteredSections.map((sec) => {
          const Icon = sec.icon;
          const isExpanded = expandedId === sec.id;
          const title = isTr ? sec.titleTr : sec.titleDe;
          const badge = isTr ? sec.badgeTr : sec.badgeDe;
          const summary = isTr ? sec.summaryTr : sec.summaryDe;
          const purpose = isTr ? sec.purposeTr : sec.purposeDe;
          const steps = isTr ? sec.stepsTr : sec.stepsDe;
          const tips = isTr ? sec.tipsTr : sec.tipsDe;

          return (
            <div
              key={sec.id}
              className="bg-white border border-[#E8D6C5] rounded-[1px] shadow-luxury-sm overflow-hidden transition-all hover:border-[#844C36]/40"
            >
              {/* Header / Clickable Accordion Row */}
              <div
                onClick={() => toggleExpand(sec.id)}
                className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 select-none hover:bg-[#FAF6F1]/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[1px] bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center shrink-0 text-[#844C36] mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-[#844C36] bg-[#844C36]/10 px-2 py-0.5 rounded-[1px]">
                        {badge}
                      </span>
                    </div>
                    <h2 className="font-editorial text-lg sm:text-xl text-[#392D29]">
                      {title}
                    </h2>
                    <p className="text-xs text-[#756A63] font-light mt-1 max-w-2xl leading-relaxed">
                      {summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[#844C36] font-medium hidden sm:inline">
                    {isExpanded
                      ? isTr
                        ? "Detayları Gizle"
                        : "Schließen"
                      : isTr
                      ? "Nasıl Kullanılır?"
                      : "Anleitung öffnen"}
                  </span>
                  <div className="p-1 rounded-[1px] text-[#756A63] bg-[#FAF6F1] border border-[#E8D6C5]/60">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#844C36]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Detailed Content */}
              {isExpanded && (
                <div className="border-t border-[#E8D6C5]/70 bg-[#FAF6F1]/30 p-5 sm:p-8 space-y-6">
                  {/* Purpose Box */}
                  <div className="bg-white p-4 border border-[#E8D6C5] rounded-[1px]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#844C36] block mb-1">
                      {isTr ? "🎯 Bu Bölümün Amacı Nedir?" : "🎯 Wozu dient dieser Bereich?"}
                    </span>
                    <p className="text-xs text-[#392D29] leading-relaxed">
                      {purpose}
                    </p>
                  </div>

                  {/* Step by Step Guide */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#392D29] block mb-3">
                      {isTr
                        ? "📋 Adım Adım Nasıl Kullanılır?"
                        : "📋 Schritt-für-Schritt Anleitung:"}
                    </span>
                    <div className="space-y-2.5">
                      {steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 bg-white p-3 border border-[#E8D6C5]/60 rounded-[1px]"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#844C36] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-xs text-[#5C524C] leading-relaxed">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Important Tips */}
                  {tips.length > 0 && (
                    <div className="bg-[#844C36]/5 border border-[#844C36]/20 p-4 rounded-[1px] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#844C36] flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5" />
                        {isTr ? "💡 Önemli İpucu & Püf Noktası" : "💡 Praktischer Tipp:"}
                      </span>
                      {tips.map((tip, idx) => (
                        <p key={idx} className="text-xs text-[#5C524C] leading-relaxed">
                          {tip}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Direct Jump Button */}
                  <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                    <Link
                      href={sec.href}
                      className="inline-flex items-center gap-2 bg-[#844C36] hover:bg-[#6C3D2B] text-white px-4 py-2 rounded-[1px] text-xs font-semibold uppercase tracking-wider transition-colors shadow-luxury-xs"
                    >
                      <span>
                        {isTr
                          ? `${title.split(".")[1]?.trim() || "Bölüme"} Doğrudan Git`
                          : `Direkt zu ${title.split(".")[1]?.trim() || "diesem Bereich"}`}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleExpand(sec.id)}
                      className="text-xs text-[#756A63] hover:text-[#392D29] underline"
                    >
                      {isTr ? "Rehberi Kapat" : "Schließen"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Help Card */}
      <div className="bg-white border border-[#E8D6C5] rounded-[1px] p-6 shadow-luxury-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-editorial text-lg text-[#392D29]">
            {isTr
              ? "Herhangi bir sorunuz mu var?"
              : "Benötigen Sie weitere Unterstützung?"}
          </h3>
          <p className="text-xs text-[#756A63] font-light mt-0.5">
            {isTr
              ? "Tüm ayarlar veritabanında güvenle saklanır ve dilediğiniz an geri alınabilir."
              : "Alle Änderungen werden sicher in der PostgreSQL-Datenbank gespeichert und können jederzeit angepasst werden."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="px-4 py-2 bg-[#FAF6F1] border border-[#E8D6C5] text-[#392D29] hover:bg-[#EFE6DD] text-xs font-semibold rounded-[1px] uppercase tracking-wider transition-colors"
          >
            {isTr ? "Panele Dön" : "Zum Dashboard"}
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#844C36] text-white hover:bg-[#6C3D2B] text-xs font-semibold rounded-[1px] uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
          >
            <span>{isTr ? "Siteyi Gör" : "Website öffnen"}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
