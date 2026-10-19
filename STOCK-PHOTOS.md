# Stock photography

The client supplied no photographs and has no website or social accounts to
pull from, so every image on this site is licensed stock. All four are free
licence: Unsplash Licence or Pexels Licence. Nothing here is a photo of this
client's work, and no alt text or caption claims otherwise.

Replace these as soon as the client sends real job photos. That is the first
item in CLIENT-TODO.md.

## In use

| File | Dimensions | What is in it | Where it is used | Source | Photographer |
|---|---|---|---|---|---|
| `stock-open-cell-foam-framing.jpg` | 2400x1800 | Cream open cell foam expanded across a ceiling cavity, timber framing and conduit in shot | Homepage hero, Open Cell tab on the comparison band, Open Cell service page | https://unsplash.com/photos/wooden-wall-section-with-spray-foam-insulation-nIlAoV8bZxo | Olek Buzunov (Unsplash) |
| `stock-closed-cell-foam-wall-studs.jpg` | 2400x1800 | Spray foam filling wall cavities between studs and around two window openings | Closed Cell tab on the comparison band, Closed Cell service page | https://unsplash.com/photos/room-under-construction-with-exposed-insulation-and-windows--na9wP3LxZw | Olek Buzunov (Unsplash) |
| `stock-spray-foam-ceiling-joists.jpg` | 2400x3200 | Foam between ceiling joists and wall studs in a stripped back room mid renovation | Insulation Removal service page | https://unsplash.com/photos/attic-room-under-construction-with-exposed-framing-and-insulation-_zYH64GMZGI | Olek Buzunov (Unsplash) |
| `stock-fiberglass-batts-wall-studs.jpg` | 2400x1602 | Pink fiberglass batts between wooden wall studs, installer cropped, no face visible | Batt Insulation service page | https://www.pexels.com/photo/unrecognizable-worker-insulating-with-stone-wool-6124239/ | Ksenia Chernaya (Pexels) |

All four were re-encoded through sharp before entering the repo, which strips
EXIF, GPS, IPTC and XMP. Verified empty afterwards; one of them (the Pexels
batts shot) carried EXIF on download. No upscaling and no filters were applied.

## Considered and rejected

| Candidate | Why it was rejected |
|---|---|
| Attic insulation between rafters, Unsplash `Nr1Z8LPPt9c` | Photographer is "Canada's Restoration Services", a restoration contractor. The brief's rule is to avoid photographers who are insulation companies |
| Foil radiant barrier in an attic, Unsplash `oXGlh4Dc-Do` and `XEkGi2wElsc` | Legible "ACTIS" brand text on the material. No brand names |
| Attic with stored clutter, Unsplash `5m_0KXO06bk` | Reads as attic storage rather than old insulation, and carries partial brand text on an insulation bag |
| Attic full of boxes, Unsplash `Pn3U4KBZt_0` | No insulation is the subject; it is a storage photo |
| Several spray foam and installer shots on Unsplash (`UjcsbuTRBjU`, `eS7zaVvNpEg`, `1417lYo6yDs`, `7wObRYpB6Eo`) | Unsplash+ (paid subscription), not the free licence |
| White-coveralls-with-a-spray-gun shots (Unsplash `ce2r9sPR_9E`, `MCMWHK-WEZU`, Pexels `6474193`) | The subject is spraying paint or water, not foam. Using one on an insulation site would misrepresent what the photo shows |
| Industrial worker in a protective suit, Pexels `3186687` | Black and white, which fights the warm palette, and the activity is not insulation |

## Gaps

No free-licence photograph was found for three of the subjects the build called
for, so those slots render text only rather than a stand-in:

- A wide landscape of an installer in a suit and respirator spraying foam. The hero uses the open cell framing shot instead, which is at least the real material.
- Loose-fill blown-in insulation in an attic. The Blown-In comparison tab and the Blown-In service page both render with no image, which the components support.
- Old, dirty or compressed insulation for the removal page. That page uses the stripped-back-room shot.
