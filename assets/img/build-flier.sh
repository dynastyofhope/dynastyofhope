#!/bin/bash
# Builds the Gonigora Football Championship flier (1080x1620) — blue/white/green brand
cd "$(dirname "$0")"

GREEN="#22c55e"      # bright green (text/lines on dark)
GREEN_SOLID="#16a34a" # solid green (chips)
GREEN_DARK="#15803d"  # labels on white
BLUE="#0a3d8f"        # deep blue (values on white)
WHITE="#ffffff"
FB="DejaVu-Sans-Bold"
FR="DejaVu-Sans"

magick flier-bg.jpg -resize 1080x1620^ -gravity center -extent 1080x1620 \
  -fill "rgba(4,20,50,0.55)" -draw "rectangle 0,0 1080,1620" \
  \
  -fill "rgba(7,40,95,0.94)" -draw "rectangle 0,0 1080,128" \
  -fill "$GREEN" -draw "rectangle 0,128 1080,134" \
  -font "$FB" -pointsize 48 -fill "$WHITE" -gravity North -annotate +0+42 "DYNASTY OF HOPE FOUNDATION" \
  \
  -font "$FB" -pointsize 34 -fill "$WHITE" -gravity North -annotate +0+170 "PROUDLY PRESENTS" \
  \
  -font "$FB" -pointsize 66 -fill "$WHITE" -gravity North -annotate +0+240 "GONIGORA COMMUNITY" \
  -font "$FB" -pointsize 66 -fill "$WHITE" -gravity North -annotate +0+318 "DEVELOPMENT FOOTBALL" \
  -font "$FB" -pointsize 58 -fill "$WHITE" -gravity North -annotate +0+400 "CHAMPIONSHIP TOURNAMENT" \
  -font "$FB" -pointsize 44 -fill "$WHITE" -gravity North -annotate +0+482 "—  K A D U N A  —" \
  \
  -fill "rgba(255,255,255,0.97)" -stroke "$GREEN_SOLID" -strokewidth 4 -draw "roundrectangle 70,565 1010,1125 28,28" -stroke none \
  -font "$FB" -pointsize 30 -fill "$GREEN_DARK" -gravity North -annotate +0+598 "DATE" \
  -font "$FB" -pointsize 46 -fill "$BLUE" -gravity North -annotate +0+638 "1st – 26th December 2026" \
  -font "$FB" -pointsize 30 -fill "$GREEN_DARK" -gravity North -annotate +0+712 "VENUE" \
  -font "$FB" -pointsize 38 -fill "$BLUE" -gravity North -annotate +0+752 "Gonigora Government Primary School," \
  -font "$FB" -pointsize 38 -fill "$BLUE" -gravity North -annotate +0+800 "Ungwan Bijeh, Kaduna" \
  -fill "$GREEN_SOLID" -draw "rectangle 160,858 920,862" \
  -font "$FB" -pointsize 30 -fill "$GREEN_DARK" -gravity North -annotate +0+880 "PRIZES" \
  \
  -fill "$GREEN_SOLID" -draw "roundrectangle 150,925 525,1020 18,18" \
  -fill "$GREEN_SOLID" -draw "roundrectangle 555,925 930,1020 18,18" \
  -font "$FB" -pointsize 28 -fill "$WHITE" -gravity North -annotate -212+938 "1ST PLACE" \
  -font "$FB" -pointsize 42 -fill "$WHITE" -gravity North -annotate -212+972 "₦100,000" \
  -font "$FB" -pointsize 28 -fill "$WHITE" -gravity North -annotate +212+938 "2ND PLACE" \
  -font "$FB" -pointsize 42 -fill "$WHITE" -gravity North -annotate +212+972 "₦50,000" \
  \
  -font "$FR" -pointsize 32 -fill "$BLUE" -gravity North -annotate +0+1048 "+ Multiple Award Categories" \
  \
  -font "$FB" -pointsize 36 -fill "$WHITE" -gravity North -annotate +0+1160 "SPONSORSHIP OPPORTUNITIES" \
  -fill "rgba(255,255,255,0.14)" -stroke "$GREEN" -strokewidth 2 -draw "roundrectangle 70,1215 293,1295 14,14" \
  -fill "rgba(255,255,255,0.14)" -stroke "$GREEN" -strokewidth 2 -draw "roundrectangle 309,1215 532,1295 14,14" \
  -fill "rgba(255,255,255,0.14)" -stroke "$GREEN" -strokewidth 2 -draw "roundrectangle 548,1215 771,1295 14,14" \
  -fill "rgba(255,255,255,0.14)" -stroke "$GREEN" -strokewidth 2 -draw "roundrectangle 787,1215 1010,1295 14,14" \
  -stroke none \
  -font "$FB" -pointsize 33 -fill "$WHITE" -gravity North -annotate -359+1238 "₦1,000,000" \
  -font "$FB" -pointsize 33 -fill "$WHITE" -gravity North -annotate -120+1238 "₦500,000" \
  -font "$FB" -pointsize 33 -fill "$WHITE" -gravity North -annotate +119+1238 "₦100,000" \
  -font "$FB" -pointsize 33 -fill "$WHITE" -gravity North -annotate +358+1238 "₦50,000" \
  \
  -font "$FB" -pointsize 40 -fill "$WHITE" -gravity North -annotate +0+1322 "REGISTER YOUR TEAM / OFFICIALS TODAY!" \
  -font "$FR" -pointsize 27 -fill "$WHITE" -gravity North -annotate +0+1380 "dynastyofhope.github.io/dynastyofhope/register.html" \
  \
  -fill "rgba(6,40,24,0.95)" -draw "rectangle 0,1430 1080,1620" \
  -fill "$GREEN" -draw "rectangle 0,1430 1080,1436" \
  -font "$FB" -pointsize 32 -fill "$WHITE" -gravity North -annotate +0+1462 "Call / WhatsApp: 0903 698 9696, 0703 382 8292" \
  -font "$FR" -pointsize 30 -fill "#cfe6d8" -gravity North -annotate +0+1512 "Email: Dynastyofhope2023@gmail.com" \
  -font "$FR" -pointsize 28 -fill "#cfe6d8" -gravity North -annotate +0+1558 "Follow us on Facebook & Instagram: Dynasty of Hope Foundation" \
  flier-football.jpg

echo "flier-football.jpg rebuilt (blue/white/green)"
