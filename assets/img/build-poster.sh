#!/bin/bash
# Builds the Charity Carnival Blast & Mega Raffle Draw poster (1080x1620) — blue/white/green brand
cd "$(dirname "$0")"

GREEN="#22c55e"
GREEN_SOLID="#16a34a"
GREEN_DARK="#15803d"
BLUE="#0a3d8f"
WHITE="#ffffff"
FB="DejaVu-Sans-Bold"
FR="DejaVu-Sans"

magick poster-bg.jpg -resize 1080x1620^ -gravity center -extent 1080x1620 \
  -fill "rgba(4,25,60,0.58)" -draw "rectangle 0,0 1080,1620" \
  \
  -fill "rgba(7,40,95,0.94)" -draw "rectangle 0,0 1080,128" \
  -fill "$GREEN" -draw "rectangle 0,128 1080,134" \
  -font "$FB" -pointsize 48 -fill "$WHITE" -gravity North -annotate +0+42 "DYNASTY OF HOPE FOUNDATION" \
  \
  -font "$FB" -pointsize 34 -fill "$WHITE" -gravity North -annotate +0+168 "YOU ARE INVITED TO OUR" \
  \
  -font "$FB" -pointsize 104 -fill "$WHITE" -gravity North -annotate +0+235 "CHARITY" \
  -font "$FB" -pointsize 86 -fill "$WHITE" -gravity North -annotate +0+355 "CARNIVAL BLAST" \
  -font "$FB" -pointsize 56 -fill "$WHITE" -gravity North -annotate +0+462 "& MEGA RAFFLE DRAW" \
  \
  -fill "rgba(255,255,255,0.97)" -stroke "$GREEN_SOLID" -strokewidth 4 -draw "roundrectangle 90,570 990,940 28,28" -stroke none \
  -font "$FB" -pointsize 30 -fill "$GREEN_DARK" -gravity North -annotate +0+602 "DATE" \
  -font "$FB" -pointsize 48 -fill "$BLUE" -gravity North -annotate +0+642 "Sunday, 27th December 2026" \
  -font "$FB" -pointsize 30 -fill "$GREEN_DARK" -gravity North -annotate +0+722 "VENUE" \
  -font "$FB" -pointsize 40 -fill "$BLUE" -gravity North -annotate +0+762 "Goni Gora Government Primary School," \
  -font "$FB" -pointsize 40 -fill "$BLUE" -gravity North -annotate +0+812 "U/Bijeh, Kaduna" \
  -font "$FR" -pointsize 30 -fill "$BLUE" -gravity North -annotate +0+880 "A day of fun, giving and celebration with the community" \
  \
  -fill "rgba(255,255,255,0.14)" -stroke "$GREEN" -strokewidth 2 -draw "roundrectangle 95,990 320,1070 16,16" \
  -fill "rgba(255,255,255,0.14)" -stroke "$GREEN" -strokewidth 2 -draw "roundrectangle 340,990 545,1070 16,16" \
  -fill "rgba(255,255,255,0.14)" -stroke "$GREEN" -strokewidth 2 -draw "roundrectangle 565,990 770,1070 16,16" \
  -fill "rgba(255,255,255,0.14)" -stroke "$GREEN" -strokewidth 2 -draw "roundrectangle 790,990 985,1070 16,16" \
  -stroke none \
  -font "$FB" -pointsize 32 -fill "$WHITE" -gravity North -annotate -335+1014 "GAMES" \
  -font "$FB" -pointsize 32 -fill "$WHITE" -gravity North -annotate -100+1014 "MUSIC" \
  -font "$FB" -pointsize 32 -fill "$WHITE" -gravity North -annotate +130+1014 "FOOD" \
  -font "$FB" -pointsize 30 -fill "$WHITE" -gravity North -annotate +348+1014 "PRIZES" \
  \
  -font "$FB" -pointsize 40 -fill "$WHITE" -gravity North -annotate +0+1130 "BIG PRIZES TO BE WON IN OUR" \
  -font "$FB" -pointsize 56 -fill "$WHITE" -gravity North -annotate +0+1185 "MEGA RAFFLE DRAW!" \
  \
  -font "$FR" -pointsize 34 -fill "#dff3e6" -gravity North -annotate +0+1268 "Proceeds support community development," \
  -font "$FR" -pointsize 34 -fill "#dff3e6" -gravity North -annotate +0+1312 "education and health outreach in Gonigora" \
  \
  -font "$FB" -pointsize 42 -fill "$WHITE" -gravity North -annotate +0+1368 "COME WITH FAMILY & FRIENDS!" \
  \
  -fill "rgba(6,40,24,0.95)" -draw "rectangle 0,1440 1080,1620" \
  -fill "$GREEN" -draw "rectangle 0,1440 1080,1446" \
  -font "$FB" -pointsize 28 -fill "$WHITE" -gravity North -annotate +0+1456 "Call / WhatsApp: 0903 698 9696, 0703 382 8292" \
  -font "$FR" -pointsize 24 -fill "#cfe6d8" -gravity North -annotate +0+1496 "Email: Dynastyofhope2023@gmail.com" \
  -font "$FB" -pointsize 24 -fill "$WHITE" -gravity North -annotate +0+1532 "CARNIVAL SPONSORSHIP PROPOSAL:" \
  -font "$FR" -pointsize 24 -fill "#cfe6d8" -gravity North -annotate +0+1564 "dynastyofhope.github.io/dynastyofhope/proposal-carnival.html" \
  poster-carnival.jpg

echo "poster-carnival.jpg rebuilt (blue/white/green)"
