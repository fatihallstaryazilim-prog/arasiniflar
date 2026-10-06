# Vücudumuzdaki Sistemler — 7. Sınıf Fen Bilimleri Materyal Seti

7. sınıf Fen Bilimleri **3. Ünite: Vücudumuzdaki Sistemler** için etkileşimli simülasyon ve oyun seti.
İçerik, MEB *Fen Bilimleri 7 Ders Kitabı (2026-2027), 3. Ünite* ve Türkiye Yüzyılı Maarif Modeli
öğretim programındaki **FB.7.3.1 – FB.7.3.9** kazanımlarına göre hazırlanmıştır.

Açmak için `index.html` dosyasını bir tarayıcıda açmanız yeterlidir. Kurulum, sunucu ya da internet
bağlantısı gerekmez (yalnızca Lexend yazı tipi Google Fonts'tan yüklenir; çevrimdışıyken sistem yazı tipi kullanılır).
Akıllı tahta, tablet, bilgisayar ve telefonla uyumludur.

## Materyaller

| Konu | Materyal | Tür | Dosya |
|---|---|---|---|
| Sindirim | Besinin Yolculuğu | Simülasyon | `sindirim-yolculuk.html` |
| Sindirim | Sindirim Organlarını Etiketle | Etiketleme | `etiketle.html?set=sindirim` |
| Sindirim | Fiziksel mi, Kimyasal mı? | İkili seçim | `ikili.html?deste=fiziksel-kimyasal` |
| Sindirim | Doğru Çıkışı Bul | Doğru-yanlış | `dy-labirent.html?set=sindirim` |
| Dolaşım | Kalp ve Kan Dolaşımı | Simülasyon | `dolasim-kalp.html` |
| Dolaşım | Kan Laboratuvarı | Simülasyon | `kan-laboratuvari.html` |
| Dolaşım | Dolaşım Şemasını Etiketle | Etiketleme | `etiketle.html?set=dolasim` |
| Dolaşım | Atardamar mı, Toplardamar mı? | İkili seçim | `ikili.html?deste=atar-toplar` |
| Dolaşım | Kanın Bileşenleri ve Görevleri | Sıralama | `kategori.html?set=kan` |
| Dolaşım | Kan Bağışı Yapabilir mi? | İkili seçim | `ikili.html?deste=bagis` |
| Dolaşım | Doğru Çıkışı Bul | Doğru-yanlış | `dy-labirent.html?set=dolasim` |
| Solunum | Soluk Al, Soluk Ver | Simülasyon | `solunum-nefes.html` |
| Solunum | Solunum Organlarını Etiketle | Etiketleme | `etiketle.html?set=solunum` |
| Solunum | Soluk Alma mı, Soluk Verme mi? | İkili seçim | `ikili.html?deste=soluk` |
| Solunum | Doğru Çıkışı Bul | Doğru-yanlış | `dy-labirent.html?set=solunum` |
| Boşaltım | Böbrek Laboratuvarı | Simülasyon | `bosaltim-bobrek.html` |
| Boşaltım | Boşaltım Organlarını Etiketle | Etiketleme | `etiketle.html?set=bosaltim` |
| Boşaltım | Hangi Organ Uzaklaştırır? | Sıralama | `kategori.html?set=atik` |
| Boşaltım | Doğru Çıkışı Bul | Doğru-yanlış | `dy-labirent.html?set=bosaltim` |
| Ünite geneli | Çengel Bulmaca | Bulmaca | `bulmaca.html` |
| Ünite geneli | Hangi Sisteme Ait? | Sıralama | `kategori.html?set=organ` |
| Ünite geneli | Sağlığı Korur mu? | İkili seçim | `ikili.html?deste=saglik` |

## Yapı

- `index.html` — materyal seti ana sayfası (içindekiler, arama, filtre, kapaklar, ilerleme).
- `assets/zd.css`, `assets/zd.js` — ortak arayüz kiti: neon çerçeveli sahne, HUD (süre / puan / doğru / seri),
  beyaz yuvarlak ikon butonlar (nasıl oynanır, ses, yeniden başlat), WebAudio ses efektleri, ipucu eli,
  sürükle-bırak, sonuç ekranı ve konfeti.
- Her materyal tek bir HTML dosyasıdır; harici kütüphane kullanılmaz, tüm görseller vektöreldir (SVG / canvas).
- En iyi sonuçlar (yıldız ve puan) yalnızca tarayıcının yerel deposunda saklanır ve ana sayfadaki kartlarda gösterilir.
