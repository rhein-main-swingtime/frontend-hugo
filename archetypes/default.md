---
# Holds the Page title
title: "{{ replace .Name "-" " " | title }}"
# Subtitle, visible in the page Header
subtitle: ""
# Draft [true|false]
draft: true


###     Seo/Social Data
###     important for indexing by google and
###     displaying on social media
# [optional]    Meta keywords, this should be keywords describing
#               content of the page. Should be limited to max. 5
keywords:
    - lorem
    - ipsum
    - dolor
    - sit
    - amet
# [optional] Page description, important for SEO. 150 Char max.
description: Lorem Ipsum dolor sit...
# [optional] Title to be indexed, defaults to page title
og_title: Lorem ipsum
# [optional] Should be an image, will be resized to 1200x630
og_image: lorem_ipsum.jpg
# [optional] Set this to noindex,nofollow if page should **not** be indexed
robots: index,follow

###
###     Page Data
###
# Fill this if page should be included in menu [main|minor]
menu: main
# Menu entries will be sorted by weight
weight: 20
# Multilingual pages are linked by this field, needs to be unique site-wide
translationKey: data_protection
# Fill this if page includes sortable cards
dataSrc: learn
---
# Main Title


<!-- Available Shortcodes:

Infobox:
{{<info>}}
# Headline
Lorem ipsum dolor sit amet
{{</info>}}

 -->