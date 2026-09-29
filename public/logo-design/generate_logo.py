#!/usr/bin/env python3
"""
Generátor návrhů loga Tělovýchovné jednoty Krupka (TJK).
Vytváří PNG a SVG varianty.
"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT_DIR = os.path.dirname(os.path.abspath(__file__))
SIZE = 1200
CX = SIZE // 2
CY = SIZE // 2

# Barvy
DARK = "#003B5C"      # tmavě modrá
TEAL = "#1DBCB8"      # tyrkysová
WHITE = "#FFFFFF"
DARK_BG = "#0B1120"
LIGHT_MOUNTAIN = "#E6F4F1"
MID_MOUNTAIN = "#B3E0DA"

FONT_PATH = "/System/Library/Fonts/Helvetica.ttc"
FONT_BOLD_INDEX = 1


def load_font(size, bold=True):
    idx = FONT_BOLD_INDEX if bold else 0
    return ImageFont.truetype(FONT_PATH, size, index=idx)


def draw_ring(draw, radius, width, dark_color=DARK, teal_color=TEAL):
    """Kruh s mezerou. Horní část tyrkysová, dolní tmavě modrá."""
    draw.arc(
        [CX - radius, CY - radius, CX + radius, CY + radius],
        start=25, end=155, fill=dark_color, width=width
    )
    draw.arc(
        [CX - radius, CY - radius, CX + radius, CY + radius],
        start=205, end=335, fill=teal_color, width=width
    )


def draw_tjk(draw, dark_color=DARK, teal_color=TEAL, cy_offset=0, scale=1.0):
    """Vykreslí monogram TJK pomocí bold fontu, centrovaně."""
    font = load_font(int(320 * scale))
    spacing = int(210 * scale)
    letters = [
        ("T", dark_color, -spacing),
        ("J", dark_color, 0),
        ("K", teal_color, spacing),
    ]
    for letter, color, dx in letters:
        draw.text(
            (CX + dx, CY + cy_offset),
            letter,
            font=font,
            fill=color,
            anchor="mm",
        )


def create_monogram_only(bg_color=WHITE, filename="tjk-logo-monogram.png",
                         dark_color=DARK, teal_color=TEAL):
    """Jednoduchý monogram TJK v kruhu."""
    img = Image.new("RGBA", (SIZE, SIZE), bg_color)
    draw = ImageDraw.Draw(img)
    draw_ring(draw, radius=470, width=70, dark_color=dark_color, teal_color=teal_color)
    draw_tjk(draw, dark_color=dark_color, teal_color=teal_color)
    out = os.path.join(OUT_DIR, filename)
    img.save(out)
    print("Saved", out)
    return out


def create_logo_with_mountains(bg_color=WHITE, filename="tjk-logo-mountains.png",
                                dark_color=DARK, teal_color=TEAL):
    """Monogram TJK v kruhu se siluetou hor."""
    img = Image.new("RGBA", (SIZE, SIZE), bg_color)
    draw = ImageDraw.Draw(img)

    draw_ring(draw, radius=470, width=70, dark_color=dark_color, teal_color=teal_color)

    # Hory v dolní části za písmeny
    base_y = CY + 130
    draw.polygon([
        (CX - 360, base_y + 130),
        (CX - 200, base_y - 50),
        (CX - 80, base_y + 50),
        (CX + 20, base_y - 80),
        (CX + 160, base_y + 40),
        (CX + 360, base_y + 130),
    ], fill=LIGHT_MOUNTAIN)
    draw.polygon([
        (CX - 300, base_y + 130),
        (CX - 140, base_y),
        (CX + 40, base_y + 80),
        (CX + 200, base_y - 20),
        (CX + 380, base_y + 130),
    ], fill=MID_MOUNTAIN)

    # Slunce/kámen
    draw.ellipse([CX + 160, CY - 210, CX + 220, CY - 150], fill=teal_color)

    draw_tjk(draw, dark_color=dark_color, teal_color=teal_color, cy_offset=-10)

    out = os.path.join(OUT_DIR, filename)
    img.save(out)
    print("Saved", out)
    return out


def create_horizontal_logo(filename="tjk-logo-horizontal.png", with_slogan=True):
    """Horizontální varianta: ikona vlevo, text vpravo."""
    W, H = 2600, 800
    img = Image.new("RGBA", (W, H), WHITE)
    draw = ImageDraw.Draw(img)

    icon_size = 560
    icon = create_monogram_only((255, 255, 255, 0), "__tmp_icon.png")
    icon_img = Image.open(icon).resize((icon_size, icon_size), Image.LANCZOS)
    img.paste(icon_img, (60, (H - icon_size) // 2), icon_img)

    font_large = load_font(110, bold=True)
    font_small = load_font(48, bold=False)

    draw.text((720, 260), "TĚLOVÝCHOVNÁ JEDNOTA", fill=DARK, font=font_large, anchor="lm")
    draw.text((720, 390), "KRUPKA", fill=TEAL, font=font_large, anchor="lm")
    if with_slogan:
        draw.text((725, 500), "connected with nature since 1974", fill=DARK + "99", font=font_small, anchor="lm")

    out = os.path.join(OUT_DIR, filename)
    img.save(out)
    print("Saved", out)
    return out


def create_favicon(filename="tjk-favicon.png"):
    """Čtvercová favicon verze."""
    S = 512
    img = Image.new("RGBA", (S, S), WHITE)
    draw = ImageDraw.Draw(img)

    cx, cy = S // 2, S // 2
    r = 200
    w = 30
    # kruh
    draw.arc([cx - r, cy - r, cx + r, cy + r], start=25, end=155, fill=DARK, width=w)
    draw.arc([cx - r, cy - r, cx + r, cy + r], start=205, end=335, fill=TEAL, width=w)

    font = load_font(140)
    draw.text((cx - 90, cy), "T", font=font, fill=DARK, anchor="mm")
    draw.text((cx, cy), "J", font=font, fill=DARK, anchor="mm")
    draw.text((cx + 90, cy), "K", font=font, fill=TEAL, anchor="mm")

    out = os.path.join(OUT_DIR, filename)
    img.save(out)
    print("Saved", out)
    return out


def create_svg(dark_color=DARK, teal_color=TEAL, bg_color=WHITE,
               filename="tjk-logo-monogram.svg"):
    """Vytvoří jednoduché SVG logo (monogram v kruhu)."""
    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">
  <rect width="{SIZE}" height="{SIZE}" fill="{bg_color}"/>
  <path d="M 303 380 A 470 470 0 0 1 897 380" fill="none" stroke="{teal_color}" stroke-width="70" stroke-linecap="round"/>
  <path d="M 303 620 A 470 470 0 0 0 897 620" fill="none" stroke="{dark_color}" stroke-width="70" stroke-linecap="round"/>
  <text x="390" y="640" font-family="Helvetica, Arial, sans-serif" font-weight="bold" font-size="320" fill="{dark_color}" text-anchor="middle">T</text>
  <text x="600" y="640" font-family="Helvetica, Arial, sans-serif" font-weight="bold" font-size="320" fill="{dark_color}" text-anchor="middle">J</text>
  <text x="810" y="640" font-family="Helvetica, Arial, sans-serif" font-weight="bold" font-size="320" fill="{teal_color}" text-anchor="middle">K</text>
</svg>"""
    out = os.path.join(OUT_DIR, filename)
    with open(out, "w", encoding="utf-8") as f:
        f.write(svg)
    print("Saved", out)


if __name__ == "__main__":
    # Světlé varianty
    create_monogram_only(WHITE, "tjk-logo-monogram.png")
    create_logo_with_mountains(WHITE, "tjk-logo-mountains.png")
    create_horizontal_logo("tjk-logo-horizontal.png", with_slogan=True)
    create_horizontal_logo("tjk-logo-horizontal-compact.png", with_slogan=False)

    # Tmavé varianty
    create_monogram_only(DARK_BG, "tjk-logo-monogram-dark.png",
                         dark_color=WHITE, teal_color=TEAL)
    create_logo_with_mountains(DARK_BG, "tjk-logo-mountains-dark.png",
                                dark_color=WHITE, teal_color=TEAL)

    # Favicon
    create_favicon("tjk-favicon.png")

    # SVG
    create_svg()
    create_svg(dark_color=WHITE, teal_color=TEAL, bg_color=DARK_BG,
               filename="tjk-logo-monogram-dark.svg")

    print("Hotovo.")
