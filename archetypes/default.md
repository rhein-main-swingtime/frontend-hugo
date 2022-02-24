---
title: "{{ replace .Name "-" " " | title }}"    # Holds the Page title
subtitle: {{ .Subtitle }}                       # Subtitle, visible in the page Header
draft: true                                     # Draft [true|false]

# Seo Data/social, important for indexing by google and displaying on social media
keywords:                               # [optional] Meta keywords, this should be keywords describing the
    - lorem                             #            content of this page
    - ipsum                             #            Max. 5
    - dolor
    - sit
    - amet
description: Lorem Ipsum dolor sit...   # [optional] Page description, important for SEO. 150 Char max.
g_title: Lorem ipsum                    # [optional] Title to be indexed, defaults to page title
og_image: lorem_ipsum.jpg               # [optional] Should be an image, will be resized to 1200x630
robots: index,follow                    # [optional] Set this to noindex,nofollow if page should **not** be indexed

# Page Data
menu: main                                      # Fill this if page should be included in menu [main|minor]
weight: 20                                      # Menu entries will be sorted by weight
translationKey: data_protection                 # Multilingual pages are linked by this field, needs to be unique site-wide
dataSrc: learn                                  # Fill this if page includes sortable cards
---



<!-- Available Shortcodes:

Infobox:
{{<info>}}
# Headline
Lorem ipsum dolor sit amet
{{</info>}}

 -->