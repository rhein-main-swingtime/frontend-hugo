---
title: "{{ replace .Name "-" " " | title }}"    # Holds the Page title
subtitle: {{ .Subtitle }}                       # Subtitle, visible in the page Header
draft: true                                     # Draft [true|false]

# Seo Data/social, important for indexing by google and displaying on social media
meta_title: Lorem ipsum                         # [optional] Title to be indexed, defaults to page title
meta_tags:                                      # Meta tags, this should be keywords describing the
    - lorem                                     # content of this page
    - ipsum                                     # Max. 5
    - dolor
    - sit
    - amet
meta_description: Lorem Ipsum dolor sit...      # Will be used in google search result page below title of the page
og_image: lorem_ipsum.jpg                       # Should be an image, will be resized to 1200x630

# Page Data
menu: main                                      # Fill this if page should be included in menu [main|minor]
weight: 20                                      # Menu entries will be sorted by weight
translationKey: data_protection                 # Multilingual pages are linked by this field, needs to be unique site-wide
dataSrc: learn                                  # Fill this if page includes searchable cards
---
